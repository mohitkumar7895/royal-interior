'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { weldingServices, interiorServices } from '@/lib/services-data';
import { ServiceItem } from '@/types';
import { InquiryModal } from '@/components/InquiryModal';
import {
  Phone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Hammer,
  ChevronRight,
  Maximize2,
} from 'lucide-react';

interface Props {
  service: ServiceItem;
}

export function ServiceDetailClient({ service }: Props) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const isWelding = service.division === 'welding_industrial';
  const allServices = [...weldingServices, ...interiorServices];

  // 4 Curated HD Images specifically selected for this service
  const galleryImages: { src: string; caption: string }[] = isWelding
    ? [
        {
          src: service.imageUrl || '/images/factory_tin_shed.jpg',
          caption: `${service.title} - Primary Structural Erection`,
        },
        {
          src: '/images/factory_tin_shed.jpg',
          caption: 'High-Tensile Steel Trusses & Heavy Galvalume Sheet Roofing',
        },
        {
          src: '/images/cold_storage_himalaya.jpg',
          caption: 'Clear Span Column Framing & Thermal PUF Panel Enclosure',
        },
        {
          src: '/images/sport_academy_structure.jpg',
          caption: 'Completed Industrial Facility with Anti-Rust Epoxy Finish',
        },
      ]
    : [
        {
          src: service.imageUrl || '/images/luxury_interior_work.jpg',
          caption: `${service.title} - Architectural Turnkey Concept`,
        },
        {
          src: '/images/office_interior_work.jpg',
          caption: 'Acoustic Partitions, Glass Cabins & Lighting Architecture',
        },
        {
          src: '/images/modular_kitchen_interior.jpg',
          caption: 'Boiling Waterproof Century Plywood & Premium Finish',
        },
        {
          src: '/images/electronics_showroom.jpg',
          caption: 'Bespoke Display Fixtures, Wall Paneling & Ambient Glow',
        },
      ];

  const relatedServices = allServices
    .filter((s) => s.division === service.division && s.id !== service.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar onOpenInquiryModal={() => setIsInquiryOpen(true)} onScrollToServices={() => {}} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-amber-700">Home</Link>
          <span>/</span>
          <span className="text-slate-600 font-royal">
            {isWelding ? 'Welding Work Services' : 'Services List'}
          </span>
          <span>/</span>
          <span className="text-amber-700 font-bold truncate max-w-xs">{service.title}</span>
        </div>

        {/* Top Header Card */}
        <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-royal tracking-wider uppercase border bg-amber-50 text-amber-800 border-amber-200">
              {isWelding ? <Hammer className="w-3.5 h-3.5 text-amber-600" /> : <Sparkles className="w-3.5 h-3.5 text-orange-500" />}
              <span>{isWelding ? 'WELDING WORK SERVICES' : 'SERVICES LIST'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black font-royal text-slate-900 tracking-tight">
              {service.title}
            </h1>

            <p className="text-xs sm:text-sm font-semibold text-amber-700">
              {service.tagline}
            </p>
          </div>

          {/* Quick Connect Actions (Call & WhatsApp) */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:9557323216"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-xs transition-all"
            >
              <Phone className="w-4 h-4 text-slate-950" />
              <span>Call: 9557323216</span>
            </a>

            <a
              href={`https://wa.me/919557323216?text=Hello%20Royalpro,%20I%20am%20interested%20in%20${encodeURIComponent(service.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all"
            >
              <span>WhatsApp Chat</span>
            </a>

            <button
              onClick={() => setIsInquiryOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Book Site Survey</span>
            </button>
          </div>
        </div>

        {/* 4 HD Images Showcase Gallery */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm sm:text-base font-bold font-royal text-slate-900 flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-amber-600" />
              HD Project Execution Gallery (4 Visuals)
            </h2>
            <span className="text-[11px] text-slate-500">Click any visual below to view</span>
          </div>

          {/* Large Hero Active Image */}
          <div className="relative w-full h-72 sm:h-96 lg:h-[480px] rounded-3xl overflow-hidden bg-slate-900 shadow-lg border border-slate-200 mb-4 group">
            <img
              src={galleryImages[activeImageIndex].src}
              alt={galleryImages[activeImageIndex].caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              onError={(e) => {
                (e.target as HTMLImageElement).src = isWelding
                  ? '/images/factory_tin_shed.jpg'
                  : '/images/luxury_interior_work.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block font-royal">
                  Visual {activeImageIndex + 1} of 4 • Royalpro Certified Execution
                </span>
                <span className="text-sm sm:text-base font-bold font-royal">
                  {galleryImages[activeImageIndex].caption}
                </span>
              </div>
            </div>
          </div>

          {/* 4 Thumbnails Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative h-24 sm:h-28 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer group text-left ${
                  activeImageIndex === idx
                    ? 'border-amber-500 shadow-md ring-2 ring-amber-500/30'
                    : 'border-slate-200 hover:border-amber-400 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-1 left-1 right-1 bg-slate-950/70 backdrop-blur-xs text-white text-[9px] font-semibold px-1.5 py-0.5 rounded truncate">
                  Visual {idx + 1}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Description & Technical Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Full Scope & Features */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold font-royal text-slate-900 mb-3">
                Comprehensive Technical Overview
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {service.description}
              </p>

              {/* Key Features List */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Core Structural & Material Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Scope of Work Card */}
            <div className="p-6 rounded-3xl bg-amber-50/60 border border-amber-200/80">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 font-royal">
                Turnkey Execution & Delivery Process
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                From initial site measurement, architectural 2D/3D structural drafting, foundation bolt marking, fabrication in our heavy plant, to final crane erection and handover. Free engineering survey available anywhere in North India.
              </p>
            </div>
          </div>

          {/* Right Column: Direct Help & Free Survey Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg border border-amber-500/30">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider font-royal block mb-1">
                Direct Engineering Helpline
              </span>
              <h3 className="text-xl font-bold font-royal mb-2">
                Need Fast Consultation?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Talk directly with our lead structural engineer or interior designer for instant feasibility assessment.
              </p>

              <div className="space-y-3">
                <a
                  href="tel:9557323216"
                  className="w-full py-3 px-4 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Phone className="w-4 h-4 text-slate-950" />
                  <span>Call 9557323216</span>
                </a>

                <a
                  href={`https://wa.me/919557323216?text=Hello%20Royalpro,%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(service.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  onClick={() => setIsInquiryOpen(true)}
                  className="w-full py-3 px-4 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Book Free On-Site Survey</span>
                </button>
              </div>
            </div>

            {/* Quality Standard Badges */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Certified High-Tensile Structural Steel</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Tata BlueScope AZ-150 Certified Roofing</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Premium Marine BWP Plywood & Hafele Hardware</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Services in the Same Division */}
        <div className="my-14">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold font-royal text-slate-900">
              Related {isWelding ? 'Welding Work' : 'Interior Solution'} Services
            </h3>
            <Link href="/" className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1">
              <span>View All Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <Link
                key={rel.id}
                href={`/services/${rel.slug}`}
                className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-3 bg-slate-100">
                    <img
                      src={rel.imageUrl || (isWelding ? '/images/factory_tin_shed.jpg' : '/images/luxury_interior_work.jpg')}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors font-royal">
                    {rel.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {rel.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-amber-700 font-bold">
                  <span>Explore Details</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        preSelectedService={service}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <p>© 2026 Royalpro Industrial Factory Tin Shed Work & Complete Interior Solution. Mobile: 9557323216.</p>
      </footer>
    </div>
  );
}
