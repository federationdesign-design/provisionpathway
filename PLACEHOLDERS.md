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

**CALENDLY_CONSENT_GATE** (resolved)
Calendly and Google Analytics 4 now both sit behind the one optional cookie
category (`components/CookieConsentProvider.tsx`). Until the visitor accepts,
no request goes to Calendly or Google, and a booking button opens the
scheduling link in a new tab. Verified by network inspection on `/`,
`/about`, `/cookies-policy`, `/privacy-policy`, `/terms-of-use` and `/contact`.

**CONSENT_BANNER_COPY**
No banner wording was supplied. The text in `content/consent.ts` is adapted
from the studio's consent system and describes only what the site does:
remember the choice, Google Analytics, Calendly, and the new tab fallback.
Review it alongside the cookies policy.

**CONSENT_POLICY_LINK** (resolved)
The banner links to `/cookies-policy`, which now exists.

**CALENDLY_THIRD_PARTY_COOKIES**
Used for the cookie table on `/cookies-policy`. With consent, the Calendly popup was seen
to set `__cf_bm`, `_cfuvid` and `OptanonConsent` on `.calendly.com`, and `m` on
`m.stripe.com`, from inside its iframe. Google Analytics set `_ga` and
`_ga_MMW4789DRX` on this site's domain. These belong to Calendly and Stripe,
so withdrawing consent cannot clear them from this site; it clears the GA
cookies and stops GA sending.

## Legal pages

**LEGAL_PAGES_REVIEW**
`/cookies-policy`, `/privacy-policy` and `/terms-of-use` (copy in
`content/legal.ts`) are adapted from the studio's policies for another
project and rewritten for this business. The client signed them off on
21 September 2026, the "Last updated" date on all three, and the draft notice
has been removed.

Every unconfirmed value on these pages is written as a
`[PLACEHOLDER: ...]` token, which the pages render highlighted in yellow
(`--placeholder-bg`). Before launch, search the site for `PLACEHOLDER`: none may
remain.

**Gap still in the legal pages.** Not supplied, and still a highlighted token
on the privacy policy, although the pages have been signed off:

1. **SPECIAL_CATEGORY_CONDITION** Enquiries about a young person may include
   health information, which is special category data. The privacy policy
   needs the condition relied on to process it. This is the point most in need
   of qualified advice.

**Legal bases chosen for review.** The privacy policy states consent for
replying to enquiries (the form's checkbox) and for analytics, steps before a
contract for consultation bookings, and legitimate interests for hosting and
security. These were chosen to match how the site works, not supplied.

**LIVE_SITE_COOKIES_UNVERIFIED** The cookies policy says the website sets no
cookies of its own. That was verified against a local production build, which
sets none. It was not checked against the live Vercel deployment.

**Band watermark.** The legal pages use the About page's green title band
without the desktop watermark logo, because a band holding only a title is too
short to contain it. Homepage and About are unchanged.

## Copy

**COOKIES_AND_PRIVACY_POLICY** (resolved)
The footer links to `/cookies-policy`, `/privacy-policy` and the new
`/terms-of-use`. The content is logged under Legal pages above.

**CONTACT_FOOTER_IMAGE**
The ANT Training contact page the brief uses as a model carries a photograph
above its footer. None was supplied, so it is omitted.

**CONTACT_FORM_WORDING**
None of the form's wording was supplied. The section headings ("Email", "Send a
message"), field hints, error messages, consent sentence, failure message and
confirmation ("Thank you. Your message has been sent.") in `content/contact.ts`
were written to describe only what the form does, and make no claim about
response times. Review them.

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

## Contact form decisions to confirm

1. **TELEPHONE_CONDITIONAL** Telephone is required when Phone call, Mobile
   call or SMS or WhatsApp is chosen, and optional when Email is chosen. Its
   label switches between "(required)" and "(optional)" and a hint beneath says
   why. A number that is given is checked either way: 10 to 15 digits, with
   spaces, brackets, dots, hyphens and a leading plus allowed. The same check
   runs in the browser and in the route handler (`components/contactValidation.ts`).
2. **Contact method required.** The brief lists the method field without
   saying whether it is required. It is required here, because the telephone
   rule depends on it and the client needs the preference to act on.
3. **Field order.** The brief lists Name, Email, Telephone, Message, method.
   The method is asked before Telephone, so the visitor sees whether a number is
   needed before reaching that field. Otherwise the order follows the brief.
4. **CONTACT_RATE_LIMIT** At most 5 submissions per connection in 10 minutes,
   counted in memory. On Vercel that count is per server instance and resets
   when an instance is recycled, so it slows a script but is not a hard cap. A
   shared store (for example Vercel KV or Upstash) would make it exact, at the
   cost of another service.
5. **No autoresponder.** Only the notification to the client is sent. The
   enquirer gets the confirmation on the page, not an email, because no wording
   was supplied for one.
6. **Resend without the SDK.** The route handler calls Resend's REST API with
   `fetch`, so no new dependency was added.
7. **Request Consultation quick link.** The homepage band's desktop quick links
   still point "Request Consultation" at `#contact`, the footer. It may belong on
   `/contact` or on the booking popup. "Contact us" now points at `/contact`.

**CONTACT_LIVE_SEND_UNVERIFIED**
The full send path was tested locally against a stand in for Resend that
recorded each request: recipient and sender from the environment, Reply-To set
to the enquirer, the method and telephone in the body, HTML escaped, honeypot
and rate limit working, and the failure path keeping what was typed. No real
email was sent. Before launch, send one test enquiry on a Vercel preview to
confirm that the key works, that the `CONTACT_FROM_EMAIL` domain is verified in
Resend, and that replying from the inbox reaches the enquirer.

## About page decisions to confirm

**Header clearance.** At desktop the header wordmark's flag pole hangs below
the navigation row. On the homepage the opening section's top padding clears
it. A band that meets the header directly, as on the About page, now takes a
top margin equal to that overhang, rounded up to a whole pixel, so the header
no longer sits over the band. The homepage is unchanged.

1. **Header booking button.** Settled by the studio: at mobile the button
   appears under the logo row on both pages, as on the homepage, although the
   About comp shows none. At desktop it stays on the homepage only, since the
   About comp's grey band starts where the homepage hero's button sits.
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
