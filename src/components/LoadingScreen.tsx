import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

const CRAWLER_UA_PATTERN =
  /bot|crawl|spider|slurp|lighthouse|pagespeed|facebookexternalhit|twitterbot|linkedinbot|whatsapp|google-inspectiontool/i;

function shouldSkipPreloader(): boolean {
  if (typeof window === 'undefined') return true;
  if (navigator.webdriver || CRAWLER_UA_PATTERN.test(navigator.userAgent)) return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  try {
    if (sessionStorage.getItem('portfolio_preloaded') === '1') return true;
  } catch {
    // Ignore storage access errors in restricted contexts
  }
  return false;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [isHidden, setIsHidden] = useState<boolean>(() => shouldSkipPreloader());
  const [progress, setProgress] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  useEffect(() => {
    if (isHidden) {
      if (onLoaded) onLoaded();
      return;
    }

    // Fast, non-intrusive intro (~360ms) to preserve Core Web Vitals (LCP)
    const interval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(interval);
          return 100;
        }
        return Math.min(100, prev + 20);
      });
    }, 35);

    return () => window.clearInterval(interval);
  }, [isHidden, onLoaded]);

  useEffect(() => {
    if (isHidden || progress < 100) return;

    const fadeTimeout = window.setTimeout(() => {
      setIsFading(true);
    }, 60);

    const hideTimeout = window.setTimeout(() => {
      setIsHidden(true);
      try {
        sessionStorage.setItem('portfolio_preloaded', '1');
      } catch {
        // Ignore storage errors
      }
      if (onLoaded) onLoaded();
    }, 320);

    return () => {
      window.clearTimeout(fadeTimeout);
      window.clearTimeout(hideTimeout);
    };
  }, [isHidden, progress, onLoaded]);

  if (isHidden) return null;

  return (
    <div
      className={`preloader-overlay ${isFading ? 'preloader-fade-out' : ''}`}
      aria-hidden="true"
    >
      <div className="preloader-content">
        {/* Name Title (uses <p> so the document keeps strictly one semantic <h1>) */}
        <p className="preloader-name">
          Wyasana Aji Kusuma Wardana
        </p>

        {/* Minimalist Loading Bar */}
        <div className="preloader-loading-track">
          <div
            className="preloader-loading-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading status indicator */}
        <div className="preloader-loading-status">
          <span className="preloader-loading-label">Loading</span>
          <span className="preloader-dots">
            <span className="dot dot-1">.</span>
            <span className="dot dot-2">.</span>
            <span className="dot dot-3">.</span>
          </span>
          <span className="preloader-percent">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
