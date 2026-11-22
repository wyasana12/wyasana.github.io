import React from 'react';
import type { Language } from '../data/portfolioData';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="footer" role="contentinfo">
      <p>
        {lang === 'id'
          ? 'Dikembangkan oleh Wyasana Aji Kusuma Wardana terinspirasi dari Brittany Chiang'
          : 'Developed by Wyasana Aji Kusuma Wardana inspired by Brittany Chiang'}
      </p>
    </footer>
  );
};
