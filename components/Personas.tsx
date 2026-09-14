'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { personas } from '../content/homepage';
import BookButton from './BookButton';
import styles from './Personas.module.css';

export default function Personas() {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const current = personas[index];

  const go = (next: number) => {
    const count = personas.length;
    setIndex(((next % count) + count) % count);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const delta = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(delta) > 45) go(index + (delta < 0 ? 1 : -1));
    startX.current = null;
  };

  return (
    <section
      className={styles.section}
      aria-roledescription="carousel"
      aria-label="Family situations we help with"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.frame}>
        <Image
          className={styles.image}
          src={current.image}
          alt={current.imageAlt}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          priority
        />

        <div className={styles.scrim} />

        {personas.length > 1 && (
          <div className={styles.dots} role="tablist" aria-label="Choose a story">
            {personas.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={p.name.replace(':', '')}
                className={`${styles.dot} ${i === index ? styles.dotOn : ''}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
        )}
      </div>

      {/* A sibling of the frame rather than a child, so the caption can overlay
          the image on mobile and stand beside it on desktop. */}
      <figure className={styles.caption}>
        <figcaption className={styles.name}>{current.name}</figcaption>
        <p className={styles.body}>{current.body}</p>
      </figure>

      <div className={styles.cta}>
        <BookButton tone="onDark" />
      </div>
    </section>
  );
}
