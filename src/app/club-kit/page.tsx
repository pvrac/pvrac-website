import type { Metadata } from 'next';
import Image from 'next/image';
import PageBanner from '@/components/PageBanner';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Club Kit | Pierre van Ryneveld Athletics Club',
  description: 'PVRAC club kit: athletics vests and t-shirts, and the club cycling jersey, with pricing and how to order.',
};

export default function ClubKitPage() {
  return (
    <>
      <PageBanner title="Club Kit" subtitle="Look sharp, run fast, ride strong" />

      <section className={styles.clubKit}>
        <div className="container">
          {/* Athletics kit */}
          <div className={styles.kitContent}>
            <div className={styles.kitImage}>
              <Image
                src="/images/club-kit.png"
                alt="PVRAC athletics club vest, front"
                width={834}
                height={976}
              />
            </div>

            <div className={styles.kitInfo}>
              <h3>Athletics Kit</h3>
              <div className={styles.kitPrice}>R350</div>
              <p>
                Represent Pierre van Ryneveld Athletics Club in style with our premium running
                kit.
              </p>

              <ul className={styles.kitItems}>
                <li>
                  <strong>Vests</strong> - Lightweight racing singlets
                </li>
                <li>
                  <strong>Short Sleeve T-Shirts</strong> - Round or V-neck
                </li>
                <li>
                  <strong>Long Sleeve T-Shirts</strong> - Round or V-neck
                </li>
              </ul>
            </div>
          </div>

          {/* Cycling kit (image on the right) */}
          <div className={`${styles.kitContent} ${styles.reversed}`}>
            <div className={styles.kitImage}>
              <Image
                src="/images/cycle-kit.png"
                alt="PVRAC cycling jersey, front"
                width={465}
                height={551}
              />
            </div>

            <div className={styles.kitInfo}>
              <h3>Cycling Kit</h3>
              <div className={styles.kitPrice}>R600</div>
              <p>
                Hit the road in our club cycling jersey, designed for comfort and built for long
                days in the saddle.
              </p>

              <ul className={styles.kitItems}>
                <li>
                  <strong>Club Cycling Jersey</strong> - Short sleeve, full club design
                </li>
              </ul>
            </div>
          </div>

          {/* Shared order info */}
          <div className={styles.orderCallout}>
            <strong>How to Order</strong>
            Email your order details and proof of payment to{' '}
            <a href="mailto:pvrsportsclub@gmail.com">pvrsportsclub@gmail.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
