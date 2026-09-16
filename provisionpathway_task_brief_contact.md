# Provision Pathway: Task Brief, Contact and Compliance

**Repository** `provisionpathway`
**Branch** continue on `feature/pages`, never on `main`
**Read first** `provisionpathway_agent_brief.md` and `provisionpathway_task_brief_pages.md`. Every hard rule, verification gate and git rule in those documents applies here unchanged.

---

## 1. Why this is urgent

The site is live at `https://www.theprovisionpathway.co.uk` and serving to the public. Calendly currently loads on every page with no consent check, setting third party cookies before any visitor has agreed. The footer links to a cookies policy and a privacy policy that do not exist.

This work closes those gaps. Treat section 3 as the priority if you have to sequence it.

## 2. Corrections to make first

Two small fixes, both currently wrong in production.

**Domain.** `metadataBase` in `app/layout.tsx` is `https://provisionpathway.co.uk`. The live domain is `https://www.theprovisionpathway.co.uk`. Update it. Check for any other hard coded occurrence of the old domain.

**Footer links.** The footer's `Cookies policy` and `Privacy Policy` entries point at `#cookies` and `#privacy`, which do not exist. They become real routes as part of section 4.

## 3. Cookie consent and analytics

This is Task 3 in the main brief, now with a working reference.

**Reference implementation.** The Lucy Hall Massage repository is cloned alongside this one at `../LHM`. It contains a UK GDPR and PECR compliant consent system built for the studio. You may read from `../LHM` freely. You must not write to it. Use it as the base rather than starting from scratch, and adapt it to this project's tokens, type scale and CSS Modules conventions.

**Required behaviour.**

A consent banner offering accept and reject with equal prominence. Rejection must be as easy as acceptance, presented at the same size, weight and visual priority. No pre-ticked boxes and no dark patterns.

Nothing that sets a cookie loads before a decision. That currently means two things: Google Analytics 4, measurement ID `G-MMW4789DRX`, and the Calendly popup widget. Both sit behind the analytics consent category. Calendly's script must not load, and no Calendly request must fire, until consent is given.

If a visitor rejects, booking buttons must still work. Fall back to opening the scheduling link in a new tab, which is the existing fallback path already built into `CalendlyBooking`.

The decision is stored and honoured across visits, so the banner does not reappear on every page load.

A `Cookie settings` control in the footer lets a visitor change their decision at any time, alongside the existing legal links.

**Verification.** Prove with network inspection that a fresh visit with no stored decision fires no request to Google Analytics or Calendly. Prove that rejecting keeps it that way, and that accepting loads both. Test on all three pages.

## 4. Legal pages

Three new routes:

    /cookies-policy
    /privacy-policy
    /terms-of-use

**Base them on the LHM equivalents in `../LHM`**, which give you the correct structure, section ordering and the UK GDPR and PECR points that need covering.

**Adapt the content, do not copy it.** LHM is a massage business. Its policies describe massage appointments, its own data categories, its own company details and its own contact address. Carrying those across unchanged would give the client policies that describe the wrong business, which is worse than having none.

What changes:

- Every reference to the business name, service and company details
- The categories of personal data collected. This site collects contact form enquiries and, with consent, analytics data. It does not take bookings or payments directly.
- Third parties named. This site uses Vercel for hosting, Calendly for scheduling, Resend for transactional email and Google Analytics 4 for analytics. Name each one and what it receives.
- The cookie table, which must list what is actually set on this site, not LHM's set.

**Missing detail.** The client's registered company name, registered address, ICO registration status and data protection contact have not been supplied. Do not invent them. Use clearly named placeholders and log every one in `PLACEHOLDERS.md`.

**Flag for review.** Add a note to `PLACEHOLDERS.md` that these three pages are adapted from another project and need review by the client, and ideally by someone qualified, before they can be relied on.

Wire the footer links to the new routes, and add `Terms of use` to the footer alongside them.

## 5. Contact page

New route at `/contact`. Update the navigation so `Contact` points at it rather than the footer anchor `#contact`.

**Model.** Follow the structure of `https://www.anttraining.co.uk/contact`: a short intro, the contact details, then the form. Style it with this project's existing components, tokens and type scale. Reuse `Band`, `ImageText` and `ClosingCta` where they fit rather than building new ones.

**Contact details shown on the page.**

- Email: `info@theprovisionpathway.co.uk`
- No telephone number
- No postal address

**Form fields.**

- Name, required
- Email, required
- Telephone, see the note below
- Message, required
- Ideal method of initial contact: phone call, mobile call, SMS or WhatsApp, email
- A consent checkbox, unticked by default, linking to the new privacy policy and terms of use routes

**A problem with the contact method field.** Three of the four options need a telephone number, but the page shows no number and the form has no required phone field. If someone chooses SMS and leaves the phone blank, the client cannot reply as asked. Make the telephone field required when a phone based option is selected, and optional when email is selected. Validate this client side and again in the route handler. Log the decision in `PLACEHOLDERS.md` so it can be reviewed.

**Intro copy is missing.** The client has not supplied wording for this page. Write a clearly marked placeholder and log it. Do not invent copy that makes claims about the business.

**The ANT page carries a footer image.** None has been supplied for this page. Omit it and log it.

## 6. Form submission

A Vercel serverless route handler sending via Resend.

**Environment variables**, already set in Vercel across Production, Preview and Development:

    RESEND_API_KEY              the Resend API key
    CONTACT_TO_EMAIL            info@theprovisionpathway.co.uk
    CONTACT_FROM_EMAIL          noreply@theprovisionpathway.co.uk

Read all three from the environment. Never hard code an address or a key, and never expose any of them to the client bundle. No `NEXT_PUBLIC_` prefix on any of them.

**Required behaviour.**

The route handler validates every field server side. Client side validation is a convenience, not a control.

Set a reply-to header to the enquirer's email address, so replying from the inbox reaches the person who wrote in rather than the client's own address.

Include the selected contact method and the telephone number in the email body, so the client can act on the preference.

Include a honeypot field and a basic rate limit. This is a public form on a live site and it will be found by spam within days.

On success, show a confirmation in the page rather than navigating away. On failure, show a clear error and keep the visitor's typed content so they do not lose it.

Do not store submissions anywhere. The email is the record. Say so in the privacy policy.

**The form is not a cookie concern**, so it does not sit behind the consent gate. The consent checkbox on the form is a separate thing: consent to process the enquiry, not consent to cookies.

## 7. Definition of done

1. All three verification gates pass: type check, production build, and the `:global` grep.
2. `metadataBase` and any other hard coded reference use the live domain.
3. A fresh visit with no stored decision fires no request to Google Analytics or Calendly, proven by network inspection on all four pages.
4. Rejecting consent keeps it that way, and booking buttons still work through the new tab fallback.
5. Accepting consent loads both, and the decision persists across visits.
6. `Cookie settings` in the footer reopens the choice.
7. The three legal routes exist, are linked from the footer, and contain adapted content rather than LHM's wording.
8. `/contact` exists, the navigation points at it, and the form sends successfully to the configured address with a working reply-to.
9. The telephone field is required when a phone based contact method is selected, enforced both client side and in the route handler.
10. `PLACEHOLDERS.md` lists every missing input: contact page intro copy, the footer image, the client's company details, ICO registration, data protection contact, and the note that the legal pages need review.
11. Existing pages are unchanged at 390, 1280 and 2000px, apart from the new footer links and the consent banner.
12. Nothing has been committed to `main`.
