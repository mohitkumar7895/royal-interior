import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { weldingServices, interiorServices } from '@/lib/services-data';
import { ServiceDetailClient } from './ServiceDetailClient';

export function generateStaticParams() {
  const all = [...weldingServices, ...interiorServices];
  return all.map((s) => ({
    slug: s.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const allServices = [...weldingServices, ...interiorServices];
  const service = allServices.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs font-semibold text-slate-500">Loading service details...</div>}>
      <ServiceDetailClient service={service} />
    </Suspense>
  );
}
