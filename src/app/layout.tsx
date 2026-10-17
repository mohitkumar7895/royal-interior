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
    default: `${SITE_CONFIG.websiteName} | Factory Tin Shed Work & Complete Interior Solution`,
    template: `%s | ${SITE_CONFIG.websiteName}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.websiteName }],
  creator: SITE_CONFIG.websiteName,
  publisher: SITE_CONFIG.websiteName,
  applicationName: SITE_CONFIG.websiteName,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon-192x192.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon-precomposed.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${SITE_CONFIG.websiteName} | Factory Tin Shed Work & Complete Interior Solution`,
    description: SITE_CONFIG.description,
    url: SITE_URL,
    siteName: SITE_CONFIG.websiteName,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/royalpro_logo.png`,
        width: 512,
        height: 512,
        alt: `${SITE_CONFIG.websiteName} Official Company Logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.websiteName} | Factory Tin Shed Work & Complete Interior Solution`,
    description: SITE_CONFIG.description,
    images: [`${SITE_URL}/images/royalpro_logo.png`],
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
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Royalpro Industrial',
    alternateName: [
      'Royalpro',
      'Royalpro Industrial & Interiors',
      'Royalpro Industrial Factory Tin Shed Work & Complete Interior Solution',
    ],
    url: SITE_URL,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'HomeAndConstructionBusiness', 'GeneralContractor'],
    '@id': `${SITE_URL}/#organization`,
    name: 'Royalpro Industrial',
    legalName: SITE_CONFIG.legalName,
    alternateName: [
      SITE_CONFIG.shortName,
      'Royalpro Industrial & Interiors',
      'Royalpro Industrial Factory Tin Shed Work & Complete Interior Solution',
    ],
    description: SITE_CONFIG.description,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: `${SITE_URL}/images/royalpro_logo.png`,
      caption: 'Royalpro Industrial Official Logo',
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/images/royalpro_logo.png`,
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
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.telephone,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
    ],
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
        {/* Favicon & Touch Icon Links for Google Search & all browsers */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon-precomposed" sizes="180x180" href="/apple-touch-icon-precomposed.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Structured Data: WebSite & Organization for Google Search branding */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
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
