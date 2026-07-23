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
            <Link href="/about" className="cta-button secondary">
              Learn More
            </Link>
          </div>
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
          <div className={styles.trainingGrid}>
            <div className={styles.trainingCard}>
              <strong>Tuesdays &amp; Thursdays</strong>
              17:20 | Club Runs
              <span>From the Church, Baltimore Street</span>
            </div>
            <div className={styles.trainingCard}>
              <strong>Saturday Mornings</strong>
              06:00 | Long Runs &amp; Social Km&apos;s
              <span>Meet at Abantu Coffee, Pierre van Ryneveld</span>
            </div>
            <div className={styles.trainingCard}>
              <strong>⏱️ Time Trials</strong>
              Every 2nd &amp; last Tuesday of the month
              <span>Test your fitness and track your progress!</span>
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
              <div className={styles.cardIcon}>🎽</div>
              <h3>Membership</h3>
              <p>Pricing, how to join, and forms to download. Become a member today.</p>
            </Link>
            <Link href="/club-kit" className={styles.card}>
              <div className={styles.cardIcon}>👕</div>
              <h3>Club Kit</h3>
              <p>Vests and tees to represent PVRAC in style, on and off the road.</p>
            </Link>
            <Link href="/gallery" className={styles.card}>
              <div className={styles.cardIcon}>📸</div>
              <h3>Gallery</h3>
              <p>Photos from club runs, races and social events.</p>
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
