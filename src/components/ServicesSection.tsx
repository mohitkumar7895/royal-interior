'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ServiceItem, ServiceDivision } from '@/types';
import { Flame, Home, Phone, Search, Sparkles, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { ScrollHeading, ScrollReveal } from './ScrollReveal';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
  activeDivision?: ServiceDivision;
  onDivisionChange?: (division: ServiceDivision) => void;
}

export function ServicesSection({
  services,
  onSelectService,
  activeDivision: propDivision,
  onDivisionChange,
}: ServicesSectionProps) {
  const [internalDivision, setInternalDivision] = useState<ServiceDivision>('welding_industrial');
  const [showAll, setShowAll] = useState(false);
  const activeDivision = propDivision || internalDivision;

  const setActiveDivision = (div: ServiceDivision) => {
    setInternalDivision(div);
    setShowAll(false);
    if (onDivisionChange) onDivisionChange(div);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services
    .filter((s) => s.division === activeDivision)
    .filter((s) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      );
    });

  // Display only 3 services on home page as requested, with option to expand
  const displayedServices = showAll ? filteredServices : filteredServices.slice(0, 3);

  return (
    <section id="services-section" className="my-4 scroll-mt-24">
      {/* Scroll Animated Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
        <ScrollHeading
          badge={
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              Specialized Services & Turnkey Solutions
            </div>
          }
          title={
            <span className="text-2xl sm:text-4xl">
              Featured Services & Solutions
            </span>
          }
          subtitle={
            <span>
              Heavy-duty factory tin sheds & luxury turnkey interior works. For instant on-site inspection call{' '}
              <strong className="text-amber-700 font-mono">9557323216</strong>.
            </span>
          }
        />

        {/* Direct Call Bar */}
        <ScrollReveal direction="right">
          <a
            href="tel:9557323216"
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-all active:scale-95 hover:scale-105"
          >
            <Phone className="w-3.5 h-3.5 animate-pulse" />
            <span>Call 9557323216</span>
          </a>
        </ScrollReveal>
      </div>

      {/* Two Service Division Switcher Tabs (No Numbers on Tabs) */}
      <ScrollReveal direction="up" delayMs={100}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-white border border-slate-200 shadow-xs mb-6">
          <div className="flex rounded-full bg-slate-100 p-1 sm:p-1.5 gap-1 sm:gap-1.5 flex-1 max-w-xl">
            {/* Tab 1: WELDING WORK SERVICES */}
            <button
              onClick={() => setActiveDivision('welding_industrial')}
              className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-4 rounded-full text-[11px] sm:text-xs md:text-sm font-black tracking-wide transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer font-royal ${
                activeDivision === 'welding_industrial'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/25 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="uppercase truncate">WELDING WORK SERVICES</span>
            </button>

            {/* Tab 2: SERVICES LIST */}
            <button
              onClick={() => setActiveDivision('interior_solution')}
              className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-4 rounded-full text-[11px] sm:text-xs md:text-sm font-black tracking-wide transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer font-royal ${
                activeDivision === 'interior_solution'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/25 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="uppercase truncate">SERVICES LIST</span>
            </button>
          </div>

          {/* Live Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search service by name..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 font-medium transition-all focus:bg-white"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* Services Grid with Staggered Scroll Animation (Shows Exactly 3 Services by Default with HD Images, No Numbers) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedServices.map((service, idx) => (
          <ScrollReveal
            key={service.id}
            direction="up"
            delayMs={idx * 140}
            className="h-full"
          >
            <div className="h-full p-5 rounded-3xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div>
                {/* Clickable HD Image strictly matched to service name */}
                <Link href={`/services/${service.slug}`} className="block relative w-full h-52 rounded-2xl overflow-hidden mb-4 bg-slate-100 shadow-inner group/img cursor-pointer">
                  <img
                    src={
                      service.imageUrl ||
                      (service.division === 'interior_solution'
                        ? '/images/luxury_interior_work.jpg'
                        : '/images/factory_tin_shed.jpg')
                    }
                    alt={service.title}
                    className="w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        service.division === 'interior_solution'
                          ? '/images/luxury_interior_work.jpg'
                          : '/images/factory_tin_shed.jpg';
                    }}
                  />
                </Link>

                {/* Title & Tagline (No Numbers, No Rates) */}
                <Link href={`/services/${service.slug}`} className="block group/title">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover/title:text-amber-700 transition-colors font-royal">
                    {service.title}
                  </h3>
                </Link>
                <p className="text-[11px] font-semibold text-amber-700 mt-0.5">
                  {service.tagline}
                </p>

                {/* Concise Description */}
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                  {service.description}
                </p>
              </div>

              {/* Bottom Action Bar (No Rupee / SqFt) */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-amber-700 py-2 transition-colors cursor-pointer"
                >
                  <span>View Details</span>
                  <span className="text-amber-600 font-bold">&rarr;</span>
                </Link>

                <button
                  onClick={() => onSelectService(service)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer active:scale-95"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Enquire Now</span>
                </button>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Toggle Button to View More / Collapse to 3 */}
      {filteredServices.length > 3 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-slate-300 hover:border-amber-500 hover:bg-amber-50 text-slate-800 font-bold text-xs shadow-xs transition-all cursor-pointer font-royal"
          >
            {showAll ? (
              <>
                <span>Show Only Top 3</span>
                <ChevronUp className="w-4 h-4 text-amber-600" />
              </>
            ) : (
              <>
                <span>
                  View All {activeDivision === 'welding_industrial' ? 'Welding Work' : 'Interior'} Services
                </span>
                <ChevronDown className="w-4 h-4 text-amber-600" />
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
