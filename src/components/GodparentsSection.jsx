/**
 * =============================================================================
 *  GodparentsSection
 * =============================================================================
 *  Lists the principal sponsors / godparents (Ninong & Ninang), grouped by
 *  role. Entirely optional — returns null and renders nothing until names
 *  are added to eventData.principalSponsors.
 *
 *  Used in: App.jsx
 * =============================================================================
 */
import React from "react";
import { motion } from "framer-motion";
import { UsersRound } from "lucide-react";
import WaveDivider from "./WaveDivider";
import SectionHeading from "./SectionHeading";
import { eventData } from "../data/eventData";
import { voiceScript } from "../data/voiceScript";
import { useSectionVoice } from "../hooks/useSectionVoice";

export default function GodparentsSection() {
  const sponsors = eventData.principalSponsors || [];
  const voiceRef = useSectionVoice(voiceScript.godparents);
  if (!sponsors.length) return null;

  const groups = sponsors.reduce((acc, person) => {
    acc[person.role] = acc[person.role] || [];
    acc[person.role].push(person.name);
    return acc;
  }, {});

  return (
    <section ref={voiceRef} id="godparents" className="section section-cream" style={{ position: "relative" }}>
      <WaveDivider fill="#fffaef" />

      <div className="section-inner" style={{ textAlign: "center" }}>
        <SectionHeading eyebrow={<><UsersRound size={14} /> standing with us</>} title="Principal sponsors" />

        <div className="sponsors-grid">
          {Object.entries(groups).map(([role, names], i) => (
            <motion.div
              key={role}
              className="sponsors-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="font-display">{role}</h3>
              {names.map((name) => (
                <p key={name}>{name}</p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
