# Provision Pathway: Task Brief, Pages Expansion

**Repository** `provisionpathway`
**Branch** work on a feature branch off `feature/desktop-layout`, never on `main`
**Read first** `provisionpathway_agent_brief.md`. Every hard rule, verification gate and git rule in that document applies here unchanged. This brief adds work, it does not replace anything.

---

## 1. What changes

The site stops being a single page. It becomes three pages plus a shared popup:

    /            home, already built
    /about       new
    /contact     new

The navigation changes with it. `Home`, `About` and `Contact` become real routes rather than in-page anchors. `Pathway` becomes a button that opens the services popup. `Resources` is removed entirely.

## 2. Do this first

Before building any new page, lift the shared furniture out of the homepage and into the root layout: the header, the pinned mobile wordmark bar, the footer and the services popup. Every page carries all four, and they must behave identically on each.

Building About and Contact first and refactoring afterwards will cost more and risks the homepage regressing. Do the shared layout as a discrete step, confirm the homepage is pixel-identical at 390, 1280 and 2000px, then move on.

## 3. Decisions already made

These are settled. Do not re-ask them.

**Colour.** The About page comp is in an old purple scheme, `#482a60`, from before the brand moved to green. The page structure is correct, the colour is not. Map every purple element to the existing green tokens. The dark purple band becomes `#97a97c` with white text, matching the homepage green band. The purple path artwork and the purple watermark logo take the existing brand green.

Note that white on `#97a97c` measures roughly 2.5 to 1, which is below the accessibility threshold for body text. This has been raised and accepted, because the homepage band already works this way and consistency was preferred. Do not alter it, and do not add your own contrast fix.

**The Pathway popup.** There is already an assessment lightbox in the codebase, `AssessmentModal`, triggered by `AssessmentCta`. Do not build a second popup. Extend the existing one to hold both services, and open it from two places: the `Pathway` navigation item and the existing `About the assessment` button. One component, one copy record, two triggers.

**Resources.** Remove the entry from the `nav` array in `content/homepage.ts`. Do not comment it out.

## 4. Popup content

Both services live in the one popup. Copy follows. Put it in the content layer, not in the component.

### Service one: Pathway Assessment

**Purpose:** An independent, structured assessment of a child's needs, strengths, and learning style. Written up as a clear report the family can actually use, with a follow-up debrief included as standard.

**Pricing:** £300 (the debrief is included in this price, not an extra cost)

**Location:** The assessment itself is delivered in person or virtually (dependant on personal circumstances), for families in the Warwickshire area. The debrief afterwards is remote.

**What's included**

- The assessment itself, delivered in person, and the written report.
- A report debrief session (30 to 45 minutes), delivered within 1 to 2 weeks of the report being sent.
- A one-page written action plan with clear next steps, not just verbal advice.

### Service two: Post-16 / Year 11 Destination Coaching

**Purpose:** Supporting Post 16 students, particularly those who are NEET or at risk of becoming NEET, to explore their options and plan a realistic next step in education, training, or work.

**Pricing:** 2-session package £220 (each session is 60 minutes)

**Session structure**

- Explore: understand the young person's interests, strengths, and options.
- Map: lay out realistic pathways, further education, training, apprenticeships, or work.
- Apply: practical support with applications and next steps.

### A contradiction in this copy, flag do not fix

The Location line says the assessment is delivered in person or virtually. The first inclusion bullet says it is delivered in person. Enter both exactly as written, and list the contradiction in `PLACEHOLDERS.md` for the studio to resolve. Do not pick one.

### Existing copy this supersedes

The current lightbox holds a shorter version of the assessment detail, and the same detail also appears inline on the homepage in `AssessmentDetail`. Do not delete the inline homepage block. Raise it if the two now disagree, rather than editing the homepage to match.

## 5. The About page

Build to `reference/aboutpage.jpg`, remapped to green as set out above. It is a 2000px wide export, so a value read off it maps to a CSS pixel at 2000px viewport width directly.

Reuse the existing components and tokens wherever the structure matches the homepage. The banded layout, the two-column text and image section, the closing call to action with path artwork, and the footer are all close relatives of what already exists.

Build mobile first, as the homepage was. There is no mobile comp for this page, so derive the mobile layout from the desktop comp using the same patterns the homepage already establishes: single column, same gutter, same liquid type and spacing tokens.

## 6. The Contact page

Do not build this yet. No content has been supplied. Create the route only if it is needed to stop the navigation breaking, and if so, use a clearly marked placeholder and log it in `PLACEHOLDERS.md`.

## 7. Missing inputs

Log each of these in `PLACEHOLDERS.md` with a clearly named placeholder. Do not invent, substitute or approximate any of them.

1. The hands and notebook photograph from the About page `What do we do?` section.
2. The two-tone watermark logo, white and grey on the band, grey and brand green on the light section. Outstanding since the homepage build, where the stacked white logo is standing in.
3. Confirmation of whether the About page path artwork is the existing `path-illustration_green.svg` or a different composition. It reads slightly differently in the comp. Reuse the existing asset and flag it.
4. All Contact page content.

## 8. Unchanged and still outstanding

Calendly and the analytics consent gate, Tasks 1 and 3 in the main brief, are not part of this work and remain outstanding. The live Calendly link has still not been supplied, so `site.calendlyUrl` stays as the placeholder and every booking button continues to point at it.

## 9. Definition of done

1. All three verification gates pass: type check, production build, and the `:global` grep.
2. The homepage is pixel-identical at 390, 1280 and 2000px to its state before this work, apart from the removal of the `Resources` navigation item.
3. Header, pinned mobile bar, footer and popup are shared from the root layout and behave identically on every page.
4. The popup opens from both the `Pathway` navigation item and the `About the assessment` button, and is the only popup of its kind in the codebase.
5. `Resources` no longer appears in the navigation on any page or at any width.
6. The About page matches the comp at 1280 and 2000px, holds its proportions at 2800px, and reads as a single column on mobile.
7. All page copy sits in the content layer, not hard coded in components.
8. `PLACEHOLDERS.md` lists every item in section 7 plus the copy contradiction in section 4.
9. Nothing has been committed to `main`.
