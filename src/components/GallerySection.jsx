/**
 * =============================================================================
 *  GallerySection
 * =============================================================================
 *  A responsive two-column photo grid. Each tile staggers into view on
 *  scroll and lifts/tilts slightly on hover for a playful, tactile feel.
 *
 *  Used in: App.jsx
 * =============================================================================
 */
import React from "react";
import { motion } from "framer-motion";
import { Images, Sparkles } from "lucide-react";
import WaveDivider from "./WaveDivider";
import ArtworkBackground from "./ArtworkBackground";
import welcomeBg from "../assets/backgrounds/welcome-bg.jpg";
import galleryBanner from "../assets/reference/gallery-banner.jpg";
import { voiceScript } from "../data/voiceScript";
import { useSectionVoice } from "../hooks/useSectionVoice";

export default function GallerySection() {
  const voiceRef = useSectionVoice(voiceScript.gallery);
  return (
    <section ref={voiceRef} id="gallery" className="section section-cream" style={{ position: "relative" }}>
      <WaveDivider fill="#fffaef" />
      <ArtworkBackground src={welcomeBg} fadeColor="var(--cream-50)" focalPosition="65% center" mirror tintOpacity={0.62} />

      <div className="section-inner">
        <img src={galleryBanner} alt="Our Gallery" style={{ width: "100%", maxWidth: 620, margin: "-14px auto 28px", borderRadius: 22, border: "4px solid var(--white)", boxShadow: "var(--shadow-soft)" }} />

        <motion.div
          className="gallery-coming-soon"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="gallery-coming-soon__icon"><Images size={24} /></span>
          <div>
            <p className="gallery-coming-soon__title"><Sparkles size={16} /> More memories to follow</p>
            <p>Our favorite moments from Jaihann&apos;s special day will be added here soon.</p>
          </div>
        </motion.div>

        <div className="gallery-placeholders" aria-label="Upcoming gallery categories">
          {[
            "Baby Jaihann",
            "Family moments",
            "Party highlights",
          ].map((label, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="gallery-placeholder"
            >
              <Images size={18} />
              <span>{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
