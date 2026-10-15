'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowDown, Phone, MessageCircle } from 'lucide-react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}

export function ScrollReveal({
  children,
  className = '',
  delayMs = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getDirectionClasses = () => {
    if (isInView) return 'opacity-100 translate-x-0 translate-y-0';
    switch (direction) {
      case 'left':
        return 'opacity-0 -translate-x-8';
      case 'right':
        return 'opacity-0 translate-x-8';
      case 'up':
      default:
        return 'opacity-0 translate-y-8';
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${getDirectionClasses()} ${className}`}
    >
      {children}
    </div>
  );
}

interface ScrollHeadingProps {
  badge?: React.ReactNode;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  className?: string;
  align?: 'left' | 'center';
}

export function ScrollHeading({
  badge,
  title,
  subtitle,
  className = '',
  align = 'left',
}: ScrollHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const alignmentClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div ref={ref} className={`flex flex-col ${alignmentClass} ${className}`}>
      {badge && (
        <div
          className={`transition-all duration-700 ease-out transform ${
            isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-3 scale-95'
          } mb-2.5`}
        >
          {badge}
        </div>
      )}

      <h2
        className={`font-black text-slate-900 tracking-tight font-royal transition-all duration-800 ease-out transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {title}
      </h2>

      {/* Dynamic Animated Underline that expands on scroll */}
      <div className="w-full max-w-xs mt-2 relative h-1 bg-slate-200/60 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-full transition-all duration-1000 ease-out ${
            isInView ? 'w-full' : 'w-0'
          }`}
        />
      </div>

      {subtitle && (
        <div
          className={`mt-2 transition-all duration-700 delay-200 ease-out transform ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {typeof subtitle === 'string' ? (
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">{subtitle}</p>
          ) : (
            subtitle
          )}
        </div>
      )}
    </div>
  );
}

export function FloatingScrollControls() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-5 z-40 flex flex-col items-end gap-2 transition-all duration-300">
      {/* Quick Direct WhatsApp Icon Button (Chota sa Round Icon) */}
      <a
        href="https://wa.me/919557323216?text=Hello%20Royalpro,%20I%20am%20interested%20in%20your%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-950/25 border border-emerald-400/50 hover:scale-110 active:scale-95 transition-all cursor-pointer relative group"
        title="Chat on WhatsApp"
        aria-label="WhatsApp Chat"
      >
        <span className="w-2 h-2 rounded-full bg-white absolute top-1 right-1 animate-ping" />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 absolute top-1 right-1" />
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="hidden group-hover:block absolute right-12 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap shadow-md pointer-events-none">
          WhatsApp Chat
        </span>
      </a>

      {/* Quick Direct Call Icon Button (Chota sa Round Icon) */}
      <a
        href="tel:9557323216"
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-950/20 border border-amber-300/60 hover:scale-110 active:scale-95 transition-all cursor-pointer relative group"
        title="Direct Call 9557323216"
        aria-label="Call Royalpro"
      >
        <Phone className="w-4 h-4 text-white animate-pulse" />
        <span className="hidden group-hover:block absolute right-12 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap shadow-md pointer-events-none">
          Call: 9557323216
        </span>
      </a>

      {/* Up and Down Navigation Buttons (Up to Down scroll buttons) */}
      <div className="flex items-center gap-1 bg-slate-950/85 backdrop-blur-md p-1 rounded-full border border-slate-700/80 shadow-lg">
        <button
          onClick={scrollToTop}
          className="w-8 h-8 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer font-bold shadow-xs"
          title="Scroll to Top (Up)"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>

        <button
          onClick={scrollToBottom}
          className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-400 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer font-bold border border-slate-700"
          title="Scroll to Bottom (Down)"
          aria-label="Scroll to bottom"
        >
          <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
