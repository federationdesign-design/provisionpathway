/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { nav } from '../content/homepage';
import BookButton from './BookButton';
import styles from './Header.module.css';

export default function Header() {
  const [open, setOpen] = useState(false);

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

  return (
    <header className={styles.header} id="top">
      <div className={styles.bar}>
        <a className={styles.logoLink} href="#top" aria-label="The Provision Pathway, home">
          <img
            className={styles.logo}
            src="/assets/logo-green.svg"
            alt="The Provision Pathway"
            width={160}
            height={64}
          />
        </a>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="primary-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.toggleLabel}>{open ? 'Close menu' : 'Open menu'}</span>
          <span className={`${styles.bars} ${open ? styles.barsOpen : ''}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div className={styles.ctaRow}>
        <BookButton />
      </div>

      <nav
        id="primary-menu"
        className={`${styles.menu} ${open ? styles.menuOpen : ''}`}
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
