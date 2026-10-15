'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { ShieldCheck, Phone, CheckCircle2, Award, Building2, Wrench, Users, ArrowRight, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar onOpenInquiryModal={() => {}} onScrollToServices={() => {}} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-amber-700">Home</Link>
          <span>/</span>
          <span className="text-amber-700 font-bold">About Us</span>
        </div>

        {/* Hero Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white relative overflow-hidden mb-12 shadow-xl border border-amber-500/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30 mb-4 font-royal">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Heavy Fabrication & Turnkey Interior Specialists
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-royal tracking-tight text-white leading-tight">
              ROYALPRO INDUSTRIAL FACTORY TIN SHED WORK & COMPLETE INTERIOR SOLUTION
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              We are North India’s leading integrated engineering and interior execution company. From massive clear-span industrial factory sheds and commercial cold stores to luxury residential interiors, acoustic auditoriums, and corporate workspaces.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="tel:9557323216"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <Phone className="w-4 h-4 text-slate-950" />
                <span>Call Engineer: 9557323216</span>
              </a>

              <a
                href="https://wa.me/919557323216?text=Hello%20Royalpro,%20I%20want%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2 Core Divisions Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Division 1 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold mb-5 shadow-sm shadow-amber-500/30">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold font-royal text-slate-900 mb-2">
              Welding Work Services (Heavy Industrial PEB)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Equipped with heavy submerged arc welding systems, automatic CNC plate shears, and crane girder fabrication lines. We build factory sheds with zero middle pillars up to 120 ft clear spans, certified for wind loads exceeding 150 km/h.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>High-Tensile Certified Structural Steel</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Tata BlueScope AZ-150 & Jindal Color-Coated Sheets</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cold storage, sports stadiums & container rooms</span>
              </li>
            </ul>
          </div>

          {/* Division 2 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-bold mb-5 shadow-sm shadow-orange-600/30">
              <Wrench className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold font-royal text-slate-900 mb-2">
              Services List (Turnkey Interior Solutions)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Our architectural interior division delivers end-to-end commercial offices, luxury retail stores, residential villas, and modern modular kitchens. Complete in-house carpentry, false ceiling, and acoustic paneling.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Boiling Waterproof (BWP 710) Marine Plywood</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Soundproof 12mm Toughened Glass & Gyproc Saint-Gobain Ceilings</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>3D CAD design consultation before physical on-site start</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <p>© 2026 Royalpro Industrial Factory Tin Shed Work & Complete Interior Solution. Mobile: 9557323216.</p>
      </footer>
    </div>
  );
}
