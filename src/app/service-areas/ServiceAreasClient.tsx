'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { InquiryModal } from '@/components/InquiryModal';
import { weldingServices, interiorServices } from '@/lib/services-data';
import {
  MapPin,
  Phone,
  MessageSquare,
  Hammer,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Building2,
  Map,
} from 'lucide-react';

export function ServiceAreasClient() {
  const [selectedCity, setSelectedCity] = useState<'all' | 'noida' | 'gaur-city' | 'gurugram' | 'ghaziabad'>('all');
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const areaData = [
    {
      id: 'noida',
      cityKey: 'noida',
      cityName: 'Noida',
      badge: 'Major Industrial Hub',
      title: 'Industrial Factory Tin Sheds & Interior Work in Noida',
      description:
        'Full structural steel fabrication, factory tin shed erection, PEB warehouses, and turnkey corporate office interiors across all sectors of Noida. Engineered with Tata / Jindal high-tensile steel and certified welders.',
      leadTime: 'Same Day Free Site Survey (Within 2 Hours)',
      sectors: [
        { name: 'Noida Sector 62', tag: 'IT Parks & Institutional Buildings' },
        { name: 'Noida Sector 63', tag: 'Primary Industrial Fabrication Area' },
        { name: 'Noida Sector 18', tag: 'Commercial Markets & Showroom Fitouts' },
        { name: 'Noida Sector 150', tag: 'Luxury Residential & Villa Balcony Pergolas' },
        { name: 'Noida Sector 137', tag: 'High-Rise Apartment Modular Interiors' },
        { name: 'Noida Sector 50, 75, 76', tag: 'Residential Turnkey Interior Execution' },
        { name: 'Noida Sector 142', tag: 'Expressway Commercial Corporate Offices' },
        { name: 'Noida Sector 80, 81, 83', tag: 'Phase 2 Heavy Industrial Steel Plants' },
      ],
      popularServices: [
        { title: 'Industrial Factory Tin Shed', slug: 'industrial-factory-tin-shed' },
        { title: 'Office Interior Work', slug: 'office-interior-work' },
        { title: 'Shop Shutter Service', slug: 'shop-shutter-service' },
        { title: 'MS & SS Steel Railing', slug: 'ms-ss-steel-railing' },
        { title: 'Gypsum Partition & Ceiling', slug: 'gypsum-partition-ceiling-work' },
      ],
    },
    {
      id: 'gaur-city',
      cityKey: 'gaur-city',
      cityName: 'Gaur City & Greater Noida West',
      badge: 'High-Demand Commercial & Residential',
      title: 'Welding Fabrication, Tin Sheds & Modular Interiors in Gaur City',
      description:
        'Dedicated on-site fabrication and interior teams covering Gaur City 1, Gaur City 2, Char Murti, and Greater Noida West. Specializing in shop rolling shutters, retail store fitouts, balcony pergolas, modular kitchens, and warehouse PEB sheds.',
      leadTime: 'Fast On-Site Survey: Call 9557323216',
      sectors: [
        { name: 'Gaur City 1', tag: '1st, 2nd, 4th, 5th, 6th & 7th Avenue' },
        { name: 'Gaur City 2', tag: '10th, 11th, 12th, 14th & 16th Avenue' },
        { name: 'Char Murti Chowk', tag: 'Kisan Chowk Commercial High Streets' },
        { name: 'Galaxy Diamond Plaza', tag: 'Retail Shop & Commercial Fitouts' },
        { name: 'Techzone 4 & Knowledge Park 5', tag: 'Warehouse & IT Shed Structures' },
        { name: 'Pari Chowk & Surajpur', tag: 'Heavy Engineering & Industrial Fabrication' },
        { name: 'Ecotech Industrial Areas', tag: 'Heavy PEB Sheds & Cold Stores' },
      ],
      popularServices: [
        { title: 'Home Interior Work', slug: 'home-interior-work' },
        { title: 'Modular Kitchen Fabrication', slug: 'modular-kitchen' },
        { title: 'Terrace Pergola Work', slug: 'terrace-pergola-work' },
        { title: 'Shop Interior Work', slug: 'shop-interior-work' },
        { title: 'Metal Fabrication Work', slug: 'metal-fabrication-work' },
      ],
    },
    {
      id: 'gurugram',
      cityKey: 'gurugram',
      cityName: 'Gurugram (Gurgaon) & Manesar IMT',
      badge: 'Heavy PEB & Corporate Capital',
      title: 'Heavy PEB Factory Sheds, Cold Storages & Commercial Interiors in Gurgaon',
      description:
        'Specialists in clear-span column-free industrial factory sheds up to 120 ft clear span, large cold storage structures, sports academy enclosures, and turnkey corporate interiors in Gurgaon and Manesar.',
      leadTime: 'Priority Corporate & Industrial Site Inspection',
      sectors: [
        { name: 'Udyog Vihar Phase 1-5', tag: 'Heavy Industrial Fabrication & Tin Sheds' },
        { name: 'Manesar IMT', tag: 'Cold Storage, Warehouse & Manufacturing Plants' },
        { name: 'DLF Cyber City', tag: 'Acoustic Glass Cabins & Corporate Fitouts' },
        { name: 'Golf Course Extension Rd', tag: 'Luxury Penthouse Pergolas & Railings' },
        { name: 'Sohna Road Commercial Hub', tag: 'Showrooms, Shutters & Steel Platforms' },
        { name: 'Pataudi Road Cluster', tag: 'Logistics Park Steel Framing' },
      ],
      popularServices: [
        { title: 'Industrial Factory Tin Shed', slug: 'industrial-factory-tin-shed' },
        { title: 'Cold Store Structure Work', slug: 'cold-store-structure-work' },
        { title: 'Sport Academy Structure', slug: 'sport-academy-structure' },
        { title: 'PUF Panel All Work', slug: 'puf-panel-all-work' },
        { title: 'Office Interior Work', slug: 'office-interior-work' },
      ],
    },
    {
      id: 'ghaziabad',
      cityKey: 'ghaziabad',
      cityName: 'Ghaziabad, Chipiyana & Delhi NCR',
      badge: 'Official Workshop & Fabrication Hub',
      title: 'Master Welding Workshop, Fabrication & Turnkey Execution in Ghaziabad',
      description:
        'Our central fabrication workshop is located at Chipiyana / Tigri Gol Chakkar, Ghaziabad. We manufacture heavy structural trusses, rolling shutters, container rooms, and deliver quick same-day installation across Ghaziabad and Delhi NCR.',
      leadTime: 'Instant Workshop Visit & Same Day Dispatch',
      sectors: [
        { name: 'Chipiyana & Tigri Gol Chakkar', tag: 'Official Royalpro Workshop & Hub' },
        { name: 'Crossing Republik', tag: 'Complete Flat & Villa Turnkey Interiors' },
        { name: 'Nai Basti Dundahera', tag: 'Rapid Metal Fabrication Service' },
        { name: 'Sahibabad Industrial Area Site 4', tag: 'Heavy Industrial Machinery Tin Sheds' },
        { name: 'Mohan Nagar & Kavi Nagar', tag: 'Structural Steel Trusses & Gates' },
        { name: 'Delhi Okhla & Mayapuri', tag: 'Factory Renovation & Metal Works' },
        { name: 'Faridabad Industrial Sectors', tag: 'Cold Store & Warehouse Sheds' },
      ],
      popularServices: [
        { title: 'Metal Fabrication Work', slug: 'metal-fabrication-work' },
        { title: 'Industrial Factory Tin Shed', slug: 'industrial-factory-tin-shed' },
        { title: 'Container Rooms', slug: 'container-rooms' },
        { title: 'Shop Shutter Service', slug: 'shop-shutter-service' },
        { title: 'Pickup Truck All Body Work', slug: 'pickup-truck-body-work' },
      ],
    },
  ];

  const filteredAreas = selectedCity === 'all'
    ? areaData
    : areaData.filter((a) => a.cityKey === selectedCity);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar onOpenInquiryModal={() => setIsInquiryOpen(true)} onScrollToServices={() => {}} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="mb-10 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white border border-amber-500/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold font-royal tracking-wide uppercase">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Regional Coverage & On-Site Service Network</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-royal tracking-tight text-white leading-tight">
              Service Areas: Noida, Gaur City, Gurugram & Ghaziabad
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Royalpro Industrial provides specialized on-site fabrication engineers, crane erection machinery, and architectural interior teams across every sector of Delhi NCR. Free on-site survey and same-day 3D CAD design drawings.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="tel:9557323216"
                className="px-5 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black text-xs sm:text-sm font-royal uppercase tracking-wider shadow-lg active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 animate-pulse" />
                <span>Call Engineer: 9557323216</span>
              </a>
              <button
                onClick={() => setIsInquiryOpen(true)}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black text-xs sm:text-sm font-royal uppercase tracking-wider active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>Book Free Site Survey</span>
              </button>
            </div>
          </div>
        </div>

        {/* City Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setSelectedCity('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold font-royal uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              selectedCity === 'all'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Cities & Sectors
          </button>
          <button
            onClick={() => setSelectedCity('noida')}
            className={`px-4 py-2 rounded-full text-xs font-bold font-royal uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              selectedCity === 'noida'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Noida (Sector 62, 63, 18, 150)
          </button>
          <button
            onClick={() => setSelectedCity('gaur-city')}
            className={`px-4 py-2 rounded-full text-xs font-bold font-royal uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              selectedCity === 'gaur-city'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Gaur City 1 & 2 (Gr. Noida West)
          </button>
          <button
            onClick={() => setSelectedCity('gurugram')}
            className={`px-4 py-2 rounded-full text-xs font-bold font-royal uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              selectedCity === 'gurugram'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Gurugram & Manesar IMT
          </button>
          <button
            onClick={() => setSelectedCity('ghaziabad')}
            className={`px-4 py-2 rounded-full text-xs font-bold font-royal uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              selectedCity === 'ghaziabad'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Ghaziabad & Chipiyana Hub
          </button>
        </div>

        {/* Detailed Regional Sector Cards Grid */}
        <div className="space-y-8 mb-16">
          {filteredAreas.map((area) => (
            <div
              key={area.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-lg transition-all space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold font-royal uppercase">
                    <Building2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>{area.badge}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black font-royal text-slate-900 tracking-tight">
                    {area.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="tel:9557323216"
                    className="px-4 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-amber-300 font-bold text-xs font-mono inline-flex items-center gap-1.5 active:scale-95 transition-all shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>9557323216</span>
                  </a>
                  <a
                    href={`https://wa.me/919557323216?text=${encodeURIComponent(`Hello Royalpro, I need quotation for service in ${area.cityName}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-1.5 active:scale-95 transition-all shadow-sm"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {area.description}
              </p>

              {/* Sectors Covered in this City */}
              <div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider font-royal mb-3 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>Key Sectors & High-Demand Localities Covered:</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {area.sectors.map((sec, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 hover:bg-amber-50/40 transition-colors"
                    >
                      <p className="font-bold text-xs text-slate-900">{sec.name}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{sec.tag}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Services with direct hyperlinks */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-slate-800 font-royal uppercase">Top Services:</span>
                  {area.popularServices.map((srv, idx) => (
                    <Link
                      key={idx}
                      href={`/services/${srv.slug}`}
                      className="px-2.5 py-1 rounded-full bg-amber-100/60 hover:bg-amber-500 hover:text-white text-amber-900 font-semibold text-[11px] transition-colors"
                    >
                      {srv.title}
                    </Link>
                  ))}
                </div>

                <button
                  onClick={() => setIsInquiryOpen(true)}
                  className="font-bold text-amber-700 hover:underline inline-flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <span>Request Free Survey in {area.cityName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 15 All Welding Services Links Bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Hammer className="w-5 h-5 text-amber-600" />
            <h3 className="font-black text-base sm:text-lg text-slate-900 font-royal">
              All 15 Welding Work Services Directory
            </h3>
          </div>
          <p className="text-xs text-slate-600">
            Click any service link below for technical fabrication details, Tata/Jindal steel sheet specifications, and price rates per sq.ft:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
            {weldingServices.map((s, i) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-100/60 text-slate-800 hover:text-amber-900 border border-slate-200/80 transition-colors flex items-center justify-between group"
              >
                <span className="truncate font-medium">
                  <strong className="text-amber-700 mr-1.5">{i + 1}.</strong>
                  {s.title}
                </span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 group-hover:text-amber-700 transition-transform shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
}
