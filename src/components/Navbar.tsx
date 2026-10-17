'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useInquiryStore } from '@/stores/useInquiryStore';
import {
  Phone,
  ShieldCheck,
  ChevronDown,
  Hammer,
  Sparkles,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react';
import { weldingServices, interiorServices } from '@/lib/services-data';

interface NavbarProps {
  onOpenInquiryModal: () => void;
  onScrollToServices: (division?: 'welding_industrial' | 'interior_solution') => void;
  onOpenDatabaseModal?: () => void;
}

export function Navbar({
  onOpenInquiryModal,
  onScrollToServices,
  onOpenDatabaseModal,
}: NavbarProps) {
  const { inquiries, setDrawerOpen } = useInquiryStore();
  const [openDropdown, setOpenDropdown] = useState<'welding' | 'interior' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectDivision = (division: 'welding_industrial' | 'interior_solution') => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    onScrollToServices(division);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/95 border-b border-slate-200/90 shadow-xs transition-all">
      {/* Top Micro Announcement Bar (Mobile & Desktop Optimized) */}
      <div className="bg-gradient-to-r from-slate-950 via-amber-950 to-slate-950 text-amber-100 py-1.5 px-3 sm:px-4 border-b border-amber-500/25">
        <div className="max-w-7xl mx-auto">
          {/* Mobile View: High Clarity, Professional Branding + Direct Call */}
          <div className="sm:hidden flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 min-w-0 font-royal font-bold text-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping shrink-0" />
              <span className="truncate tracking-wide text-amber-200 text-[11px] font-bold">
                ROYALPRO INDUSTRIAL & INTERIOR
              </span>
            </div>
            <a
              href="tel:9557323216"
              className="shrink-0 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono font-bold text-[11px] active:scale-95 transition-transform"
            >
              <Phone className="w-3 h-3 text-amber-400 animate-pulse" />
              <span>9557323216</span>
            </a>
          </div>

          {/* Desktop / Tablet View */}
          <div className="hidden sm:flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
              <span className="font-semibold text-amber-200">
                ROYALPRO INDUSTRIAL FACTORY TIN SHED WORK & COMPLETE INTERIOR SOLUTION
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <a
                href="tel:9557323216"
                className="hover:text-amber-300 text-amber-300 font-bold flex items-center gap-1 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Mo: 9557323216</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 sm:h-24 md:h-26 flex items-center justify-between gap-2 sm:gap-4">
        {/* Full Brand Logo - Clean, Large, Crisp, Circular RP Seal */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group cursor-pointer shrink min-w-0 py-1" title="Royalpro Home">
          <div className="relative p-0.5 sm:p-1 rounded-full bg-slate-900 border border-amber-400/50 hover:border-amber-400 transition-all shadow-md group-hover:scale-105 shrink-0">
            <img
              src="/images/royalpro_logo.png"
              alt="Royalpro Industrial Factory Tin Shed Work & Complete Interior Solution"
              className="h-12 xs:h-14 sm:h-16 md:h-18 w-12 xs:w-14 sm:w-16 md:w-18 object-contain rounded-full drop-shadow-md"
            />
          </div>
          <div className="hidden xs:flex flex-col">
            <span className="font-royal font-black text-xs sm:text-sm md:text-base text-slate-900 tracking-wider group-hover:text-amber-800 transition-colors leading-tight">
              ROYALPRO
            </span>
            <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold text-amber-700 tracking-wider uppercase font-royal leading-tight">
              Industrial & Interior Solution
            </span>
          </div>
        </Link>

        {/* Navigation Menus (Home, About, Services, Contact) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* Home Link */}
          <Link
            href="/"
            className="px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:text-amber-700 hover:bg-slate-100 transition-colors"
          >
            Home
          </Link>

          {/* About Us Link */}
          <Link
            href="/about"
            className="px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:text-amber-700 hover:bg-slate-100 transition-colors"
          >
            About Us
          </Link>

          {/* MENU 1: WELDING WORK SERVICES */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('welding')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              onClick={() => handleSelectDivision('welding_industrial')}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-black tracking-wide transition-all cursor-pointer ${
                openDropdown === 'welding'
                  ? 'bg-amber-100/80 text-amber-900 shadow-xs'
                  : 'text-slate-800 hover:text-amber-700 hover:bg-slate-100'
              }`}
            >
              <Hammer className="w-4 h-4 text-amber-600" />
              <span className="uppercase font-royal tracking-wider">WELDING WORK SERVICES</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  openDropdown === 'welding' ? 'rotate-180 text-amber-600' : 'text-slate-400'
                }`}
              />
            </button>

            {/* Dropdown Menu for Welding Services Linking to /services/[slug] */}
            {openDropdown === 'welding' && (
              <div className="absolute top-full left-0 w-[540px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-4 grid grid-cols-2 gap-2 animate-fade-in z-50">
                <div className="col-span-2 px-2 pb-2 mb-1 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-black text-amber-800 uppercase tracking-wider flex items-center gap-1.5 font-royal">
                    <Hammer className="w-3.5 h-3.5 text-amber-600" /> Industrial Welding Services
                  </span>
                  <button
                    onClick={() => handleSelectDivision('welding_industrial')}
                    className="text-[11px] font-bold text-amber-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    View on Home <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                {weldingServices.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-2 p-2 rounded-xl text-left hover:bg-amber-50/70 transition-colors group/item cursor-pointer"
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0 group-hover/item:scale-125 transition-transform" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-800 group-hover/item:text-amber-800 truncate">
                        {service.title}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {service.tagline}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* MENU 2: SERVICES LIST (Interior) */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('interior')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              onClick={() => handleSelectDivision('interior_solution')}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-black tracking-wide transition-all cursor-pointer ${
                openDropdown === 'interior'
                  ? 'bg-amber-100/80 text-amber-900 shadow-xs'
                  : 'text-slate-800 hover:text-amber-700 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="uppercase font-royal tracking-wider">SERVICES LIST</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  openDropdown === 'interior' ? 'rotate-180 text-orange-500' : 'text-slate-400'
                }`}
              />
            </button>

            {/* Dropdown Menu for Interior Services Linking to /services/[slug] */}
            {openDropdown === 'interior' && (
              <div className="absolute top-full -left-12 w-[560px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-4 grid grid-cols-2 gap-2 animate-fade-in z-50 max-h-[460px] overflow-y-auto">
                <div className="col-span-2 px-2 pb-2 mb-1 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-black text-orange-800 uppercase tracking-wider flex items-center gap-1.5 font-royal">
                    <Sparkles className="w-3.5 h-3.5 text-orange-500" /> Complete Interior Solutions
                  </span>
                  <button
                    onClick={() => handleSelectDivision('interior_solution')}
                    className="text-[11px] font-bold text-orange-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    View on Home <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                {interiorServices.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-start gap-2 p-2 rounded-xl text-left hover:bg-orange-50/70 transition-colors group/item cursor-pointer"
                  >
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0 group-hover/item:scale-125 transition-transform" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-800 group-hover/item:text-orange-800 truncate">
                        {service.title}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {service.tagline}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Contact Us Link */}
          <Link
            href="/contact"
            className="px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:text-amber-700 hover:bg-slate-100 transition-colors"
          >
            Contact Us
          </Link>
        </nav>

        {/* Action Controls: Direct Phone, Quote & Mobile Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Direct Phone Number Button */}
          <a
            href="tel:9557323216"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 transition-colors px-3.5 py-2 rounded-full bg-amber-50 hover:bg-amber-100/80 border border-amber-300 shadow-2xs group"
            title="Call 9557323216"
          >
            <Phone className="w-3.5 h-3.5 text-amber-600 animate-pulse group-hover:scale-110" />
            <span className="font-mono text-xs font-black">9557323216</span>
          </a>

          {/* Enhanced Premium Animated "Get Quote" Button */}
          <button
            onClick={onOpenInquiryModal}
            className="relative overflow-hidden group inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black text-[11px] sm:text-xs transition-all shadow-md shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/50 hover:scale-105 active:scale-95 cursor-pointer border border-amber-300/40 font-royal shrink-0"
          >
            {/* Shimmer sweep animation */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-200 animate-pulse group-hover:rotate-12 transition-transform" />
            <span className="whitespace-nowrap tracking-wide uppercase">Get Quote</span>
          </button>

          {/* Mobile Menu Hamburger (Triple Line) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 sm:p-2.5 rounded-full bg-slate-100 hover:bg-amber-100/80 text-slate-800 hover:text-amber-900 transition-all cursor-pointer border border-slate-200 shadow-xs active:scale-90"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-700" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer (Responsive, Full Links Matching User's Design) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-4 animate-fade-in shadow-2xl max-h-[85vh] overflow-y-auto">
          {/* Header Banner: RP Golden Logo with full title & direct call */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 text-amber-100 border border-amber-500/30 shadow-md">
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-3">
                <img
                  src="/images/royalpro_logo.png"
                  alt="RP Royalpro Logo"
                  className="h-12 w-12 object-contain rounded-full border border-amber-400/50 shadow-md bg-slate-950 shrink-0"
                />
                <div>
                  <h3 className="font-royal font-black text-amber-300 text-xs tracking-wider">
                    ROYALPRO INDUSTRIAL
                  </h3>
                  <p className="text-[10px] text-amber-200/80">
                    Shed & Complete Interior
                  </p>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-amber-300 cursor-pointer border border-amber-400/30"
                aria-label="Close Navigation Menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-amber-500/20 text-xs">
              <span className="text-[11px] text-amber-200/70 font-mono">Direct Helpline:</span>
              <a
                href="tel:9557323216"
                className="font-mono font-bold text-amber-300 flex items-center gap-1 hover:underline"
              >
                <Phone className="w-3 h-3 text-amber-400" />
                <span>9557323216</span>
              </a>
            </div>
          </div>

          {/* Primary Navigation Links */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-amber-100/60 text-slate-900 font-bold text-xs transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-amber-100/60 text-slate-900 font-bold text-xs transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-amber-100/60 text-slate-900 font-bold text-xs transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Quick Call & WhatsApp Direct Actions */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href="tel:9557323216"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs shadow-xs active:scale-95 transition-transform"
            >
              <Phone className="w-3.5 h-3.5 text-slate-950" />
              <span>Call: 9557323216</span>
            </a>

            <a
              href="https://wa.me/919557323216?text=Hello%20Royalpro,%20I%20am%20interested%20in%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-xs active:scale-95 transition-transform"
            >
              <span>WhatsApp Chat</span>
            </a>
          </div>

          {/* Category 1: ALL WELDING WORK (Numbered 1-15, exactly matching user image media_1792041200113.jpg) */}
          <div className="pt-1">
            <div className="flex items-center justify-between py-2 border-b border-amber-200 bg-amber-50/70 px-3 rounded-t-xl">
              <span className="text-xs font-black text-amber-900 uppercase flex items-center gap-2 font-royal">
                <Hammer className="w-4 h-4 text-amber-600" /> ALL WELDING WORK
              </span>
              <button
                onClick={() => handleSelectDivision('welding_industrial')}
                className="text-xs font-bold text-amber-700 underline cursor-pointer"
              >
                View on Home
              </button>
            </div>
            <div className="divide-y divide-slate-100 border-x border-b border-slate-100 rounded-b-xl overflow-hidden bg-white">
              {weldingServices.map((s, idx) => (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs text-slate-700 hover:bg-amber-50/80 active:bg-amber-100 transition-colors"
                >
                  <span className="font-medium">
                    <span className="font-bold text-amber-700 mr-2">{idx + 1}.</span>
                    {s.title}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Category 2: SERVICES LIST (Numbered 1-17, exactly matching user image media_1792041209297.png) */}
          <div className="pt-2">
            <div className="flex items-center justify-between py-2 border-b border-orange-200 bg-orange-50/70 px-3 rounded-t-xl">
              <span className="text-xs font-black text-orange-900 uppercase flex items-center gap-2 font-royal">
                <Sparkles className="w-4 h-4 text-orange-500" /> SERVICES LIST (Interior Solution)
              </span>
              <button
                onClick={() => handleSelectDivision('interior_solution')}
                className="text-xs font-bold text-orange-700 underline cursor-pointer"
              >
                View on Home
              </button>
            </div>
            <div className="divide-y divide-slate-100 border-x border-b border-slate-100 rounded-b-xl overflow-hidden bg-white">
              {interiorServices.map((s, idx) => (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs text-slate-700 hover:bg-orange-50/80 active:bg-orange-100 transition-colors"
                >
                  <span className="font-medium">
                    <span className="font-bold text-orange-700 mr-2">{idx + 1}.</span>
                    {s.title}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Location & Contact Info in Drawer */}
          <div className="pt-2 text-center text-[11px] text-slate-500 border-t border-slate-200">
            <p className="font-semibold text-slate-700">Royalpro Industrial & Interiors</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Chipiyana, Tigri Gol Chakkar, Yusufpur, Nai Basti Dundahera, Ghaziabad, UP 201009</p>
          </div>
        </div>
      )}
    </header>
  );
}
