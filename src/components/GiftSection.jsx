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
import { voiceScript } from "../data/voiceScript";
import { useSectionVoice } from "../hooks/useSectionVoice";

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
      className="gift-suggestion"
    >
      <div className="gift-suggestion__icon">
        <Icon size={24} strokeWidth={2} />
      </div>
      <p>
        {label}
      </p>
    </motion.div>
  );
}

export default function GiftSection() {
  const suggestions = eventData.giftSuggestions || [];
  const voiceRef = useSectionVoice(voiceScript.gift);

  return (
    <section ref={voiceRef} className="section section-cream gift-frame-section" style={{ position: "relative" }}>
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
          <div className="gift-card-kicker"><Gift size={15} /> For our little boss</div>
          <p className="body-copy" style={{ margin: 0 }}>{eventData.giftMessage}</p>

          {suggestions.length > 0 && (
            <div className="gift-suggestions-row">
              {suggestions.map((item, i) => (
              <SuggestionIcon key={item.label} label={item.label} icon={item.icon} delay={i * 0.08} />
              ))}
            </div>
          )}
          <p className="gift-card-footer">A thoughtful surprise is lovely, but celebrating with you is the best gift of all.</p>
        </motion.div>
      </div>
    </section>
  );
}
