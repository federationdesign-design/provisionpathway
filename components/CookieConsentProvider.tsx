'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { site } from '../content/homepage';
import { type Consent, type ConsentState, clearAnalyticsCookies, readConsent, writeConsent } from './consent';

// Holds the visitor's cookie decision for the whole site and controls when the
// banner shows. Wraps everything in the root layout, so the header, footer,
// Calendly and analytics all read the same state.

type ConsentContextValue = {
  /** null until the visitor has chosen. */
  consent: ConsentState;
  /** The first visit banner: shown once mounted with no stored decision. */
  bannerOpen: boolean;
  /** The same banner, reopened from Cookie settings in the footer. */
  settingsOpen: boolean;
  choose: (consent: Consent) => void;
  openSettings: (opener: HTMLElement | null) => void;
  closeSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

declare global {
  interface Window {
    // Google's documented switch. While true, gtag sends nothing.
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

export function useCookieConsent() {
  const value = useContext(ConsentContext);
  if (!value) throw new Error('useCookieConsent must be used inside CookieConsentProvider');
  return value;
}

export default function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [mounted, setMounted] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);

  // Read after mount, so the server render and the first client render agree.
  useEffect(() => {
    setConsent(readConsent());
    setMounted(true);
  }, []);

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
    // Back to the Cookie settings control that opened the banner.
    if (opener.current?.isConnected) opener.current.focus();
    opener.current = null;
  }, []);

  const choose = useCallback(
    (next: Consent) => {
      writeConsent(next);
      setConsent(next);
      // Once loaded, the GA script stays on the page until the next full load,
      // so withdrawal also switches it off. Granting again switches it back on.
      window[`ga-disable-${site.gaMeasurementId}`] = !next.analytics;
      if (!next.analytics) clearAnalyticsCookies();
      if (settingsOpen) closeSettings();
    },
    [settingsOpen, closeSettings]
  );

  const openSettings = useCallback((from: HTMLElement | null) => {
    opener.current = from;
    setSettingsOpen(true);
  }, []);

  return (
    <ConsentContext.Provider
      value={{
        consent,
        bannerOpen: mounted && consent === null,
        settingsOpen,
        choose,
        openSettings,
        closeSettings,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}
