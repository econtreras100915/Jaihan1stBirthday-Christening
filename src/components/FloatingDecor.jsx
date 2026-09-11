/**
 * =============================================================================
 *  FloatingDecor
 * =============================================================================
 *  A purely decorative, non-interactive layer of slowly bobbing icons
 *  (stars, hearts, sparkles, etc.) placed behind a section's content.
 *  Pass a list of { Icon, top, left, size, delay, color } items, or use
 *  the default sprinkle if you just want quick confetti-like motion.
 *
 *  Used in: almost every section component, for the kid-friendly floating
 *  effect requested for the theme.
 * =============================================================================
 */
import React from "react";

const defaultItems = [
  { top: "8%", left: "6%", size: 22, delay: "0s", duration: "7s" },
  { top: "18%", left: "88%", size: 16, delay: "1.2s", duration: "6s" },
  { top: "62%", left: "4%", size: 18, delay: "2.1s", duration: "8s" },
  { top: "78%", left: "90%", size: 24, delay: "0.6s", duration: "6.5s" },
  { top: "40%", left: "92%", size: 14, delay: "1.8s", duration: "5.5s" },
  { top: "88%", left: "20%", size: 16, delay: "2.6s", duration: "7.5s" },
];

export default function FloatingDecor({ Icon, items = defaultItems, color = "var(--gold-400)" }) {
  return (
    <div className="floating-decor" aria-hidden="true">
      {items.map((item, i) => (
        <span
          key={i}
          className="deco-item"
          style={{
            top: item.top,
            left: item.left,
            color: item.color || color,
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        >
          <Icon size={item.size} strokeWidth={1.75} fill={item.filled ? "currentColor" : "none"} />
        </span>
      ))}
    </div>
  );
}
