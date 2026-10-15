'use client';

import React, { useEffect, useState } from 'react';

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="hidden sm:block fixed top-0 left-0 right-0 h-1.5 z-50 pointer-events-none bg-slate-200/40 backdrop-blur-xs">
      <div
        className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 transition-[width] duration-150 ease-out relative"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Glowing Head of the Progress Bar */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_12px_3px_rgba(245,158,11,0.9)] animate-pulse" />
      </div>
    </div>
  );
}
