'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { weldingServices, interiorServices } from '@/lib/services-data';
import { SITE_CONFIG } from '@/lib/seo';
import { InquiryModal } from '@/components/InquiryModal';
import { Building2, Wrench, Phone, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

export default function ServicesPage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'welding' | 'interior'>('all');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        onOpenInquiryModal={() => setIsInquiryOpen(true)}
        onScrollToServices={() => {}}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-amber-700">Home</Link>
          <span>/</span>
          <span className="text-amber-700 font-bold">Services Directory</span>
        </div>

        {/* Hero Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white relative overflow-hidden mb-10 shadow-xl border border-amber-500/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30 mb-4 font-royal">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Complete Portfolio of 32+ Turnkey Services
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-royal tracking-tight text-white leading-tight">
              Industrial Fabrication & Turnkey Interior Solutions
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              From heavy-duty factory tin sheds with zero middle pillars and commercial cold stores, to luxury turnkey corporate offices, retail showrooms, and modular kitchens.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <Phone className="w-4 h-4 text-slate-950" />
                <span>Call Engineer: {SITE_CONFIG.phone}</span>
              </a>

              <a
                href={`https://wa.me/91${SITE_CONFIG.phone}?text=Hello%20Royalpro,%20I%20am%20looking%20for%20service%20details`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={() => setIsInquiryOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
              >
                <span>Request Free Survey</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Services (32)
          </button>
          <button
            onClick={() => setActiveTab('welding')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'welding'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Welding & Shed Work (15)
          </button>
          <button
            onClick={() => setActiveTab('interior')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'interior'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Interior Solutions (17)
          </button>
        </div>

        {/* Division 1: Welding & Industrial Fabrication */}
        {(activeTab === 'all' || activeTab === 'welding') && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black font-royal text-slate-900">
                  Welding Work Services (15 Industrial Solutions)
                </h2>
                <p className="text-xs text-slate-600">
                  Heavy industrial PEB sheds, high-tensile trusses, cold storage, academies & commercial fabrication
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {weldingServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                        Service #{service.number}
                      </span>
                      {service.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold font-royal text-slate-900 group-hover:text-amber-700 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {service.tagline || service.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-black text-amber-800">
                      {service.startingRate}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Division 2: Turnkey Interior Solutions */}
        {(activeTab === 'all' || activeTab === 'interior') && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold shadow-md shadow-orange-600/20">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black font-royal text-slate-900">
                  Services List (17 Complete Interior Solutions)
                </h2>
                <p className="text-xs text-slate-600">
                  Corporate offices, residential villas, modular kitchens, gypsum ceilings, carpentry & facades
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interiorServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-orange-400 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold text-orange-700 uppercase tracking-wider bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200">
                        Service #{service.number}
                      </span>
                      {service.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500 text-white">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold font-royal text-slate-900 group-hover:text-orange-700 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {service.tagline || service.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-black text-orange-800">
                      {service.startingRate}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-700 group-hover:translate-x-1 transition-transform">
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <p>© 2026 {SITE_CONFIG.name}. Mobile: {SITE_CONFIG.phone}.</p>
      </footer>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
}
