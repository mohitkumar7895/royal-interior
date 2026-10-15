'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Project, ServiceItem, ServiceDivision } from '@/types';
import { apiClient } from '@/lib/api-client';
import { useInquiryStore } from '@/stores/useInquiryStore';
import { useNotification } from '@/contexts/NotificationContext';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { ServicesSection } from '@/components/ServicesSection';
import { ProjectGallery } from '@/components/ProjectGallery';
import { InquiryModal } from '@/components/InquiryModal';
import { InquiryAdminDrawer } from '@/components/InquiryAdminDrawer';
import { DatabaseTablesModal } from '@/components/DatabaseTablesModal';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { ScrollTicker } from '@/components/ScrollTicker';
import { ScrollReveal, FloatingScrollControls } from '@/components/ScrollReveal';
import { ReviewsSection } from '@/components/ReviewsSection';
import { WhyChooseUsSection } from '@/components/WhyChooseUsSection';
import { Loader2, Server, CheckCircle2, ShieldCheck, Phone, Mail, MapPin, Database, UserCheck, Table } from 'lucide-react';

export default function RoyalProHome() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [backendLatency, setBackendLatency] = useState<number | null>(null);
  const [activeDivision, setActiveDivision] = useState<ServiceDivision>('welding_industrial');
  const [isDatabaseModalOpen, setDatabaseModalOpen] = useState(false);
  const [bannerImage, setBannerImage] = useState<string>('/images/factory_tin_shed.jpg');

  const { isInquiryModalOpen, setInquiryModalOpen, setInquiries } = useInquiryStore();
  const { notify } = useNotification();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const start = performance.now();

      const [servicesData, projectsData, inquiriesData] = await Promise.all([
        apiClient.getServices(),
        apiClient.getProjects(),
        apiClient.getInquiries(),
      ]);

      const end = performance.now();
      setBackendLatency(Math.round(end - start));

      setServices(servicesData);
      setProjects(projectsData);
      setInquiries(inquiriesData);

      // Fetch dynamic banner from settings
      try {
        const setRes = await fetch('/api/admin/settings');
        const setData = await setRes.json();
        if (setData.success && setData.data?.banner_image) {
          setBannerImage(setData.data.banner_image);
        }
      } catch {}
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error loading backend data';
      notify({
        type: 'error',
        title: 'Backend Route Error',
        message: msg,
      });
    } finally {
      setLoading(false);
    }
  }, [setInquiries, notify]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const scrollToServices = (division?: 'welding_industrial' | 'interior_solution') => {
    if (division) {
      setActiveDivision(division);
    }
    const el = document.getElementById('services-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setInquiryModalOpen(true);
  };

  const handleProjectSelect = (title: string, division: ServiceDivision) => {
    const matchedService = services.find((s) => s.title === title) || null;
    if (matchedService) {
      setSelectedService(matchedService);
    } else {
      setSelectedService({
        id: 'custom_' + Date.now(),
        division,
        number: 0,
        title,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        tagline: 'Custom Project Consultation',
        description: `Consultation request for ${title}`,
        features: [],
        specs: { materials: '', warranty: '', finishOrGrade: '', workScope: '' },
      });
    }
    setInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white relative">
      {/* Scroll-Driven Top Progress Bar */}
      <ScrollProgressBar />

      {/* Navigation */}
      <Navbar
        onOpenInquiryModal={() => {
          setSelectedService(null);
          setInquiryModalOpen(true);
        }}
        onScrollToServices={scrollToServices}
      />

      {/* Hero Section: Full Bleed on Mobile (No Rectangle / Box) */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 pt-0 sm:pt-4">
          <HeroBanner
            onOpenInquiry={() => {
              setSelectedService(null);
              setInquiryModalOpen(true);
            }}
            onScrollToServices={scrollToServices}
            bannerImage={bannerImage}
          />
        </div>
      </section>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        {/* 32 Comprehensive Services Section */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-amber-600 mb-2" />
            <p className="text-xs font-semibold">Loading all services...</p>
          </div>
        ) : (
          <ServicesSection
            services={services}
            onSelectService={handleSelectService}
            activeDivision={activeDivision}
            onDivisionChange={setActiveDivision}
          />
        )}

        {/* Dynamic Reverse Marquee Heading Ribbon between sections */}
        <div className="my-2 rounded-2xl overflow-hidden border border-amber-500/20">
          <ScrollTicker reverse={true} />
        </div>

        {/* Projects Gallery */}
        <ProjectGallery
          projects={projects}
          onOpenInquiryForProject={handleProjectSelect}
        />

        {/* Why Choose Royalpro Section (Right Above Reviews) */}
        <WhyChooseUsSection
          onOpenInquiry={() => {
            setSelectedService(null);
            setInquiryModalOpen(true);
          }}
        />

        {/* Verified Customer Reviews Section (Right Above Footer) */}
        <ReviewsSection />
      </main>

      {/* Industrial & Interior Footer - Height Optimized for Mobile */}
      <footer className="mt-2 sm:mt-4 border-t border-slate-200 bg-white py-4 sm:py-8 text-slate-600 text-xs shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-8">
          <div className="md:col-span-2 space-y-1.5 sm:space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-black text-base sm:text-lg text-slate-900 uppercase tracking-tight font-royal">
                ROYAL<span className="text-amber-600">PRO</span> INDUSTRIAL & INTERIOR
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 max-w-md leading-relaxed">
              <strong>Royalpro Industrial Factory Tin Shed Work & Complete Interior Solution</strong> provides heavy industrial steel shed fabrication, cold stores, sports arenas, and turnkey interior design, gypsum ceilings, and modular kitchens.
            </p>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-royal">Direct Helpline</h4>
            <div className="space-y-1.5 sm:space-y-2 text-slate-600 text-[11px] sm:text-xs">
              <a
                href="tel:9557323216"
                className="flex items-center gap-1.5 text-amber-700 font-bold hover:underline"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Mobile: 9557323216</span>
              </a>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>contact@royalproindustrial.com</span>
              </p>
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>Chipiyana, Tigri Gol Chakkar, Yusufpur, Nai Basti Dundahera, Ghaziabad, Uttar Pradesh 201009</span>
              </p>
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-royal">Quick Links</h4>
            <ul className="space-y-1 sm:space-y-1.5 text-slate-600 text-[11px] sm:text-xs">
              <li>• Welding Work Services</li>
              <li>• Services List (Complete Interior Solution)</li>
              <li>• Free On-site Survey & Measurements</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3 sm:mt-6 pt-2.5 sm:pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 text-[10px] sm:text-[11px] text-slate-500">
          <p>© 2026 Royalpro Industrial Factory Tin Shed Work & Complete Interior Solution. Mobile: 9557323216.</p>
          <p className="text-slate-400">Structural Fabrication & Luxury Interior Execution</p>
        </div>
      </footer>

      {/* Floating Scroll Controls (Helpline + Back To Top) */}
      <FloatingScrollControls />

      {/* Inquiry Modal & Admin Drawer & Database Tables Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        preSelectedService={selectedService}
      />

      <DatabaseTablesModal
        isOpen={isDatabaseModalOpen}
        onClose={() => setDatabaseModalOpen(false)}
      />

      <InquiryAdminDrawer />
    </div>
  );
}
