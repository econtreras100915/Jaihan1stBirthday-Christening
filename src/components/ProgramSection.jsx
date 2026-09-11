/**
 * =============================================================================
 *  ProgramSection
 * =============================================================================
 *  A lightweight vertical timeline of how the day will flow, sourced from
 *  eventData.program. No fixed clock times are required — each step is just
 *  a label + short note, connected by a dotted line for a keepsake-book feel.
 *
 *  Used in: App.jsx
 * =============================================================================
 */
import React from "react";
import { motion } from "framer-motion";
import { ListChecks } from "lucide-react";
import WaveDivider from "./WaveDivider";
import SectionHeading from "./SectionHeading";
import ArtworkBackground from "./ArtworkBackground";
import wideBg from "../assets/backgrounds/wide-bg.jpg";
import { eventData } from "../data/eventData";

export default function ProgramSection() {
  if (!eventData.program?.length) return null;

  return (
    <section className="section section-gold-tint" style={{ position: "relative" }}>
      <WaveDivider fill="#fdf2d8" />
      <ArtworkBackground src={wideBg} fadeColor="var(--cream-100)" focalPosition="center" tintOpacity={0.55} />

      <div className="section-inner">
        <SectionHeading
          eyebrow={<><ListChecks size={14} /> how the day flows</>}
          title="The program"
        />

        <div style={{ position: "relative", maxWidth: 420, margin: "0 auto" }}>
          <div aria-hidden="true" style={{ position: "absolute", left: 21, top: 6, bottom: 6, width: 2, background: "repeating-linear-gradient(to bottom, var(--gold-500) 0 6px, transparent 6px 12px)" }} />
          {eventData.program.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
              style={{ display: "flex", gap: 18, alignItems: "flex-start", marginBottom: 26, position: "relative" }}
            >
              <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: "50%", display: "grid", placeItems: "center", background: "var(--grad-gold)", color: "var(--navy-950)", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, boxShadow: "var(--shadow-gold)", zIndex: 1 }}>{i + 1}</div>
              <div style={{ textAlign: "left", paddingTop: 6 }}>
                <h3 className="font-display" style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>{step.label}</h3>
                {step.note && <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--ink-soft)" }}>{step.note}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
