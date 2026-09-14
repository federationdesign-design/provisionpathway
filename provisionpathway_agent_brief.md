# Provision Pathway: Agent Brief

**Repository** `provisionpathway`
**Production domain** provisionpathway.co.uk, A record live, Vercel project connected
**Scope of this brief** Roadmap steps 2, 3 and 4. Step 1, the mobile view, is complete and committed.

---

## 1. Context

The Provision Pathway is a SEND consultancy based in Warwickshire. It carries out structured, observation based assessments for young people, including those who are NEET or at risk of becoming NEET. The audience is parents, and the majority will arrive on a phone. The site is therefore mobile first.

The client has agreed to launch the homepage alone as a single page site. Further pages will be added later. Nothing in this brief should introduce routes beyond the homepage.

The homepage carries two primary calls to action. The first books a free consultation through Calendly. The second opens a lightbox containing more detail about the assessment offering, with the booking call to action repeated inside it.

## 2. Current state

The mobile view is built, measured against the Photoshop comp at 390px, and committed to `main`. It passes type check and production build.

All supplied brand assets are installed and in use. No placeholder assets remain. Dependencies are on patched releases, Next 15.5.25 and React 19.2.8, and the site has a live production deployment on Vercel from `main`.

Two npm audit findings are known and deliberately left alone. `sharp` clears with a plain `npm audit fix`. `postcss` is pulled in by Next itself, and `npm audit fix --force` would force a major version jump to Next 16. Do not run the forced fix. The brand green token is `#97a97c`, taken from the supplied SVG artwork. Note that the comp samples the green band and headings darker, at roughly `#7b8763`, so bands currently render lighter than the comp.

Points of structure worth knowing before touching the layout. The header is static, not sticky. The persona panel sits inside the green goal band as an inset card with rounded corners, not as a full bleed section above it. A full bleed grey divider separates the opening section from the green band. Body line height is 1.3 throughout; headings run tighter.

Layout of the repository:

    app/layout.tsx              fonts, metadata, viewport
    app/page.tsx                section order
    app/globals.css             colour, type and spacing tokens
    content/homepage.ts         every line of copy on the page
    components/                 one component and one module.css per section
    public/assets/              brand assets

Sections in document order: Header, Opening, Personas, GoalBand, Process, QuoteFeature, AssessmentDetail, Footer. The lightbox is `AssessmentModal`, triggered by `AssessmentCta`.

## 3. Hard rules

These are not preferences. Work that breaches them will be rejected.

**Stack.** Next.js 15 App Router, React 19, TypeScript. Deployed on Vercel from `main`.

**Styling.** CSS Modules only. Never Tailwind, never styled-components, never inline style blocks.

**Imports.** Relative imports only. The `@/` alias is not configured and must not be added.

**Copy.** All page copy lives in `content/homepage.ts`. Do not hard code strings into components. Do not reword client copy.

**Em dashes.** None anywhere, in code, comments, copy or commit messages.

**Type scale.** The site uses a liquid scale built on `clamp()` in `app/globals.css`. Type and spacing grow with viewport width. Do not introduce fixed pixel type sizes and do not cap the text measure with a fixed container width. Extend the existing tokens rather than inventing a parallel scale.

**Vertical spacing.** Space between two stacked elements belongs to one of them, never to both. Compute the existing gap before adding padding or margin.

**CSS Modules build trap.** A bare `:global(.foo)` selector with no local class hard fails the Vercel build, and it passes type check silently, so it is invisible until deploy. Always compound as `.localClass:global(.foo)`. Before any commit touching module CSS, run:

    grep -rn ":global(\.[a-zA-Z-]*) *{" components app

Every hit must be compounded.

## 4. Verification gates

Run all three before every commit. Use the repository binaries, not `npx`.

    ./node_modules/.bin/tsc --noEmit
    npm run build
    grep -rn ":global(\.[a-zA-Z-]*) *{" components app

Visual verification is by running `npm run dev` and taking Playwright screenshots at 390px and 1280px, compared against the comps. Do not report a task complete on the basis of code review alone.

If a verification step fails, read the failure and fix the cause. Never adjust an expected value to make a check pass.

## 5. Git discipline

Work on a feature branch. Never commit directly to `main`.

Commit incrementally with real messages. Run `git show --stat` before any push. A small commit message paired with hundreds of deletions is a red flag and must be investigated before pushing.

Always `git add public/` when new assets are involved, or they will 404 on Vercel.

Commits and pushes to the remote are the studio's responsibility. Prepare the branch, do not push to `main`.

---

## 6. Task 1: Calendly integration

**Goal.** Every booking button opens Calendly without leaving the page.

The studio has access to the client's Calendly account and will supply the live scheduling link. It is currently stubbed as `site.calendlyUrl` in `content/homepage.ts`.

Every booking button already carries `data-cta="book-meeting"`. The lightbox trigger carries `data-cta="assessment-detail"`. Preserve both attributes, as analytics will key off them.

**Required behaviour.**

Use the Calendly popup widget rather than an inline embed, so the visitor stays on the single page. Load the Calendly script lazily, on first interaction or when a booking button enters the viewport, not on initial page load. The homepage should not carry the Calendly payload for visitors who never book.

