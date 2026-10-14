import React from "react";
import { motion } from "framer-motion";
import { Crown, Shirt, Sparkles } from "lucide-react";
import WaveDivider from "./WaveDivider";
import SectionHeading from "./SectionHeading";
import { eventData } from "../data/eventData";

const palette = [
  { label: "Teal", color: "#1a655c" },
  { label: "Sky blue", color: "#5fb1c7" },
  { label: "Gold", color: "#f7cf5c" },
  { label: "Cream", color: "#fffaef", border: true },
  { label: "Black", color: "#1f2928" },
];

export default function DressCodeSection() {
  if (!eventData.dressCode) return null;

  return (
    <section id="dress-code" className="section section-gold-tint dress-code-section" style={{ position: "relative" }}>
      <WaveDivider fill="#fdf2d8" />
      <div className="section-inner">
        <SectionHeading eyebrow={<><Shirt size={14} /> dress code</>} title="Dress details" />
        <motion.div
          className="dress-card"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="dress-card__garland" aria-hidden="true"><span>✦</span><i /><span>♛</span><i /><span>✦</span></div>
          <div className="dress-card__theme-icon"><Crown size={22} /></div>
          <p className="dress-card__eyebrow">Theme</p>
          <h3 className="font-display">Boss Baby Classic</h3>
          <p className="dress-card__copy">Come in smart, comfortable, and church-appropriate attire in our celebration palette.</p>

          <div className="dress-swatches" aria-label="Dress code colors">
            {palette.map((item, index) => (
              <motion.div
                key={item.label}
                className="dress-swatch"
                initial={{ opacity: 0, scale: 0.75 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + index * 0.07, type: "spring", stiffness: 220, damping: 15 }}
              >
                <span className={item.border ? "dress-swatch__color dress-swatch__color--border" : "dress-swatch__color"} style={{ background: item.color }} />
                <small>{item.label}</small>
              </motion.div>
            ))}
          </div>

          <p className="dress-card__note"><Sparkles size={16} /> {eventData.dressCode}</p>
          <p className="dress-card__kids">Little bosses are welcome — dress them in their best party look!</p>
        </motion.div>
      </div>
    </section>
  );
}
