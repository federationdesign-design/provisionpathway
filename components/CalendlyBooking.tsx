'use client';

import { useEffect, useRef } from 'react';
import { cta } from '../content/homepage';
import { useCookieConsent } from './CookieConsentProvider';

// Opens every booking button in the Calendly popup widget, without leaving the
// page. Rendered once in the root layout; it renders nothing itself and works
// by listening for booking buttons, which all carry data-cta="book-meeting".
//
// The widget script is not loaded with the page. It loads on the first sign a
// visitor means to book: pointing at, focusing or touching a booking button.
// A click that arrives before it has loaded waits briefly for it. If it cannot
// load, the button falls back to opening the scheduling link in a new tab, as
// it does without JavaScript.
//
// Calendly sets cookies, so none of this happens without cookie consent. Until
// the visitor accepts, or after they reject, nothing is fetched from Calendly
// and a booking button is left to open its link in a new tab.

const SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';
const STYLE_HREF = 'https://assets.calendly.com/assets/external/widget.css';
const TRIGGER = '[data-cta="book-meeting"]';
// Short enough that the fallback still counts as part of the click, so
// browsers allow the new tab to open.
const LOAD_TIMEOUT_MS = 3000;

type CalendlyApi = {
  initPopupWidget: (options: { url: string }) => void;
  closePopupWidget: () => void;
};

declare global {
  interface Window {
    Calendly?: CalendlyApi;
  }
}

let loading: Promise<CalendlyApi> | null = null;
let failed = false;

function loadCalendly(): Promise<CalendlyApi> {
  if (window.Calendly) return Promise.resolve(window.Calendly);
  if (loading) return loading;

  loading = new Promise<CalendlyApi>((resolve, reject) => {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = STYLE_HREF;
    document.head.appendChild(style);

    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    const timer = window.setTimeout(() => reject(new Error('Calendly timed out')), LOAD_TIMEOUT_MS);
    script.onload = () => {
      window.clearTimeout(timer);
      if (window.Calendly) resolve(window.Calendly);
      else reject(new Error('Calendly missing after load'));
    };
    script.onerror = () => {
      window.clearTimeout(timer);
      reject(new Error('Calendly failed to load'));
    };
    document.head.appendChild(script);
  }).catch((error) => {
    failed = true;
    throw error;
  });

  return loading;
}

function openInNewTab(url: string) {
  // Not opened with the noopener feature, which makes window.open return null
  // whether or not the tab opened. The opener is cut off by hand instead.
  const opened = window.open(url, '_blank');
  if (opened) {
    opened.opener = null;
    return;
  }
  // A blocker refused the tab. Going to the link is still better than a
  // button that does nothing.
  window.location.assign(url);
}

// Calendly renders its popup as a plain overlay. Give it dialog semantics,
// make the close control a real keyboard target, keep focus inside while it is
// open, close on Escape, and return focus to the button that opened it.
//
// The booking form is a cross-origin iframe, and key presses inside it never
// reach this page, so Escape can only be heard while focus is on the page's
// side of the popup. Focus therefore starts on the close control, and the trap
// moves between that control and the iframe: Tab out of either lands on the
// other.
function managePopup(api: CalendlyApi, trigger: HTMLElement) {
  const overlay = document.querySelector<HTMLElement>('.calendly-overlay');
  if (!overlay) return;

  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', cta.book);

  const close = overlay.querySelector<HTMLElement>('.calendly-popup-close');
  if (close) {
    close.setAttribute('role', 'button');
    close.setAttribute('tabindex', '0');
    close.setAttribute('aria-label', 'Close');
  }

  const frame = () => overlay.querySelector<HTMLElement>('iframe');

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      // Captured before anything else on the page sees it, so an Escape here
      // closes Calendly and not the services popup beneath it.
      e.preventDefault();
      e.stopImmediatePropagation();
      api.closePopupWidget();
      return;
    }
    if ((e.key === 'Enter' || e.key === ' ') && e.target === close) {
      e.preventDefault();
      api.closePopupWidget();
      return;
    }
    // The close control is the last thing on the page, so a forward Tab from
    // it would leave the document rather than reach the trap below.
    if (e.key === 'Tab' && !e.shiftKey && e.target === close) {
      const target = frame();
      if (target) {
        e.preventDefault();
        target.focus();
      }
    }
  };

  const onFocusIn = (e: FocusEvent) => {
    if (overlay.contains(e.target as Node)) return;
    const next = e.relatedTarget === close ? frame() : close;
    (next ?? overlay).focus();
  };

  const cleanup = () => {
    window.removeEventListener('keydown', onKeyDown, true);
    document.removeEventListener('focusin', onFocusIn);
    observer.disconnect();
    if (trigger.isConnected) trigger.focus();
  };

  const observer = new MutationObserver(() => {
    if (!overlay.isConnected) cleanup();
  });
  observer.observe(document.body, { childList: true });

  window.addEventListener('keydown', onKeyDown, true);
  document.addEventListener('focusin', onFocusIn);
  if (!overlay.hasAttribute('tabindex')) overlay.setAttribute('tabindex', '-1');
  (close ?? overlay).focus();
}

export default function CalendlyBooking() {
  const { consent } = useCookieConsent();
  // Read by the listeners below, which are attached once, so a change of mind
  // applies to the very next interaction.
  const allowed = useRef(false);
  allowed.current = consent?.analytics === true;

  useEffect(() => {
    const triggerFrom = (target: EventTarget | null) =>
      target instanceof Element ? target.closest<HTMLAnchorElement>(TRIGGER) : null;

    const warm = (e: Event) => {
      if (allowed.current && triggerFrom(e.target)) loadCalendly().catch(() => {});
    };

    const onClick = (e: MouseEvent) => {
      const trigger = triggerFrom(e.target);
      if (!trigger || e.defaultPrevented) return;
      // Without consent the link's own new tab is the booking route.
      if (!allowed.current) return;
      // A modified or middle click asks for a new tab; let the link do that.
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      // Once loading has failed, the link's own new tab is the fallback.
      if (failed && !window.Calendly) return;

      e.preventDefault();
      const url = trigger.href;
      loadCalendly()
        .then((api) => {
          api.initPopupWidget({ url });
          managePopup(api, trigger);
        })
        .catch(() => openInNewTab(url));
    };

    document.addEventListener('pointerover', warm);
    document.addEventListener('focusin', warm);
    document.addEventListener('touchstart', warm, { passive: true });
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('pointerover', warm);
      document.removeEventListener('focusin', warm);
      document.removeEventListener('touchstart', warm);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return null;
}
