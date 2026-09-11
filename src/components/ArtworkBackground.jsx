/**
 * =============================================================================
 *  ArtworkBackground
 * =============================================================================
 *  Renders one of the illustrated Boss Baby scene backgrounds full-bleed
 *  behind a section's content. Each scene was designed with an open area
 *  for text/cards to sit — `focalPosition` should point at that open area
 *  so it lines up with the section content on top of it.
 *
 *  A top/bottom gradient fades the artwork into `fadeColor` (the section's
 *  own background color) so it hands off cleanly to the WaveDivider above
 *  and below, and a soft color tint keeps text legible over the busier
 *  parts of the illustration (balloons, props) without hiding the art.
 *
 *  Props:
 *    src            required — imported image
 *    fadeColor      required — the section's base background color (hex/var)
 *    focalPosition  CSS background-position equivalent for the <img>, default "center"
 *    mirror         flips the artwork horizontally (used to reuse one scene
 *                    in two different sections without an obvious repeat)
 *    tintOpacity    0–1, strength of the legibility tint (default 0.4)
 *
 *  Used in: every *Section.jsx component.
 * =============================================================================
 */
import React from "react";

export default function ArtworkBackground({
  src,
  fadeColor,
  focalPosition = "center",
  mirror = false,
  tintOpacity = 0.4,
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: focalPosition,
          transform: mirror ? "scaleX(-1)" : "none",
        }}
      />
      {/* color tint for text legibility over busy artwork */}
      <div style={{ position: "absolute", inset: 0, background: fadeColor, opacity: tintOpacity }} />
      {/* edge fade so the art hands off cleanly to the wave dividers */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom, ${fadeColor} 0%, transparent 20%, transparent 80%, ${fadeColor} 100%)`,
        }}
      />
    </div>
  );
}
