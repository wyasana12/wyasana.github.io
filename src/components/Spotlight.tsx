import { useEffect } from 'react';

export const Spotlight = () => {
  useEffect(() => {
    // Skip cursor spotlight on touch-only devices to avoid unnecessary listeners
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId = 0;
    let clientX = -1000;
    let clientY = -1000;

    const updateSpotlight = () => {
      rafId = 0;
      document.documentElement.style.setProperty('--mouse-x', `${clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${clientY}px`);
    };

    const handleMouseMove = (e: MouseEvent) => {
      clientX = e.clientX;
      clientY = e.clientY;
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateSpotlight);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return <div className="cursor-spotlight" aria-hidden="true" />;
};
