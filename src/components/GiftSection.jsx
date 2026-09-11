/**
 * =============================================================================
 *  GiftSection
 * =============================================================================
 *  Short, warm note about gifts, styled like a small keepsake card, with a
 *  row of suggestion icons (Monetary Gift / Clothes / Educational Toys)
 *  underneath — reads from eventData.giftSuggestions, so items can be
 *  added/removed/relabeled from the data file alone.
 *
 *  Used in: App.jsx
 * =============================================================================
 */
import React from "react";
import { motion } from "framer-motion";
import { Gift, Banknote, Shirt, Puzzle } from "lucide-react";
import WaveDivider from "./WaveDivider";
import SectionHeading from "./SectionHeading";
import { eventData } from "../data/eventData";

const iconMap = {
  cash: Banknote,
  clothes: Shirt,
  toys: Puzzle,
};

function SuggestionIcon({ label, icon, delay }) {
  const Icon = iconMap[icon] || Gift;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      whileHover={{ y: -4, rotate: [0, -3, 3, -3, 0] }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 108 }}
    >
      <div style={{ width: 56, height: 56, borderRadius: "50%", display: "grid", placeItems: "center", background: "rgba(234,178,35,0.14)", color: "var(--gold-500)", border: "2px solid rgba(234,178,35,0.35)" }}>
        <Icon size={24} strokeWidth={2} />
      </div>
      <p style={{ margin: 0, fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: 13.5, color: "var(--navy-900)", textAlign: "center" }}>
        {label}
      </p>
    </motion.div>
  );
}

export default function GiftSection() {
  const suggestions = eventData.giftSuggestions || [];

  return (
    <section className="section section-cream gift-frame-section" style={{ position: "relative" }}>
      <WaveDivider fill="#fffaef" />

      <div className="section-inner" style={{ textAlign: "center" }}>
        <SectionHeading eyebrow={<><Gift size={14} /> a small note</>} title="Gift guide" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="gift-luxury-card"
        >
          <p className="body-copy" style={{ margin: 0 }}>{eventData.giftMessage}</p>

          {suggestions.length > 0 && (
            <div className="gift-suggestions-row" style={{ display: "flex", justifyContent: "center", flexWrap: "nowrap", gap: 18, marginTop: 26, paddingTop: 24, borderTop: "1px dashed rgba(26,101,92,0.12)" }}>
              {suggestions.map((item, i) => (
              <SuggestionIcon key={item.label} label={item.label} icon={item.icon} delay={i * 0.08} />
              ))}
            </div>
          )}
          <div className="gift-teddy" aria-hidden="true">🧸</div>
        </motion.div>
      </div>
    </section>
  );
}
