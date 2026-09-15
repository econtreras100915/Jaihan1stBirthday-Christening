/**
 * =============================================================================
 *  CountdownSection
 * =============================================================================
 *  Live countdown to eventData.eventDateISO, rendered as four flip-style
 *  cards (days / hours / minutes / seconds). Each digit change triggers a
 *  quick pop animation via framer-motion's AnimatePresence + `key`.
 *
 *  Used in: App.jsx. Powered by hooks/useCountdown.js.
 * =============================================================================
 */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import WaveDivider from "./WaveDivider";
import ArtworkBackground from "./ArtworkBackground";
import countdownBg from "../assets/backgrounds/countdown-bg.jpg";
import { useCountdown } from "../hooks/useCountdown";
import { eventData } from "../data/eventData";
import cuteImg from "../assets/babyboss/cute.jpg";
import countdownBanner from "../assets/reference/countdown-banner.jpg";
import { voiceScript } from "../data/voiceScript";
import { useSectionVoice } from "../hooks/useSectionVoice";

function FlipCard({ value, label }) {
  const display = String(value).padStart(2, "0");
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          position: "relative",
          width: 68,
          height: 68,
          borderRadius: 18,
          background: "var(--grad-navy)",
          display: "grid",
          placeItems: "center",
          boxShadow: "var(--shadow-soft)",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="font-display"
            style={{ position: "absolute", fontSize: 26, fontWeight: 600, color: "var(--gold-300)" }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <p style={{ marginTop: 10, fontSize: 12, letterSpacing: "0.04em", color: "var(--ink-soft)" }}>{label}</p>
    </div>
  );
}

export default function CountdownSection() {
  const { days, hours, minutes, seconds, isOver } = useCountdown(eventData.eventDateISO);
  const voiceRef = useSectionVoice(voiceScript.countdown);

  return (
    <section ref={voiceRef} className="section section-cream" style={{ position: "relative" }}>
      <WaveDivider fill="#fffaef" />
      <ArtworkBackground src={countdownBg} fadeColor="var(--cream-50)" focalPosition="center 35%" tintOpacity={0.45} />

      <div className="section-inner" style={{ textAlign: "center" }}>
        <img src={countdownBanner} alt="We are counting down to Jaihann's special day" style={{ width: "100%", maxWidth: 620, margin: "-14px auto 28px", borderRadius: 22, border: "4px solid var(--white)", boxShadow: "var(--shadow-soft)" }} />

        {!isOver ? (
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <FlipCard value={days} label="DAYS" />
            <FlipCard value={hours} label="HOURS" />
            <FlipCard value={minutes} label="MINUTES" />
            <FlipCard value={seconds} label="SECONDS" />
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="heading-lg"
          >
            🎉 See you there! 🎉
          </motion.p>
        )}
        <motion.img src={cuteImg} alt="Jaihann ready for the party" initial={{ opacity: 0, y: 30, rotate: -4 }} whileInView={{ opacity: 1, y: 0, rotate: -3 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }} style={{ width: 150, margin: "36px auto 0", borderRadius: 20, boxShadow: "var(--shadow-soft)", border: "4px solid var(--white)" }} />

      </div>
    </section>
  );
}
