import React, { useState, useRef, useEffect } from 'react';
import type { Language } from '../data/portfolioData';
import { PERSONAL_INFO, UI_STRINGS, CV_DATA } from '../data/portfolioData';
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  MailIcon,
  FileTextIcon,
  ArrowUpRightIcon,
  XIcon,
  ZoomInIcon,
} from './Icons';

interface SidebarProps {
  activeSection: string;
  onSectionChange?: (id: string) => void;
  lang: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, lang }) => {
  const strings = UI_STRINGS[lang];
  const [isCvMenuOpen, setIsCvMenuOpen] = useState(false);
  const cvMenuRef = useRef<HTMLDivElement>(null);
  const avatarModalRef = useRef<HTMLDialogElement>(null);

  const openAvatarModal = () => {
    avatarModalRef.current?.showModal();
  };

  const closeAvatarModal = () => {
    avatarModalRef.current?.close();
  };

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cvMenuRef.current && !cvMenuRef.current.contains(event.target as Node)) {
        setIsCvMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCvMenuOpen(false);
      }
    };

    if (isCvMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCvMenuOpen]);

  // Fallback for browsers without native <dialog closedby> support
  useEffect(() => {
    const dialog = avatarModalRef.current;
    if (!dialog) return;

    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const handleBackdropClick = (event: MouseEvent) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;

        if (!isDialogContent) {
          dialog.close();
        }
      };
      dialog.addEventListener('click', handleBackdropClick);
      return () => dialog.removeEventListener('click', handleBackdropClick);
    }
  }, []);

  // Nav menu: Tentang Saya, Keahlian, Pengalaman, Proyek, Kontak
  const navItems = [
    { id: 'about', label: strings.navAbout },
    { id: 'skills', label: strings.navSkills },
    { id: 'experience', label: strings.navExperience },
    { id: 'projects', label: strings.navProjects },
    { id: 'contact', label: strings.navContact },
  ];

  const renderSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <GithubIcon size={19} />;
      case 'linkedin':
        return <LinkedinIcon size={19} />;
      case 'instagram':
        return <InstagramIcon size={19} />;
      case 'mail':
        return <MailIcon size={19} />;
      case 'file-text':
      default:
        return <FileTextIcon size={19} />;
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (onSectionChange) {
      onSectionChange(id);
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-top-section">
          {/* Profile Hero: Foto lebih besar di samping nama & profesi */}
          <div className="profile-hero-row">
            <button
              type="button"
              className="profile-avatar-container"
              onClick={openAvatarModal}
              aria-label={`${PERSONAL_INFO.name} - ${strings.avatarEnlargeHint}`}
              title={strings.avatarEnlargeHint}
            >
              <img
                src={PERSONAL_INFO.avatarUrl}
                alt={PERSONAL_INFO.name}
                className="profile-avatar-img"
              />
              <span className="avatar-zoom-overlay" aria-hidden="true">
                <ZoomInIcon size={16} className="avatar-zoom-icon" />
              </span>
            </button>
            <div className="profile-info-col">
              <span className="profile-greeting">{PERSONAL_INFO.greeting[lang]}</span>
              <h1 className="profile-name">
                <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                  {PERSONAL_INFO.name}
                </a>
              </h1>
              <h2 className="profile-role">{PERSONAL_INFO.title[lang]}</h2>
              <div className="current-focus-badge">
                <span className="pulse-dot" />
                <span>{strings.activeRoleBadge}</span>
              </div>
            </div>
          </div>

          {/* Bio Tagline */}
          <p className="sidebar-tagline">{PERSONAL_INFO.tagline[lang]}</p>

          {/* In-page navigation with Skill right below About */}
          <nav className="nav-menu" aria-label="In-page jump links">
            <ul>
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="nav-item">
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                    >
                      <span className="nav-indicator" />
                      <span className="nav-text">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Social Media Buttons (always visible and fit in window) */}
        <div className="social-links" aria-label="Social media">
          {PERSONAL_INFO.socials.map((social) => {
            if (social.icon === 'file-text') {
              return (
                <div key={social.name} className="cv-dropdown-wrapper" ref={cvMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsCvMenuOpen((prev) => !prev)}
                    className={`cv-trigger-btn ${isCvMenuOpen ? 'active' : ''}`}
                    aria-label={`${social.name} - ${strings.cvDropdownTitle}`}
                    aria-expanded={isCvMenuOpen}
                    aria-haspopup="true"
                    title={`${social.name} (${strings.cvDropdownTitle})`}
                  >
                    {renderSocialIcon(social.icon)}
                  </button>

                  {isCvMenuOpen && (
                    <div
                      className="cv-dropdown-menu"
                      role="menu"
                      aria-label={strings.cvDropdownTitle}
                    >
                      <div className="cv-dropdown-header">
                        {strings.cvDropdownTitle}
                      </div>
                      {CV_DATA.map((cv) => (
                        <a
                          key={cv.id}
                          href={cv.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cv-dropdown-item"
                          role="menuitem"
                          onClick={() => setIsCvMenuOpen(false)}
                        >
                          <FileTextIcon
                            size={16}
                            className={`cv-item-icon ${cv.id === 'data-bi' ? 'data-bi-color' : ''}`}
                          />
                          <div className="cv-item-info">
                            <span className="cv-item-title">{cv.role[lang]}</span>
                            <span className="cv-item-format">PDF · {cv.category}</span>
                          </div>
                          <ArrowUpRightIcon size={14} className="cv-item-arrow" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={`${social.name} (opens in a new tab)`}
                title={social.name}
              >
                {renderSocialIcon(social.icon)}
              </a>
            );
          })}
        </div>
      </aside>

      {/* Enlarged Avatar Lightbox Modal (<dialog>) */}
      <dialog
        ref={avatarModalRef}
        className="avatar-modal"
        {...({ closedby: 'any' } as any)}
        aria-labelledby="avatar-modal-title"
      >
        <div className="avatar-modal-card">
          <div className="avatar-modal-header">
            <span id="avatar-modal-title" className="avatar-modal-title">
              {strings.avatarModalTitle}
            </span>
            <button
              type="button"
              className="avatar-modal-close"
              onClick={closeAvatarModal}
              aria-label={strings.closeModal}
              autoFocus
            >
              <XIcon size={18} />
            </button>
          </div>

          <div className="avatar-modal-body">
            <img
              src={PERSONAL_INFO.avatarUrl}
              alt={PERSONAL_INFO.name}
              className="avatar-modal-img"
            />
          </div>

          <div className="avatar-modal-footer">
            <h3 className="avatar-modal-name">{PERSONAL_INFO.name}</h3>
            <p className="avatar-modal-role">{PERSONAL_INFO.title[lang]}</p>
          </div>
        </div>
      </dialog>
    </>
  );
};
