import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { serviceAreasList, getServiceAreaBySlug } from '@/lib/service-areas-data';
import { SITE_CONFIG, SITE_URL } from '@/lib/seo';
import { AreaDetailClient } from './AreaDetailClient';

export function generateStaticParams() {
  return serviceAreasList.map((area) => ({
    slug: area.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);

  if (!area) {
    return {
      title: 'Service Area Not Found | Royalpro',
    };
  }

  const title = area.metaTitle;
  const description = area.metaDescription;

  return {
    title,
    description,
    keywords: [
      area.name,
      `${area.name} Factory Tin Shed`,
      `${area.name} Industrial Shed`,
      `${area.name} Welding Work`,
      `${area.name} Interior Designer`,
      `${area.name} Modular Kitchen`,
      `${area.name} Balcony Pergola`,
      `${area.name} Shop Shutter`,
      `${area.name} False Ceiling`,
      'Chipiyana Tigri Gol Chakkar',
      'Nai Basti Dundahera',
      '9557323216',
      'Royalpro Industrial',
      ...area.landmarks,
    ],
    alternates: {
      canonical: `${SITE_URL}/service-areas/${area.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/service-areas/${area.slug}`,
      siteName: SITE_CONFIG.name,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/images/royalpro_logo.png`,
          width: 512,
          height: 512,
          alt: `${area.name} Industrial Fabrication & Interiors`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/images/royalpro_logo.png`],
    },
  };
}

export default async function ServiceAreaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  // LocalBusiness Schema for this specific area
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'GeneralContractor', 'HomeAndConstructionBusiness'],
    name: `Royalpro Industrial - ${area.name}`,
    description: area.description,
    url: `${SITE_URL}/service-areas/${area.slug}`,
    telephone: SITE_CONFIG.telephone,
    image: `${SITE_URL}/images/royalpro_logo.png`,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      ...SITE_CONFIG.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...SITE_CONFIG.geo,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: area.name,
      postalCode: area.pin,
    },
  };

  // FAQPage Schema
  const faqJsonLd = area.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: area.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  } : null;

  // Breadcrumb Schema
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
        name: 'Service Areas',
        item: `${SITE_URL}/service-areas`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: area.name,
        item: `${SITE_URL}/service-areas/${area.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AreaDetailClient area={area} />
    </>
  );
}
