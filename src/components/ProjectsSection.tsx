import React, { useState } from 'react';
import type { Language, Project } from '../data/portfolioData';
import { PROJECTS, UI_STRINGS } from '../data/portfolioData';
import {
  ArrowUpRightIcon,
  GithubIcon,
  ExternalLinkIcon,
  ActivityIcon,
  DatabaseIcon,
  BarChartIcon,
  CpuIcon,
} from './Icons';

interface ProjectsSectionProps {
  lang: Language;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang }) => {
  const strings = UI_STRINGS[lang];
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    { key: 'All', label: strings.categoryAll },
    { key: 'Software Engineer', label: 'Software Engineer' },
    { key: 'Data Engineer', label: 'Data Engineer' },
    { key: 'Business Intelligence Analyst', label: 'Business Intelligence Analyst' },
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const renderProjectIcon = (category: Project['category']) => {
    switch (category) {
      case 'Data Engineer':
        return <DatabaseIcon size={24} color="var(--color-accent-data)" />;
      case 'Business Intelligence Analyst':
        return <BarChartIcon size={24} color="var(--color-accent-data)" />;
      case 'Software Engineer':
      default:
        return <CpuIcon size={24} color="var(--color-accent)" />;
    }
  };

  return (
    <section id="projects" className="section" aria-label={strings.sectionProjects}>
      {/* Mobile Sticky Header */}
      <div className="section-sticky-header">
        <h2>{strings.sectionProjects}</h2>
      </div>

      {/* Main Section Header */}
      <div className="section-header">
        <h2 className="section-header-title">{strings.sectionProjects}</h2>
        <div className="section-header-line" />
      </div>

      {/* Filter Tabs */}
      <div className="category-filter-bar" role="tablist" aria-label="Filter projects by discipline">
        {categories.map((cat) => (
          <button
            key={cat.key}
            role="tab"
            aria-selected={selectedCategory === cat.key}
            className={`category-filter-btn ${selectedCategory === cat.key ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <div
          style={{
            padding: '3.5rem 1.5rem',
            textAlign: 'center',
            background: 'var(--color-surface)',
            border: '1px dashed var(--color-border)',
            borderRadius: '0.75rem',
            marginTop: '1.25rem',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              padding: '0.75rem',
              borderRadius: '9999px',
              background: 'var(--color-accent-bg)',
              color: 'var(--color-accent)',
              marginBottom: '1rem',
            }}
          >
            <DatabaseIcon size={28} />
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.2rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '0.35rem',
              letterSpacing: '0.05em',
            }}
          >
            Not Found
          </h3>
          <p
            style={{
              color: 'var(--color-text-muted)',
              fontSize: '0.875rem',
              maxWidth: '380px',
              margin: '0 auto',
              lineHeight: 1.5,
            }}
          >
            {lang === 'id'
              ? `Belum ada proyek untuk kategori ${selectedCategory}.`
              : `No projects found for ${selectedCategory}.`}
          </p>
        </div>
      ) : (
        <div className="card-group">
          {filteredProjects.map((project) => (
            <div key={project.id} className="card-item">
              {/* Left Box: Graphic / Mockup Preview */}
              <div className="project-card-image-box">
                <div className="project-preview-mockup">
                  <div className="mockup-header-dots">
                    <span className="mockup-dot red" />
                    <span className="mockup-dot yellow" />
                    <span className="mockup-dot green" />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      gap: '0.5rem',
                    }}
                  >
                    {renderProjectIcon(project.category)}
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Box: Details */}
              <div className="card-details">
                <h3 className="card-title">
                  <a
                    href={project.link || project.githubUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'inherit',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                    }}
                    aria-label={`${project.title} (opens in a new tab)`}
                  >
                    <span>{project.title}</span>
                    <ArrowUpRightIcon className="external-icon" size={16} />
                  </a>
                </h3>

                <div className="card-subtitle">{project.subtitle[lang]}</div>

                {project.metrics && (
                  <div className="metrics-pill">
                    <ActivityIcon size={12} />
                    <span>{project.metrics}</span>
                  </div>
                )}

                <p className="card-desc">{project.description[lang]}</p>

                {project.highlights && project.highlights[lang].length > 0 && (
                  <ul className="card-bullets">
                    {project.highlights[lang].map((h, idx) => (
                      <li key={idx} className="card-bullet-item">
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Action Links */}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.85rem' }}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.78rem',
                        color: 'var(--color-text-muted)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                    >
                      <GithubIcon size={14} />
                      <span>{strings.sourceCode}</span>
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.78rem',
                        color: 'var(--color-text-muted)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                    >
                      <ExternalLinkIcon size={14} />
                      <span>{strings.liveDemo}</span>
                    </a>
                  )}
                </div>

                {/* Skills Badges */}
                <div className="skills-list" aria-label="Technologies used in project">
                  {project.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
