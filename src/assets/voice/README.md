# Voice recordings go here

The site's voice invitation currently plays nothing until real audio files are
dropped into this folder — the browser's built-in text-to-speech was tried
first, but it only pitch-shifts an adult voice and ends up sounding robotic
rather than like a real kid, so it's disabled by default (see
`ttsFallbackEnabled` in `src/main.jsx`).

## Getting a real kid voice

Either works, whichever is easier for you:

1. **A real kid recording.** Record a boy (a nephew, cousin, neighbor's kid —
   doesn't need to be Jaihann himself) reading each line below out loud on a
   phone, somewhere quiet, holding the phone close. Even a plain Voice Memos /
   phone recorder app is fine.
2. **An AI voice generator with a young-boy preset.** Services like
   ElevenLabs, Murf.ai, or Play.ht let you type in the script text and
   generate a natural-sounding "young boy" voice as a downloadable MP3 — no
   actual kid needed. This tends to be the faster option.

Either way, you're aiming for 15 short audio clips, one per line in
`src/data/voiceScript.js`.

## File naming

Save each clip using these exact names in this folder:

| File name              | Line (see voiceScript.js for the exact wording) |
|-------------------------|--------------------------------------------------|
| `landing-gate.mp3`      | "Psst. Yes, you..."                              |
| `hero.mp3`              | "Attention all staff, family, and friends..."    |
| `welcome.mp3`           | "Now before we get to snacks..."                 |
| `event-details.mp3`     | "Here's the itinerary..."                        |
| `countdown.mp3`         | "Meanwhile, the clock is ticking..."             |
| `program.mp3`           | "For those who like a schedule..."               |
| `event-program.mp3`     | "And for my fellow tiny bosses..."               |
| `godparents.mp3`        | "Every good boss needs good advisors..."         |
| `family.mp3`            | "None of this happens without this team..."      |
| `gallery.mp3`           | "Here's some footage from the past year..."      |
| `hashtag.mp3`           | "If you take a photo..."                         |
| `rsvp.mp3`              | "Now here's the part that actually matters..."   |
| `gift.mp3`              | "Gifts? Not required..."                         |
| `faq.mp3`               | "A few quick questions people always ask..."     |
| `thank-you.mp3`         | "Thank you for celebrating this milestone..."    |

MP3 or WAV both work. Keep each file reasonably short/compressed — this is a
guest-facing invitation page, so smaller files load faster on mobile data.

## Wiring a file in once you have it

Once a file is sitting in this folder, open `src/data/voiceScript.js` and:

1. Import it at the top, e.g.:
   ```js
   import heroVoice from "../assets/voice/hero.mp3";
   ```
2. Set that section's `audioSrc` to the imported file:
   ```js
   hero: { text: "...", audioSrc: heroVoice },
   ```

That's it — no other file needs to change. The real recording plays
automatically instead of silence the moment `audioSrc` is set. You can wire
these in one at a time as recordings come in; sections without a file yet
just stay silent, same as now.
