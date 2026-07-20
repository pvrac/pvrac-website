import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { withBasePath } from '@/lib/basePath';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pierre van Ryneveld Athletics Club | Run With Us',
  description:
    'Pierre van Ryneveld Athletics Club (PVRAC): road running, walking and cycling in Centurion. Join our community, train with us, and run with us.',
  icons: {
    icon: withBasePath('/images/logo.png'),
    apple: withBasePath('/images/logo.png'),
  },
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
