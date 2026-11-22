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
      {/* Mobile Sticky Header */}
      <div className="section-sticky-header">
        <h2>{strings.sectionExperience}</h2>
      </div>

      {/* Main Section Header */}
      <div className="section-header">
        <h2 className="section-header-title">{strings.sectionExperience}</h2>
        <div className="section-header-line" />
      </div>

      <div className="card-group">
        {EXPERIENCES.map((exp) => (
          <div key={exp.id} className="card-item">
            {/* Period on desktop left column */}
            <div className="card-period">{exp.period}</div>

            {/* Details */}
            <div className="card-details">
              <h3 className="card-title">
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                  aria-label={`${exp.role[lang]} at ${exp.company} (opens in a new tab)`}
                >
                  <span>
                    {exp.role[lang]} · <span style={{ color: 'var(--color-accent)' }}>{exp.company}</span>
                  </span>
                  <ArrowUpRightIcon className="external-icon" size={16} />
                </a>
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
          </div>
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
              aria-label={`${cv.role[lang]} (opens PDF in a new tab)`}
            >
              <div className="resume-card-top">
                <div className="resume-card-icon-box">
                  <FileTextIcon size={20} />
                </div>
                <span className="resume-card-badge">{cv.category}</span>
                <ArrowUpRightIcon size={16} className="resume-card-arrow" />
              </div>

              <h4 className="resume-card-title">{cv.role[lang]}</h4>
              <p className="resume-card-desc">{cv.description[lang]}</p>

              <div className="resume-card-footer">
                <span className="resume-card-action">
                  <span>{strings.downloadPdf}</span>
                  <ArrowRightIcon size={14} className="arrow-icon" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
