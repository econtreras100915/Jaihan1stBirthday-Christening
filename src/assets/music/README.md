# Background music goes here

The site now supports a looping background music bed underneath the kid
voice narration — but it's off until a real audio file is dropped in here,
same as the voice recordings in `src/assets/voice/`.

## What to look for

Something light, playful, low-key — instrumental works best since the kid
VA is already carrying the words; a track with vocals will compete with the
narration even with ducking. A loopable ~30–90s instrumental bed (ukulele /
light percussion / "kids party" or "corporate-but-fun" stock tracks work
well for the "Boss Baby" tone) is ideal since it's set to `loop = true`.

Keep the file reasonably compressed (128–160kbps MP3 is plenty) — this is a
guest-facing invite page loaded on mobile data.

## Wiring it in

1. Drop your file in this folder, e.g. `party-loop.mp3`.
2. Open `musicConfig.js` in this same folder and:
   ```js
   import bgMusic from "./party-loop.mp3";
   export const bgMusicSrc = bgMusic;
   ```
That's the whole change. `VoiceNarrationContext` handles the rest:
starts the loop quietly the moment the guest taps "Open Invitation" (needs
that real tap, same phone-autoplay restriction as the voice lines — see the
comment at the top of `VoiceNarrationContext.jsx`), and automatically eases
the volume down under every voice line, then back up after, so it never
overpowers the narration or feels harsh at party volume on a phone speaker.

## Volume levels (already tuned, adjust if needed)

In `VoiceNarrationContext.jsx`:
- `MUSIC_VOLUME_NORMAL` (0.14) — resting volume between voice lines
- `MUSIC_VOLUME_DUCKED` (0.045) — while a voice line is playing
- `VOICE_VOLUME` (0.92) — the kid voice itself, kept just under 100% so
  nothing clips
- `FADE_MS` (220ms) — every volume change ramps over this long instead of
  snapping, which is what keeps the mix from sounding harsh/clicky

These were picked conservatively (quiet music, headroom on voice) since a
guest opening this on a phone at a loud system volume is the worst case to
design for. Turn `MUSIC_VOLUME_NORMAL` up a little if it ends up too quiet
to notice once you're testing with a real track.
