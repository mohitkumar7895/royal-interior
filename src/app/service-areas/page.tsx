import React from 'react';
import type { Metadata } from 'next';
import { ServiceAreasClient } from './ServiceAreasClient';
import { SITE_CONFIG, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: '10 KM Service Areas: Chipiyana, Tigri, Gaur City, Noida Sec 63, Ghaziabad | Royalpro 9557323216',
  description:
    '#1 Industrial Tin Shed & Complete Interior Specialists covering 10 KM radius around Tigri Gol Chakkar, Chipiyana, Yusufpur, Nai Basti Dundahera (201009). Fast on-site survey within 30 mins in Gaur City 1 & 2, Char Murti, Noida Sector 62 & 63, Crossings Republik, Siddhartha Vihar, Pratap Vihar & Lal Kuan. Call 9557323216.',
  keywords: [
    ...SITE_CONFIG.keywords,
    '10 KM Radius Service Areas',
    'Chipiyana Ghaziabad Tin Shed',
    'Tigri Gol Chakkar Welding Work',
    'Yusufpur Fabrication Service',
    'Nai Basti Dundahera Shed Maker',
    'Gaur City 1 Interior Work',
    'Gaur City 2 Tin Shed',
    'Char Murti Chowk Fabrication',
    'Noida Sector 63 Factory Shed',
    'Noida Sector 62 Office Interior',
    'Crossings Republik Turnkey Interior',
    'Siddhartha Vihar Balcony Pergola',
    'Lal Kuan Industrial Shed',
    '9557323216',
  ],
  alternates: {
    canonical: `${SITE_URL}/service-areas`,
  },
  openGraph: {
    title: '10 KM Service Areas: Chipiyana, Tigri, Gaur City, Noida Sec 63 | Royalpro 9557323216',
    description:
      'Fast on-site engineering survey within 10 km radius of Tigri Gol Chakkar, Chipiyana, Nai Basti Dundahera. Industrial factory sheds & luxury interiors. Call 9557323216.',
    url: `${SITE_URL}/service-areas`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
};

export default function ServiceAreasPage() {
  const serviceAreasJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Royalpro Industrial Factory Tin Shed Work & Complete Interior Solution',
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
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 28.628,
        longitude: 77.439,
      },
      geoRadius: '10000', // 10 KM Service Radius
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Immediate Workshop Hub (0-3 KM)',
        description: 'Chipiyana Buzurg, Tigri Gol Chakkar, Yusufpur, Nai Basti Dundahera, Crossings Republik, Shahberi, ABES NH-24, Rahul Vihar, Vijay Nagar',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Greater Noida West & Noida Extension (2-6 KM)',
        description: 'Gaur City 1, Gaur City 2, Char Murti Chowk, Ek Murti Chowk, Sector 1, Sector 4, Sector 10, Sector 16B, Sector 16C, Haibatpur, Bisrakh',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Noida Industrial & Commercial Hubs (3-8 KM)',
        description: 'Noida Sector 63, Sector 62, Sector 63A, Sector 64, Sector 65, Sector 67, Sector 68, Chhajarsi, Bahlolpur, Sector 121, Sector 122',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Ghaziabad Core & Industrial Belts (3-10 KM)',
        description: 'Siddhartha Vihar, Pratap Vihar, Lal Kuan, Chhapraula Industrial Area, Bulandshahr Road Industrial Area, Kavi Nagar Industrial Area, South Side GT Road, Wave City',
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
