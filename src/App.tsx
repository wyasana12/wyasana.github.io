import { useState, useEffect, useSyncExternalStore } from 'react';
import type { Language } from './data/portfolioData';
import { SEO_META } from './data/portfolioData';
import type { ThemeMode } from './components/Topbar';
import { Topbar } from './components/Topbar';
import { Spotlight } from './components/Spotlight';
import { Sidebar } from './components/Sidebar';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

const PREFS_EVENT = 'portfolio-prefs-change';

function subscribePrefs(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(PREFS_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(PREFS_EVENT, callback);
  };
}

function getLangSnapshot(): Language {
  try {
    const saved = localStorage.getItem('portfolio_lang');
    return saved === 'en' || saved === 'id' ? saved : 'id';
  } catch {
    return 'id';
  }
}

function getThemeSnapshot(): ThemeMode {
  try {
    const saved = localStorage.getItem('portfolio_theme');
    return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system';
  } catch {
    return 'system';
  }
}

export function App() {
  // Hydration-safe preferences synced with localStorage via useSyncExternalStore
  const lang = useSyncExternalStore(subscribePrefs, getLangSnapshot, () => 'id' as const);
  const theme = useSyncExternalStore(subscribePrefs, getThemeSnapshot, () => 'system' as const);
  const [activeSection, setActiveSection] = useState<string>('about');

  // Handle Theme Mode (System / Dark / Light)
  useEffect(() => {
    const applyTheme = () => {
      let resolvedTheme: 'dark' | 'light' = 'dark';
      if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        resolvedTheme = prefersDark ? 'dark' : 'light';
      } else {
        resolvedTheme = theme;
      }
      document.documentElement.setAttribute('data-theme', resolvedTheme);
    };

    applyTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme]);

  // Sync document language & SEO metadata when language changes
  useEffect(() => {
    document.documentElement.lang = lang;
    const meta = SEO_META[lang];
    document.title = meta.title;
    const descEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (descEl) {
      descEl.content = meta.description;
    }
  }, [lang]);

  // Handle Language & Theme updates
  const handleLanguageChange = (newLang: Language) => {
    try {
      localStorage.setItem('portfolio_lang', newLang);
    } catch {
      // Ignore storage errors
    }
    window.dispatchEvent(new Event(PREFS_EVENT));
  };

  const handleThemeChange = (newTheme: ThemeMode) => {
    try {
      localStorage.setItem('portfolio_theme', newTheme);
    } catch {
      // Ignore storage errors
    }
    window.dispatchEvent(new Event(PREFS_EVENT));
  };

  // Scrollspy tracking: about, skills, experience, projects, contact (rAF-throttled)
  useEffect(() => {
    let rafId = 0;

    const updateActiveSection = () => {
      rafId = 0;
      // If near page bottom, activate the last section (contact)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection('contact');
        return;
      }

      const sections = ['about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <a href="#content" className="skip-to-content visually-hidden">
        {lang === 'id' ? 'Langsung ke konten utama' : 'Skip to main content'}
      </a>
      <Topbar
        lang={lang}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onThemeChange={handleThemeChange}
      />
      <Spotlight />
      <div className="portfolio-container">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} lang={lang} />
        <main id="content" className="main-content">
          <AboutSection lang={lang} />
          <SkillsSection lang={lang} />
          <ExperienceSection lang={lang} />
          <ProjectsSection lang={lang} />
          <ContactSection lang={lang} />
          <Footer lang={lang} />
        </main>
      </div>
    </>
  );
}

export default App;
