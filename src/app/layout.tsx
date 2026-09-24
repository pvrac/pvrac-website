import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { withBasePath } from '@/lib/basePath';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://pvrac.co.za'),
  openGraph: {
    type: 'website',
    siteName: 'Pierre van Ryneveld Athletics Club',
    locale: 'en_ZA',
    images: [{ url: '/images/logo.png' }],
  },
  title: 'Pierre van Ryneveld Athletics Club | Run With Us',
  description:
    'Pierre van Ryneveld Athletics Club (PVRAC): road running, walking and cycling in Centurion. Join our community, train with us, and run with us.',
  icons: {
    icon: withBasePath('/images/logo.png'),
    apple: withBasePath('/images/logo.png'),
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsClub',
  name: 'Pierre van Ryneveld Athletics Club',
  alternateName: 'PVRAC',
  url: 'https://pvrac.co.za/',
  logo: 'https://pvrac.co.za/images/logo.png',
  email: 'pvrsportsclub@gmail.com',
  sport: ['Running', 'Athletics', 'Cycling'],
  address: { '@type': 'PostalAddress', addressLocality: 'Centurion', addressCountry: 'ZA' },
  sameAs: [
    'https://www.facebook.com/PvRAC',
    'https://www.instagram.com/pvrathleticsclub/',
    'https://www.strava.com/clubs/1115186',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Montserrat:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Script
          data-goatcounter="https://pvrac.goatcounter.com/count"
          src="//gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
