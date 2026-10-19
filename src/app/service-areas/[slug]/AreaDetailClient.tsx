'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { InquiryModal } from '@/components/InquiryModal';
import { ServiceAreaItem, serviceAreasList } from '@/lib/service-areas-data';
import { allServices } from '@/lib/services-data';
import {
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Hammer,
  Sparkles,
  HelpCircle,
  Building2,
  Navigation,
} from 'lucide-react';
import { getWhatsAppUrl, ADMIN_PHONE_NUMBER } from '@/lib/whatsapp';

interface Props {
  area: ServiceAreaItem;
}

export function AreaDetailClient({ area }: Props) {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | null>(null);

  // Find the popular services for this area
  const popularServices = allServices.filter((s) =>
    area.popularServiceSlugs.includes(s.slug)
  );

  // Other nearby 10 KM areas for internal linking
  const nearbyAreas = serviceAreasList
    .filter((a) => a.slug !== area.slug)
    .slice(0, 8);

  const whatsappMessage = `Hello Royalpro Industrial, I am looking for Industrial Factory Tin Shed / Interior Work in ${area.name}. Please arrange a free on-site survey.`;
  const whatsappUrl = getWhatsAppUrl(whatsappMessage, ADMIN_PHONE_NUMBER);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar onOpenInquiryModal={() => setIsInquiryOpen(true)} onScrollToServices={() => {}} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium flex-wrap">
          <Link href="/" className="hover:text-amber-700">Home</Link>
          <span>/</span>
          <Link href="/service-areas" className="hover:text-amber-700">Service Areas</Link>
          <span>/</span>
          <span className="text-amber-700 font-bold">{area.name}</span>
        </div>

        {/* Hero Section */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white border border-amber-500/30 shadow-xl relative overflow-hidden mb-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase font-royal tracking-wide shadow-sm">
                10 KM Hub: {area.zone}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-amber-400/30">
                Response: {area.responseTime}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                PIN: {area.pin}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-royal tracking-tight text-white leading-tight">
              Industrial Tin Shed & Interior Solution in {area.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {area.description}
            </p>

            {/* Address Verification Badge */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2.5 text-xs text-amber-200">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-royal">Base Workshop & Plant:</strong>
                <span>Chipiyana, Tigri Gol Chakkar, Yusufpur, Nai Basti Dundahera, Ghaziabad 201009 ({area.distanceKm} away)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`tel:${ADMIN_PHONE_NUMBER}`}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black text-xs sm:text-sm font-royal uppercase tracking-wider shadow-lg active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 animate-pulse" />
                <span>Call {ADMIN_PHONE_NUMBER}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm font-royal uppercase tracking-wider shadow-lg active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp on {ADMIN_PHONE_NUMBER}</span>
              </a>

              <button
                onClick={() => {
                  setSelectedServiceTitle(`Site Survey in ${area.name}`);
                  setIsInquiryOpen(true);
                }}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black text-xs sm:text-sm font-royal uppercase tracking-wider active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Book Free Site Survey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Highlights & Landmark Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Key Advantages (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 font-royal">
                Why Choose Royalpro in {area.name}?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {area.keyHighlights.map((highlight, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/60 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800 leading-snug">{highlight}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Engineer on-site in <strong>{area.responseTime}</strong></span>
              </span>
              <span className="font-bold text-amber-700">Distance: {area.distanceKm}</span>
            </div>
          </div>

          {/* Landmarks in this Area (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Navigation className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-black text-slate-900 font-royal">
                Covered Landmarks in {area.name}
              </h3>
            </div>

            <p className="text-xs text-slate-500">
              We provide prompt site visits, structural delivery, and on-site welding across all major junctions:
            </p>

            <div className="space-y-2 pt-1">
              {area.landmarks.map((lm, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs font-bold text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span>{lm}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Services in this Area */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider font-royal">
                Recommended Works
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-royal mt-1">
                Popular Services Executed in {area.name}
              </h2>
            </div>
            <Link
              href="/services"
              className="text-xs font-bold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1 group"
            >
              <span>View All 32 Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularServices.map((service) => (
              <div
                key={service.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      service.division === 'welding_industrial'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-indigo-100 text-indigo-900'
                    }`}>
                      {service.division === 'welding_industrial' ? 'Welding Work' : 'Interior Solution'}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 font-semibold">
                      #{service.number}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 font-royal group-hover:text-amber-700 transition-colors">
                    {service.title} in {area.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-bold text-amber-700 hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => {
                      setSelectedServiceTitle(`${service.title} in ${area.name}`);
                      setIsInquiryOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs Section */}
        {area.faqs.length > 0 && (
          <section className="mb-12 p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-royal">
                Frequently Asked Questions ({area.name})
              </h2>
            </div>

            <div className="space-y-4">
              {area.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h3 className="font-bold text-sm text-slate-900 font-royal">
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

        {/* Internal Linking: Other Nearby 10 KM Radius Areas */}
        <section className="p-6 sm:p-8 rounded-3xl bg-amber-50/60 border border-amber-200/80">
          <div className="flex items-center gap-2 mb-4">
            <Navigation className="w-4 h-4 text-amber-700" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-950 font-royal">
              Other 10 KM Fast Dispatch Localities
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {nearbyAreas.map((nearby) => (
              <Link
                key={nearby.slug}
                href={`/service-areas/${nearby.slug}`}
                className="p-3 rounded-xl bg-white border border-amber-200 hover:border-amber-400 hover:shadow-xs transition-all text-xs font-bold text-slate-800 hover:text-amber-800 block truncate"
              >
                • {nearby.name}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        preSelectedService={null}
      />
    </div>
  );
}
