/**
 * =============================================================================
 *  useSectionVoice
 * =============================================================================
 *  Attach the returned ref to a section's root element and its voice line
 *  plays automatically the first time that section scrolls into view —
 *  matching how the site already reveals each section on scroll.
 *
 *  Usage inside a section component:
 *    const voiceRef = useSectionVoice(voiceScript.hero);
 *    return <section ref={voiceRef}>...</section>;
 *
 *  Plays at most once per page load per section (won't re-trigger if the
 *  guest scrolls back up past it again).
 * =============================================================================
 */
import { useEffect, useRef } from "react";
import { useVoiceNarration } from "../context/VoiceNarrationContext";

export function useSectionVoice(entry, { threshold = 0.45 } = {}) {
  const ref = useRef(null);
  const hasPlayedRef = useRef(false);
  const { speak, enabled } = useVoiceNarration();

  useEffect(() => {
    const node = ref.current;
    if (!node || !entry || !entry.text) return;
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (observedEntries) => {
        observedEntries.forEach((observedEntry) => {
          if (observedEntry.isIntersecting && !hasPlayedRef.current && enabled) {
            hasPlayedRef.current = true;
            speak(entry.text, { audioSrc: entry.audioSrc });
          }
        });
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry, enabled, speak, threshold]);

  return ref;
}

export default useSectionVoice;
