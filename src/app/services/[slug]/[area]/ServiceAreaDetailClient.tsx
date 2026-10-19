'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { InquiryModal } from '@/components/InquiryModal';
import { ServiceItem } from '@/types';
import { ServiceAreaItem } from '@/lib/service-areas-data';
import {
  MapPin,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Hammer,
  Sparkles,
  Award,
  HelpCircle,
  Building2,
  Navigation,
} from 'lucide-react';
import { getWhatsAppUrl, ADMIN_PHONE_NUMBER } from '@/lib/whatsapp';

interface Props {
  service: ServiceItem;
  area: ServiceAreaItem;
}

export function ServiceAreaDetailClient({ service, area }: Props) {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const isWelding = service.division === 'welding_industrial';

  const customWhatsappMsg = `Hello Royalpro Industrial, I am looking for ${service.title} in ${area.name}. Please provide quotation & free site survey. My location: ${area.landmarks[0] || area.name}.`;
  const whatsappUrl = getWhatsAppUrl(customWhatsappMsg, ADMIN_PHONE_NUMBER);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar onOpenInquiryModal={() => setIsInquiryOpen(true)} onScrollToServices={() => {}} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium flex-wrap">
          <Link href="/" className="hover:text-amber-700">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-amber-700">Services</Link>
          <span>/</span>
          <Link href={`/services/${service.slug}`} className="hover:text-amber-700">{service.title}</Link>
          <span>/</span>
          <span className="text-amber-700 font-bold">{area.name}</span>
        </nav>

        {/* Hero Banner */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white border border-amber-500/30 shadow-xl relative overflow-hidden mb-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase font-royal tracking-wide shadow-sm flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{area.name} Local Hub</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-amber-400/30 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Survey Arrival: {area.responseTime}</span>
              </span>
              {service.startingRate && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 font-mono">
                  From {service.startingRate}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-royal tracking-tight text-white leading-tight">
              {service.title} in {area.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Premium {service.title.toLowerCase()} service tailored for residential, commercial, and industrial sites across {area.name} and surrounding landmarks ({area.landmarks.slice(0, 3).join(', ')}). Backed by certified high-tensile materials, 15-year structural warranties, and on-site engineering supervision.
            </p>

            {/* Base Workshop Dispatch Info */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2.5 text-xs text-amber-200">
              <Navigation className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-royal">Direct Plant Dispatch to {area.name}:</strong>
                <span>Workshop base at Chipiyana, Tigri Gol Chakkar (PIN 201009). Distance: {area.distanceKm}. Free on-site survey engineer dispatched immediately.</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="tel:9557323216"
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black text-xs sm:text-sm font-royal uppercase tracking-wider shadow-lg active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 animate-pulse" />
                <span>Call Engineer: 9557323216</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm font-royal uppercase tracking-wider shadow-lg active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <span>WhatsApp Instant Inquiry</span>
              </a>

              <button
                type="button"
                onClick={() => setIsInquiryOpen(true)}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs sm:text-sm font-royal uppercase tracking-wider transition-all inline-flex items-center gap-2"
              >
                <span>Book Free Site Visit</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service & Locality Highlights */}
            <section className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${isWelding ? 'bg-amber-500' : 'bg-orange-500'} text-white shadow-sm`}>
                  {isWelding ? <Hammer className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black font-royal text-slate-900">
                    Why Choose Royalpro for {service.title} in {area.name}?
                  </h2>
                  <p className="text-xs text-slate-500">
                    Direct manufacturer pricing, zero contractor markup, and local 10-25 minute response time.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-slate-800 leading-relaxed">{feat}</span>
                  </div>
                ))}

                {area.keyHighlights.slice(0, 2).map((highlight, idx) => (
                  <div key={`area-${idx}`} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-amber-900 leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Technical Specifications Table */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                <h3 className="font-bold font-royal text-sm text-amber-400 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Technical Specifications & Material Assurance</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Raw Materials Used:</span>
                    <strong className="text-white font-mono">{service.specs.materials}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Structural Warranty:</span>
                    <strong className="text-amber-300 font-mono">{service.specs.warranty}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Finish & Quality Grade:</span>
                    <strong className="text-white font-mono">{service.specs.finishOrGrade}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Scope of Work:</span>
                    <strong className="text-white font-mono">{service.specs.workScope}</strong>
                  </div>
                </div>
              </div>
            </section>

            {/* Local Landmarks & Coverage */}
            <section className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-black font-royal text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-600" />
                <span>High-Demand Sectors & Landmarks Served in {area.name}</span>
              </h2>
              <p className="text-xs text-slate-600">
                Our site engineers have completed projects across every major residential society, industrial block, and commercial high street in {area.name}:
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {area.landmarks.map((lm, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-800 text-xs font-medium border border-slate-200 transition-colors"
                  >
                    {lm}
                  </span>
                ))}
              </div>
            </section>

            {/* Area FAQs */}
            {area.faqs && area.faqs.length > 0 && (
              <section className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-5 h-5 text-amber-600" />
                  <h2 className="text-lg sm:text-xl font-black font-royal text-slate-900">
                    Frequently Asked Questions in {area.name}
                  </h2>
                </div>

                <div className="space-y-3">
                  {area.faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 font-royal">
                        {faq.q}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Instant Booking Card & Navigation */}
          <div className="space-y-6">
            {/* Quick Contact & Dispatch Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg space-y-4">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider">
                Local Fast Track
              </span>

              <h3 className="text-xl font-black font-royal leading-tight">
                Get Instant Quote for {service.title} in {area.name}
              </h3>

              <p className="text-xs text-white/90 leading-relaxed">
                Site visits are 100% free with zero obligation. Our engineer visits your site in {area.name} ({area.responseTime}), takes measurements, and delivers a transparent itemized quotation.
              </p>

              <div className="space-y-2 pt-2">
                <a
                  href="tel:9557323216"
                  className="w-full py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs font-royal uppercase tracking-wider shadow-md text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call 9557323216 Now</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-2xl bg-white hover:bg-amber-50 text-slate-900 font-black text-xs font-royal uppercase tracking-wider shadow-md text-center flex items-center justify-center gap-2"
                >
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsInquiryOpen(true)}
                  className="w-full py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs font-royal uppercase tracking-wider text-center"
                >
                  Submit Inquiry Form
                </button>
              </div>
            </div>

            {/* Back to Area Hub */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h4 className="font-black font-royal text-sm text-slate-900">
                Explore All Services in {area.name}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                View full local hub details, other popular welding & interior offerings, and area map for {area.name}.
              </p>
              <Link
                href={`/service-areas/${area.slug}`}
                className="text-xs font-bold text-amber-700 hover:underline inline-flex items-center gap-1.5"
              >
                <span>Visit {area.name} Landing Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Parent Service Page */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h4 className="font-black font-royal text-sm text-slate-900">
                Main {service.title} Page
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                View complete service photo gallery, architectural drawings, and full technical specifications.
              </p>
              <Link
                href={`/services/${service.slug}`}
                className="text-xs font-bold text-amber-700 hover:underline inline-flex items-center gap-1.5"
              >
                <span>View Full {service.title} Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        preSelectedService={service}
      />
    </div>
  );
}
