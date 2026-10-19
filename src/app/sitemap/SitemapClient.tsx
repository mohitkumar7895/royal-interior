'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { InquiryModal } from '@/components/InquiryModal';
import { weldingServices, interiorServices } from '@/lib/services-data';
import { serviceAreasList } from '@/lib/service-areas-data';
import {
  Hammer,
  Sparkles,
  Phone,
  MapPin,
  ArrowRight,
  Building,
  Navigation,
  Clock,
  ShieldCheck,
  Search,
} from 'lucide-react';

export function SitemapClient() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [areaSearch, setAreaSearch] = useState('');
  const [activeZoneFilter, setActiveZoneFilter] = useState<'all' | 'immediate' | 'noida_ext' | 'noida' | 'ghaziabad'>('all');

  const filteredAreas = serviceAreasList.filter((area) => {
    const matchesSearch =
      area.name.toLowerCase().includes(areaSearch.toLowerCase()) ||
      (area.hindiName && area.hindiName.includes(areaSearch)) ||
      area.landmarks.some((lm) => lm.toLowerCase().includes(areaSearch.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeZoneFilter === 'all') return true;
    if (activeZoneFilter === 'immediate') return area.zone.includes('Immediate');
    if (activeZoneFilter === 'noida_ext') return area.zone.includes('Greater Noida') || area.zone.includes('Commercial & IT') || area.zone.includes('Institutional');
    if (activeZoneFilter === 'noida') return area.zone.includes('Noida');
    if (activeZoneFilter === 'ghaziabad') return area.zone.includes('Ghaziabad') || area.zone.includes('Industrial Belt') || area.zone.includes('Heavy Industrial');
    return true;
  });

  const trendingCombinations = [
    { serviceSlug: 'industrial-factory-tin-shed', areaSlug: 'chipiyana-buzurg-ghaziabad', title: 'Factory Tin Shed in Chipiyana (Plant Base)' },
    { serviceSlug: 'shop-shutter-service', areaSlug: 'tigri-gol-chakkar', title: 'Shop Shutter Service at Tigri Gol Chakkar' },
    { serviceSlug: 'home-interior-work', areaSlug: 'gaur-city-1', title: 'Turnkey Flat Interior in Gaur City 1' },
    { serviceSlug: 'industrial-factory-tin-shed', areaSlug: 'noida-sector-63', title: 'Industrial Factory Shed in Noida Sector 63' },
    { serviceSlug: 'terrace-pergola-work', areaSlug: 'crossings-republik', title: 'Balcony Pergola in Crossings Republik' },
    { serviceSlug: 'modular-kitchen', areaSlug: 'indirapuram-ghaziabad', title: 'Modular Kitchen in Indirapuram Ghaziabad' },
    { serviceSlug: 'shop-platform', areaSlug: 'char-murti-kisan-chowk', title: 'Shop Mezzanine Platform at Char Murti' },
    { serviceSlug: 'metal-fabrication-work', areaSlug: 'loha-mandi-ghaziabad', title: 'Structural Steel Shed in Loha Mandi Ghaziabad' },
    { serviceSlug: 'home-interior-work', areaSlug: 'siddhartha-vihar-ghaziabad', title: 'Flat Interior in Siddhartha Vihar (Apex Kremlin)' },
    { serviceSlug: 'industrial-factory-tin-shed', areaSlug: 'bulandshahr-road-industrial-area', title: 'Heavy PEB Shed in Bulandshahr Road' },
    { serviceSlug: 'shop-shutter-service', areaSlug: 'ek-murti-greater-noida-west', title: 'Motorized Shop Shutter at Ek Murti' },
    { serviceSlug: 'terrace-pergola-work', areaSlug: 'vasundhara-ghaziabad', title: 'Terrace Pergola in Vasundhara Sectors 1-19' },
  ];

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

        {/* SECTION 3: 56 DEDICATED 10 KM LOCAL SERVICE AREA HUBS (INDEXED IN GOOGLE) */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-600 text-white shadow-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-royal text-slate-900 tracking-tight">
                  10 KM Local Service Area Landing Pages ({serviceAreasList.length} Dedicated City & Sector Hubs)
                </h2>
                <p className="text-xs text-slate-500">
                  Every locality has a dedicated Google-indexed landing page with rapid 10-25 min engineer dispatch from Chipiyana Tigri workshop.
                </p>
              </div>
            </div>

            {/* Area Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search area (e.g. Chipiyana, Gaur City, Sec 63)..."
                value={areaSearch}
                onChange={(e) => setAreaSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Zone Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 text-xs font-bold font-royal">
            <button
              type="button"
              onClick={() => setActiveZoneFilter('all')}
              className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                activeZoneFilter === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-400'
              }`}
            >
              All 56 Local Hubs
            </button>
            <button
              type="button"
              onClick={() => setActiveZoneFilter('immediate')}
              className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                activeZoneFilter === 'immediate'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-400'
              }`}
            >
              Immediate Base (0-3 KM)
            </button>
            <button
              type="button"
              onClick={() => setActiveZoneFilter('noida_ext')}
              className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                activeZoneFilter === 'noida_ext'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-400'
              }`}
            >
              Greater Noida West & Ext (2-6 KM)
            </button>
            <button
              type="button"
              onClick={() => setActiveZoneFilter('noida')}
              className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                activeZoneFilter === 'noida'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-400'
              }`}
            >
              Noida Industrial & Sectors (3-8 KM)
            </button>
            <button
              type="button"
              onClick={() => setActiveZoneFilter('ghaziabad')}
              className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                activeZoneFilter === 'ghaziabad'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-400'
              }`}
            >
              Ghaziabad Belts & Indirapuram (3-10 KM)
            </button>
          </div>

          {/* 56 Service Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold font-royal">
                      {area.distanceKm}
                    </span>
                    <span className="text-slate-500 font-mono font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>{area.responseTime}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-900 font-royal group-hover:text-amber-700 transition-colors">
                      {area.name}
                    </h3>
                    {area.hindiName && (
                      <span className="text-[11px] text-amber-800 font-medium">
                        {area.hindiName}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {area.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {area.landmarks.slice(0, 2).map((lm, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600">
                        {lm}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
                  <span>Open Local Area Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION 4: TRENDING LOCAL SERVICE COMBINATIONS (PROGRAMMATIC LANDING PAGES) */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-200">
            <div className="p-2 rounded-xl bg-orange-600 text-white shadow-sm">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-royal text-slate-900 tracking-tight">
                Trending High-Demand Local Service Landing Pages (Direct WhatsApp & Site Survey)
              </h2>
              <p className="text-xs text-slate-500">
                Direct landing URLs combining specific services with key micro-markets (factory sheds, shop rolling shutters, turnkey flat interiors, pergolas & kitchens).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {trendingCombinations.map((combo, idx) => (
              <Link
                key={idx}
                href={`/services/${combo.serviceSlug}/${combo.areaSlug}`}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-orange-400 hover:shadow-md transition-all group flex items-center justify-between"
              >
                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded bg-orange-50 text-[10px] font-bold text-orange-800 uppercase tracking-wide">
                    Fast Track Survey
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-orange-700 transition-colors font-royal">
                    {combo.title}
                  </h4>
                  <span className="text-[11px] text-slate-500 block">
                    Phone: 9557323216
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION 5: REGIONAL SECTOR COVERAGE SUMMARY */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-200">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-sm">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-royal text-slate-900 tracking-tight">
                Regional Hubs Summary (0 - 10 KM Base Coverage)
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
