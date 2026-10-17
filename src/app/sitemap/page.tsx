import React from 'react';
import type { Metadata } from 'next';
import { SitemapClient } from './SitemapClient';
import { weldingServices } from '@/lib/services-data';
import { SITE_CONFIG, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'HTML Service Sitemap & Local Area Directory | Royalpro Industrial 9557323216',
  description:
    'Complete HTML Service Sitemap for Royalpro Industrial. Direct links to all 15 Welding Work Services and 17 Complete Interior Solutions in Noida, Gaur City, Gurugram, Ghaziabad & Delhi NCR. Call 9557323216 for free site survey.',
  keywords: [
    'Royalpro Industrial Sitemap',
    'Welding Work Services Sitemap',
    'Factory Tin Shed Noida',
    'Cold Store Structure Gurgaon',
    'Gaur City Interior Work',
    'Gaur City 2 Steel Shed Fabrication',
    'Noida Sector 62 Welding Work',
    'Noida Sector 63 Factory Shed',
    'Manesar IMT Industrial Shed',
    'Ghaziabad Chipiyana Welding Work',
    '9557323216',
    ...weldingServices.map((s) => s.title),
  ],
  alternates: {
    canonical: `${SITE_URL}/sitemap`,
  },
  openGraph: {
    title: 'HTML Service Sitemap & Local Area Directory | Royalpro Industrial',
    description:
      'Explore all heavy industrial structural welding and turnkey interior services across Noida, Gaur City, Gurgaon & Ghaziabad.',
    url: `${SITE_URL}/sitemap`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
};

export default function HtmlSitemapPage() {
  const sitemapJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Royalpro Industrial All Services Sitemap',
    description: 'Complete listing of all industrial welding and turnkey interior solutions offered by Royalpro Industrial.',
    url: `${SITE_URL}/sitemap`,
    itemListElement: weldingServices.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.title,
      url: `${SITE_URL}/services/${service.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sitemapJsonLd) }}
      />
      <SitemapClient />
    </>
  );
}
