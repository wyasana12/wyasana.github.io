import React from 'react';
import type { Language } from '../data/portfolioData';
import { PERSONAL_INFO, UI_STRINGS } from '../data/portfolioData';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const strings = UI_STRINGS[lang];

  return (
    <section id="about" className="section" aria-label={strings.sectionAbout}>
      {/* Mobile Sticky Header */}
      <div className="section-sticky-header">
        <h2>{strings.sectionAbout}</h2>
      </div>

      {/* Main Section Header */}
      <div className="section-header">
        <h2 className="section-header-title">{strings.sectionAbout}</h2>
        <div className="section-header-line" />
      </div>

      <div>
        {PERSONAL_INFO.about[lang].map((paragraph, index) => (
          <p key={index} className="about-paragraph">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
};
