import type { Metadata } from 'next';
import PageBanner from '@/components/PageBanner';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact | Pierre van Ryneveld Athletics Club',
  description: 'Get in touch with PVRAC: email, location, WhatsApp groups and social media.',
};

export default function ContactPage() {
  return (
    <>
      <PageBanner title="Get In Touch" />

      <section className={styles.contact}>
        <div className="container">
          <div className={styles.contactContent}>
            <div className={styles.contactInfo}>
              <h3>Contact Information</h3>

              <div className={styles.contactDetail}>
                <span className={styles.icon}>✉️</span>
                <div>
                  <strong>Email</strong>
                  <a href="mailto:pvrsportsclub@gmail.com">pvrsportsclub@gmail.com</a>
                </div>
              </div>

              <div className={styles.contactDetail}>
                <span className={styles.icon}>📍</span>
                <div>
                  <strong>Location</strong>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Pierre+van+Ryneveld+Geloofsfamilie"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pierre van Ryneveld Geloofsfamilie
                    <br />
                    Baltimore Street, Pierre van Ryneveld
                  </a>
                </div>
              </div>

              <div className={styles.contactDetail}>
                <span className={styles.icon}>💬</span>
                <div>
                  <strong>WhatsApp Groups</strong>
                  Chatterbox • Runners Info
                  <br />
                  Club Announcements • Cycling
                  <br />
                  <small style={{ opacity: 0.7 }}>Join groups when you become a member</small>
                </div>
              </div>
            </div>

            <div className={styles.contactForm}>
              <h3>Send Us a Message</h3>
              {/* Replace YOUR_FORM_ID with a real Formspree form ID (formspree.io) before launch */}
              <form action="https://formspree.io/f/mgolrqkz" method="POST">
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name *</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone (optional)</label>
                  <input type="tel" id="phone" name="phone" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" required />
                </div>
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="New PVRAC Website Inquiry" />

                <button type="submit" className={styles.submitBtn}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.connect}>
        <div className="container">
          <h2 className="section-title on-dark">Connect With Us</h2>
          <p className={styles.connectLead}>
            Join our community on social media and stay updated
          </p>
          <div className={styles.socialLinks}>
            <a
              href="https://www.facebook.com/PvRAC"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              title="Facebook"
              aria-label="PVRAC on Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#03045e">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.strava.com/clubs/1115186"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              title="Strava"
              aria-label="PVRAC on Strava"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#03045e">
                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
