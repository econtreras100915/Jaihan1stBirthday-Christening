/**
 * =============================================================================
 *  VoiceNarrationContext
 * =============================================================================
 *  Drives the site's kid-voice invitation narration. One "speak" call plays
 *  either:
 *    1. A real recorded audio file, if a section's voiceScript entry has an
 *       `audioSrc` set — this is what plays once actual voice-actor
 *       recordings are dropped into src/assets/voice/, or
 *    2. The browser's built-in text-to-speech, reading that section's
 *       `text` — the zero-setup fallback that works everywhere today, tuned
 *       (higher pitch + a "brightest available" voice pick) to read as
 *       kid-like as the Web Speech API allows.
 *
 *  MOBILE AUTOPLAY NOTE — why this stayed silent once deployed:
 *  Phones (iOS Safari especially, and to a lesser extent mobile Chrome)
 *  refuse to play any audio — including speech synthesis — that wasn't
 *  triggered directly inside a real tap/click. A line fired from a
 *  useEffect on mount, or from an IntersectionObserver scroll callback,
 *  does NOT count as a "real tap," so it plays fine on a desktop dev
 *  browser (where the restriction is looser) but stays completely silent
 *  for a guest opening the live link on their phone.
 *
 *  The fix is `primeAudio()`: it must be called synchronously from inside
 *  an actual onClick/onTouchEnd handler once, near the top of the
 *  handler — LandingGate does this on the "Open Invitation" tap. That one
 *  real tap "unlocks" both speechSynthesis and <audio> playback for the
 *  rest of that guest's session, so every scroll-triggered line after it
 *  plays normally, on live and on local alike.
 *
 *  Only one line ever plays at a time (starting a new one stops whatever's
 *  currently talking), and the mute/unmute preference is remembered across
 *  visits via localStorage.
 *
 *  TTS FALLBACK IS OFF BY DEFAULT — the browser's built-in voices only
 *  pitch-shift an adult voice, which sounds artificial/robotic rather than
 *  like a real kid. Rather than play that for every guest, sections with
 *  no `audioSrc` yet simply stay silent until a real recording is dropped
 *  in (see src/assets/voice/README.md). Flip `ttsFallbackEnabled` to true
 *  below only if you want the robotic placeholder voice back temporarily
 *  for testing.
 *
 *  Used in: main.jsx (wraps <App />), consumed by useSectionVoice.js,
 *  VoiceToggle.jsx, and LandingGate.jsx (for primeAudio()).
 * =============================================================================
 */
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "jaihann-voice-narration-enabled";
const VoiceNarrationContext = createContext(null);

// A ~0.1s silent WAV, used purely to "wake up" <audio> playback on iOS the
// moment the guest taps "Open Invitation" — same trick sites use to unlock
// background music on a user's first interaction.
const SILENT_AUDIO_DATA_URI =
  "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";

// Voice names that tend to sound brighter / younger across common
// platforms (Windows, macOS/iOS, Android, Chrome OS). Not a real "kid"
// voice — the Web Speech API doesn't expose one on most devices — but the
// closest, best-available substitute once picked for pitch + brightness.
const PREFERRED_VOICE_NAMES = [
  "Google US English",
  "Google UK English Male",
  "Microsoft Guy Online (Natural) - English (United States)",
  "Microsoft Aria Online (Natural) - English (United States)",
  "Samantha",
  "Alex",
  "Fred",
];

function pickKidLikeVoice(voices) {
  if (!voices || !voices.length) return null;
  const explicitKid = voices.find((v) => /child|kid|junior/i.test(v.name));
  if (explicitKid) return explicitKid;
  for (const name of PREFERRED_VOICE_NAMES) {
    const match = voices.find((v) => v.name === name);
    if (match) return match;
  }
  return voices.find((v) => /^en/i.test(v.lang)) || voices[0] || null;
}

export function VoiceNarrationProvider({ children, ttsFallbackEnabled = false }) {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === null ? true : saved === "true";
  });

  const speechSupported = typeof window !== "undefined" && "speechSynthesis" in window;
  const currentAudioRef = useRef(null);
  const voicesRef = useRef([]);
  const unlockedRef = useRef(false);

  // Voice lists load asynchronously in most browsers — cache them as soon
  // as they're ready so the very first speak() call already has a good
  // pick to choose from instead of an empty list.
  useEffect(() => {
    if (!speechSupported) return;
    function loadVoices() {
      const list = window.speechSynthesis.getVoices();
      if (list.length) voicesRef.current = list;
    }
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, [speechSupported]);

  // Remember the guest's mute/unmute choice, and immediately stop any line
  // that's currently playing the moment narration gets muted.
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, String(enabled));
    if (!enabled) stopInternal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  function stopInternal() {
    if (speechSupported) window.speechSynthesis.cancel();
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
  }

  // Call this synchronously from inside a real tap/click handler (see
  // LandingGate's "Open Invitation" button) — see the module comment above
  // for why this is the whole fix for "silent on live, works on local."
  const primeAudio = useCallback(() => {
    if (typeof window === "undefined" || unlockedRef.current) return;
    unlockedRef.current = true;

    if (speechSupported) {
      try {
        const unlockUtterance = new SpeechSynthesisUtterance(" ");
        unlockUtterance.volume = 0;
        window.speechSynthesis.speak(unlockUtterance);
      } catch (e) {
        // Safe to ignore — worst case, narration stays fallback-silent.
      }
    }
    try {
      const silentAudio = new Audio(SILENT_AUDIO_DATA_URI);
      silentAudio.volume = 0;
      silentAudio.play().catch(() => {});
    } catch (e) {
      // Safe to ignore.
    }
  }, [speechSupported]);

  const speak = useCallback(
    (text, { audioSrc, rate = 1.05, pitch = 1.55 } = {}) => {
      if (!enabled) return;
      stopInternal();

      // Prefer a real recording once one is provided for this section.
      if (audioSrc) {
        const audioEl = new Audio(audioSrc);
        currentAudioRef.current = audioEl;
        audioEl.play().catch(() => {
          // Autoplay can still be blocked if primeAudio() was never
          // called from a real tap — see the module comment above.
        });
        return;
      }

      if (!speechSupported || !text || !ttsFallbackEnabled) return;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = pitch; // higher pitch reads noticeably more kid-like
      const voices = voicesRef.current.length ? voicesRef.current : window.speechSynthesis.getVoices();
      const preferredVoice = pickKidLikeVoice(voices);
      if (preferredVoice) utterance.voice = preferredVoice;
      window.speechSynthesis.speak(utterance);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [enabled, speechSupported, ttsFallbackEnabled]
  );

  const stop = useCallback(() => stopInternal(), []); // eslint-disable-line react-hooks/exhaustive-deps
  const toggle = useCallback(() => setEnabled((v) => !v), []);

  return (
    <VoiceNarrationContext.Provider value={{ enabled, supported: speechSupported, speak, stop, toggle, primeAudio }}>
      {children}
    </VoiceNarrationContext.Provider>
  );
}

export function useVoiceNarration() {
  const ctx = useContext(VoiceNarrationContext);
  if (!ctx) {
    throw new Error("useVoiceNarration must be used inside a <VoiceNarrationProvider>");
  }
  return ctx;
}

export default VoiceNarrationContext;
