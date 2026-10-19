'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TEN_KM_RADIUS_ZONES } from '@/lib/seo';
import {
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Sparkles,
  ArrowRight,
  Hammer,
} from 'lucide-react';
import { ADMIN_PHONE_NUMBER, getWhatsAppUrl } from '@/lib/whatsapp';

interface Local10KmSectionProps {
  onOpenInquiry: (serviceTitle?: string) => void;
}

export function Local10KmSection({ onOpenInquiry }: Local10KmSectionProps) {
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);

  const activeZone = TEN_KM_RADIUS_ZONES[activeZoneIndex];

  return (
    <section id="local-10km-hub" className="my-10 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-amber-500/30 shadow-xl relative overflow-hidden">
      {/* Background ambient decorative glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-800">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/40 mb-3">
            <Navigation className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>10 KM LOCAL FAST DISPATCH HUB • FREE ON-SITE INSPECTION</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-royal tracking-tight leading-tight text-white">
            Top Welding Work & Complete Interior Solutions Across{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
              10 KM Radius
            </span>
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Central Fabrication Facility & Workshop:{' '}
            <strong className="text-amber-300">
              Chipiyana, Tigri Gol Chakkar, Yusufpur, Nai Basti Dundahera, Ghaziabad (201009)
            </strong>
            . We guarantee same-day free on-site survey and urgent dispatch within 15 to 30 minutes across Gaur City, Noida Sec 62 & 63, Crossings Republik, Siddhartha Vihar and surrounding 10 km areas.
          </p>
        </div>

        {/* Direct Call / WhatsApp Quick Box */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
          <a
            href={`tel:${ADMIN_PHONE_NUMBER}`}
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs font-royal uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
          >
            <Phone className="w-4 h-4 text-slate-950" />
            <span>Direct Call: {ADMIN_PHONE_NUMBER}</span>
          </a>

          <a
            href={getWhatsAppUrl(
              'Hello Royalpro, I need a free site survey for Tin Shed / Interior Work within 10 km of Tigri Gol Chakkar / Chipiyana.',
              ADMIN_PHONE_NUMBER
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs font-royal uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp on {ADMIN_PHONE_NUMBER}</span>
          </a>
        </div>
      </div>

      {/* 4 Zone Switcher Tabs */}
      <div className="relative z-10 mt-8">
        <p className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-1.5 font-royal">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          Select 10 KM Service Quadrant:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {TEN_KM_RADIUS_ZONES.map((zone, idx) => (
            <button
              key={zone.zoneName}
              onClick={() => setActiveZoneIndex(idx)}
              className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer ${
                activeZoneIndex === idx
                  ? 'bg-amber-500/20 border-amber-400 text-white shadow-md shadow-amber-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1.5 ${
                activeZoneIndex === idx ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                Zone #{idx + 1}
              </span>
              <h4 className="text-xs font-bold text-white line-clamp-1">
                {zone.zoneName}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                {zone.areas.length} Verified Localities
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Active Zone Details Card */}
      <div className="relative z-10 mt-6 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-white font-royal flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              {activeZone.zoneName}
            </h3>
            <p className="text-xs text-amber-200/80 mt-0.5">
              {activeZone.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Response Time: <strong>Within 15-30 Mins</strong></span>
          </div>
        </div>

        {/* Localities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {activeZone.areas.map((area) => (
            <div
              key={area.name}
              className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-amber-400/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold text-amber-400 block mb-1 uppercase tracking-wider">
                  PIN: {area.pin}
                </span>
                <h5 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                  {area.name}
                </h5>
              </div>
              <span className="text-[10px] text-slate-400 mt-2 block">
                • {area.type}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Service Booking Strip for this 10 KM Zone */}
        <div className="pt-4 border-t border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> 100% Free Site Survey
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-bold text-amber-300">
              <Hammer className="w-4 h-4" /> Jindal & Tata Certified Steel
            </span>
            <span>•</span>
            <span>Master Fabricators On-Site</span>
          </div>

          <button
            onClick={() => onOpenInquiry(`10 KM Rapid Survey - ${activeZone.zoneName}`)}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black text-xs font-royal uppercase tracking-wider shadow-md shadow-amber-500/20 active:scale-95 transition-all inline-flex items-center justify-center gap-2"
          >
            <span>Book Site Survey in this Area</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
