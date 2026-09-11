/**
 * A light, page-wide sprinkle of kid-party decorations. The layer is purely
 * visual: it never receives pointer events and respects reduced-motion
 * settings declared in the global stylesheet.
 */
import React from "react";

const pieces = [
  { type: "star", symbol: "★", left: "5%", size: 18, delay: "-2s", duration: "13s", drift: "20px", color: "#f7cf5c" },
  { type: "confetti", left: "14%", size: 8, delay: "-8s", duration: "16s", drift: "-28px", color: "#e0748c" },
  { type: "balloon", left: "9%", size: 18, delay: "-14s", duration: "20s", drift: "42px", color: "#5fb1c7" },
  { type: "star", symbol: "✦", left: "27%", size: 15, delay: "-5s", duration: "12s", drift: "36px", color: "#ffe49a" },
  { type: "bubble", left: "22%", size: 13, delay: "-10s", duration: "18s", drift: "-16px", color: "#ffffff" },
  { type: "confetti", left: "39%", size: 7, delay: "-11s", duration: "17s", drift: "-18px", color: "#5fb1c7" },
  { type: "balloon", left: "45%", size: 16, delay: "-4s", duration: "19s", drift: "-36px", color: "#f7cf5c" },
  { type: "star", symbol: "★", left: "53%", size: 16, delay: "-3s", duration: "14s", drift: "25px", color: "#f7cf5c" },
  { type: "bubble", left: "58%", size: 11, delay: "-16s", duration: "21s", drift: "24px", color: "#ffffff" },
  { type: "confetti", left: "66%", size: 9, delay: "-13s", duration: "18s", drift: "-38px", color: "#ffe49a" },
  { type: "balloon", left: "70%", size: 19, delay: "-7s", duration: "22s", drift: "32px", color: "#e0748c" },
  { type: "star", symbol: "✦", left: "77%", size: 14, delay: "-6s", duration: "13s", drift: "18px", color: "#e0748c" },
  { type: "bubble", left: "83%", size: 12, delay: "-1s", duration: "16s", drift: "-26px", color: "#ffffff" },
  { type: "confetti", left: "89%", size: 8, delay: "-9s", duration: "15s", drift: "-22px", color: "#5fb1c7" },
  { type: "star", symbol: "★", left: "95%", size: 13, delay: "-12s", duration: "17s", drift: "-30px", color: "#ffe49a" },
];

export default function FallingKidsDecor() {
  return (
    <div className="falling-kids-decor" aria-hidden="true">
      {pieces.map((piece, index) => (
        <span
          key={index}
          className={`falling-piece falling-piece--${piece.type}`}
          style={{
            left: piece.left,
            width: piece.size,
            height: piece.size,
            color: piece.color,
            backgroundColor: ["confetti", "balloon"].includes(piece.type) ? piece.color : undefined,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            "--fall-drift": piece.drift,
            "--piece-size": `${piece.size}px`,
          }}
        >
          {piece.type === "balloon" && <span className="falling-balloon-string" />}
          {piece.symbol}
        </span>
      ))}
    </div>
  );
}
