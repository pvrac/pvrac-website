import Link from 'next/link';
import { withBasePath } from '@/lib/basePath';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div
          className={styles.heroPhoto}
          aria-hidden="true"
          style={{ backgroundImage: `url('${withBasePath('/images/club-event-photo.jpg')}')` }}
        />
        <div className={styles.heroContent}>
          <p className={styles.tagline}>Where Every Run Takes Flight ✈️</p>
          <p className={styles.heroLead}>
            A community of runners, walkers and cyclists in Pierre van Ryneveld, Centurion,
            pushing boundaries, supporting each other, and celebrating every kilometer together.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/membership" className="cta-button">
              Join Our Club
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.specialStrip}>
        <div className={`container ${styles.specialStripInner}`}>
          <div className={styles.specialStripText}>
            <span className={styles.specialStripFlag}>🔥 2026 Joining Special</span>
            <p className={styles.specialStripHeadline}>
              Pay <strong>R500</strong> club fee now - get the rest of 2026 <em>and</em> all
              of 2027.
            </p>
            <p className={styles.specialStripNote}>Excludes the R230 ASA license fee.</p>
          </div>
          <Link href="/membership" className={styles.specialStripCta}>
            Claim The Special
          </Link>
        </div>
      </section>

      <section className={styles.intro}>
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <div className={styles.introText}>
            <p>
              Welcome to Pierre van Ryneveld Athletics Club, where passion meets pavement and
              every stride takes you higher. We&apos;re more than just a running club: we&apos;re
              a community of athletes who believe in pushing boundaries, supporting each other,
              and celebrating every kilometer.
            </p>
            <div className={styles.activitiesList}>
              <span className={styles.activityTag}>🏃 Road Running</span>
              <span className={styles.activityTag}>🚶 Walking</span>
              <span className={styles.activityTag}>🚴 Cycling</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.trainingSnapshot}>
        <div className="container">
          <h2 className="section-title on-dark">Training Sessions</h2>

          <div className={styles.disciplineBlock}>
            <h3 className={styles.disciplineHeading}>
              <span className={styles.disciplineIcon}>🏃</span> Running &amp; Walking
            </h3>
            <div className={styles.trainingGrid}>
              <div className={styles.trainingCard}>
                <strong>Tuesdays &amp; Thursdays</strong>
                17:30 | Club Runs
                <span>From the Church, Baltimore Street</span>
              </div>
              <div className={styles.trainingCard}>
                <strong>Saturday Mornings</strong>
                06:30 | Long Runs &amp; Social Km&apos;s
                <span>Meet at Abantu Coffee, Pierre van Ryneveld</span>
              </div>
              <div className={styles.trainingCard}>
                <strong>⏱️ Time Trials</strong>
                Every 2nd &amp; last Tuesday of the month
                <span>Test your fitness and track your progress!</span>
              </div>
            </div>
          </div>

          <div className={styles.disciplineBlock}>
            <h3 className={`${styles.disciplineHeading} ${styles.disciplineHeadingCycling}`}>
              <span className={styles.disciplineIcon}>🚴</span> Cycling
            </h3>
            <div className={styles.trainingGrid}>
              <div className={`${styles.trainingCard} ${styles.trainingCardCycling}`}>
                <strong>Tuesdays &amp; Thursdays</strong>
                17:30 | Easy 10-12 km around PvR
                <span>From the Church, Baltimore Street &middot; Winter start 17:15</span>
              </div>
              <div className={`${styles.trainingCard} ${styles.trainingCardCycling}`}>
                <strong>Saturday Mornings</strong>
                06:00 | Choose your distance
                <span className={styles.distanceRow}>
                  <span className={styles.distancePill}>16 km</span>
                  <span className={styles.distancePill}>21 km</span>
                  <span className={styles.distancePill}>50 km</span>
                  <span className={styles.distancePill}>60 km+</span>
                </span>
                <span>Meet at Abantu Coffee &middot; Winter start 07:00</span>
              </div>
              <div className={`${styles.trainingCard} ${styles.trainingCardCycling}`}>
                <strong>🛡️ No-Drop Rides</strong>
                Road bikes and MTBs equally welcome
                <span>Safe, social riding - nobody gets left behind.</span>
              </div>
            </div>
          </div>

          <Link href="/about" className="cta-button secondary">
            Full Details &amp; Location
          </Link>
        </div>
      </section>

      <section className={styles.quickLinks}>
        <div className="container">
          <h2 className="section-title">Explore The Club</h2>
          <div className={styles.cardGrid}>
            <Link href="/membership" className={styles.card}>
              <div className={styles.cardIcon}>📋</div>
              <h3>Membership</h3>
              <p>Pricing, how to join, and forms to download. Become a member today.</p>
            </Link>
            <Link href="/club-kit" className={styles.card}>
              <div className={styles.cardIcon}>🎽</div>
              <h3>Club Kit</h3>
              <p>Vests and tees to represent PVRAC in style, on and off the road.</p>
            </Link>
            <Link href="/gallery" className={styles.card}>
              <div className={styles.cardIcon}>📸</div>
              <h3>Gallery</h3>
              <p>Photos from club runs, races and social events.</p>
            </Link>
            <Link href="/calendar" className={styles.card}>
              <div className={styles.cardIcon}>📅</div>
              <h3>Calendar</h3>
              <p>Upcoming races and club events, plus results from recent races.</p>
            </Link>
            <Link href="/contact" className={styles.card}>
              <div className={styles.cardIcon}>✉️</div>
              <h3>Contact</h3>
              <p>Get in touch, find us on social media, or send us a message.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
