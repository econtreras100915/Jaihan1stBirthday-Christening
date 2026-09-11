/**
 * =============================================================================
 *  FestiveDecor
 * =============================================================================
 *  Extra "invitation card" decoration used on the opening screens (the
 *  LandingGate cover and HeroSection) to match the poster-style reference
 *  art: tied balloon clusters in the corners, a small gift box peeking in
 *  from the bottom edges, and soft drifting clouds along the base of the
 *  section. All purely decorative — aria-hidden and pointer-events: none.
 *
 *  Used in: LandingGate, HeroSection.
 * =============================================================================
 */
import React from "react";
import { Crown } from "lucide-react";

/** A single plump party balloon, drawn as SVG (not an icon outline) so it
 *  reads as an actual balloon like the reference art. */
export function Balloon({ color = "var(--gold-400)", knot = "var(--gold-500)", size = 40, style }) {
  return (
    <svg width={size} height={size * 1.85} viewBox="0 0 40 74" style={style} aria-hidden="true">
      <ellipse cx="20" cy="25" rx="19" ry="23" fill={color} />
      <ellipse cx="13" cy="15" rx="6" ry="8.5" fill="rgba(255,255,255,0.32)" />
      <path d="M17 47 L20 53 L23 47 Z" fill={knot} />
      <line x1="20" y1="53" x2="20" y2="74" stroke={knot} strokeWidth="1.5" opacity="0.55" />
    </svg>
  );
}

/** A trio of balloons tied together, angled toward a corner. */
export function BalloonCluster({ side = "left", palette, className = "" }) {
  const colors = palette || ["var(--gold-400)", "var(--white)", "var(--gold-500)"];
  const flip = side === "right";
  return (
    <div
      aria-hidden="true"
      className={`fly-hover ${className}`}
      style={{
        position: "absolute",
        top: "-8%",
        [side]: "-4%",
        zIndex: 2,
        display: "flex",
        alignItems: "flex-end",
        gap: 1,
        transform: `rotate(${flip ? 10 : -10}deg)${flip ? " scaleX(-1)" : ""}`,
        pointerEvents: "none",
      }}
    >
      <Balloon color={colors[0]} size={28} style={{ marginBottom: 26 }} />
      <Balloon color={colors[1]} size={38} style={{ marginBottom: 4 }} />
      <Balloon color={colors[2]} size={24} style={{ marginBottom: 34 }} />
    </div>
  );
}

/** A small gift box tucked into a bottom corner, ribbon crossed on top. */
export function GiftBoxCorner({ side = "left", color = "var(--blue-500)", ribbon = "var(--gold-400)" }) {
  const flip = side === "right";
  return (
    <svg
      aria-hidden="true"
      width={78}
      height={78}
      viewBox="0 0 86 86"
      style={{
        position: "absolute",
        bottom: "-3%",
        [side]: "-2%",
        zIndex: 2,
        transform: `rotate(${flip ? 8 : -8}deg)${flip ? " scaleX(-1)" : ""}`,
        pointerEvents: "none",
        filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.28))",
      }}
    >
      <rect x="10" y="34" width="66" height="44" rx="4" fill={color} />
      <rect x="10" y="34" width="66" height="13" fill={ribbon} opacity="0.95" />
      <rect x="36" y="34" width="14" height="48" fill={ribbon} opacity="0.95" />
      <path d="M43 34 C 30 21, 20 21, 24 11 C 30 5, 40 15, 43 34 Z" fill={ribbon} />
      <path d="M43 34 C 56 21, 66 21, 62 11 C 56 5, 46 15, 43 34 Z" fill={ribbon} />
    </svg>
  );
}

/** Soft blurred cloud shapes drifting along the bottom edge. */
export function CloudRow() {
  const clouds = [
    { left: "2%", bottom: "-8%", w: 130, opacity: 0.45 },
    { left: "66%", bottom: "-12%", w: 170, opacity: 0.35 },
    { left: "32%", bottom: "-16%", w: 150, opacity: 0.3 },
  ];
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {clouds.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: c.left,
            bottom: c.bottom,
            width: c.w,
            height: c.w * 0.46,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.85)",
            filter: "blur(3px)",
            opacity: c.opacity,
          }}
        />
      ))}
    </div>
  );
}

/** A small gold crown medallion, meant to sit centered on top of a
 *  framed portrait edge — like a little coronet badge. */
export function CrownMedallion({ size = 36 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: -size * 0.45,
        left: "50%",
        transform: "translateX(-50%)",
        width: size,
        height: size,
        borderRadius: "50%",
        background: "var(--grad-gold)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "var(--shadow-gold)",
        border: "2.5px solid var(--white)",
        zIndex: 3,
      }}
    >
      <Crown size={size * 0.5} color="var(--white)" fill="var(--white)" />
    </div>
  );
}
