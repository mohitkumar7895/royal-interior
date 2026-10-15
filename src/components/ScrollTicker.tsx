'use client';

import React from 'react';
import { Flame, Home, ShieldCheck, Phone, Sparkles, Building, Layers } from 'lucide-react';

interface ScrollTickerProps {
  reverse?: boolean;
  className?: string;
}

export function ScrollTicker({ reverse = false, className = '' }: ScrollTickerProps) {
  const items = [
    { text: 'ROYALPRO INDUSTRIAL FACTORY TIN SHED WORK', icon: Building, color: 'text-amber-500' },
    { text: 'WELDING WORK SERVICES (HEAVY STRUCTURAL PEB)', icon: Flame, color: 'text-orange-500' },
    { text: 'COMPLETE INTERIOR SOLUTION & TURNKEY DESIGN', icon: Home, color: 'text-indigo-400' },
    { text: 'COLD STORAGE & WAREHOUSE STEEL SHEDS', icon: Layers, color: 'text-blue-400' },
    { text: 'SPORTS ARENAS & BADMINTON COURT SHEDS', icon: Sparkles, color: 'text-amber-400' },
    { text: 'GYPSUM CEILINGS & MODULAR KITCHENS', icon: ShieldCheck, color: 'text-emerald-400' },
    { text: 'DIRECT HELPLINE: 9557323216', icon: Phone, color: 'text-amber-300' },
  ];

  const duplicated = [...items, ...items, ...items];

  return (
    <div
      className={`relative w-full py-3.5 bg-slate-900 border-y border-amber-500/30 overflow-hidden shadow-inner ${className}`}
    >
      {/* Edge gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none" />

      <div className="marquee-container flex items-center">
        <div className={reverse ? 'marquee-content-reverse' : 'marquee-content'}>
          {duplicated.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-2.5 px-4 text-xs font-black tracking-wider uppercase text-slate-200 select-none font-royal"
              >
                <Icon className={`w-4 h-4 ${item.color} shrink-0 animate-pulse`} />
                <span className="hover:text-amber-400 transition-colors">{item.text}</span>
                <span className="text-amber-500/50 text-base font-bold ml-3">•</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
