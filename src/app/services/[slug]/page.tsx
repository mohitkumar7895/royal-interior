import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { weldingServices, interiorServices } from '@/lib/services-data';
import { SITE_CONFIG, SITE_URL } from '@/lib/seo';
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const allServices = [...weldingServices, ...interiorServices];
  const service = allServices.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Service Not Found | Royalpro',
    };
  }

  const title = `${service.title} | Royalpro`;
  const description = `${service.tagline ? service.tagline + '. ' : ''}${service.description.slice(0, 150)}... Starting rate: ${service.startingRate}. Contact: 9557323216.`;

  return {
    title,
    description,
    keywords: [
      service.title,
      service.division === 'welding_industrial' ? 'Welding Work Services' : 'Complete Interior Solution',
      'Royalpro Industrial',
      'Heavy Fabrication',
      'Ghaziabad',
      'Noida',
      'Delhi NCR',
      ...(service.features || []),
    ],
    alternates: {
      canonical: `${SITE_URL}/services/${service.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/services/${service.slug}`,
      siteName: SITE_CONFIG.name,
      type: 'article',
      images: service.imageUrl ? [{ url: `${SITE_URL}${service.imageUrl}` }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const allServices = [...weldingServices, ...interiorServices];
  const service = allServices.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    serviceType: service.division === 'welding_industrial' ? 'Industrial Fabrication' : 'Interior Architecture',
    provider: {
      '@type': 'GeneralContractor',
      name: SITE_CONFIG.name,
      telephone: SITE_CONFIG.telephone,
      url: SITE_URL,
      logo: `${SITE_URL}/images/royalpro_logo.png`,
      address: {
        '@type': 'PostalAddress',
        ...SITE_CONFIG.address,
      },
    },
    areaServed: ['Delhi NCR', 'Ghaziabad', 'Noida', 'Faridabad', 'Gurgaon', 'Uttar Pradesh'],
    offers: {
      '@type': 'Offer',
      price: service.startingRate,
      priceCurrency: 'INR',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${SITE_URL}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `${SITE_URL}/services/${service.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs font-semibold text-slate-500">Loading service details...</div>}>
        <ServiceDetailClient service={service} />
      </Suspense>
    </>
  );
}
