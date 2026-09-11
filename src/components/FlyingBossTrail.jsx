/**
 * =============================================================================
 *  FlyingBossTrail
 * =============================================================================
 *  Two playful, purely decorative effects layered behind the hero content:
 *
 *  1. "Flying boss baby" — the actual Boss Baby artwork (transparent PNG,
 *     already posed mid-flight) swooping from bottom-left to top-right like
 *     it's zooming around on jetpack business, banking mid-flight. A motion
 *     streak trails behind it for extra "flying fast" feel. A couple of
 *     these loop on staggered timers/delays so there's always one somewhere
 *     in the sky.
 *
 *  2. Rising balloons/stars — small party icons drifting upward and gently
 *     swaying, for extra kid-party sparkle behind the flying trail.
 *
 *  Fully aria-hidden and pointer-events: none — decoration only, never
 *  blocks taps/clicks on real content underneath.
 *
 *  Used in: LandingGate, HeroSection.
 * =============================================================================
 */
import React from "react";
import { PartyPopper, Star, Rocket } from "lucide-react";
import flyingBossImg from "../assets/babyboss/flying-boss.png";

const bosses = [
  { top: "58%", size: 108, duration: "13s", delay: "0s" },
  { top: "16%", size: 72, duration: "16s", delay: "5s" },
  { top: "76%", size: 60, duration: "19s", delay: "10s" },
];

const balloons = [
  { left: "10%", size: 20, duration: "9s", delay: "0s", Icon: PartyPopper, color: "var(--gold-300)" },
  { left: "28%", size: 14, duration: "7.5s", delay: "1.4s", Icon: Star, color: "var(--white)" },
  { left: "68%", size: 18, duration: "10s", delay: "2.6s", Icon: Star, color: "var(--gold-400)" },
  { left: "84%", size: 22, duration: "8.2s", delay: "0.8s", Icon: Rocket, color: "var(--gold-300)" },
];

export default function FlyingBossTrail({ showBalloons = true }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
      {bosses.map((b, i) => (
        <span
          key={i}
          className="flying-boss"
          style={{
            top: b.top,
            left: 0,
            width: b.size,
            animationDuration: b.duration,
            animationDelay: b.delay,
          }}
        >
          {/* motion streak trailing behind, angled to match the flight path */}
          <span
            className="boss-trail-streak"
            style={{ width: b.size * 1.5, animationDuration: b.duration, animationDelay: b.delay }}
          />
          <img
            src={flyingBossImg}
            alt=""
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.4))",
            }}
          />
        </span>
      ))}

      {showBalloons &&
        balloons.map((bl, i) => {
          const { Icon } = bl;
          return (
            <span
              key={i}
              className="balloon-item"
              style={{
                left: bl.left,
                color: bl.color,
                animationDuration: bl.duration,
                animationDelay: bl.delay,
              }}
            >
              <Icon size={bl.size} strokeWidth={1.75} fill={bl.color} fillOpacity={0.15} />
            </span>
          );
        })}
    </div>
  );
}
