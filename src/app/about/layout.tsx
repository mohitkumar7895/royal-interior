import type { Metadata } from 'next';
import { SITE_CONFIG, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About Us | Royalpro Industrial Factory Tin Shed & Complete Interior Solution',
  description:
    'Learn about Royalpro - North India’s premier industrial steel fabrication and turnkey interior execution company. Over 15+ years experience in heavy PEB sheds, cold storages, luxury homes, and commercial offices.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About Us | Royalpro Industrial & Interior Solutions',
    description:
      'Premier industrial steel fabrication and turnkey interior execution company in Ghaziabad, Noida, Delhi NCR.',
    url: `${SITE_URL}/about`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
