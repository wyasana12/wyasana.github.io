import React from 'react';

const HIGHLIGHT_TERMS = [
  'Snowflake',
  'Power BI',
  'Power Query (M)',
  'Power Query',
  'DAX',
  'Dimensional Modeling',
  'Star/Snowflake Schema',
  'ETL/ELT',
  'Clean Architecture',
  'Stored Procedure',
  'Stored Procedures',
  'Role-Based Access Control',
  'RBAC',
  'RESTful API',
  'REST API',
  'Laravel 12',
  'Laravel 10',
  'Laravel',
  'Golang',
  'Echo Framework',
  'PostgreSQL',
  'MySQL',
  'Redis',
  'JWT Authentication',
  'JWT',
  'Swagger UI',
  'Soft Delete',
  'Bcrypt',
  'data ingestion',
  'data cleansing',
  'scheduled refresh',
  'data quality assurance',
  'troubleshooting',
  'D3 Teknik Informatika Universitas Sebelas Maret (UNS)',
  'Backend Development',
  'Data Engineering',
  'Business Intelligence (BI) Analysis',
  'Kraft Heinz',
  'Diskominfo',
  'Global Logistics',
];

export function renderHighlightedText(text: string): React.ReactNode {
  if (!text) return text;

  // Escape regex special chars and sort by length descending to match longest phrases first
  const sortedTerms = [...HIGHLIGHT_TERMS].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${sortedTerms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    const isKeyword = HIGHLIGHT_TERMS.some((term) => term.toLowerCase() === part.toLowerCase());
    if (isKeyword) {
      return (
        <span key={index} className="highlight-text">
          {part}
        </span>
      );
    }
    return part;
  });
}
