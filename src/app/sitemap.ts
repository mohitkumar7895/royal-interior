import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { allServices } from '@/lib/services-data';
import { serviceAreasList } from '@/lib/service-areas-data';

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
      url: `${SITE_URL}/sitemap`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/service-areas`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
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

  // Dynamic 10 KM Local Area Landing Pages (Chipiyana, Tigri, Gaur City, Noida Sec 63, Crossings Republik, etc.)
  const areaPages: MetadataRoute.Sitemap = serviceAreasList.map((area) => ({
    url: `${SITE_URL}/service-areas/${area.slug}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.95,
  }));

  // Dynamic service pages (all 32+ welding & interior services)
  const servicePages: MetadataRoute.Sitemap = allServices.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Trending High-Demand Service x Local Area Landing Pages (e.g. factory shed in Chipiyana, shutter in Tigri, pergola in Gaur City)
  const topServiceSlugs = [
    'industrial-factory-tin-shed',
    'metal-fabrication-work',
    'home-interior-work',
    'modular-kitchen',
    'shop-shutter-service',
    'terrace-pergola-work',
    'ms-ss-steel-railing',
    'shop-platform',
  ];

  const serviceAreaCombinations: MetadataRoute.Sitemap = [];
  for (const sSlug of topServiceSlugs) {
    for (const area of serviceAreasList.slice(0, 25)) {
      serviceAreaCombinations.push({
        url: `${SITE_URL}/services/${sSlug}/${area.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }
  }

  return [...staticPages, ...areaPages, ...servicePages, ...serviceAreaCombinations];
}

