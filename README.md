# Jaihann's Boss Baby Birthday & Holy Christening — Digital Invitation

A single-page animated invitation site: a cover "Open Invitation" screen,
then a scrolling invitation with a live countdown, event details, photo
gallery, and more — themed around Jaihann's Boss Baby portraits.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

## Edit the invitation content

You should not need to touch component code to update text. Almost
everything a guest sees lives in **`src/data/eventData.js`**:

- Celebrant name & title
- Countdown target date/time
- Ceremony & reception venue/time (leave a field as `""` to hide it)
- Welcome message, gift note, hashtag, thank-you note
- Add-to-calendar details, dress code
- **`program`** — the flow-of-the-day list (add/remove/reorder freely, no clock times required)
- **`principalSponsors`** — godparents; leave the array empty to hide that section entirely
- **`rsvp`** — set `hostEmail` (and optionally `hostWhatsApp` / `googleFormUrl`) so the RSVP form actually reaches you — see "Setting up RSVP" below
- **`faq`** — the question/answer list shown in the FAQ accordion

### Setting up RSVP

The RSVP section works with no backend at all. Your host email is already
set to `marzeneweddinginvitation@gmail.com` as a fallback, but the
recommended setup is the direct Google Sheet method below — it collects
every response in one place automatically.

**Direct-to-Sheet (recommended):**
1. Create a Google Form with these questions, in this order:
   - "Your Name" — Short answer
   - "Will you be attending?" — Multiple choice: "Joyfully yes" / "Can't make it"
   - "Number of guests (incl. you)" — Short answer
   - "Message for the boss" — Paragraph
2. In the form's Responses tab, click the Sheets icon to create a linked
   spreadsheet — every RSVP will land there as a new row.
3. Open the ⋮ menu → "Get pre-filled link", fill in each field with a
   placeholder answer, click "Get Link", and copy the URL it gives you.
4. Paste that URL into `eventData.rsvp.googleForm` — the form ID and each
   `entry.XXXXXXX` number get extracted from it (see comments in
   `eventData.js` for exactly where each one goes).

Once `googleForm.formId` is filled in, guest RSVPs submit straight into
your Sheet in the background — no email needed.

**Email fallback (already active):** if the Google Form isn't set up yet,
submitting the form opens the guest's email app with everything pre-filled,
addressed to `hostEmail`.

Optionally set `rsvp.hostWhatsApp` (digits only, with country code, e.g.
`"639171234567"`) to also show a WhatsApp button, or `rsvp.googleFormUrl`
to link out to the form directly as a third option.

## Project structure

```
index.html                     Document shell, fonts, meta tags
vite.config.js                 Vite + React plugin setup
src/
  main.jsx                     App entry point
  App.jsx                      Page composition — section order lives here
  index.css                    Design tokens, resets, shared animations
  data/
    eventData.js                ⭐ Edit invitation text/dates here
  utils/
    calendarLink.js             Builds the "Add to Calendar" URL
  hooks/
    useCountdown.js             Live countdown timer hook
  components/
    LandingGate.jsx             Cover screen + "Open Invitation" button
    ScrollProgress.jsx          Top progress bar (shown after opening)
    WaveDivider.jsx             Scalloped section divider
    ArtworkBackground.jsx       Full-bleed illustrated section background
    SectionHeading.jsx          Shared eyebrow + title block
    FloatingDecor.jsx           Background floating icon layer
    HeroSection.jsx             Opening section
    WelcomeSection.jsx          "With Joyful Hearts" message
    EventDetailsSection.jsx     Ceremony/reception cards, directions, calendar, dress code
    CountdownSection.jsx        Live countdown
    ProgramSection.jsx          Flow-of-the-day timeline
    GodparentsSection.jsx       Principal sponsors (hidden until filled in)
    FamilySection.jsx           Family portrait
    GallerySection.jsx          Photo grid
    HashtagSection.jsx          Social hashtag prompt
    RSVPSection.jsx             RSVP form (email / WhatsApp / Google Form)
    GiftSection.jsx             Gift guide note
    FAQSection.jsx               Frequently asked questions accordion
    ThankYouSection.jsx         Closing section + footer credit
  assets/babyboss/               Photos of Jaihann used throughout the site
  assets/backgrounds/            Illustrated scene artwork used as section backgrounds
```

## Background artwork

Every section has one of the illustrated Boss Baby scenes as a full-bleed
background (via `components/ArtworkBackground.jsx`), tinted so text stays
readable and faded at the edges so it blends into the scalloped dividers:

| File                    | Used in                              |
|--------------------------|---------------------------------------|
| `hero-bg.jpg`            | Landing cover screen, Hero section (mirrored on Thank You) |
| `welcome-bg.jpg`         | Welcome section, Godparents (mirrored on Gallery) |
| `countdown-bg.jpg`       | Countdown section, FAQ (mirrored on Hashtag) |
| `family-bg.jpg`          | Family section (mirrored on RSVP) |
| `wide-bg.jpg`            | Event Details section, Program (mirrored on Gift) |

To swap any of these, drop a new image into `src/assets/backgrounds/`,
update the import path in the relevant section component, and adjust the
`focalPosition` prop on `<ArtworkBackground>` to line up with your new
image's open/empty area.

## Personalized guest links

Share links with a `?to=` query parameter to greet guests by name on the
cover screen, e.g.:

```
https://your-site.com/?to=Tita%20Mars
```

The cover screen will show "Dear Tita Mars, the boss requests your
presence." Leave the parameter off for a generic invitation link.
