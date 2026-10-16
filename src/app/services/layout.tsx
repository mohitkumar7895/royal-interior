import type { Metadata } from 'next';
import { SITE_CONFIG, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'All Industrial Fabrication & Interior Services | Royalpro',
  description:
    'Explore our complete catalogue of 32+ heavy industrial welding, factory tin sheds, PEB steel structures, cold stores, and turnkey interior design solutions in Delhi NCR & Pan India.',
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: 'All Industrial Fabrication & Interior Services | Royalpro',
    description:
      'Complete catalogue of heavy industrial tin sheds, PEB steel fabrication, cold stores, sports academy sheds, and turnkey interior design services.',
    url: `${SITE_URL}/services`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
