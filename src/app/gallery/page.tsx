import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import PageBanner from '@/components/PageBanner';
import { withBasePath } from '@/lib/basePath';
import GalleryGrid from './GalleryGrid';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Gallery | Pierre van Ryneveld Athletics Club',
  description: 'Photos from PVRAC club runs, races and social events.',
};

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

// Reads every image in /public/images/gallery at build time, so updating the
// gallery is just dropping files into that folder and pushing — no code edits.
// Files are shown newest-first by filename (descending), so a date or number
// prefix like "2026-07-parkrun.jpg" or "05-comrades.jpg" controls the order.
function getGalleryImages() {
  const dir = path.join(process.cwd(), 'public', 'images', 'gallery');

  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return []; // folder missing — render the "coming soon" state
  }

  return files
    .filter((file) => IMAGE_EXTS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))
    .map((file) => ({
      src: withBasePath(`/images/gallery/${file}`),
      alt: altFromFilename(file),
    }));
}

// Turns "2026-07-parkrun.jpg" into a readable alt/caption for screen readers.
function altFromFilename(file: string) {
  const base = file
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .trim();
  return base ? `${base} — Pierre van Ryneveld Athletics Club` : 'PVRAC gallery photo';
}

export default function GalleryPage() {
  const images = getGalleryImages();

  return (
    <>
      <PageBanner title="Gallery" subtitle="Moments from the road" />

      <section className={styles.gallery}>
        <div className="container">
          {images.length === 0 ? (
            <p className={styles.empty}>
              Photos coming soon — check back after our next event!
            </p>
          ) : (
            <GalleryGrid images={images} />
          )}
        </div>
      </section>
    </>
  );
}
