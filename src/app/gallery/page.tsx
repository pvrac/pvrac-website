import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import PageBanner from '@/components/PageBanner';
import { withBasePath } from '@/lib/basePath';
import GalleryGrid, { type GalleryImage } from './GalleryGrid';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Gallery | Pierre van Ryneveld Athletics Club',
  description: 'Photos from PVRAC club runs, races and social events, sorted by event.',
};

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

// The evergreen album. Always sorts last, below the dated events.
const GENERAL_FOLDER = 'general';

// Matches a "2026-08-" or "2026-08-14-" prefix on an album folder name.
const DATE_PREFIX = /^(\d{4})-(\d{2})(?:-(\d{2}))?-?/;

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

type Album = {
  slug: string;
  title: string;
  date?: string;
  description?: string;
  images: GalleryImage[];
};

// Optional per-folder _album.json. Every field is optional — a folder with no
// _album.json at all still renders, using a title derived from its name.
type AlbumMeta = {
  title?: string;
  date?: string;
  description?: string;
};

const GALLERY_DIR = path.join(process.cwd(), 'public', 'images', 'gallery');

/**
 * Reads the gallery at build time. Each subfolder of public/images/gallery is
 * one album (event), so adding an event is just: make a folder, drop photos in,
 * push. No code changes.
 *
 * Loose images sitting directly in public/images/gallery (rather than in a
 * subfolder) are still picked up and shown in the general album, so dropping a
 * photo in the wrong place degrades gracefully instead of vanishing.
 */
function getAlbums(): Album[] {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(GALLERY_DIR, { withFileTypes: true });
  } catch {
    return []; // folder missing — render the "coming soon" state
  }

  const albums = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => readAlbum(entry.name))
    .filter((album): album is Album => album !== null);

  const loose = readImages(GALLERY_DIR, '');
  if (loose.length > 0) {
    const general = albums.find((album) => album.slug === GENERAL_FOLDER);
    if (general) general.images = [...general.images, ...loose];
    else albums.push({ slug: GENERAL_FOLDER, title: 'Club Life', images: loose });
  }

  return albums.sort(compareAlbums);
}

function readAlbum(folder: string): Album | null {
  const images = readImages(path.join(GALLERY_DIR, folder), `${folder}/`);
  if (images.length === 0) return null; // empty folder — nothing to show

  const meta = readAlbumMeta(folder);
  const { title, date } = titleAndDateFromFolder(folder);

  return {
    slug: folder,
    title: meta.title || title,
    date: meta.date || date,
    description: meta.description,
    images,
  };
}

function readAlbumMeta(folder: string): AlbumMeta {
  try {
    const raw = fs.readFileSync(path.join(GALLERY_DIR, folder, '_album.json'), 'utf8');
    return JSON.parse(raw) as AlbumMeta;
  } catch {
    return {}; // no _album.json, or it's malformed — fall back to the folder name
  }
}

// Photos sort by filename, ascending — the album itself carries the recency
// ordering, so within one event the natural order is the order things
// happened. Number the files ("01-setup.webp", "02-kids-race.webp") to control
// it; unnumbered files fall in alphabetical order after them.
function readImages(dir: string, prefix: string): GalleryImage[] {
  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }

  return files
    .filter((file) => IMAGE_EXTS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => ({
      src: withBasePath(`/images/gallery/${prefix}${file}`),
      alt: altFromFilename(file),
    }));
}

// "2026-08-community-event" -> { title: "Community Event", date: "August 2026" }
// "club-championships"      -> { title: "Club Championships" }
function titleAndDateFromFolder(folder: string) {
  const match = folder.match(DATE_PREFIX);
  const rest = match ? folder.slice(match[0].length) : folder;

  let date: string | undefined;
  if (match) {
    const month = MONTHS[Number(match[2]) - 1];
    if (month) date = match[3] ? `${Number(match[3])} ${month} ${match[1]}` : `${month} ${match[1]}`;
  }

  return { title: titleCase(rest) || titleCase(folder), date };
}

function titleCase(slug: string) {
  return slug
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Turns "01-kids-race.webp" into readable alt text for screen readers, dropping
// any leading ordering prefix ("01-", "2026-08-14-") that isn't part of the name.
function altFromFilename(file: string) {
  const base = file
    .replace(/\.[^.]+$/, '')
    .replace(DATE_PREFIX, '')
    .replace(/^\d+[-_]+/, '')
    .replace(/[-_]+/g, ' ')
    .trim();
  return base ? `${base} — Pierre van Ryneveld Athletics Club` : 'PVRAC gallery photo';
}

// Dated albums first, newest to oldest; then undated ones alphabetically; the
// general album always last, since it isn't tied to a single event.
function compareAlbums(a: Album, b: Album) {
  if (a.slug === GENERAL_FOLDER) return 1;
  if (b.slug === GENERAL_FOLDER) return -1;

  const aDated = DATE_PREFIX.test(a.slug);
  const bDated = DATE_PREFIX.test(b.slug);
  if (aDated !== bDated) return aDated ? -1 : 1;
  if (aDated) return b.slug.localeCompare(a.slug);
  return a.slug.localeCompare(b.slug);
}

export default function GalleryPage() {
  const albums = getAlbums();
  const total = albums.reduce((sum, album) => sum + album.images.length, 0);

  return (
    <>
      <PageBanner title="Gallery" subtitle="Moments From The Road" />

      <section className={styles.gallery}>
        <div className="container">
          {albums.length === 0 ? (
            <p className={styles.empty}>
              Photos coming soon — check back after our next event!
            </p>
          ) : (
            <>
              {albums.length > 1 && (
                <nav className={styles.albumNav} aria-label="Jump to an event">
                  {albums.map((album) => (
                    <a key={album.slug} href={`#${album.slug}`} className={styles.albumChip}>
                      {album.title}
                      <span className={styles.albumChipCount}>{album.images.length}</span>
                    </a>
                  ))}
                </nav>
              )}

              {albums.map((album) => (
                <section key={album.slug} id={album.slug} className={styles.album}>
                  <header className={styles.albumHeader}>
                    <h2 className={styles.albumTitle}>{album.title}</h2>
                    <div className={styles.albumMeta}>
                      {album.date && <span className={styles.albumDate}>{album.date}</span>}
                      <span className={styles.albumCount}>
                        {album.images.length} photo{album.images.length === 1 ? '' : 's'}
                      </span>
                    </div>
                    {album.description && (
                      <p className={styles.albumDescription}>{album.description}</p>
                    )}
                  </header>

                  {/* One grid per album, so the lightbox arrows stay within
                      that event rather than running on into the next one. */}
                  <GalleryGrid images={album.images} />
                </section>
              ))}

              <p className={styles.total}>
                {total} photo{total === 1 ? '' : 's'} across {albums.length} album
                {albums.length === 1 ? '' : 's'}.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
