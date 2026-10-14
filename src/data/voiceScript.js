/**
 * =============================================================================
 *  VOICE SCRIPT — kid "Boss Baby" narration, one entry per section
 * =============================================================================
 *  Each key matches a section in App.jsx. Every entry currently has
 *  `audioSrc: null`, which means the site plays nothing for that section —
 *  the browser's text-to-speech fallback is turned off (see
 *  `ttsFallbackEnabled` in main.jsx) because it only pitch-shifts an adult
 *  voice and ends up sounding robotic, not like a real kid.
 *
 *  Once a real recording (a real kid, or an AI voice generator's young-boy
 *  preset) is ready for a section, see src/assets/voice/README.md for the
 *  exact steps — short version:
 *    import heroVoice from "../assets/voice/hero.mp3";
 *    ...
 *    hero: { text: "...", audioSrc: heroVoice },
 *  The real recording is used automatically once `audioSrc` is set — no
 *  other code needs to change, and you can wire sections in one at a time
 *  as recordings come in.
 * =============================================================================
 */

export const voiceScript = {
  landingGate: {
    text:
      "Psst. Yes, you. Meeting's about to start, and the boss doesn't like being kept waiting. Tap Open Invitation before I fire somebody.",
    audioSrc: null,
  },

  hero: {
    text:
      "Attention all staff, family, and friends. This is a company-wide announcement from the office of Jaihann. As of November 7, 2026, I will officially be... one year old. And also, a certified Christian. Big year for me.",
    audioSrc: null,
  },

  welcome: {
    text:
      "Now before we get to snacks, a quick word from upper management. That's my mom and dad. With grateful hearts, they invite you to celebrate one wonderful year of love, laughter, and blessings, and to welcome me properly into the faith. Every good and perfect gift is from above. James one, seventeen. Yes, I know Bible verses now. Big year, I told you.",
    audioSrc: null,
  },

  eventDetails: {
    text:
      "Here's the itinerary, so nobody shows up to the wrong building. Christening ceremony, Diocesan Shrine and Parish of Saint Augustine. Then the reception, where the real party happens. Dress code: teal, gold, cream, and black. Dress to impress, this is a boardroom, not your backyard. Tap the button, add it to your calendar, and don't you dare block that date.",
    audioSrc: null,
  },

  countdown: {
    text:
      "Meanwhile, the clock is ticking. Every second that number goes down is a second closer to cake. I'd start counting too, if I could count past ten.",
    audioSrc: null,
  },

  program: {
    text:
      "For those who like a schedule, and I respect that, here's how the day goes down. Guests arrive, we do the christening, we take a hundred photos, we eat, we play some games, and then... cake. Obviously cake is the finale. That's just good business.",
    audioSrc: null,
  },

  eventProgram: {
    text:
      "And for my fellow tiny bosses in the room, we've got a bubble show, a photobooth, party games, and face paint. So yes, bring the kids. This isn't a boring grown-up party, this is a whole operation.",
    audioSrc: null,
  },

  godparents: {
    text:
      "Every good boss needs good advisors. Meet the people who'll be keeping me in line, my Ninong and Ninang.",
    audioSrc: null,
  },

  family: {
    text:
      "None of this happens without this team right here. My family. The real M V Ps behind every decision I've made this year, which, to be fair, were mostly about milk and naps.",
    audioSrc: null,
  },

  gallery: {
    text:
      "Here's some footage from the past year. Cute? Yes. Planned? Also yes. I've been building my image since day one.",
    audioSrc: null,
  },

  hashtag: {
    text:
      "If you take a photo, and you will, tag it Boss Baby Jaihann. I'm collecting evidence that this was, in fact, the party of the year.",
    audioSrc: null,
  },

  rsvp: {
    text:
      "Now here's the part that actually matters to me. Confirm your attendance. Fill out the form below. I need a headcount for cake portions, and I don't take no for an answer.",
    audioSrc: null,
  },

  gift: {
    text:
      "Gifts? Not required. Your presence is already the greatest gift the boss could ask for. But if you insist, cash, clothes, or educational toys. I'm building an empire, I need the resources.",
    audioSrc: null,
  },

  faq: {
    text:
      "A few quick questions people always ask. Are kids welcome? Absolutely, bring the tiny bosses. What should I wear? Smart casual, teal or gold, comfortable, it's a party, not a boardroom. Parking? Available on site. Plus one? Just let us know when you R S V P.",
    audioSrc: null,
  },

  thankYou: {
    text:
      "Thank you for celebrating this milestone with our family. See you on the big day. Meeting adjourned. With love, Jaihann's family.",
    audioSrc: null,
  },
};

export default voiceScript;
