'use client';

import { useEffect, useState, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';
import type { ClubEvent } from '@/data/events';
import styles from './page.module.css';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Work with 'YYYY-MM-DD' strings directly to avoid any timezone shifting that
// `new Date('YYYY-MM-DD')` can introduce. String comparison of ISO dates is
// chronological, which is all the filtering needs.
function toDateStr(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function parts(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return { y, m, d };
}
function longDate(dateStr: string) {
  const { y, m, d } = parts(dateStr);
  return `${d} ${MONTHS_SHORT[m - 1]} ${y}`;
}
function monthKey(dateStr: string) {
  const { y, m } = parts(dateStr);
  return `${y}-${String(m).padStart(2, '0')}`;
}
function monthLabel(dateStr: string) {
  const { y, m } = parts(dateStr);
  return `${MONTHS[m - 1]} ${y}`;
}

type Filter = 'all' | 'race' | 'event';
const isEvent = (e: ClubEvent) => e.type === 'event';

export default function CalendarView({
  events,
  buildDateISO,
}: {
  events: ClubEvent[];
  buildDateISO: string;
}) {
  // First render uses the build date (matches the server-rendered HTML, so no
  // hydration mismatch); after mount we switch to the visitor's real "today",
  // keeping "upcoming" accurate even between deploys.
  const [todayStr, setTodayStr] = useState(() => toDateStr(new Date(buildDateISO)));
  useEffect(() => setTodayStr(toDateStr(new Date())), []);
  const [filter, setFilter] = useState<Filter>('all');
  const [viewing, setViewing] = useState<ClubEvent | null>(null);

  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const hasEvents = sorted.some(isEvent);
  const shown = sorted.filter((e) => filter === 'all' || (filter === 'event') === isEvent(e));
  const upcoming = shown.filter((e) => e.date >= todayStr);
  // "Latest race" only ever highlights races, never club events
  const past = sorted.filter((e) => e.date < todayStr && !isEvent(e)).reverse(); // most recent first
  const recap = past.find((e) => e.photo || e.resultsUrl);

  const groups: { key: string; label: string; items: ClubEvent[] }[] = [];
  for (const e of upcoming) {
    const key = monthKey(e.date);
    let group = groups.find((g) => g.key === key);
    if (!group) {
      group = { key, label: monthLabel(e.date), items: [] };
      groups.push(group);
    }
    group.items.push(e);
  }

  return (
    <section className={styles.calendar}>
      <div className="container">
        {recap && <RecapCard event={recap} />}

        {hasEvents && (
          <div className={styles.filters} role="group" aria-label="Filter calendar">
            {(['all', 'race', 'event'] as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All' : f === 'race' ? 'Races' : 'Club Events'}
              </button>
            ))}
          </div>
        )}

        {groups.length === 0 ? (
          <p className={styles.empty}>
            {filter === 'event'
              ? 'No upcoming club events listed right now — check back soon!'
              : 'No upcoming races listed right now — check back soon!'}
          </p>
        ) : (
          groups.map((group) => (
            <div className={styles.monthGroup} key={group.key}>
              <h2 className={styles.monthHeading}>{group.label}</h2>
              <div className={styles.eventList}>
                {group.items.map((event, i) => (
                  <EventCard
                    key={`${event.date}-${event.title}-${i}`}
                    event={event}
                    onOpen={() => setViewing(event)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      {viewing && <PhotoModal event={viewing} onClose={() => setViewing(null)} />}
    </section>
  );
}

function PhotoModal({ event, onClose }: { event: ClubEvent; onClose: () => void }) {
  // Close on Escape and stop the page behind from scrolling while open
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  // Rendered into <body>: the calendar section has a backdrop-filter, which would
  // otherwise make this "fixed" overlay position itself relative to the section
  // instead of the browser window.
  return createPortal(
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={event.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.modalClose} onClick={onClose} aria-label="Close">
          ×
        </button>
        {event.photo && (
          <div className={styles.modalImageWrap}>
            <Image
              src={withBasePath(event.photo)}
              alt={event.title}
              width={1600}
              height={1200}
              sizes="90vw"
              className={styles.modalImage}
            />
          </div>
        )}
        <div className={styles.modalCaption}>
          <h3 className={styles.modalTitle}>{event.title}</h3>
          <p className={styles.modalMeta}>
            {longDate(event.date)}
            {event.location ? ` · ${event.location}` : ''}
          </p>
          {event.description && <p className={styles.modalDesc}>{event.description}</p>}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function RecapCard({ event }: { event: ClubEvent }) {
  return (
    <div className={`${styles.recap} ${event.photo ? '' : styles.recapNoPhoto}`}>
      {event.photo && (
        <div className={styles.recapPhoto}>
          <Image src={withBasePath(event.photo)} alt={event.title} fill sizes="(max-width: 768px) 100vw, 45vw" />
        </div>
      )}
      <div className={styles.recapBody}>
        <span className={styles.recapLabel}>Latest race</span>
        <h2 className={styles.recapTitle}>{event.title}</h2>
        <p className={styles.recapMeta}>
          {longDate(event.date)}
          {event.location ? ` · ${event.location}` : ''}
        </p>
        {event.resultsUrl && (
          <a
            className={styles.resultsBtn}
            href={event.resultsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Results →
          </a>
        )}
      </div>
    </div>
  );
}

function EventCard({ event, onOpen }: { event: ClubEvent; onOpen: () => void }) {
  const { d, m } = parts(event.date);
  const club = isEvent(event);
  const clickable = club && !!event.photo;
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  };
  return (
    <div
      className={`${styles.eventCard} ${club ? styles.clubEvent : ''} ${clickable ? styles.clickable : ''}`}
      {...(clickable && {
        role: 'button',
        tabIndex: 0,
        'aria-label': `${event.title} - view photo`,
        onClick: onOpen,
        onKeyDown: onKey,
      })}
    >
      <div className={styles.dateBadge} aria-hidden="true">
        <span className={styles.dateDay}>{d}</span>
        <span className={styles.dateMonth}>{MONTHS_SHORT[m - 1]}</span>
      </div>

      <div className={styles.eventInfo}>
        <h3 className={styles.eventTitle}>
          {club && <span className={styles.eventTag}>Club Event</span>}
          {event.title}
        </h3>
        {event.location && <p className={styles.eventLoc}>📍 {event.location}</p>}
        {event.description && <p className={styles.eventDesc}>{event.description}</p>}
        {event.distances && event.distances.length > 0 && (
          <div className={styles.chips}>
            {event.distances.map((dist) => (
              <span className={styles.chip} key={dist}>
                {dist}
              </span>
            ))}
          </div>
        )}
        {event.note && <p className={styles.eventNote}>{event.note}</p>}
      </div>

      {((!club && event.registrationUrl) || event.resultsUrl) && (
        <div className={styles.eventActions}>
          {!club && event.registrationUrl && (
            <a
              className={styles.btnPrimary}
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enter
            </a>
          )}
          {event.resultsUrl && (
            <a
              className={styles.btnGhost}
              href={event.resultsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Results
            </a>
          )}
        </div>
      )}
      {club && event.photo && (
        <div className={styles.eventPhoto}>
          <Image src={withBasePath(event.photo)} alt={event.title} fill sizes="(max-width: 768px) 100vw, 220px" />
          <span className={styles.eventPhotoHint}>View photo</span>
        </div>
      )}
    </div>
  );
}
