import type { Metadata } from 'next';
import { Outfit, Cinzel } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

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
  title: 'Royalpro Industrial Factory Tin Shed Work & Complete Interior Solution',
  description:
    'Royalpro - Specialists in Heavy Duty Industrial Factory Sheds, All Welding Work, Cold Stores, and Complete Interior Solutions (Office, Home, Modular Kitchens). Call 9557323216.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${cinzel.variable} font-sans min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-amber-500 selection:text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
