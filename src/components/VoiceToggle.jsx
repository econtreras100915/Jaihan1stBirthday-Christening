/**
 * =============================================================================
 *  VoiceToggle
 * =============================================================================
 *  Small floating mute/unmute button for the kid-voice narration. Sits
 *  alongside <ScrollProgress>, only rendered once the invitation is open —
 *  matters because a lot of guests will open this somewhere quiet and want
 *  to mute it fast.
 *
 *  Used in: App.jsx
 * =============================================================================
 */
import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useVoiceNarration } from "../context/VoiceNarrationContext";

export default function VoiceToggle() {
  const { enabled, toggle, stop, supported } = useVoiceNarration();

  function handleClick() {
    if (enabled) stop();
    toggle();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="voice-toggle-btn"
      aria-label={enabled ? "Mute voice invitation" : "Unmute voice invitation"}
      title={
        supported
          ? enabled
            ? "Mute voice invitation"
            : "Unmute voice invitation"
          : "Voice narration isn't supported in this browser"
      }
    >
      {enabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
}
