/**
 * =============================================================================
 *  FamilySection
 * =============================================================================
 *  A warm portrait section featuring the family photo, framed with a gold
 *  border and a soft tilt-in entrance animation.
 *
 *  Used in: App.jsx
 * =============================================================================
 */
import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import WaveDivider from "./WaveDivider";
import SectionHeading from "./SectionHeading";
import ArtworkBackground from "./ArtworkBackground";
import familyBg from "../assets/backgrounds/family-bg.jpg";
import familyImg from "../assets/babyboss/family.jpg";
import { voiceScript } from "../data/voiceScript";
import { useSectionVoice } from "../hooks/useSectionVoice";

export default function FamilySection() {
  const voiceRef = useSectionVoice(voiceScript.family);
  return (
    <section ref={voiceRef} className="section section-gold-tint" style={{ position: "relative" }}>
      <WaveDivider fill="#fdf2d8" />
      <ArtworkBackground src={familyBg} fadeColor="var(--cream-100)" focalPosition="center 30%" tintOpacity={0.4} />

      <div className="section-inner" style={{ textAlign: "center" }}>
        <SectionHeading eyebrow={<><Users size={14} /> the whole team</>} title="Our family" />
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            borderRadius: 26,
            overflow: "hidden",
            border: "6px solid var(--white)",
            boxShadow: "var(--shadow-soft)",
            maxWidth: 480,
            margin: "0 auto",
          }}
        >
          <img src={familyImg} alt="Jaihann with mom and dad" style={{ width: "100%" }} />
        </motion.div>
      </div>
    </section>
  );
}
