import type { Metadata } from 'next';
import { SITE_CONFIG, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact Us & Free Site Survey | Royalpro Industrial & Interiors',
  description:
    'Contact Royalpro project engineers directly at 9557323216 for free site survey, structural shed drawings, and turnkey interior estimates. Workshop in Chipiyana, Ghaziabad (NCR).',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact Us & Free Site Survey | Royalpro',
    description:
      'Book a free on-site survey and consult directly with master fabricators and architectural interior engineers. Call 9557323216.',
    url: `${SITE_URL}/contact`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
