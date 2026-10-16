import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { allServices } from '@/lib/services-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Static high-priority pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic service pages (all 32+ welding & interior services)
  const servicePages: MetadataRoute.Sitemap = allServices.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticPages, ...servicePages];
}
