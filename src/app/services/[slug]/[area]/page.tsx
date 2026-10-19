import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { weldingServices, interiorServices, allServices } from '@/lib/services-data';
import { serviceAreasList, getServiceAreaBySlug } from '@/lib/service-areas-data';
import { SITE_CONFIG, SITE_URL } from '@/lib/seo';
import { ServiceAreaDetailClient } from './ServiceAreaDetailClient';



// Pre-render top popular combinations for fast static serving
export function generateStaticParams() {
  const topServices = [
    'industrial-factory-tin-shed',
    'metal-fabrication-work',
    'home-interior-work',
    'modular-kitchen',
    'shop-shutter-service',
    'terrace-pergola-work',
    'ms-ss-steel-railing',
    'shop-platform',
  ];

  const params: { slug: string; area: string }[] = [];

  for (const sSlug of topServices) {
    for (const a of serviceAreasList.slice(0, 25)) {
      params.push({
        slug: sSlug,
        area: a.slug,
      });
    }
  }

  return params;
}

interface PageProps {
  params: Promise<{ slug: string; area: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, area: areaSlug } = await params;

  const service = allServices.find((s) => s.slug === slug);
  const area = getServiceAreaBySlug(areaSlug);

  if (!service || !area) {
    return {
      title: 'Service Not Found | Royalpro',
    };
  }

  const title = `${service.title} in ${area.name} (Survey: ${area.responseTime}) | Royalpro 9557323216`;
  const description = `Best ${service.title.toLowerCase()} service in ${area.name} (${area.pin}). Free on-site survey engineer dispatched in ${area.responseTime} from Chipiyana Tigri Gol Chakkar base. ${service.tagline}. High-tensile certified materials & 15-year warranty. Call 9557323216.`;

  const canonicalUrl = `${SITE_URL}/services/${service.slug}/${area.slug}`;

  return {
    title,
    description,
    keywords: [
      `${service.title} ${area.name}`,
      `${service.title} near me ${area.name}`,
      `${service.title} price in ${area.name}`,
      `Best ${service.title.toLowerCase()} contractor in ${area.name}`,
      `${area.name} welding work`,
      `${area.name} factory tin shed`,
      `${area.name} interior decorator`,
      `${area.name} rolling shutter repair`,
      'Chipiyana Tigri Gol Chakkar',
      '9557323216',
      'Royalpro Industrial',
      ...area.landmarks,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      type: 'website',
      images: [
        {
          url: service.imageUrl || `${SITE_URL}/images/factory_tin_shed.jpg`,
          width: 1200,
          height: 630,
          alt: `${service.title} in ${area.name} - Royalpro`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [service.imageUrl || `${SITE_URL}/images/factory_tin_shed.jpg`],
    },
  };
}

export default async function ServiceAreaPage({ params }: PageProps) {
  const { slug, area: areaSlug } = await params;

  const service = allServices.find((s) => s.slug === slug);
  const area = getServiceAreaBySlug(areaSlug);

  if (!service || !area) {
    notFound();
  }

  // Schema: Service + LocalBusiness JSON-LD
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.title} in ${area.name}`,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: SITE_CONFIG.name,
      telephone: '+919557323216',
      url: SITE_URL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Chipiyana, Tigri Gol Chakkar, Yusufpur, Nai Basti Dundahera',
        addressLocality: 'Ghaziabad',
        addressRegion: 'Uttar Pradesh',
        postalCode: '201009',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 28.628,
        longitude: 77.439,
      },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: area.name,
      },
    },
    areaServed: {
      '@type': 'Place',
      name: area.name,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} Pricing & Packages in ${area.name}`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.title,
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: service.startingRate ? service.startingRate.replace(/[^0-9]/g, '') : '220',
            priceCurrency: 'INR',
          },
        },
      ],
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
      {
        '@type': 'ListItem',
        position: 4,
        name: area.name,
        item: `${SITE_URL}/services/${service.slug}/${area.slug}`,
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
      <Suspense fallback={<div className="min-h-screen bg-slate-900" />}>
        <ServiceAreaDetailClient service={service} area={area} />
      </Suspense>
    </>
  );
}
