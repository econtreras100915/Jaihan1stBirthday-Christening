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
 *       `text` — the zero-setup fallback that works everywhere today.
 *
 *  Only one line ever plays at a time (starting a new one stops whatever's
 *  currently talking), and the mute/unmute preference is remembered across
 *  visits via localStorage.
 *
 *  Used in: main.jsx (wraps <App />), consumed by useSectionVoice.js and
 *  VoiceToggle.jsx.
 * =============================================================================
 */
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "jaihann-voice-narration-enabled";
const VoiceNarrationContext = createContext(null);

export function VoiceNarrationProvider({ children }) {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === null ? true : saved === "true";
  });

  const speechSupported = typeof window !== "undefined" && "speechSynthesis" in window;
  const currentAudioRef = useRef(null);

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

  const speak = useCallback(
    (text, { audioSrc, rate = 1, pitch = 1.3 } = {}) => {
      if (!enabled) return;
      stopInternal();

      // Prefer a real recording once one is provided for this section.
      if (audioSrc) {
        const audioEl = new Audio(audioSrc);
        currentAudioRef.current = audioEl;
        audioEl.play().catch(() => {
          // Autoplay can be blocked by the browser until the guest has
          // interacted with the page — safe to ignore, the mute button
          // and normal scrolling still work fine.
        });
        return;
      }

      if (!speechSupported || !text) return;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = pitch; // a little higher reads more kid-like
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find((v) => /child|kid|junior/i.test(v.name)) ||
        voices.find((v) => /^en/i.test(v.lang));
      if (preferredVoice) utterance.voice = preferredVoice;
      window.speechSynthesis.speak(utterance);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [enabled, speechSupported]
  );

  const stop = useCallback(() => stopInternal(), []); // eslint-disable-line react-hooks/exhaustive-deps
  const toggle = useCallback(() => setEnabled((v) => !v), []);

  return (
    <VoiceNarrationContext.Provider value={{ enabled, supported: speechSupported, speak, stop, toggle }}>
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
