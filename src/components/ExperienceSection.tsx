import React from 'react';
import type { Language } from '../data/portfolioData';
import { EXPERIENCES, UI_STRINGS, CV_DATA } from '../data/portfolioData';
import { ArrowUpRightIcon, ArrowRightIcon, FileTextIcon } from './Icons';

interface ExperienceSectionProps {
  lang: Language;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ lang }) => {
  const strings = UI_STRINGS[lang];

  return (
    <section id="experience" className="section" aria-label={strings.sectionExperience}>
      {/* Mobile Sticky Header (visual mirror; semantic <h2> lives in .section-header) */}
      <div className="section-sticky-header" aria-hidden="true">
        <span className="section-sticky-title">{strings.sectionExperience}</span>
      </div>

      {/* Main Section Header */}
      <div className="section-header">
        <h2 className="section-header-title">{strings.sectionExperience}</h2>
        <div className="section-header-line" />
      </div>

      <div className="card-group">
        {EXPERIENCES.map((exp) => (
          <article key={exp.id} className="card-item">
            {/* Period on desktop left column */}
            <div className="card-period">{exp.period[lang]}</div>

            {/* Details */}
            <div className="card-details">
              <h3 className="card-title">
                <span>
                  {exp.role[lang]} · <span style={{ color: 'var(--color-accent)' }}>{exp.company}</span>
                </span>
              </h3>

              <p className="card-desc">{exp.description[lang]}</p>

              {exp.achievements && exp.achievements[lang].length > 0 && (
                <ul className="card-bullets">
                  {exp.achievements[lang].map((item, idx) => (
                    <li key={idx} className="card-bullet-item">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Dual CV / Resume Section */}
      <div className="resume-section-wrapper">
        <div className="resume-section-header">
          <h3 className="resume-section-heading">
            <span>{strings.viewResume}</span>
          </h3>
          <p className="resume-section-sub">{strings.viewResumeSub}</p>
        </div>

        <div className="resume-cards-grid">
          {CV_DATA.map((cv) => (
            <a
              key={cv.id}
              href={cv.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`resume-card-item ${cv.id === 'data-bi' ? 'resume-card-data' : 'resume-card-backend'}`}
            >
              <div className="resume-card-top">
                <div className="resume-card-icon-box" aria-hidden="true">
                  <FileTextIcon size={20} aria-hidden="true" />
                </div>
                <span className="resume-card-badge">{cv.category}</span>
                <ArrowUpRightIcon size={16} className="resume-card-arrow" aria-hidden="true" />
              </div>

              <h4 className="resume-card-title">{cv.role[lang]}</h4>
              <p className="resume-card-desc">{cv.description[lang]}</p>

              <div className="resume-card-footer">
                <span className="resume-card-action">
                  <span>{strings.downloadPdf}</span>
                  <ArrowRightIcon size={14} className="arrow-icon" aria-hidden="true" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
