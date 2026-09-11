/**
 * =============================================================================
 *  SectionHeading
 * =============================================================================
 *  Shared heading block used at the top of most sections: a small gold
 *  kicker label, a display-font title, and an optional supporting line.
 *  Animates into view once when it scrolls into the viewport.
 *
 *  Used in: WelcomeSection, EventDetailsSection, CountdownSection,
 *  GallerySection, FamilySection, HashtagSection, GiftSection.
 * =============================================================================
 */
import React from "react";
import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ textAlign: align, marginBottom: 40 }}
    >
      {eyebrow && <p className="eyebrow-note" style={{ justifyContent: align === "center" ? "center" : "flex-start" }}>{eyebrow}</p>}
      <h2 className="heading-lg" style={{ marginTop: 10 }}>{title}</h2>
      {subtitle && <p className="body-copy" style={{ marginTop: 14, marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>{subtitle}</p>}
    </motion.div>
  );
}
