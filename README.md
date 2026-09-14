# Provision Pathway

Single page marketing site for The Provision Pathway, a SEND consultancy in
Warwickshire. Built mobile first, with the desktop layout added on top from
1024px. Design comps live in `reference/`.

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

    app/layout.tsx              fonts, metadata, viewport
    app/page.tsx                section order
    app/globals.css             colour, type and spacing tokens
    content/homepage.ts         every line of copy on the page
    components/                 one component plus one module.css per section
    reference/                  desktop and mobile Photoshop comps

Copy changes go in `content/homepage.ts`. Layout files should not need editing
to change wording.

## Assets

All supplied brand assets are installed and in use:

    public/assets/logo-green.svg
    public/assets/logo-footer-white.svg
    public/assets/path-illustration_green.svg
    public/assets/meet-sarah-img.png
    public/assets/boy-profile.jpg

No placeholder assets remain. The hand-built `PathwayGraphic` component has
been deleted.

The brand green token `--brand` is set to #97a97c, matching the supplied SVG
artwork. Note that the Photoshop comp samples darker, around #7b8763, for the
green band and headings, so bands render lighter than the comp.

## Still to do

1. Calendly. `site.calendlyUrl` in `content/homepage.ts` is a placeholder.
   Every booking button carries `data-cta="book-meeting"`.
2. Google Analytics, `G-MMW4789DRX`, gated behind cookie consent for UK
   GDPR and PECR.

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

The assessment lightbox is not in the Photoshop comp. It is built as
`AssessmentModal`, triggered by `AssessmentCta` in the header, and currently
reuses the pricing, location, inclusions and format copy that also appears
inline further down the page.

The persona carousel shows three dots in the comp. Only Sarah has been
written. Add entries to the `personas` array in `content/homepage.ts` and the
dots appear automatically.

Two em dashes in the comp copy have been set as commas to match house style.

The second primary call to action, the assessment lightbox trigger, has been
removed from the header because the comp shows only one button there. It now
sits beside the closing booking button at the foot of the page. Its permanent
placement is still to be decided.
