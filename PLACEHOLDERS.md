# Placeholders and outstanding inputs

Everything below is either stubbed in the build or not rendered because the
input has not been supplied. Nothing here has been invented.

## Assets

**HEADER_WORDMARK_WHITE_HORIZONTAL**
The desktop comp puts a white, single line "The Provision Pathway" wordmark
with the flag mark inside the black logo block. No horizontal lockup has been
supplied. The block currently shows `public/assets/logo-footer-white.svg`, the
stacked white logo, swapped in by a `<picture>` source in
`components/Header.tsx`.

**GOAL_BAND_WATERMARK_TWO_TONE**
The desktop comp's watermark in the green band is two tone: white "the" and
"Pathway", light grey "Provision" and flag. No such variant has been supplied.
The band currently shows `public/assets/logo-footer-white.svg`, all white, in
`components/GoalBand.tsx`.

**SIGNPOST_PLANT_GRAPHIC**
Both comps show a small plant at the foot of the signpost pole. No artwork has
been supplied, so it is not rendered.

## Links

**CALENDLY_URL**
`site.calendlyUrl` in `content/homepage.ts` is still
`https://calendly.com/PLACEHOLDER/consultation`. Task 1.

## Copy

**PERSONAS_BEYOND_SARAH**
The comp shows three carousel dots. Only Sarah has been written. Dots appear
automatically once further entries are added to `personas` in
`content/homepage.ts`.

**COOKIES_AND_PRIVACY_POLICY**
The footer links to `#cookies` and `#privacy`. No policy content has been
supplied. Task 3.

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
