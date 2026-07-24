import type { Metadata } from 'next';
import PageBanner from '@/components/PageBanner';
import { EVENTS } from '@/data/events';
import CalendarView from './CalendarView';

export const metadata: Metadata = {
  title: 'Calendar | Pierre van Ryneveld Athletics Club',
  description:
    'Upcoming races and club events for Pierre van Ryneveld Athletics Club, plus results and photos from recent races.',
};

export default function CalendarPage() {
  // Captured at build time; CalendarView switches to the visitor's real date on
  // mount so "upcoming" stays accurate between deploys.
  const buildDateISO = new Date().toISOString();

  return (
    <>
      <PageBanner title="Calendar" subtitle="Races &amp; Club Events" />
      <CalendarView events={EVENTS} buildDateISO={buildDateISO} />
    </>
  );
}
