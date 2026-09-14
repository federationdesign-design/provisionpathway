# Placeholders and outstanding inputs

Everything below is either stubbed in the build or not rendered because the
input has not been supplied. Nothing here has been invented.

## Assets

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

**COOKIES_AND_PRIVACY_POLICY**
The footer links to `#cookies` and `#privacy`. No policy content has been
supplied. Task 3.

**SERVICES_ASSESSMENT_DELIVERY_CONTRADICTION**
In the services popup copy (`services` in `content/homepage.ts`), the Pathway
Assessment Location line says the assessment "is delivered in person or
virtually (dependant on personal circumstances)", while its first inclusion
says "The assessment itself, delivered in person". Both are entered exactly as
supplied. The studio to decide which is correct.

**SERVICES_POPUP_TITLE**
The popup has no overall heading, as none was supplied. It opens straight
onto the two service headings, which together give the dialog its accessible
name. The previous title, "About the assessment", was removed with the old
content because it no longer describes both services.

## Copy conflicts to raise

**HOMEPAGE_ASSESSMENT_DETAIL_VS_POPUP**
The inline assessment block on the homepage (`details`, rendered by
`AssessmentDetail`) has not been edited, per the pages brief, and now disagrees
with the popup:

1. **Location.** Homepage: "delivered in person". Popup: "in person or
   virtually (dependant on personal circumstances)".
2. **What's included.** Homepage lists four items, including "Not just verbal
   advice." as a separate line. Popup lists three, folds "not just verbal
   advice" into the action plan line, and adds the assessment itself.
3. **Debrief.** Both give the same length. The homepage Format line says the
   debrief is remote as standard, "In-person only if a family specifically
   needs it". The popup says "The debrief afterwards is remote", with no in
   person option, and adds that it is "delivered within 1 to 2 weeks of the
   report being sent".
4. **Purpose.** Present in the popup only.

Pricing agrees.

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
