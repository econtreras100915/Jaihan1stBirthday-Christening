/**
 * =============================================================================
 *  EVENT DATA — edit this file to update the invitation
 * =============================================================================
 *  Everything a guest sees (names, date, venue, hashtag, etc.) is pulled from
 *  this single file. You should never need to touch a component file just to
 *  change text — update the values below and the whole site updates.
 *
 *  Fields left as an empty string "" are hidden automatically wherever they
 *  are optional (see the comments next to each field).
 * =============================================================================
 */

export const eventData = {
  // Celebrant -----------------------------------------------------------------
  celebrantName: "Jaihann",
  celebrantFullTitle: "Jaihann's 1st Birthday & Christening",

  // Countdown target — the site counts down to this exact date/time.
  // Format: "YYYY-MM-DDTHH:mm:ss" (24-hour clock, local time).
  eventDateISO: "2026-11-07T10:00:00",

  // Human-friendly versions shown in the Event Details section.
  eventDateLabel: "November 7, 2026",
  eventDayLabel: "Saturday",
  eventTimeLabel: "10:00 AM",

  // Ceremony (christening) -----------------------------------------------------
  ceremony: {
    name: "Christening",
    venue: "Diocesan Shrine and Parish of St. Augustine",
    address: "", // optional street address / city — shown under the venue name if filled in
    time: "", // optional, e.g. "10:00 AM"
  },

  // Reception (birthday celebration) — optional, hidden if venue is blank -----
  reception: {
    name: "Reception",
    venue: "Sample Reception Venue",
    address: "Sample Address",
    time: "5:00 PM",
  },

  // Welcome message shown right after the hero --------------------------------
  welcomeTitle: "A Little Blessing, A Big Celebration",
  welcomeMessage:
    "With grateful hearts, we invite you to celebrate Jaihann's 1st Birthday & Christening as we give thanks for one wonderful year of love, laughter, and countless blessings. Your presence will make this day even more meaningful as we welcome our little one into the Christian faith.",
  welcomeQuote: "Every good and perfect gift is from above.",
  welcomeQuoteSource: "James 1:17",

  // Social hashtag ---------------------------------------------------------
  hashtag: "#BossBabyJaihann",
  hashtagNote: "Snap, post, and tag us — we're collecting every memory from the big day.",

  // Gift guide message ----------------------------------------------------
  giftMessage:
    "Your presence is the greatest gift the boss could ask for. Should you wish to send something extra, here are a few ideas:",

  // Gift suggestion icons shown under the gift message. `icon` keys map to
  // lucide icons inside GiftSection.jsx (cash, clothes, toys).
  giftSuggestions: [
    { label: "Monetary Gift", icon: "cash" },
    { label: "Clothes", icon: "clothes" },
    { label: "Educational Toys", icon: "toys" },
  ],

  // Closing / thank-you note -----------------------------------------------
  thankYouMessage:
    "Thank you for celebrating this precious milestone with our family. We look forward to creating beautiful memories together on Jaihann's special day.",
  thankYouSignature: "With love, Jaihann's Family",

  // Add-to-calendar ----------------------------------------------------------
  calendar: {
    title: "Jaihann's Birthday & Christening",
    details: "Join us as we celebrate Jaihann's Birthday and Christening!",
    location: "Diocesan Shrine and Parish of St. Augustine",
    durationHours: 3,
  },

  // Dress code — tied to the theme colors, shown as a small chip in Event
  // Details. Leave "" to hide it entirely.
  dressCode: "Dress to impress — teal, gold, cream, and black.",

  // Flow of the day ------------------------------------------------------
  // A simple ordered list of moments, no exact clock times needed. Add,
  // remove, or reorder freely — ProgramSection just maps over this array.
  program: [
    { label: "Guests Arrive", note: "Settle in and say hello" },
    { label: "Christening Ceremony", note: "Welcoming Jaihann into the Christian faith" },
    { label: "Photo Session", note: "Capture precious family memories" },
    { label: "Lunch & Celebration", note: "A delightful feast with family and friends" },
    { label: "Games & Entertainment", note: "Fun prizes for our little guests" },
    { label: "Cake Cutting", note: "Celebrate Jaihann's very first birthday." },
  ],

  // Event programs / kid entertainment — shown as icon cards. `icon` keys
  // map to lucide icons inside EventProgramSection.jsx (wand, camera, games,
  // paint). Add, remove, or relabel freely.
  eventPrograms: [
    { label: "Bubble Show", icon: "wand" },
    { label: "Photobooth", icon: "camera" },
    { label: "Party Games", icon: "games" },
    { label: "Face Paint", icon: "paint" },
  ],

  // Principal sponsors / godparents ---------------------------------------
  // Leave this array empty to hide the section entirely. Fill in names to
  // show a "Principal Sponsors" section, grouped by role.
  principalSponsors: [
    // { name: "", role: "Ninong" },
    // { name: "", role: "Ninang" },
  ],

  // RSVP -------------------------------------------------------------------
  // Fill in whichever contact methods you actually want to use — the RSVP
  // section only shows buttons for the ones that are filled in. The form
  // always works via email (mailto) as a guaranteed fallback if you set
  // hostEmail; add a WhatsApp number and/or a Google Form link for guests
  // who'd rather use those instead.
  rsvp: {
    hostEmail: "marzeneweddinginvitation@gmail.com", // powers the "Send RSVP" email fallback
    hostWhatsApp: "", // digits only, with country code, e.g. "639171234567"
    googleFormUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSd7pwM7cV0NvldvJ_aZbngw6otGJQjS6hxUZ72FP80TUh6yuQ/viewform?usp=publish-editor", // the live RSVP form, embedded directly in the RSVP section
    deadlineLabel: "", // e.g. "Please respond by October 24, 2026"

    // Direct Google Sheet submission ---------------------------------------
    // Once you create the Google Form (see README → "Setting up RSVP"),
    // paste the form ID and each question's entry.XXXXXXX ID here. When
    // these are filled in, the RSVP form submits straight into your
    // Google Sheet in the background — guests never leave the site and
    // you don't need to check email at all.
    googleForm: {
      formId: "", // the long ID from the form's URL, between /d/e/ and /formResponse
      entryIds: {
        name: "", // entry ID for the "Your Name" question
        attending: "", // entry ID for the "Will you be attending?" question
        guests: "", // entry ID for the "Number of guests" question
        message: "", // entry ID for the "Message for the boss" question
      },
    },
  },

  // Frequently asked questions ---------------------------------------------
  faq: [
    {
      question: "Are kids welcome?",
      answer: "Absolutely — this is a party for the littlest guests too. The more tiny bosses, the better.",
    },
    {
      question: "What should I wear?",
      answer: "Smart casual in teal, gold, or cream keeps you right on theme, but come comfortable — it's a party, not a boardroom.",
    },
    {
      question: "Is there parking at the venue?",
      answer: "Parking is available on-site. We recommend arriving a little early to find a spot.",
    },
    {
      question: "Can I bring a plus-one?",
      answer: "Please let us know how many will be joining when you RSVP so we can plan accordingly.",
    },
  ],
};

export default eventData;
