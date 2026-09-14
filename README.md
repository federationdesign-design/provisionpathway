# Provision Pathway

Marketing site for The Provision Pathway, a SEND consultancy in Warwickshire.
Built mobile first, with the desktop layout added on top from 1024px. Design
comps live in `reference/`.

Pages: `/` home and `/about`. Contact is not built yet; its navigation item
links to the footer.

## Stack

Next.js 15 App Router, React 19, TypeScript, CSS Modules. Relative imports
only, no `@/` alias. No Tailwind, no styled-components, no inline style blocks.

## Running it

    npm install
    npm run dev

Verification gates before any commit:

    ./node_modules/.bin/tsc --noEmit
    npm run build

## Where things live

    app/layout.tsx              fonts, metadata, and the shared header, footer and popup
    app/page.tsx                homepage section order
    app/about/page.tsx          About page section order
    app/globals.css             colour, type and spacing tokens
    content/homepage.ts         homepage copy, plus shared nav, footer and popup copy
    content/about.ts            About page copy
    components/                 one component plus one module.css per section
    reference/                  Photoshop comps

Copy changes go in `content/`. Layout files should not need editing to change
wording.

## Shared furniture

`app/layout.tsx` renders the header, footer and services popup around every
page, so pages render only their `<main>`.

The header includes a pinned bar, parked above the viewport, that slides in
once the page's hero watermark (`#hero-watermark`) scrolls out of view, and out
again when it returns. Pages without that id fall back to the static header
bar as the trigger. On mobile the bar carries the wordmark and hamburger; on
desktop the wordmark and the full navigation row.

The green band (`Band`) is shared by the homepage goal section and the About
introduction.

## Assets

All supplied brand assets are installed and in use:

    public/assets/logo-green.svg
    public/assets/logo-footer-white.svg
    public/assets/TPP-header-logo.svg
    public/assets/meetclair.jpg
    public/assets/meetjames.jpg
    public/assets/path-illustration_green.svg
    public/assets/meet-sarah-img.png
    public/assets/boy-profile.jpg
    public/assets/about-page-img.jpg

No placeholder assets remain. The hand-built `PathwayGraphic` component has
been deleted.

The brand green token `--brand` is set to #97a97c, matching the supplied SVG
artwork. Note that the Photoshop comp samples darker, around #7b8763, for the
green band and headings, so bands render lighter than the comp.

## Booking

Every booking button carries `data-cta="book-meeting"` and links to the live
Calendly page (`bookingUrl` in `content/homepage.ts`, with the brand green as
`primary_color`). `CalendlyBooking`, in the root layout, opens those links in
the Calendly popup widget instead. Its script loads on the first hover, focus or
touch on a booking button, not with the page. If it cannot load, the link opens
in a new tab, as it does without JavaScript. Focus starts on the popup's close
control, Escape closes it, and focus returns to the button that opened it.
Calendly's booking form is a cross-origin iframe, so Escape is not heard while
focus is inside it; Tab returns to the close control.

Calendly is not yet behind cookie consent; see `PLACEHOLDERS.md`.

## Still to do

1. Google Analytics, `G-MMW4789DRX`, gated behind cookie consent for UK
   GDPR and PECR, with Calendly wired into the same gate.

Outstanding inputs are listed in `PLACEHOLDERS.md`.

## Desktop layout

The type and spacing tokens in `app/globals.css` are re-derived for desktop
inside a single `min-width: 1024px` block: a pixel value read off the 2000px
comp becomes value / 20 in vw, so the layout scales with the viewport and
stays composed at 2800px.

Process, QuoteFeature and AssessmentDetail are wrapped in `ProcessLayout`. At
desktop that wrapper becomes a grid and the three sections switch to
`display: contents`, placing their own pieces against the named grid lines
documented in `components/ProcessLayout.module.css`.

## Open decisions

The services popup is not in the Photoshop comp. It is `AssessmentModal`,
rendered once by `AssessmentModalProvider` in the root layout and opened from
the `Pathway` navigation item (`ServicesNavButton`, in the header, pinned bar
and footer) and the `About the assessment` button (`AssessmentCta`). It holds
both services from `servicesPopup` in `content/homepage.ts`, stacked on mobile
and in two columns on desktop, with a single shared booking button below both.
That single button is settled and not to be revisited. The inline homepage
assessment block still differs from the popup in places; see
`PLACEHOLDERS.md`.

Two em dashes in the comp copy have been set as commas to match house style.

The second primary call to action, the assessment lightbox trigger, has been
removed from the header because the comp shows only one button there. It now
sits beside the closing booking button at the foot of the page. Its permanent
placement is still to be decided.
