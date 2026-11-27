import React from 'react';
import type { Language } from '../data/portfolioData';
import { SKILL_PILLARS, UI_STRINGS } from '../data/portfolioData';
import { ServerIcon, DatabaseIcon, BarChartIcon } from './Icons';

interface SkillsSectionProps {
  lang: Language;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ lang }) => {
  const strings = UI_STRINGS[lang];

  const getPillarIcon = (icon: string) => {
    switch (icon) {
      case 'server':
        return <ServerIcon size={19} color="var(--color-accent)" aria-hidden="true" />;
      case 'database':
        return <DatabaseIcon size={19} color="var(--color-accent-data)" aria-hidden="true" />;
      case 'bar-chart':
      default:
        return <BarChartIcon size={19} color="var(--color-accent-data)" aria-hidden="true" />;
    }
  };

  return (
    <section id="skills" className="section" aria-label={strings.sectionSkills}>
      {/* Mobile Sticky Header (visual mirror; semantic <h2> lives in .section-header) */}
      <div className="section-sticky-header" aria-hidden="true">
        <span className="section-sticky-title">{strings.sectionSkills}</span>
      </div>

      {/* Main Section Header */}
      <div className="section-header">
        <h2 className="section-header-title">{strings.sectionSkills}</h2>
        <div className="section-header-line" />
      </div>

      <div className="skills-matrix-grid">
        {SKILL_PILLARS.map((pillar) => (
          <article key={pillar.title.en} className="pillar-card">
            <div className="pillar-header">
              {getPillarIcon(pillar.icon)}
              <h3 className="pillar-title">{pillar.title[lang]}</h3>
            </div>
            <p className="pillar-desc">{pillar.description[lang]}</p>
            
            <div style={{ marginTop: '0.85rem' }}>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.45rem',
                }}
              >
                Tech Stack:
              </span>
              <div className="pillar-tags">
                {pillar.items.map((skill) => (
                  <span key={skill} className="pillar-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
