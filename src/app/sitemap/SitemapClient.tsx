'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { InquiryModal } from '@/components/InquiryModal';
import { weldingServices, interiorServices } from '@/lib/services-data';
import {
  Hammer,
  Sparkles,
  Phone,
  MapPin,
  ArrowRight,
  Building,
} from 'lucide-react';

export function SitemapClient() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const localHubs = [
    {
      region: 'Noida (All Industrial & Residential Sectors)',
      description: 'Factory tin sheds, heavy structural PEB welding, corporate office interiors, and modular fitouts.',
      sectors: [
        'Sector 62 (Electronic City & IT Parks)',
        'Sector 63 (Industrial Area Hub)',
        'Sector 18 (Commercial Market & Atta)',
        'Sector 150 & Sector 137 (Expressway Luxury Residential)',
        'Sector 50, Sector 75, Sector 76',
        'Sector 142 & Advant Navis Corridor',
      ],
      recommendedService: '/services/industrial-factory-tin-shed',
      serviceLabel: 'Industrial Factory Tin Sheds in Noida',
    },
    {
      region: 'Gaur City & Greater Noida West (Noida Extension)',
      description: 'Residential modular kitchens, gypsum false ceilings, balcony pergolas, shop shutter fabrication, and commercial store fitouts.',
      sectors: [
        'Gaur City 1 (All Avenues & High Streets)',
        'Gaur City 2 (14th Avenue, 16th Avenue, Galaxy Plaza)',
        'Char Murti Chowk & Kisan Chowk Corridor',
        'Techzone 4 & Knowledge Park 5',
        'Pari Chowk & Surajpur Industrial Area',
        'Greater Noida Phase 2 Heavy Industrial Belt',
      ],
      recommendedService: '/services/home-interior-work',
      serviceLabel: 'Home & Commercial Interiors in Gaur City',
    },
    {
      region: 'Gurugram / Gurgaon & Manesar IMT',
      description: 'Heavy duty clear-span warehouse sheds, cold storage framing, sports arena enclosures, and luxury corporate interiors.',
      sectors: [
        'Udyog Vihar Phase 1 to Phase 5',
        'Manesar Industrial Model Township (IMT)',
        'DLF Cyber City & Golf Course Road',
        'Sohna Road Commercial & Industrial Corridor',
        'Sector 29, Sector 14, Sector 44',
      ],
      recommendedService: '/services/cold-store-structure-work',
      serviceLabel: 'Cold Storage & PEB Sheds in Gurugram',
    },
    {
      region: 'Ghaziabad, Chipiyana & Delhi NCR',
      description: 'Headquarters and fabrication workshop hub offering same-day survey, emergency shutter repairs, and full structural metal works.',
      sectors: [
        'Chipiyana Buzurg & Tigri Gol Chakkar',
        'Crossing Republik & Nai Basti Dundahera',
        'Sahibabad Industrial Area Site 4',
        'Mohan Nagar & Kavi Nagar Industrial Area',
        'Loni Industrial Belt & Raj Nagar Extension',
        'Delhi Okhla & Mayapuri Industrial Area',
      ],
      recommendedService: '/services/metal-fabrication-work',
      serviceLabel: 'Metal Fabrication & Sheds in Ghaziabad',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar onOpenInquiryModal={() => setIsInquiryOpen(true)} onScrollToServices={() => {}} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Hero */}
        <div className="mb-10 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white border border-amber-500/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold font-royal tracking-wide uppercase">
              <Building className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Service Sitemap & City Directory</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-royal tracking-tight text-white leading-tight">
              Royalpro Industrial Services & Regional Landing Hubs
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every service is engineered with high-tensile certified materials, backed by 15-year structural warranties, and executed by certified master fabricators. Instant on-site estimates available across Noida, Gaur City, Gurgaon, Ghaziabad, and Delhi NCR.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="tel:9557323216"
                className="px-5 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black text-xs sm:text-sm font-royal uppercase tracking-wider shadow-lg active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 animate-pulse" />
                <span>Call Engineer: 9557323216</span>
              </a>
              <a
                href={`https://wa.me/919557323216?text=${encodeURIComponent('Hello Royalpro Industrial, I am looking for service quotation & site survey.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm font-royal uppercase tracking-wider shadow-lg active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <span>WhatsApp 9557323216</span>
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 1: ALL WELDING WORK (15 SERVICES) */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-200">
            <div className="p-2 rounded-xl bg-amber-500 text-white shadow-sm">
              <Hammer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-royal text-slate-900 tracking-tight">
                All Welding Work Services ({weldingServices.length} Dedicated Service Pages)
              </h2>
              <p className="text-xs text-slate-500">
                Click any service below to open its dedicated landing page with technical specs, rates, and photo gallery.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weldingServices.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center font-mono">
                      #{service.number}
                    </span>
                    <span className="text-[11px] font-bold text-amber-700 font-mono">
                      {service.startingRate}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-slate-900 font-royal group-hover:text-amber-700 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
                  <span>View Landing Page & Rates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION 2: COMPLETE INTERIOR SOLUTIONS */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-200">
            <div className="p-2 rounded-xl bg-orange-500 text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-royal text-slate-900 tracking-tight">
                Complete Interior Solutions ({interiorServices.length} Dedicated Service Pages)
              </h2>
              <p className="text-xs text-slate-500">
                Turnkey commercial offices, retail shops, showrooms, and luxury residential home interiors.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {interiorServices.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-orange-400 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-900 font-bold text-xs flex items-center justify-center font-mono">
                      #{service.number}
                    </span>
                    <span className="text-[11px] font-bold text-orange-700 font-mono">
                      {service.startingRate}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-slate-900 font-royal group-hover:text-orange-700 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-orange-700 group-hover:translate-x-1 transition-transform">
                  <span>View Landing Page & Rates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION 3: REGIONAL & SECTOR COVERAGE */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-200">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-sm">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-royal text-slate-900 tracking-tight">
                Target Cities, Industrial Sectors & Coverage Directory
              </h2>
              <p className="text-xs text-slate-500">
                Direct on-site engineering team dispatch across all major industrial and residential zones.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localHubs.map((hub, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-amber-400 transition-all"
              >
                <div>
                  <h3 className="font-black text-base sm:text-lg text-slate-900 font-royal">
                    {hub.region}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {hub.description}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold text-amber-800 uppercase tracking-wide font-royal">
                    Active Sectors & High-Demand Locations:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {hub.sectors.map((sec, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/80"
                      >
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={hub.recommendedService}
                    className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
                  >
                    <span>{hub.serviceLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href="tel:9557323216"
                    className="px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold font-mono inline-flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-amber-600" />
                    <span>9557323216</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
}