Prefill is not required. UTM passthrough is not required.

If the script fails to load, the button must fall back to opening the scheduling link in a new tab. A booking button that does nothing is not acceptable.

**Consent.** Calendly sets cookies. The popup must not load before consent has been given for the relevant category. See Task 3. Coordinate the two tasks rather than building them independently.

**Accessibility.** The popup must be reachable and dismissable by keyboard. Focus must return to the triggering button when the popup closes.

## 7. Task 2: Desktop layout

**Reference.** Both comps are committed to the repository:

    reference/homepage_desktop_comp.jpg    2000 x 5011
    reference/homepage_mobile_comp.jpg     700 x 7307

Build the desktop layout to `homepage_desktop_comp.jpg`. The mobile comp is there so you can confirm the existing mobile view has not regressed.

Scale before measuring. The desktop comp is a 2000px wide export, so a value read off it maps to a CSS pixel at 2000px viewport width by dividing by one. The mobile comp is a 700px wide export, so multiply by 390/700 to get the equivalent at a 390px viewport. Measure positions and spacing off the file rather than estimating them by eye.

**Approach.** The mobile build is the base. Add desktop behaviour on top of it. Do not fork the components into separate mobile and desktop trees.

Keep the liquid approach. The studio reviews at 2800px browser width, so the layout must remain composed at that width, not stranded inside a narrow centred column. Scale with viewport width rather than stepping through a series of breakpoints. A small number of structural breakpoints is acceptable where the column count genuinely changes.

**Structural changes required at desktop.**

The header becomes a black bar carrying the horizontal navigation. The logo sits on a white field at the left. The booking button sits at the top right of the hero area, not in the bar.

The opening section becomes two columns. The positioning statement, rule and body paragraph sit left. The hero headline sits right, above the brand logo. The winding pathway artwork runs between and behind them.

The green goal band becomes three columns: the watermark logo and the quick links list on the left, the headline and body in the centre, the persona carousel and its booking button on the right. The quick links are already present in `content/homepage.ts` as `goal.links` and are not rendered on mobile. Render them at desktop.

The process section becomes three columns: the numbered steps on the left, the signpost chips in the centre attached to the vertical post, and the pricing, location, inclusions and format detail on the right.

The obstacles copy and the pull quote sit in the left column, with the young person photograph occupying the right column full bleed to the page edge. The booking button overlays the top of that photograph.

The footer becomes a single row: navigation left, logo right, with the legal links and copyright on a line beneath.

**Do not** introduce hover animations, scroll reveal effects or fade and slide entrances on sections. Motion is limited to what answers a direct user action, such as opening the lightbox or the menu.

## 8. Task 3: Analytics and consent

**Measurement ID** `G-MMW4789DRX`. Search Console is already connected to the domain.

Google Analytics must be gated behind cookie consent to meet UK GDPR and PECR. No analytics or Calendly cookie may be set before the visitor has given consent.

**Required behaviour.**

Build a consent banner offering a genuine accept and reject choice, with equal prominence. Rejection must be as easy as acceptance. Store the decision and do not re-prompt on every visit. Provide a route for the visitor to change their decision later, reachable from the cookies policy link already present in the footer.

Load the GA4 tag only after consent for the analytics category. The same gate governs the Calendly script from Task 1.

The Lucy Hall Massage repository contains a UK GDPR and PECR compliant consent system built for the studio. Use it as the reference pattern rather than starting from scratch.

Add the cookies policy and privacy policy content only if supplied. Do not draft legal copy.

---

## 9. Decisions the agent must not make

Three items are unresolved. Ask, do not choose.

**The assessment lightbox content.** The lightbox is not in the Photoshop comp. It currently reuses the pricing, location, inclusions and format copy that also appears inline further down the page, so the page repeats itself. The studio will decide whether to leave both, move the detail into the lightbox only, or write separate lightbox copy.

**The persona carousel.** The comp shows three carousel dots. Only one persona, Sarah, has been written. The carousel is data driven from the `personas` array in `content/homepage.ts`, and dots appear automatically as entries are added. Do not invent personas.

**The second primary call to action.** The lightbox trigger currently sits beside the closing booking button at the foot of the page. It was removed from the header because the comp shows only one button there. This is a holding position, not a design decision. The studio will settle where it belongs at desktop.

**The brand green.** `--brand` is `#97a97c` and drives the bands and headings as well as the artwork. Whether the bands should instead take the darker `#7b8763` sampled from the comp is unresolved. Do not change the token.

Any missing input must be logged in `PLACEHOLDERS.md` at the repository root with a clearly named placeholder. Never invent prices, dates, contact details or asset paths.

## 10. Definition of done

The branch is ready for review when all of the following hold.

1. All three verification gates pass.
2. Playwright screenshots at 390px and 1280px match the respective comps, and the layout is composed at 2800px.
3. Every booking button opens Calendly, and falls back to a new tab if the script fails.
4. No cookie is set before consent. GA4 fires only after consent for analytics.
5. The mobile view is unchanged in appearance from its committed state. Desktop work must not regress it.
6. No route exists beyond the homepage.
7. `PLACEHOLDERS.md` lists every outstanding input.
8. Nothing has been committed to `main`.
