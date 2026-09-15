/**
 * =============================================================================
 *  EventProgramSection
 * =============================================================================
 *  A grid of "ticket" cards announcing the kid-friendly entertainment lined
 *  up for the party (bubble show, photobooth, games, face paint...) — styled
 *  after a carnival program board, but in the invitation's navy/gold Boss
 *  Baby palette. Reads from eventData.eventPrograms, so activities can be
 *  added/removed/relabeled from the data file alone.
 *
 *  Used in: App.jsx, right after ProgramSection (flow of the day).
 * =============================================================================
 */
import React from "react";
import { motion } from "framer-motion";
import { Wand2, Camera, Gamepad2, Palette, PartyPopper } from "lucide-react";
import FloatingDecor from "./FloatingDecor";
import { eventData } from "../data/eventData";
import { voiceScript } from "../data/voiceScript";
import { useSectionVoice } from "../hooks/useSectionVoice";

const iconMap = {
  wand: Wand2,
  camera: Camera,
  games: Gamepad2,
  paint: Palette,
};

function ProgramCard({ label, icon, delay }) {
  const Icon = iconMap[icon] || PartyPopper;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -6, rotate: [0, -2, 2, -2, 0] }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      style={{
        background: "var(--cream-50)",
        borderRadius: "26px",
        border: "3px dashed var(--tie-red)",
        boxShadow: "0 14px 30px rgba(12,55,51,0.35)",
        padding: "26px 16px 20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          margin: "0 auto 12px",
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background: "rgba(224,116,140,0.12)",
          color: "var(--tie-red)",
          border: "2px solid rgba(224,116,140,0.3)",
        }}
      >
        <Icon size={26} strokeWidth={2} />
      </div>
      <p className="font-accent" style={{ margin: 0, fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: 15.5, color: "var(--navy-900)" }}>
        {label}
      </p>
    </motion.div>
  );
}

export default function EventProgramSection() {
  const items = eventData.eventPrograms || [];
  const voiceRef = useSectionVoice(voiceScript.eventProgram);
  if (!items.length) return null;

  return (
    <section ref={voiceRef} className="section section-navy" style={{ position: "relative", textAlign: "center" }}>
      <FloatingDecor Icon={PartyPopper} color="var(--gold-400)" />

      <div className="section-inner">
        {/* Ribbon-style banner title, echoing a carnival marquee */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ marginBottom: 40, textAlign: "center" }}
        >
          <div style={{ marginBottom: 12 }}>
            <p className="eyebrow-note" style={{ justifyContent: "center" }}>
              <PartyPopper size={14} /> come play with us
            </p>
          </div>
          <div
            style={{
              display: "inline-block",
              marginTop: 10,
              padding: "10px 34px",
              borderRadius: 999,
              border: "3px dashed var(--tie-red)",
              background: "var(--cream-100)",
              boxShadow: "0 10px 26px rgba(0,0,0,0.3)",
            }}
          >
            <h2 className="heading-lg" style={{ color: "var(--tie-red)", fontSize: "clamp(1.7rem, 5vw, 2.4rem)" }}>
              Event Programs
            </h2>
          </div>
        </motion.div>

        <div
          className="event-program-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            maxWidth: 460,
            margin: "0 auto",
          }}
        >
          {items.map((item, i) => (
            <ProgramCard key={item.label} label={item.label} icon={item.icon} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
