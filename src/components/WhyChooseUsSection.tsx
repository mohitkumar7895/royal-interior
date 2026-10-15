'use client';

import React from 'react';
import {
  ShieldCheck,
  Sparkles,
  Clock,
  PhoneCall,
  CheckCircle2,
  HardHat,
  ChevronRight,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface WhyChooseUsSectionProps {
  onOpenInquiry?: () => void;
}

export function WhyChooseUsSection({ onOpenInquiry }: WhyChooseUsSectionProps) {
  const reasons = [
    {
      id: 1,
      icon: ShieldCheck,
      badge: 'Tata & Jindal Steel',
      title: 'Heavy Structural Steel & Shed Engineering',
      desc: 'Specialized in high wind-load certified industrial factory tin sheds, cold storage facilities, warehouse PEB, and sports stadiums using authentic test-certified Tata and Jindal IS 2062 structural steel.',
      highlight: 'Wind Load & Seismic Tested',
    },
    {
      id: 2,
      icon: Sparkles,
      badge: 'Turnkey Architecture',
      title: 'Commercial Showrooms & Luxury Interiors',
      desc: 'End-to-end interior execution from acoustic gypsum false ceilings, German hydraulic modular kitchens, and wooden flooring to toughened glass office cabins and ACP elevation works.',
      highlight: 'German Hardware & Precision Joinery',
    },
    {
      id: 3,
      icon: Clock,
      badge: 'Guaranteed Timelines',
      title: 'On-Time Handover & Free On-Site Survey',
      desc: 'Strict milestone execution with fast erection in 30–45 days. Direct helpline access on 9557323216 with senior structural engineers visiting your site for free measurements and transparent estimates.',
      highlight: 'Direct Helpline: 9557323216',
    },
  ];

  return (
    <section className="relative w-full rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-amber-50/20 to-white border border-slate-200/90 p-4 sm:p-8 lg:p-10 shadow-xs overflow-hidden">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 max-w-3xl mx-auto text-center mb-6 sm:mb-10">
        <ScrollReveal direction="up" delayMs={50}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-[11px] font-black uppercase tracking-wider font-royal mb-2.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>Why Choose Royalpro</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight font-royal">
            Heavy Engineering Precision •{' '}
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
              Turnkey Interior Excellence
            </span>
          </h2>

          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Discover why industrial plant owners, logistics companies, commercial developers, and luxury homeowners across Delhi NCR and North India trust <strong>Royalpro</strong> for robust heavy steel structures and turnkey interior execution.
          </p>
        </ScrollReveal>
      </div>

      {/* Exactly 3 Key Advantage Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
        {reasons.map((item, index) => {
          const Icon = item.icon;
          return (
            <ScrollReveal key={item.id} direction="up" delayMs={80 + index * 70}>
              <div className="h-full rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 p-4 sm:p-6 shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col justify-between">
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-sm shadow-amber-500/25 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-[10px] uppercase tracking-wider group-hover:bg-amber-100 group-hover:text-amber-900 transition-colors">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-sm sm:text-base font-black text-slate-900 font-royal leading-snug group-hover:text-amber-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Highlight Tag */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-amber-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item.highlight}</span>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Bottom CTA Strip */}
      <div className="relative z-10 mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-300/60">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="hidden sm:flex w-10 h-10 rounded-full bg-amber-500 text-slate-950 items-center justify-center font-bold shrink-0">
            <PhoneCall className="w-5 h-5 text-slate-950 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm font-royal">
              Need on-site measurement or engineering consultation?
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-600">
              Speak directly with our senior structural fabrication & interior architect team.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {onOpenInquiry && (
            <button
              onClick={onOpenInquiry}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black text-xs shadow-md shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer font-royal"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Book Free Site Inspection</span>
            </button>
          )}

          <a
            href="tel:9557323216"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-mono font-bold text-xs shadow-2xs hover:border-amber-400 active:scale-95 transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
            <span>9557323216</span>
          </a>
        </div>
      </div>
    </section>
  );
}
