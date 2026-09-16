'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { consentCopy } from '../content/consent';
import { useCookieConsent } from './CookieConsentProvider';
import styles from './CookieBanner.module.css';

// The consent choice. On a first visit it waits at the foot of the screen
// until the visitor accepts or rejects; it has no close control, because
// closing without choosing would leave no decision. Reopened from Cookie
// settings in the footer, it also shows the current choice and can be closed.
//
// Accept and Reject share one class, so they are the same size, weight and
// colour, in that order in both states.
//
// Rendered first in the body, so on a first visit it is the first thing a
// keyboard reaches. It does not take focus on a first visit, which would
// interrupt a screen reader mid page; it does when reopened, as the visitor
// has just asked for it.
export default function CookieBanner() {
  const { consent, bannerOpen, settingsOpen, choose, closeSettings } = useCookieConsent();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!settingsOpen) return;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSettings();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [settingsOpen, closeSettings]);

  if (!bannerOpen && !settingsOpen) return null;

  return (
    <div
      ref={panel}
      className={`${styles.banner} ${settingsOpen ? styles.withClose : ''}`}
      role="dialog"
      aria-labelledby="cookie-banner-heading"
      aria-describedby="cookie-banner-body"
      tabIndex={-1}
    >
      <div className={styles.text}>
        <h2 className={styles.heading} id="cookie-banner-heading">
          {consentCopy.heading}
        </h2>
        <p className={styles.body} id="cookie-banner-body">
          {consentCopy.body}{' '}
          <Link className={styles.link} href={consentCopy.policyLink.href} prefetch={false}>
            {consentCopy.policyLink.label}
          </Link>
        </p>
        {settingsOpen && consent && (
          <p className={styles.current}>
            {consent.analytics ? consentCopy.current.accepted : consentCopy.current.rejected}
          </p>
        )}
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.choice}
          aria-pressed={settingsOpen && consent ? consent.analytics : undefined}
          onClick={() => choose({ analytics: true })}
        >
          {consentCopy.accept}
        </button>
        <button
          type="button"
          className={styles.choice}
          aria-pressed={settingsOpen && consent ? !consent.analytics : undefined}
          onClick={() => choose({ analytics: false })}
        >
          {consentCopy.reject}
        </button>
      </div>

      {settingsOpen && (
        <button type="button" className={styles.close} onClick={closeSettings}>
          <span className={styles.closeLabel}>{consentCopy.close}</span>
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
}
