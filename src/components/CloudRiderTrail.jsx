/**
 * =============================================================================
 *  CloudRiderTrail
 * =============================================================================
 *  A second, independent "flying" decoration — the baby boss riding his
 *  smiling cloud (background removed from the reference art, feathered into
 *  a soft transparent glow so it blends into any section it drifts across).
 *
 *  This is intentionally separate from <FlyingBossTrail> / the "flying-boss"
 *  sprite used on LandingGate and HeroSection — that swooping jetpack
 *  animation is untouched. This one drifts left-to-right, slower and
 *  gentler, using its own "driftAcross" keyframe, so the two never overlap
 *  or get confused with one another.
 *
 *  Purely decorative: aria-hidden and pointer-events: none throughout.
 *
 *  Used in: WelcomeSection, GallerySection (add/remove freely elsewhere).
 * =============================================================================
 */
import React from "react";
import cloudRiderImg from "../assets/babyboss/cloud-rider.png";

const riders = [
  { top: "10%", size: 150, duration: "26s", delay: "0s" },
  { top: "60%", size: 100, duration: "32s", delay: "9s" },
];

export default function CloudRiderTrail({ count = 1 }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {riders.slice(0, count).map((r, i) => (
        <span
          key={i}
          className="cloud-rider"
          style={{
            top: r.top,
            left: 0,
            width: r.size,
            animationDuration: r.duration,
            animationDelay: r.delay,
          }}
        >
          <img
            src={cloudRiderImg}
            alt=""
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              filter: "drop-shadow(0 10px 18px rgba(12,55,51,0.28))",
            }}
          />
        </span>
      ))}
    </div>
  );
}
