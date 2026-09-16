'use client';

import { consentCopy } from '../content/consent';
import { useCookieConsent } from './CookieConsentProvider';

// The footer control that reopens the cookie banner, so a visitor can change
// their decision at any time.
export default function CookieSettingsButton({ className }: { className: string }) {
  const { openSettings } = useCookieConsent();

  return (
    <button
      type="button"
      className={className}
      aria-haspopup="dialog"
      onClick={(e) => openSettings(e.currentTarget)}
    >
      {consentCopy.settings}
    </button>
  );
}
