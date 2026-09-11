/**
 * =============================================================================
 *  FAQSection
 * =============================================================================
 *  A small accordion of frequently asked questions, sourced from
 *  eventData.faq. Click a question to expand/collapse its answer.
 *
 *  Used in: App.jsx
 * =============================================================================
 */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Plus } from "lucide-react";
import WaveDivider from "./WaveDivider";
import SectionHeading from "./SectionHeading";
import { eventData } from "../data/eventData";

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div
      style={{
        background: "var(--white)",
        borderRadius: 16,
        marginBottom: 10,
        overflow: "hidden",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "16px 20px",
          background: "transparent",
          border: "none",
          textAlign: "left",
        }}
      >
        <span className="font-display" style={{ fontSize: 15, fontWeight: 500 }}>{question}</span>
        <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25 }} style={{ color: "var(--gold-500)", flexShrink: 0 }}>
          <Plus size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ margin: 0, padding: "0 20px 18px", fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.7 }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  if (!eventData.faq?.length) return null;

  return (
    <section className="section section-cream" style={{ position: "relative" }}>
      <WaveDivider fill="#fffaef" />

      <div className="section-inner">
        <SectionHeading eyebrow={<><HelpCircle size={14} /> good to know</>} title="Questions & answers" />

        <div style={{ maxWidth: 460, margin: "0 auto" }}>
          {eventData.faq.map((item, i) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
