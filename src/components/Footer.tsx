import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Hammer, Sparkles, Map, Globe, ArrowRight } from 'lucide-react';
import { weldingServices, interiorServices } from '@/lib/services-data';
import { SITE_CONFIG } from '@/lib/seo';

export function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200 bg-white text-slate-700 text-xs shadow-xs">
      {/* Top Banner - Phone Number & Direct Helpline Call to Action */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white py-4 px-4 sm:px-8 border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="p-2 rounded-full bg-amber-500/20 border border-amber-400/40 shrink-0">
              <Phone className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-amber-300 font-bold font-royal">
                Direct Engineering Helpline & On-Site Free Survey
              </p>
              <h3 className="text-base sm:text-xl font-black font-royal text-white tracking-wide">
                Call Now for Tin Shed & Interior Works: <a href="tel:9557323216" className="text-amber-400 hover:text-amber-300 underline font-mono font-black">9557323216</a>
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="tel:9557323216"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black text-xs font-royal uppercase tracking-wider shadow-md active:scale-95 transition-all inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call 9557323216</span>
            </a>
            <a
              href={`https://wa.me/919557323216?text=${encodeURIComponent('Hello Royalpro Industrial, I am looking for service quotation & site survey.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs font-royal uppercase tracking-wider shadow-md active:scale-95 transition-all inline-flex items-center gap-1.5"
            >
              <span>WhatsApp Us</span>
            </a>
            <Link
              href="/sitemap"
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-amber-200 border border-amber-400/30 font-bold text-xs font-royal uppercase tracking-wider active:scale-95 transition-all inline-flex items-center gap-1.5"
            >
              <Map className="w-3.5 h-3.5 text-amber-400" />
              <span>HTML Sitemap</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: Company Profile & Contact */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Link href="/" className="inline-block group">
              <span className="font-black text-base sm:text-lg text-slate-900 uppercase tracking-tight font-royal group-hover:text-amber-700 transition-colors">
                ROYAL<span className="text-amber-600">PRO</span> INDUSTRIAL
              </span>
            </Link>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              <strong>Royalpro Industrial Factory Tin Shed Work & Complete Interior Solution</strong> is the trusted leader in heavy PEB steel structures, industrial tin sheds, cold storage facilities, sports academies, and turnkey office & luxury residential interiors across Delhi NCR.
            </p>
          </div>

          <div className="space-y-2 text-[11px] text-slate-600">
            <a
              href="tel:9557323216"
              className="flex items-center gap-2 text-slate-900 font-bold hover:text-amber-700 transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Mobile / WhatsApp: <strong className="font-mono text-amber-700 text-xs">9557323216</strong></span>
            </a>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-600 shrink-0" />
              <span>contact@royalproindustrial.com</span>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Workshop & Hub: Chipiyana, Tigri Gol Chakkar, Yusufpur, Nai Basti Dundahera, Ghaziabad, Uttar Pradesh 201009</span>
            </p>
          </div>
        </div>

        {/* Column 2: ALL WELDING WORK (15 Core Services with Hyperlinks) */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 pb-2 border-b border-slate-200">
            <Hammer className="w-4 h-4 text-amber-600" />
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-royal">
              All Welding Work ({weldingServices.length} Services)
            </h4>
          </div>
          <ul className="space-y-1.5 text-[11px]">
            {weldingServices.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-slate-600 hover:text-amber-700 hover:underline flex items-center gap-1.5 transition-colors"
                  title={`${service.title} in Noida, Gaur City, Gurgaon & Ghaziabad`}
                >
                  <span className="text-amber-500 font-bold">•</span>
                  <span className="truncate">{service.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: COMPLETE INTERIOR SOLUTIONS (Hyperlinked Services) */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 pb-2 border-b border-slate-200">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-royal">
              Complete Interior Solutions
            </h4>
          </div>
          <ul className="space-y-1.5 text-[11px]">
            {interiorServices.slice(0, 15).map((service) => (
              <li key={service.id}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-slate-600 hover:text-amber-700 hover:underline flex items-center gap-1.5 transition-colors"
                  title={`${service.title} in Noida, Gaur City, Gurgaon & Ghaziabad`}
                >
                  <span className="text-orange-500 font-bold">•</span>
                  <span className="truncate">{service.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: SERVICE AREAS DIRECTORY & QUICK SITEMAP */}
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 pb-2 border-b border-slate-200">
            <Globe className="w-4 h-4 text-amber-600" />
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-royal">
              Service Areas & Navigation
            </h4>
          </div>

          <p className="text-[11px] text-slate-600 leading-relaxed">
            Fast on-site survey within 15-30 minutes across our <strong>10 KM Local Hub</strong>: Chipiyana, Tigri Gol Chakkar, Yusufpur, Nai Basti Dundahera, Crossings Republik, Gaur City 1 & 2, Char Murti, Noida Sector 62 & 63, and Siddhartha Vihar.
          </p>

          <Link
            href="/service-areas"
            className="p-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100/80 border border-amber-300/80 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-xs text-amber-950 font-royal block">
                10 KM Fast Dispatch Hub
              </span>
              <span className="text-[10px] text-amber-800">
                Tigri, Chipiyana, Gaur City, Noida Sec 63 (9557323216)
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <h5 className="font-bold text-slate-800 text-[11px] uppercase tracking-wide font-royal">
              Quick Links & Sitemap
            </h5>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <Link href="/" className="text-slate-600 hover:text-amber-700 hover:underline">• Home Page</Link>
              <Link href="/services" className="text-slate-600 hover:text-amber-700 hover:underline">• All Services</Link>
              <Link href="/service-areas" className="text-amber-700 font-bold hover:underline">• Service Areas</Link>
              <Link href="/about" className="text-slate-600 hover:text-amber-700 hover:underline">• About Royalpro</Link>
              <Link href="/contact" className="text-slate-600 hover:text-amber-700 hover:underline">• Contact Us</Link>
              <Link href="/sitemap" className="text-amber-700 font-bold hover:underline col-span-2">• Full HTML Sitemap</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-slate-200 bg-slate-50 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <p>© 2026 {SITE_CONFIG.fullName}. Direct Helpline: <a href="tel:9557323216" className="font-bold text-slate-700 hover:text-amber-700">9557323216</a>.</p>
          <p className="text-slate-500">
            Serving Noida, Greater Noida, Gaur City, Gurugram, Ghaziabad, Delhi NCR & Pan India.
          </p>
        </div>
      </div>
    </footer>
  );
}
