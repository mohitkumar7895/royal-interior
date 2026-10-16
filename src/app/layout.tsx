import type { Metadata } from 'next';
import { Outfit, Cinzel } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { SITE_CONFIG, SITE_URL } from '@/lib/seo';
import { weldingServices, interiorServices } from '@/lib/services-data';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
});

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_CONFIG.name}`,
    template: `%s | ${SITE_CONFIG.shortName}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_URL,
    siteName: SITE_CONFIG.name,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: SITE_CONFIG.googleSiteVerification,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['HomeAndConstructionBusiness', 'GeneralContractor'],
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.shortName,
    description: SITE_CONFIG.description,
    url: SITE_URL,
    telephone: SITE_CONFIG.telephone,
    email: SITE_CONFIG.email,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      ...SITE_CONFIG.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...SITE_CONFIG.geo,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    areaServed: [
      'Ghaziabad',
      'Noida',
      'Greater Noida',
      'Delhi NCR',
      'Faridabad',
      'Gurugram',
      'Uttar Pradesh',
      'Haryana',
      'India',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Industrial Shed & Interior Solutions Catalogue',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Welding Work Services',
          itemListElement: weldingServices.slice(0, 8).map((s) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: s.title,
              description: s.description,
              url: `${SITE_URL}/services/${s.slug}`,
            },
          })),
        },
        {
          '@type': 'OfferCatalog',
          name: 'Services List (Complete Interior Solutions)',
          itemListElement: interiorServices.slice(0, 8).map((s) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: s.title,
              description: s.description,
              url: `${SITE_URL}/services/${s.slug}`,
            },
          })),
        },
      ],
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} ${cinzel.variable} font-sans min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-amber-500 selection:text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
