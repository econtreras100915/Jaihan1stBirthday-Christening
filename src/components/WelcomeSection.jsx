/**
 * =============================================================================
 *  WelcomeSection
 * =============================================================================
 *  "With Joyful Hearts" — the family's welcome note. Cream background,
 *  transitions in from the navy hero via <WaveDivider>.
 *
 *  Used in: App.jsx
 * =============================================================================
 */
import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import WaveDivider from "./WaveDivider";
import FloatingDecor from "./FloatingDecor";
import ArtworkBackground from "./ArtworkBackground";
import welcomeBg from "../assets/backgrounds/welcome-bg.jpg";
import { eventData } from "../data/eventData";

export default function WelcomeSection() {
  return (
    <section className="section section-cream" style={{ position: "relative" }}>
      <WaveDivider fill="#fffaef" />
      <ArtworkBackground src={welcomeBg} fadeColor="var(--cream-50)" focalPosition="65% center" tintOpacity={0.42} />
      <FloatingDecor Icon={Heart} color="rgba(224,116,140,0.5)" />

      <div
        className="section-inner"
        style={{
          textAlign: "center",
          maxWidth: 520,
          padding: "32px 26px",
          borderRadius: 28,
          background: "rgba(255, 255, 255, 0.86)",
          border: "1px solid rgba(255, 255, 255, 0.9)",
          boxShadow: "0 16px 38px rgba(26, 101, 92, 0.14)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            width: 54,
            height: 54,
            margin: "0 auto 18px",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            background: "var(--grad-gold)",
            boxShadow: "var(--shadow-gold)",
          }}
        >
          <Heart size={24} color="var(--navy-950)" fill="var(--navy-950)" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="heading-lg"
        >
          {eventData.welcomeTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="body-copy"
          style={{ marginTop: 16, fontSize: 16, lineHeight: 1.7 }}
        >
          {eventData.welcomeMessage}
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6 }}
          style={{ margin: "22px 0 0", color: "var(--primary-dark)", fontFamily: "var(--font-display)", fontStyle: "italic", lineHeight: 1.6 }}
        >
          &ldquo;{eventData.welcomeQuote}&rdquo; <span style={{ whiteSpace: "nowrap" }}>— {eventData.welcomeQuoteSource}</span>
        </motion.blockquote>

      </div>
    </section>
  );
}
