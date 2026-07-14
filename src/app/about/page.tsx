import type { Metadata } from 'next';
import PageBanner from '@/components/PageBanner';
import AboutTabs from './AboutTabs';

export const metadata: Metadata = {
  title: 'About | Pierre van Ryneveld Athletics Club',
  description:
    'Learn about Pierre van Ryneveld Athletics Club: our running, walking and cycling communities, training sessions, and where we meet in Centurion.',
};

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About Us" subtitle="Passion meets pavement" />
      <AboutTabs />
    </>
  );
}
