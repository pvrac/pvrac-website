import type { Metadata } from 'next';
import PageBanner from '@/components/PageBanner';
import { withBasePath } from '@/lib/basePath';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Membership | Pierre van Ryneveld Athletics Club',
  description: 'PVRAC membership pricing, how to join, and downloadable forms.',
};

export default function MembershipPage() {
  return (
    <>
      <PageBanner title="Join Our Community" subtitle="Become Part Of The PVRAC Family" />

      <section className={styles.membership}>
        <div className="container">
          <h2 className="section-title on-dark">Membership Pricing</h2>

          <div className={styles.membershipGrid}>
            <div className={styles.pricingCard}>
              <h3>Senior Membership</h3>
              <div className={styles.price}>R580</div>
              <div className={styles.priceBreakdown}>
                <div>Club Fee: R350</div>
                <div>ASA License: R230</div>
              </div>
              <p>
                Full competitive membership with ASA racing license. Compete for trophies and
                prizes at all club events and official races.
              </p>
            </div>

            <div className={styles.pricingCard}>
              <h3>Junior Membership</h3>
              <div className={styles.price}>R480</div>
              <div className={styles.priceBreakdown}>
                <div>Club Fee: R350</div>
                <div>ASA License: R130</div>
              </div>
              <p>
                For athletes under 18 years. Full competitive membership including junior racing
                license and trophy eligibility.
              </p>
            </div>

            <div className={styles.pricingCard}>
              <h3>Social Membership</h3>
              <div className={styles.price}>R350</div>
              <div className={styles.priceBreakdown}>
                <div>Club Fee Only</div>
                <div>(No ASA License)</div>
              </div>
              <p>
                Full access to all club activities, training sessions, and prizes. Only
                difference: social members cannot win trophies.
              </p>
            </div>
          </div>

          <div className={styles.joiningProcess}>
            <h3>How to Join</h3>
            <ul className={styles.processSteps}>
              <li data-step="1">
                Register on the{' '}
                <a href="https://asa.saclubs.co.za/register" target="_blank" rel="noopener noreferrer">
                  ASA website
                </a>
                <br />
                <small>
                  Choose: <strong>Athletics Gauteng North</strong> as province and{' '}
                  <strong>Pierre van Ryneveld</strong> as club
                </small>
              </li>
              <li data-step="2">
                Complete the ASA 2026 License form
                <br />
                <small>Official Athletics South Africa registration document</small>
              </li>
              <li data-step="3">
                Complete the PVR AC membership form
                <br />
                <small>Club-specific application with WhatsApp group preferences</small>
              </li>
              <li data-step="4">
                Email forms + proof of payment to:
                <br />
                <a href="mailto:pvrsportsclub@gmail.com">pvrsportsclub@gmail.com</a>
                <br />
                <small>⚠️ Payment proof is required - application won&apos;t be processed without it</small>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.forms}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Download Forms</h2>
          <p className={styles.formsIntro}>Download and complete these forms to join PVRAC</p>

          <div className={styles.formsGrid}>
            <div className={styles.formCard}>
              <div className={styles.formIcon}>📄</div>
              <h3>ASA License Form</h3>
              <p>Official Athletics South Africa permanent license application form for 2026</p>
              <a href={withBasePath('/forms/ASA-License-Form.pdf')} download className={styles.downloadBtn}>
                📥 Download PDF
              </a>
            </div>

            <div className={styles.formCard}>
              <div className={styles.formIcon}>📄</div>
              <h3>PVRAC Application Form</h3>
              <p>Pierre van Ryneveld Athletics Club membership application and indemnity form</p>
              <a href={withBasePath('/forms/PVR-Application-Form.pdf')} download className={styles.downloadBtn}>
                📥 Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
