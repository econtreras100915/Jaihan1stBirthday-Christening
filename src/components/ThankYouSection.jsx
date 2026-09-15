/**
 * =============================================================================
 *  ThankYouSection
 * =============================================================================
 *  Final section of the invitation — closing portrait, thank-you note, and
 *  a small footer credit line.
 *
 *  Used in: App.jsx
 * =============================================================================
 */
import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import WaveDivider from "./WaveDivider";
import ArtworkBackground from "./ArtworkBackground";
import heroBg from "../assets/backgrounds/hero-bg.jpg";
import thankYouBanner from "../assets/reference/thank-you-banner.jpg";
import { eventData } from "../data/eventData";
import { voiceScript } from "../data/voiceScript";
import { useSectionVoice } from "../hooks/useSectionVoice";

export default function ThankYouSection() {
  const voiceRef = useSectionVoice(voiceScript.thankYou);
  return (
    <section ref={voiceRef} className="section section-navy" style={{ position: "relative", textAlign: "center", paddingBottom: 40 }}>
      <WaveDivider fill="var(--navy-950)" />
      <ArtworkBackground src={heroBg} fadeColor="var(--navy-950)" focalPosition="center" mirror tintOpacity={0.6} />

      <div className="section-inner">
        <motion.img
          src={thankYouBanner}
          alt="Thank you for being part of our little boss' special day"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ width: "100%", maxWidth: 620, margin: "24px auto 0", borderRadius: 22, border: "4px solid rgba(255,255,255,0.8)", boxShadow: "var(--shadow-soft)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          style={{ maxWidth: 570, margin: "36px auto 0" }}
        >
          <h2 className="heading-lg" style={{ margin: 0, color: "var(--gold-300)" }}>Thank You</h2>
          <p style={{ margin: "16px 0 0", color: "rgba(255,255,255,0.9)", lineHeight: 1.7 }}>
            {eventData.thankYouMessage}
          </p>
          <p style={{ margin: "18px 0 0", color: "var(--gold-300)", fontFamily: "var(--font-display)", fontSize: 18 }}>
            {eventData.thankYouSignature}
          </p>
        </motion.div>

        <p style={{ marginTop: 34, fontSize: 12.5, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          Made with <Heart size={12} fill="currentColor" /> for {eventData.celebrantName}
        </p>
      </div>
    </section>
  );
}
