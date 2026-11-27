import React, { useState, useEffect } from 'react';
import type { Language } from '../data/portfolioData';
import { PERSONAL_INFO } from '../data/portfolioData';
import { SunIcon, MoonIcon, MonitorIcon } from './Icons';

export type ThemeMode = 'dark' | 'light' | 'system';

interface TopbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  lang,
  onLanguageChange,
  theme,
  onThemeChange,
}) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let rafId = 0;

    const updateTopbarOffset = (hidden: boolean) => {
      document.documentElement.style.setProperty('--topbar-offset', hidden ? '0px' : '61px');
    };

    updateTopbarOffset(false);

    const processScroll = () => {
      rafId = 0;
      const currentScrollY = window.scrollY;
      // Jika di-scroll ke bawah melewati 20px, topbar naik ke atas (tidak terlihat)
      if (currentScrollY > 20 && currentScrollY > lastScrollY) {
        setIsHidden(true);
        updateTopbarOffset(true);
      } else if (currentScrollY <= 20 || currentScrollY < lastScrollY) {
        setIsHidden(false);
        updateTopbarOffset(false);
      }
      lastScrollY = currentScrollY;
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(processScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header className={`topbar ${isHidden ? 'topbar-hidden' : ''}`} role="banner">
      <div className="topbar-inner">
        {/* Website Brand Logo (static element, not a button) */}
        <div className="topbar-brand">
          <img
            src={PERSONAL_INFO.logoUrl}
            alt="Logo Wyasana Aji Kusuma Wardana"
            width={54}
            height={54}
            decoding="async"
            className="topbar-logo-img"
          />
        </div>

        {/* Controls (Language & Theme Mode) */}
        <div className="topbar-actions ml-auto">
          {/* Language Switcher */}
          <div className="topbar-group" role="group" aria-label="Language Selector">
            <button
              type="button"
              className={`topbar-btn ${lang === 'id' ? 'active' : ''}`}
              onClick={() => onLanguageChange('id')}
              aria-label="Bahasa Indonesia"
              aria-pressed={lang === 'id'}
              title="Bahasa Indonesia"
            >
              ID
            </button>
            <button
              type="button"
              className={`topbar-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => onLanguageChange('en')}
              aria-label="English"
              aria-pressed={lang === 'en'}
              title="English"
            >
              EN
            </button>
          </div>

          <div className="topbar-divider" />

          {/* Theme Mode Switcher */}
          <div className="topbar-group" role="group" aria-label="Theme Mode Selector">
            <button
              type="button"
              className={`topbar-btn icon-btn ${theme === 'light' ? 'active' : ''}`}
              onClick={() => onThemeChange('light')}
              aria-label="Light Mode"
              aria-pressed={theme === 'light'}
              title="Light Mode"
            >
              <SunIcon size={14} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`topbar-btn icon-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => onThemeChange('dark')}
              aria-label="Dark Mode"
              aria-pressed={theme === 'dark'}
              title="Dark Mode"
            >
              <MoonIcon size={14} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`topbar-btn icon-btn ${theme === 'system' ? 'active' : ''}`}
              onClick={() => onThemeChange('system')}
              aria-label="System Preference"
              aria-pressed={theme === 'system'}
              title="System Preference"
            >
              <MonitorIcon size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
