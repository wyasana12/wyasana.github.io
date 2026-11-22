import { useState, useEffect } from 'react';
import type { Language } from './data/portfolioData';
import type { ThemeMode } from './components/Topbar';
import { Topbar } from './components/Topbar';
import { Spotlight } from './components/Spotlight';
import { Sidebar } from './components/Sidebar';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';

export function App() {
  // Default mode: System dan Indonesia
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return (saved === 'en' || saved === 'id') ? saved : 'id';
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('portfolio_theme');
    return (saved === 'light' || saved === 'dark' || saved === 'system') ? saved : 'system';
  });

  const [activeSection, setActiveSection] = useState<string>('about');

  // Handle Theme Mode (System / Dark / Light)
  useEffect(() => {
    localStorage.setItem('portfolio_theme', theme);

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

  // Handle Language
  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('portfolio_lang', newLang);
  };

  // Scrollspy tracking: about, skills, experience, projects
  useEffect(() => {
    const handleScroll = () => {
      // If near page bottom, activate the last section (projects)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection('projects');
        return;
      }

      const sections = ['about', 'skills', 'experience', 'projects'];
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <LoadingScreen />
      <Topbar
        lang={lang}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onThemeChange={setTheme}
      />
      <Spotlight />
      <div className="portfolio-container">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} lang={lang} />
        <main id="content" className="main-content">
          <AboutSection lang={lang} />
          <SkillsSection lang={lang} />
          <ExperienceSection lang={lang} />
          <ProjectsSection lang={lang} />
          <Footer lang={lang} />
        </main>
      </div>
    </>
  );
}

export default App;
