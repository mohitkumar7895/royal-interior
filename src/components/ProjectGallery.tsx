'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Project, ServiceDivision } from '@/types';
import { formatSqFt } from '@/lib/utils';
import { Building2, MapPin, ArrowUpRight, Flame, Home } from 'lucide-react';
import { ScrollHeading, ScrollReveal } from './ScrollReveal';

interface ProjectGalleryProps {
  projects: Project[];
  onOpenInquiryForProject: (serviceTitle: string, division: ServiceDivision) => void;
}

export function ProjectGallery({ projects, onOpenInquiryForProject }: ProjectGalleryProps) {
  const [filter, setFilter] = useState<'all' | ServiceDivision>('all');

  const filtered =
    filter === 'all' ? projects : projects.filter((p) => p.division === filter);

  return (
    <section className="my-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <ScrollHeading
          badge={
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              Execution Track Record
            </div>
          }
          title={
            <span className="text-2xl sm:text-3xl">
              Completed Sheds & Interior Projects
            </span>
          }
          subtitle="Real delivered projects across manufacturing hubs, sports academies, and corporate offices."
        />

        {/* Filter buttons */}
        <ScrollReveal direction="left">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              All Work
            </button>
            <button
              onClick={() => setFilter('welding_industrial')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                filter === 'welding_industrial'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              Welding & Sheds
            </button>
            <button
              onClick={() => setFilter('interior_solution')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                filter === 'interior_solution'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              Interior Solutions
            </button>
          </div>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj, idx) => (
          <ScrollReveal
            key={proj.id}
            direction="up"
            delayMs={idx * 130}
            className="h-full"
          >
            <div className="h-full p-6 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
              <div>
                {/* Image Preview if available */}
                {proj.imageUrl && (
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 bg-slate-100 shadow-inner">
                    <Image
                      src={proj.imageUrl}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Completed Project
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      proj.division === 'welding_industrial'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-orange-50 text-orange-700 border-orange-200'
                    }`}
                  >
                    {proj.division === 'welding_industrial' ? 'Welding Work' : 'Interior Solution'}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span className="truncate max-w-[140px]">{proj.location}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1">{proj.title}</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Client: <strong className="text-slate-700">{proj.clientName}</strong>
                </p>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs mb-4">
                  <span className="text-slate-500 block text-[10px] font-semibold uppercase mb-1">
                    Key Specifications
                  </span>
                  <span className="text-slate-700 text-xs leading-relaxed">
                    {proj.specDetails}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onOpenInquiryForProject(proj.title, proj.division)}
                className="mt-2 w-full py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-200 hover:border-slate-300 cursor-pointer"
              >
                Consult for Similar Work <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
