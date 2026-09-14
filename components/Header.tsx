/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef, useState } from 'react';
import { nav } from '../content/homepage';
import BookButton from './BookButton';
import styles from './Header.module.css';

// The hero watermark in Opening carries this id. The pinned bar shows once it
// has scrolled up out of view.
const WATERMARK_ID = 'hero-watermark';

function MenuToggle({
  open,
  onToggle,
  className,
}: {
  open: boolean;
  onToggle: () => void;
  className: string;
}) {
  return (
    <button
      type="button"
      className={`${styles.toggle} ${className}`}
      aria-expanded={open}
      aria-controls="primary-menu"
      onClick={onToggle}
    >
      <span className={styles.toggleLabel}>{open ? 'Close menu' : 'Open menu'}</span>
      <span className={`${styles.bars} ${open ? styles.barsOpen : ''}`} aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const toggle = () => setOpen((v) => !v);

  useEffect(() => {
    document.body.classList.toggle('isLocked', open);
    return () => document.body.classList.remove('isLocked');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const watermark = document.getElementById(WATERMARK_ID);
    const bar = barRef.current;
    if (!watermark || !bar) return;
    // The top of the viewport is inset by the bar's height, so the watermark
    // counts as gone once it is behind where the bar sits. Pinned only when it
    // has left through the top, not while it is still below the fold.
    const observer = new IntersectionObserver(
      ([entry]) => {
        const top = entry.rootBounds ? entry.rootBounds.top : bar.offsetHeight;
        setPinned(!entry.isIntersecting && entry.boundingClientRect.top < top);
      },
      { rootMargin: `-${bar.offsetHeight}px 0px 0px 0px` }
    );
    observer.observe(watermark);
    return () => observer.disconnect();
  }, []);

  return (
    <header className={styles.header} id="top">
      {/* Mobile only: sits above the viewport and slides down once the hero
          watermark scrolls away. Inert while hidden so it cannot take focus. */}
      <div
        ref={barRef}
        className={`${styles.pinned} ${pinned ? styles.pinnedOn : ''}`}
        inert={!pinned}
        aria-hidden={!pinned}
      >
        <a className={styles.pinnedLogoLink} href="#top" aria-label="The Provision Pathway, home">
          <img
            className={styles.pinnedLogo}
            src="/assets/TPP-header-logo.svg"
            alt="The Provision Pathway"
            width={720}
            height={169}
          />
        </a>
        <MenuToggle open={open} onToggle={toggle} className={styles.pinnedToggle} />
      </div>

      <div className={styles.bar}>
        <a className={styles.logoLink} href="#top" aria-label="The Provision Pathway, home">
          {/* Desktop swaps to the one-line wordmark, which carries its own black field. */}
          <picture>
            <source media="(min-width: 1024px)" srcSet="/assets/TPP-header-logo.svg" />
            <img
              className={styles.logo}
              src="/assets/logo-green.svg"
              alt="The Provision Pathway"
              width={160}
              height={64}
            />
          </picture>
        </a>

        <MenuToggle open={open} onToggle={toggle} className="" />
      </div>

      <div className={styles.ctaRow}>
        <BookButton className={styles.cta} />
      </div>

      <nav
        id="primary-menu"
        className={`${styles.menu} ${open ? styles.menuOpen : ''} ${pinned ? styles.menuPinned : ''}`}
        aria-label="Primary"
      >
        <ul className={styles.menuList}>
          {nav.map((item) => (
            <li key={item.label}>
              <a className={styles.menuLink} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
