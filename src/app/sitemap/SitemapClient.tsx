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
      region: 'Immediate Hub (0-3 KM Radius: Chipiyana, Tigri & Dundahera)',
      description: 'Official fabrication plant & workshop location. Same-day 15-30 minute dispatch, emergency shutter repairs, and on-site measurements.',
      sectors: [
        'Chipiyana Buzurg & Tigri Gol Chakkar (Base Workshop)',
        'Yusufpur & Nai Basti Dundahera',
        'Crossings Republik (GH-7, Paramount, Ajnara, Panchsheel)',
        'Shahberi Commercial & Residential Area',
        'ABES Engineering College Road (NH-24 Corridor)',
        'Rahul Vihar, Sain Vihar & Vijay Nagar',
      ],
      recommendedService: '/services/industrial-factory-tin-shed',
      serviceLabel: 'Tin Sheds & Fabrication in Chipiyana / Tigri',
    },
    {
      region: 'Greater Noida West & Noida Extension (2-6 KM Radius)',
      description: 'High-speed delivery of factory sheds, balcony pergolas, modular kitchens, shop shutters, and retail store fitouts.',
      sectors: [
        'Gaur City 1 (Avenues 1, 2, 4, 5, 6, 7)',
        'Gaur City 2 (Avenues 10, 11, 12, 14, 16, Galaxy Plaza)',
        'Char Murti Chowk & Kisan Chowk High Street',
        'Ek Murti Chowk & Retail High Street Markets',
        'Noida Extension Sector 1, Sector 4, Sector 10, Sector 16B & 16C',
        'Haibatpur & Bisrakh Cluster',
      ],
      recommendedService: '/services/home-interior-work',
      serviceLabel: 'Interiors & Balcony Sheds in Gaur City',
    },
    {
      region: 'Noida Industrial Hubs (3-8 KM Radius: Sec 63, 62, 63A)',
      description: 'Direct access across NH-24 / Hindon bridge. Heavy industrial factory tin sheds, PEB warehouses, and corporate office interior execution.',
      sectors: [
        'Noida Sector 63 (Industrial Fabrication A-H Blocks)',
        'Noida Sector 62 (IT Parks, DLF Tech Park, Electronic City)',
        'Noida Sector 63A (New Industrial & Commercial Area)',
        'Noida Sector 64, Sector 65 & Sector 67 Machinery Plants',
        'Chhajarsi & Bahlolpur Heavy Fabrication Cluster',
        'Noida Sector 121, 122 & Expressway Apartments',
      ],
      recommendedService: '/services/industrial-factory-tin-shed',
      serviceLabel: 'Industrial Factory Sheds in Noida Sec 63',
    },
    {
      region: 'Ghaziabad Industrial Belts & Siddhartha Vihar (3-10 KM Radius)',
      description: 'Heavy structural PEB fabrication, cold stores, sports stadiums, residential balcony pergolas, and turnkey home interiors.',
      sectors: [
        'Siddhartha Vihar (Apex, Gaurs Siddhartham, Prateek Grand City)',
        'Pratap Vihar (Sector 11, Sector 12)',
        'Lal Kuan & Chhapraula Heavy Industrial Cluster',
        'Bulandshahr Road Industrial Area PEB Plants',
        'Kavi Nagar & Kavi Nagar Industrial Area',
        'South Side GT Road Industrial Area & Wave City',
      ],
      recommendedService: '/services/metal-fabrication-work',
      serviceLabel: 'Heavy Fabrication & Sheds in Ghaziabad',
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
