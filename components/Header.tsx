/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { nav } from '../content/homepage';
import BookButton from './BookButton';
import ServicesNavButton from './ServicesNavButton';
import styles from './Header.module.css';

// The hero watermark in Opening carries this id. The pinned bar shows once it
// has scrolled up out of view.
const WATERMARK_ID = 'hero-watermark';
const DESKTOP_QUERY = '(min-width: 1024px)';

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

// The navigation items, shared by the header menu and the desktop pinned bar.
// Routes mark the current page with aria-current. The active colour from the
// About comp is not applied to Home, because the homepage comp shows no
// active state there.
function NavItems({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <>
      {nav.map((item) => {
        if (!('href' in item)) {
          return (
            <li key={item.label}>
              <ServicesNavButton
                className={`${styles.menuLink} ${styles.menuButton}`}
                label={item.label}
                onOpen={onNavigate}
              />
            </li>
          );
        }
        const current = item.href === pathname;
        return (
          <li key={item.label}>
            <Link
              className={`${styles.menuLink} ${current && item.href !== '/' ? styles.menuLinkCurrent : ''}`}
              href={item.href}
              aria-current={current ? 'page' : undefined}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const staticBarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

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

  // The bar is a different height either side of the desktop breakpoint, and
  // the observer's inset is read from it, so crossing the breakpoint rebuilds
  // the observer below.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  // The header lives in the root layout and persists across client side
  // navigation, so the observer is rebuilt on every route change. A page with
  // no hero watermark uses its first section as the trigger instead, so the
  // bar arrives once that page's opening band has scrolled away. The static
  // header is only a last resort; at desktop it is barely taller than the bar
  // and would pin it almost at once.
  useEffect(() => {
    const bar = barRef.current;
    const watermark =
      document.getElementById(WATERMARK_ID) ??
      document.querySelector<HTMLElement>('main > :first-child') ??
      staticBarRef.current;
    if (!watermark || !bar) return;
    setPinned(false);
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
  }, [pathname, desktop]);

  return (
    <header className={styles.header} id="top">
      {/* Sits above the viewport and slides down once the hero watermark
          scrolls away. Mobile carries the wordmark and hamburger, desktop the
          wordmark and the full navigation row. Inert while hidden so it cannot
          take focus. */}
      <div
        ref={barRef}
        className={`${styles.pinned} ${pinned ? styles.pinnedOn : ''}`}
        inert={!pinned}
        aria-hidden={!pinned}
      >
        <Link className={styles.pinnedLogoLink} href="/" aria-label="The Provision Pathway, home">
          <img
            className={styles.pinnedLogo}
            src="/assets/TPP-header-logo.svg"
            alt="The Provision Pathway"
            width={720}
            height={169}
          />
        </Link>
        <MenuToggle open={open} onToggle={toggle} className={styles.pinnedToggle} />
        <nav className={styles.pinnedNav} aria-label="Primary, pinned">
          <ul className={styles.menuList}>
            <NavItems pathname={pathname} />
          </ul>
        </nav>
      </div>

      <div className={styles.bar} ref={staticBarRef}>
        <Link className={styles.logoLink} href="/" aria-label="The Provision Pathway, home">
          {/* Desktop swaps to the one-line wordmark, which carries its own black field. */}
          <picture>
            <source media={DESKTOP_QUERY} srcSet="/assets/TPP-header-logo.svg" />
            <img
              className={styles.logo}
              src="/assets/logo-green.svg"
              alt="The Provision Pathway"
              width={160}
              height={64}
            />
          </picture>
        </Link>

        <MenuToggle open={open} onToggle={toggle} className="" />
      </div>

      {/* The booking button sits in the top right corner of the homepage hero.
          Other pages have no hero there, so it is not rendered on them. */}
      {pathname === '/' && (
        <div className={styles.ctaRow}>
          <BookButton size="large" />
        </div>
      )}

      <nav
        id="primary-menu"
        className={`${styles.menu} ${open ? styles.menuOpen : ''} ${pinned ? styles.menuPinned : ''}`}
        aria-label="Primary"
      >
        <ul className={styles.menuList}>
          <NavItems pathname={pathname} onNavigate={close} />
        </ul>
      </nav>
    </header>
  );
}
