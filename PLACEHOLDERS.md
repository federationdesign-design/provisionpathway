# Placeholders and outstanding inputs

Everything below is either stubbed in the build or not rendered because the
input has not been supplied. Nothing here has been invented.

## Assets

**BAND_WATERMARK_TWO_TONE**
The desktop watermark in the green band, on both the homepage and the About
page, is two tone in the comps: white "the" and "Pathway", light grey
"Provision" and flag. No such variant has been supplied. Both bands currently
show `public/assets/logo-footer-white.svg`, all white, from
`components/Band.tsx`.

The light section version, grey and brand green, is used at the foot of the
About page. `public/assets/logo-green.svg` is already grey (`#939598`) and
brand green (`#97a97c`), so the build uses it there. Confirm this is the
intended artwork rather than a separate variant still to come.

**ABOUT_PATH_ARTWORK_CONFIRMATION**
The pathway artwork at the foot of the About page reuses
`public/assets/path-illustration_green.svg`, recoloured from the comp's purple
by being the green asset. The build sizes and places it from the comp's top
flag and right hand edge, but the comp's composition reads slightly
differently, as the pages brief notes. Confirm whether the About page should
use this existing asset or a different composition.

**ABOUT_PHOTO_ALT_TEXT**
The About page photograph, `public/assets/about-page-img.jpg`, has been
supplied, but no alt text came with it. The build uses "A hand holding a pen
over paperwork on a desk, beside a second person", written from the image
(`aboutWhatWeDo.imageAlt` in `content/about.ts`). Replace if the studio has
preferred wording.

**SIGNPOST_PLANT_GRAPHIC**
Both comps show a small plant at the foot of the signpost pole. No artwork has
been supplied, so it is not rendered.

## Consent

**CALENDLY_CONSENT_GATE**
Calendly currently loads without a consent check. The widget script and its
cookies load on the first interaction with a booking button
(`components/CalendlyBooking.tsx`), whatever the visitor's cookie choices,
because the consent system (Task 3) does not exist yet. When Task 3 lands,
`loadCalendly` must be wired into the consent gate so the script cannot load
before consent is given, with booking buttons falling back to the new tab link
until it is.

## Copy

**COOKIES_AND_PRIVACY_POLICY**
The footer links to `#cookies` and `#privacy`. No policy content has been
supplied. Task 3.

**CONTACT_PAGE_CONTENT**
No Contact page content has been supplied, so no `/contact` route exists. The
`Contact` navigation item still links to `#contact`, the footer's id, which is
present on every page, so the link does not break and no placeholder route was
needed.

## Copy conflicts to raise

**HOMEPAGE_ASSESSMENT_DETAIL_VS_POPUP** (unresolved)
All meetings and sessions are now described as delivered online in both the
homepage assessment block (`details`, rendered by `AssessmentDetail`) and the
popup (`services`), so they agree on location and format. They still differ on
the following, and this is unresolved:

1. **Inclusions count.** The homepage lists four items, with "Not just verbal
   advice." as its own line. The popup lists three, folds "not just verbal
   advice" into the action plan line, and leads with "The assessment itself and
   the written report."
2. **Debrief timing.** The popup says the debrief is "delivered within 1 to 2
   weeks of the report being sent". The homepage gives no timing.
3. **Purpose paragraph.** Present in the popup only.

Pricing agrees.

**ONLINE_DELIVERY_WORDING**
Removing the in person references left three wording points for the studio:

1. The homepage Location line had no verb once "delivered in person" was
   removed, so it now reads "delivered online", taken from the instruction that
   all meetings and sessions are delivered online. The popup's Location line
   says "virtually". The two could use the same word.
2. The popup's "(dependant on personal circumstances)" originally qualified the
   choice between in person and virtual delivery. With that choice gone it no
   longer has anything to qualify.
3. The homepage Format line still says the debrief is remote "as standard",
   which implies an alternative now that in person has been removed.

## About page decisions to confirm

**Header clearance.** At desktop the header wordmark's flag pole hangs below
the navigation row. On the homepage the opening section's top padding clears
it. A band that meets the header directly, as on the About page, now takes a
top margin equal to that overhang, rounded up to a whole pixel, so the header
no longer sits over the band. The homepage is unchanged.

1. **Header booking button.** The About comp has no booking button under the
   navigation, and the grey band starts directly beneath the header, where the
   homepage hero's button would sit. The button in the header is rendered on
   the homepage only.
2. **Active navigation item.** The About comp colours ABOUT as the current
   page, now in brand green. The homepage comp shows HOME uncoloured, and the
   homepage must stay unchanged, so the colour applies to every route except
   Home. Every current link carries `aria-current="page"`, Home included.
3. **Grey divider bands.** The About comp samples its grey bands lighter, around
   `#bfbfc1`, than the homepage's. The build uses the same `--brand-secondary`
   bands as the homepage.
4. **Heading sizes.** The About band headline and "What do we do?" measure about
   52px on the comp. Both use the existing `--t-h1` step (55px at 2000px), shared
   with the homepage band headline. The closing headline measures about 59px and
   has a new `--t-display` step.
5. **Body line height.** As on the homepage, body copy keeps the house 1.3
   against the comp's roughly 1.17, so the About page runs taller than the comp.

## Desktop comp differences awaiting a decision

These were found while building Task 2. The build follows the rule noted in
each case and has not been changed to match the comp.

1. **Subline copy.** The desktop comp reads "Run independently from any school
   or provision." The copy file, which matches the mobile comp, reads "Run
   independently from any school". Copy has not been reworded.
2. **Body line height.** The desktop comp sets body copy at roughly 1.17. The
   build keeps the house 1.3, so the desktop page runs about 3.5% taller than
   the comp.
3. **Signpost colour.** The comp draws the active signpost chips in a dark
   green, around `#2c481f`. The build uses `--brand`, shared with mobile.
4. **Closing buttons.** The comp has no buttons under the quote. The
   assessment lightbox trigger and its booking button stay in their holding
   position at the foot of the left column until the studio places the second
   call to action.
5. **Brand green.** Unchanged at `#97a97c`. The comp samples the bands darker,
   around `#7b8965`.
