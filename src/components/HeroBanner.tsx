'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Phone, ChevronRight, CheckCircle2, Flame, Home, Award, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface HeroBannerProps {
  onOpenInquiry: () => void;
  onScrollToServices: () => void;
  bannerImage?: string;
  phone?: string;
}

export function HeroBanner({
  onOpenInquiry,
  onScrollToServices,
  bannerImage,
  phone = '9557323216',
}: HeroBannerProps) {
  const highlights = [
    'Industrial Factory Tin Sheds & Heavy Structural Welding',
    'Complete Commercial & Luxury Residential Interior Solutions',
    'Tata / Jindal High Tensile Certified Steel & Premium Hardware',
    'Free On-Site Inspection & Direct Engineering Support',
  ];

  return (
    <div className="relative w-full rounded-none sm:rounded-3xl overflow-hidden border-0 sm:border sm:border-slate-200 bg-white p-0 sm:p-10 mb-0 sm:mb-3 shadow-none sm:shadow-sm">
      {/* Subtle Warm Decorative Background Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left Column Text (7 cols on Desktop, Full on Mobile) */}
        <div className="lg:col-span-7">
          <ScrollReveal direction="left" delayMs={50}>
            {/* Top Contact Badges */}
            <div className="px-4 sm:px-0 pt-4 sm:pt-0 flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-amber-300 text-xs font-bold shadow-sm border border-amber-500/30">
                <img
                  src="/images/royalpro_logo.png"
                  alt="RP Golden Logo"
                  className="w-5 h-5 rounded-md object-cover border border-amber-400"
                />
                <span className="font-royal text-amber-200 uppercase tracking-wider">RP Royalpro Certified</span>
              </div>

              <a
                href="tel:9557323216"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold active:scale-95 transition-transform"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span>Helpline: <strong className="font-mono text-slate-950 font-black">9557323216</strong></span>
              </a>
            </div>

            {/* Main Headline */}
            <div className="px-4 sm:px-0">
              <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-snug sm:leading-tight font-royal">
                <span className="animate-shimmer block text-amber-700">ROYALPRO</span>
                Industrial Factory Tin Shed &{' '}
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
                  Complete Interior Solution
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-2.5 sm:mt-4 text-xs sm:text-base text-slate-600 leading-relaxed">
                <strong className="text-slate-900 font-bold">Royalpro Industrial & Interiors</strong> specializes in heavy industrial structural steel fabrication (factory tin sheds, cold storage facilities, sports stadiums) and luxury turnkey commercial & residential interiors (gypsum false ceilings, modular kitchens, wooden flooring).
              </p>
            </div>

            {/* MOBILE ONLY: Grand Edge-to-Edge Full Bleed Visual Showcase (FILLS SCREEN 100%, NO RECTANGLE/BOX) */}
            <div className="lg:hidden w-full relative h-56 xs:h-64 sm:h-72 overflow-hidden rounded-none border-y border-slate-200/80 shadow-xs my-4 group">
              <img
                src={bannerImage || '/images/factory_tin_shed.jpg'}
                alt="Industrial Factory Tin Shed Work & Complete Interior Solution"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/factory_tin_shed.jpg';
                }}
              />
              {/* Full-width Gradient Overlay with Badges & Division Titles */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex flex-col justify-end p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase font-royal tracking-wider shadow-sm">
                    Welding Work Services
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white text-slate-900 text-[10px] font-black uppercase font-royal tracking-wider shadow-sm">
                    Services List
                  </span>
                </div>
                <h2 className="text-sm xs:text-base font-black text-white font-royal leading-snug drop-shadow-sm">
                  Heavy Structural Steel Sheds & Turnkey Interior Works
                </h2>
                <p className="text-[11px] text-amber-200/90 font-medium mt-0.5">
                  Factory Tin Sheds • Cold Stores • Commercial Offices • Luxury Villas
                </p>
              </div>
            </div>

            {/* Key Feature Bullets */}
            <div className="px-4 sm:px-0 grid grid-cols-1 sm:grid-cols-2 gap-2 my-3 sm:my-5">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Call to action buttons - Clean, Balanced Mobile Layout */}
            <div className="px-4 sm:px-0 mt-4 sm:mt-7 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              {/* Primary Action Button */}
              <button
                onClick={onOpenInquiry}
                className="relative overflow-hidden group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all active:scale-95 hover:scale-105 cursor-pointer border border-amber-300/40 font-royal"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
                <span>Get Free Shed & Interior Quote</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Actions Side-by-Side on Mobile */}
              <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                <a
                  href="tel:9557323216"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-bold text-xs sm:text-sm hover:bg-amber-100 active:scale-95 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                  <span>9557323216</span>
                </a>
                <button
                  onClick={onScrollToServices}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 active:scale-95 transition-all cursor-pointer"
                >
                  Explore Services
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Visual Dual Showcase (5 cols - Desktop only) */}
        <div className="hidden lg:block lg:col-span-5">
          <ScrollReveal direction="right" delayMs={150}>
            {/* DESKTOP ONLY: 4-Item Balanced Grid */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-md border border-slate-200 group">
                <img
                  src={bannerImage || '/images/factory_tin_shed.jpg'}
                  alt="Industrial Factory Tin Shed Work"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/factory_tin_shed.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-3">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block font-royal">
                      Industrial Feature
                    </span>
                    <span className="text-xs font-bold text-white font-royal">Factory Tin Shed Work</span>
                  </div>
                </div>
              </div>

              <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-md border border-slate-200 group">
                <Image
                  src="/images/luxury_interior_work.jpg"
                  alt="Luxury Interior Work"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-3">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">
                      Complete Interior
                    </span>
                    <span className="text-xs font-bold text-white">Office & Home Solutions</span>
                  </div>
                </div>
              </div>

              <div className="relative h-32 rounded-2xl overflow-hidden shadow-md border border-slate-200 group">
                <Image
                  src="/images/badminton_court_shed.jpg"
                  alt="Badminton Academy Shed"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[11px] font-bold text-white">Sports Academy Sheds</span>
                </div>
              </div>

              <div className="relative h-32 rounded-2xl overflow-hidden shadow-md border border-slate-200 group">
                <Image
                  src="/images/modular_kitchen_interior.jpg"
                  alt="Modular Kitchen Interior"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[11px] font-bold text-white">Modular Kitchens & Paneling</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Two Division Quick Bar */}
      <ScrollReveal direction="up" delayMs={200}>
        <div className="px-4 sm:px-0 mt-6 sm:mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pb-4 sm:pb-0">
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 flex items-start gap-3 hover:border-amber-400 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-amber-500/30">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm font-royal">
                WELDING WORK SERVICES
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Factory Tin Sheds, Cold Stores, Sports Arenas, Container Rooms, Shutter Service & Heavy Steel.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200/80 flex items-start gap-3 hover:border-orange-400 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-orange-500/30">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm font-royal">
                SERVICES LIST
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Office & Home Interiors, Gypsum Ceilings, Wooden Flooring, Modular Kitchen, Aluminium Glass & Signage.
              </p>
            </div>
          </div>
        </div>
    </div>
  );
}
