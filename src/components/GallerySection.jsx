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
import WaveDivider from "./WaveDivider";
import ArtworkBackground from "./ArtworkBackground";
import CloudRiderTrail from "./CloudRiderTrail";
import welcomeBg from "../assets/backgrounds/welcome-bg.jpg";
import heroImg from "../assets/babyboss/hero.jpg";
import cuteImg from "../assets/babyboss/cute.jpg";
import smileImg from "../assets/babyboss/smile.jpg";
import groupImg from "../assets/babyboss/group.jpg";
import bossPointingImg from "../assets/babyboss/boss-pointing.png";
import bossStandingImg from "../assets/babyboss/boss-standing.png";
import bossSmirkImg from "../assets/babyboss/boss-smirk.png";
import bossCrewImg from "../assets/babyboss/boss-crew.png";
import galleryBanner from "../assets/reference/gallery-banner.jpg";

const photos = [
  { src: heroImg, alt: "Jaihann in his little suit" },
  { src: cuteImg, alt: "Jaihann, the boss himself" },
  { src: smileImg, alt: "Jaihann thinking big thoughts" },
  { src: groupImg, alt: "Jaihann with the Baby Corp crew" },
  { src: bossPointingImg, alt: "Boss Baby pointing" },
  { src: bossStandingImg, alt: "Boss Baby standing in his suit" },
  { src: bossSmirkImg, alt: "Boss Baby striking a pose" },
  { src: bossCrewImg, alt: "Boss Baby with his crew" },
];

export default function GallerySection() {
  return (
    <section className="section section-cream" style={{ position: "relative" }}>
      <WaveDivider fill="#fffaef" />
      <ArtworkBackground src={welcomeBg} fadeColor="var(--cream-50)" focalPosition="65% center" mirror tintOpacity={0.62} />
      <CloudRiderTrail count={1} />

      <div className="section-inner">
        <img src={galleryBanner} alt="Our Gallery" style={{ width: "100%", maxWidth: 620, margin: "-14px auto 28px", borderRadius: 22, border: "4px solid var(--white)", boxShadow: "var(--shadow-soft)" }} />

        <div className="gallery-grid">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.alt}
              initial={{ opacity: 0, y: 26, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08, ease: "easeOut" }}
              whileHover={{ scale: 1.04, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
              style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 12px 26px rgba(26,101,92,0.12)", border: "3px solid var(--white)" }}
            >
              <img src={photo.src} alt={photo.alt} style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
