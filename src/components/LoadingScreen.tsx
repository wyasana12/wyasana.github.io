import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Smooth progress animation over ~1.1 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const remaining = 100 - prev;
        const jump = Math.max(3, Math.floor(remaining * 0.2));
        return Math.min(100, prev + jump);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const fadeTimeout = setTimeout(() => {
        setIsFading(true);
      }, 200);

      const hideTimeout = setTimeout(() => {
        setIsHidden(true);
        if (onLoaded) onLoaded();
      }, 700);

      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(hideTimeout);
      };
    }
  }, [progress, onLoaded]);

  if (isHidden) return null;

  return (
    <div
      className={`preloader-overlay ${isFading ? 'preloader-fade-out' : ''}`}
      aria-hidden="true"
    >
      <div className="preloader-content">
        {/* Name Title */}
        <h1 className="preloader-name">
          Wyasana Aji Kusuma Wardana
        </h1>

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
