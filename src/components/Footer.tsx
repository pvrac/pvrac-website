import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';
import styles from './Footer.module.css';

// Split either side of the footer text. Dimensions are the processed file's
// natural size; CSS constrains the rendered size inside each tile.
const SPONSORS_LEFT = [
  {
    src: '/images/sponsors/abantu.png',
    alt: 'Abantu Coffee',
    href: 'https://www.abantucoffee.co.za/',
    width: 320,
    height: 132,
  },
  {
    src: '/images/sponsors/spar.png',
    alt: 'Ryneveld SuperSPAR',
    href: 'https://www.facebook.com/ryneveld.superspar/',
    width: 320,
    height: 52,
  },
];

const SPONSORS_RIGHT = [
  {
    src: '/images/sponsors/run-a-way.png',
    alt: 'Run-A-Way Sport',
    href: 'https://runawaysport.co.za/',
    width: 320,
    height: 127,
  },
  {
    src: '/images/sponsors/epic-sports.png',
    alt: 'Epic Sports Online',
    href: 'https://www.epicsportsonline.co.za/',
    width: 154,
    height: 149,
  },
  {
    src: '/images/sponsors/dental-parts.png',
    alt: 'Dental Parts SA',
    href: 'https://dentalparts.co.za/',
    width: 320,
    height: 162,
  },
];

type Sponsor = (typeof SPONSORS_LEFT)[number];

function SponsorTile({ sponsor }: { sponsor: Sponsor }) {
  return (
    <a
      className={styles.sponsorTile}
      href={sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
      title={sponsor.alt}
    >
      <Image
        src={withBasePath(sponsor.src)}
        alt={sponsor.alt}
        width={sponsor.width}
        height={sponsor.height}
      />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.sponsorGroup}>
          {SPONSORS_LEFT.map((s) => (
            <SponsorTile key={s.src} sponsor={s} />
          ))}
        </div>

        <div className={styles.footerText}>
          <p>
            &copy; {new Date().getFullYear()} Pierre van Ryneveld Athletics Club. All rights
            reserved.
          </p>
          <p className={styles.tagline}>Where Every Run Takes Flight ✈️</p>
        </div>

        <div className={styles.sponsorGroup}>
          {SPONSORS_RIGHT.map((s) => (
            <SponsorTile key={s.src} sponsor={s} />
          ))}
        </div>
      </div>
    </footer>
  );
}
