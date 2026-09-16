// Consent model and storage, adapted from the studio's consent system.
//
// One optional category. Google Analytics and the Calendly popup widget both
// set cookies and both sit behind it. The record of the visitor's choice is
// itself strictly necessary, so storing it needs no consent. It lives in
// localStorage, not a cookie, because all gating happens client side.

export type Consent = { analytics: boolean };

// null means no decision has been made yet, so the banner shows.
export type ConsentState = Consent | null;

const STORAGE_KEY = 'tpp-cookie-consent';

// Bump when the cookies policy changes materially. Every stored decision with
// an older version is ignored, so everyone is asked again.
const CONSENT_VERSION = 1;

type StoredConsent = {
  version: number;
  consent: Consent;
  timestamp: string;
};

export function readConsent(): ConsentState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as StoredConsent;
    if (stored.version !== CONSENT_VERSION) return null;
    return { analytics: stored.consent?.analytics === true };
  } catch {
    return null;
  }
}

export function writeConsent(consent: Consent): void {
  const record: StoredConsent = {
    version: CONSENT_VERSION,
    consent,
    timestamp: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable, for example a full quota. The choice still holds
    // for this visit.
  }
}

// On withdrawal, expire any Google Analytics cookies already set rather than
// waiting for them to lapse. GA sets them on the registrable domain, so try
// the host and every parent domain; the browser ignores the ones that do not
// apply. Calendly's cookies belong to calendly.com and cannot be cleared from
// this site.
export function clearAnalyticsCookies(): void {
  const expired = 'expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  const labels = window.location.hostname.split('.');
  const domains = labels.map((_, i) => labels.slice(i).join('.'));

  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0]?.trim();
    if (!name) continue;
    if (name === '_ga' || name.startsWith('_ga_') || name === '_gid' || name.startsWith('_gat')) {
      document.cookie = `${name}=; ${expired}`;
      for (const domain of domains) {
        document.cookie = `${name}=; ${expired}; domain=.${domain}`;
      }
    }
  }
}
