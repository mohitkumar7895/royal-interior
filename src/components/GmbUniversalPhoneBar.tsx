'use client';

import React from 'react';
import { Phone, MessageSquare, Clock, ShieldCheck, MapPin } from 'lucide-react';

export function GmbUniversalPhoneBar() {
  const primaryPhoneFormatted = '+91 95573 23216';
  const primaryPhoneRaw = '9557323216';
  const primaryPhoneIntl = '+919557323216';
  const whatsappUrl = `https://wa.me/919557323216?text=${encodeURIComponent(
    'Hello Royalpro Industrial, I am contacting from website for inquiry & site survey.'
  )}`;

  return (
    <>
      {/* 
        ========================================================================
        1. CRAWLABLE MICRODATA CONTAINER (Strict Google Business Profile NAP)
        This ensures Googlebot finds unambiguous Name, Address & Phone match
        on every single rendered page.
        ========================================================================
      */}
      <div
        className="sr-only"
        aria-hidden="true"
        itemScope
        itemType="https://schema.org/LocalBusiness"
      >
        <span itemProp="name">Royalpro Industrial Factory Tin Shed Work & Complete Interior Solution</span>
        <span itemProp="legalName">Royalpro Industrial</span>
        <a itemProp="telephone" href={`tel:${primaryPhoneIntl}`}>
          {primaryPhoneIntl}
        </a>
        <a itemProp="telephone" href={`tel:${primaryPhoneRaw}`}>
          {primaryPhoneFormatted}
        </a>
        <span itemProp="telephone">09557323216</span>
        <span itemProp="telephone">9557323216</span>
        <span itemProp="email">contact@royalproindustrial.com</span>
        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <span itemProp="streetAddress">Chipiyana, Tigri Gol Chakkar, Yusufpur, Nai Basti Dundahera</span>
          <span itemProp="addressLocality">Ghaziabad</span>
          <span itemProp="addressRegion">Uttar Pradesh</span>
          <span itemProp="postalCode">201009</span>
          <span itemProp="addressCountry">IN</span>
        </div>
        <div itemProp="geo" itemScope itemType="https://schema.org/GeoCoordinates">
          <span itemProp="latitude">28.628</span>
          <span itemProp="longitude">77.439</span>
        </div>
      </div>

      {/* 
        ========================================================================
        2. DESKTOP FLOATING QUICK CALL & WHATSAPP ACTION PILL (Fixed Bottom-Right)
        ========================================================================
      */}
      <aside
        aria-label="Direct Business Call Helpline"
        className="hidden md:flex fixed bottom-5 right-5 z-50 flex-col items-end gap-2.5 drop-shadow-2xl animate-fade-in pointer-events-auto"
      >
        {/* Micro Verified Badge */}
        <div className="bg-slate-900/95 backdrop-blur-md text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-500/40 shadow-md flex items-center gap-1.5 font-royal">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Official Helpline: 24/7 Available</span>
        </div>

        {/* Action Group */}
        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md p-1.5 rounded-full border border-slate-200/90 shadow-2xl">
          {/* Direct Phone Call */}
          <a
            href={`tel:${primaryPhoneIntl}`}
            className="group flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black text-xs font-royal uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all"
            title="Call Royalpro Industrial Now"
          >
            <span className="p-1 rounded-full bg-white/20 animate-pulse">
              <Phone className="w-4 h-4 text-white" />
            </span>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[9px] uppercase tracking-wider text-amber-100 font-medium">Call Us Now</span>
              <span className="font-mono text-xs font-black tracking-normal">{primaryPhoneFormatted}</span>
            </div>
          </a>

          {/* WhatsApp Direct */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:scale-105 active:scale-95 transition-all"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp 9557323216"
          >
            <MessageSquare className="w-5 h-5 text-white" />
          </a>
        </div>
      </aside>

      {/* 
        ========================================================================
        3. MOBILE STICKY BOTTOM BAR (Permanent on Every Page for Crawlers & Users)
        ========================================================================
      */}
      <aside
        aria-label="Direct Calling and WhatsApp Contact Bar"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-amber-500/30 px-3 py-2 shadow-2xl safe-area-bottom"
      >
        <div className="max-w-lg mx-auto flex items-center justify-between gap-2">
          {/* Phone Call Button */}
          <a
            href={`tel:${primaryPhoneIntl}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 active:from-amber-600 active:to-orange-700 text-white shadow-lg text-xs font-black uppercase tracking-wider font-royal active:scale-98 transition-all"
            id="mobile-call-btn"
          >
            <Phone className="w-4 h-4 text-white animate-pulse" />
            <div className="flex flex-col text-left leading-none">
              <span className="text-[9px] text-amber-100 font-sans font-medium uppercase">Call Royalpro</span>
              <span className="font-mono text-[13px] font-bold tracking-tight text-white">{primaryPhoneRaw}</span>
            </div>
          </a>

          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white shadow-lg text-xs font-black uppercase tracking-wider font-royal active:scale-98 transition-all"
            id="mobile-whatsapp-btn"
          >
            <MessageSquare className="w-4 h-4 text-white" />
            <div className="flex flex-col text-left leading-none">
              <span className="text-[9px] text-emerald-100 font-sans font-medium uppercase">WhatsApp</span>
              <span className="font-mono text-[13px] font-bold tracking-tight text-white">{primaryPhoneRaw}</span>
            </div>
          </a>
        </div>
      </aside>
    </>
  );
}
