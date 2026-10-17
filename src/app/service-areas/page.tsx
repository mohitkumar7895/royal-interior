import React from 'react';
import type { Metadata } from 'next';
import { ServiceAreasClient } from './ServiceAreasClient';
import { SITE_CONFIG, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Service Areas: Noida, Gaur City, Gurugram, Ghaziabad | Royalpro 9557323216',
  description:
    'Royalpro Industrial active service areas across Noida (Sec 62, 63, 18, 150), Gaur City 1 & 2 (Gr. Noida West), Gurugram (Manesar, Udyog Vihar), Ghaziabad & Delhi NCR. Industrial tin sheds, PEB steel works, and luxury turnkey interiors. Call 9557323216.',
  keywords: [
    'Royalpro Service Areas',
    'Industrial Tin Shed Noida',
    'Factory Shed Noida Sector 62',
    'Welding Work Noida Sector 63',
    'Gaur City Interior Work',
    'Gaur City 2 Tin Shed Fabrication',
    'Char Murti Greater Noida West Welding',
    'Gurgaon Factory Tin Shed',
    'Manesar IMT Industrial Sheds',
    'Udyog Vihar Warehouse Shed',
    'Ghaziabad Chipiyana Welding Work',
    'Tigri Gol Chakkar Metal Works',
    'Crossing Republik Interiors',
    'Sahibabad Industrial Sheds',
    '9557323216',
  ],
  alternates: {
    canonical: `${SITE_URL}/service-areas`,
  },
  openGraph: {
    title: 'Service Areas: Noida, Gaur City, Gurugram, Ghaziabad | Royalpro 9557323216',
    description:
      'Explore all industrial fabrication, tin sheds, cold storage, and turnkey interior coverage across Delhi NCR.',
    url: `${SITE_URL}/service-areas`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
};

export default function ServiceAreasPage() {
  const serviceAreasJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Royalpro Industrial',
    image: `${SITE_URL}/images/royalpro_logo.png`,
    telephone: '+919557323216',
    url: `${SITE_URL}/service-areas`,
    priceRange: '₹₹',
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
    areaServed: [
      {
        '@type': 'City',
        name: 'Noida',
        description: 'Sector 62, Sector 63, Sector 18, Sector 150, Sector 137, Sector 75, Sector 142',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Gaur City & Greater Noida West',
        description: 'Gaur City 1, Gaur City 2, Char Murti Chowk, Techzone 4, Knowledge Park 5, Pari Chowk',
      },
      {
        '@type': 'City',
        name: 'Gurugram',
        description: 'Udyog Vihar Phase 1-5, Manesar IMT, DLF Cyber City, Sohna Road, Sector 29',
      },
      {
        '@type': 'City',
        name: 'Ghaziabad',
        description: 'Chipiyana, Tigri Gol Chakkar, Crossing Republik, Sahibabad Site 4, Mohan Nagar, Kavi Nagar',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceAreasJsonLd) }}
      />
      <ServiceAreasClient />
    </>
  );
}
