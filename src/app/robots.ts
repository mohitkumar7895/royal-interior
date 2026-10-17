import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/favicon.ico',
          '/favicon.png',
          '/favicon-*.png',
          '/apple-touch-icon.png',
          '/apple-touch-icon-precomposed.png',
          '/site.webmanifest',
          '/images/',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/login',
          '/register',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/',
          '/images/',
          '/favicon.ico',
          '/favicon.png',
          '/favicon-*.png',
          '/apple-touch-icon.png',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
