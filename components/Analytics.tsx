'use client';

import Script from 'next/script';
import { site } from '../content/homepage';
import { useCookieConsent } from './CookieConsentProvider';

// Google Analytics 4. Nothing is rendered, and so no request is made and no
// cookie set, until the visitor has accepted. Withdrawal is handled in
// CookieConsentProvider.
export default function Analytics() {
  const { consent } = useCookieConsent();
  if (!consent?.analytics) return null;

  const id = site.gaMeasurementId;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window['ga-disable-${id}'] = false;
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
