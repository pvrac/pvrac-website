import type { Metadata } from 'next';
import Image from 'next/image';
import PageBanner from '@/components/PageBanner';
import { withBasePath } from '@/lib/basePath';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Gallery | Pierre van Ryneveld Athletics Club',
  description: 'Photos from PVRAC club runs, races and social events.',
};

const GALLERY_IMAGES = [
  { src: withBasePath('/images/gallery-1.jpg'), alt: 'PVRAC runner in action during a race' },
  { src: withBasePath('/images/gallery-2.jpg'), alt: 'PVRAC club members with race medals' },
  {
    src: withBasePath('/images/gallery-3.jpg'),
    alt: 'PVRAC club group photo after a run and cycle',
  },
];

export default function GalleryPage() {
  return (
    <>
      <PageBanner title="Gallery" subtitle="Moments from the road" />

      <section className={styles.gallery}>
        <div className="container">
          <div className={styles.galleryGrid}>
            {GALLERY_IMAGES.map((image) => (
              <div className={styles.galleryItem} key={image.src}>
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
