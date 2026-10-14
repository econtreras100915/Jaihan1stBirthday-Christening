import React from "react";
import { motion } from "framer-motion";
import { BriefcaseBusiness, Clock3, Umbrella } from "lucide-react";
import { eventData } from "../data/eventData";

export default function ReminderSection() {
  return (
    <section className="section section-cream reminder-section" aria-labelledby="reminder-title">
      <div className="section-inner">
        <motion.div
          className="reminder-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="reminder-icon" aria-hidden="true"><BriefcaseBusiness size={25} /></div>
          <div className="reminder-copy">
            <p className="reminder-eyebrow">Little reminders</p>
            <h2 id="reminder-title" className="font-display">What to bring</h2>
            <p>
              Please arrive 15–20 minutes early. Bring an umbrella or fan, comfortable church-appropriate clothes, and extra clothes for little ones.
            </p>
            <div className="reminder-chips">
              <span><Umbrella size={14} /> Umbrella or fan</span>
              <span><Clock3 size={14} /> Arrive early</span>
              {eventData.dressCode && <span>Dress code</span>}
            </div>
          </div>
          <span className="reminder-sparkle reminder-sparkle--one" aria-hidden="true">✦</span>
          <span className="reminder-sparkle reminder-sparkle--two" aria-hidden="true">✦</span>
        </motion.div>
      </div>
    </section>
  );
}
