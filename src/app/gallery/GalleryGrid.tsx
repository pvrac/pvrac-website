'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export type GalleryImage = { src: string; alt: string };

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  // Keyboard controls while the lightbox is open, and lock body scroll.
  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'ArrowRight') showNext();
    };

    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, close, showPrev, showNext]);

  const current = openIndex === null ? null : images[openIndex];

  return (
    <>
      <div className={styles.galleryGrid}>
        {images.map((image, index) => (
          <button
            type="button"
            className={styles.galleryItem}
            key={image.src}
            onClick={() => setOpenIndex(index)}
            aria-label={`View larger: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {current && (
        <div className={styles.lightbox} onClick={close} role="dialog" aria-modal="true" aria-label="Gallery image viewer">
          <button type="button" className={styles.lightboxClose} onClick={close} aria-label="Close">
            &times;
          </button>

          {images.length > 1 && (
            <button
              type="button"
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
            >
              &#8249;
            </button>
          )}

          {/* Stop propagation so clicking the image itself doesn't close */}
          <div className={styles.lightboxImageWrap} onClick={(e) => e.stopPropagation()}>
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="90vw"
              className={styles.lightboxImage}
              priority
            />
          </div>

          {images.length > 1 && (
            <button
              type="button"
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
            >
              &#8250;
            </button>
          )}
        </div>
      )}
    </>
  );
}
