/**
 * =============================================================================
 *  HashtagSection
 * =============================================================================
 *  "Snap & Share" prompt — displays the event hashtag in a large, tappable
 *  style so guests remember to tag their photos.
 *
 *  Used in: App.jsx
 * =============================================================================
 */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Camera, Check, Copy, Send, Sparkles } from "lucide-react";
import WaveDivider from "./WaveDivider";
import FloatingDecor from "./FloatingDecor";
import ArtworkBackground from "./ArtworkBackground";
import hashtagSkyBg from "../assets/backgrounds/hashtag-sky-bg.png";
import { eventData } from "../data/eventData";
import { voiceScript } from "../data/voiceScript";
import { useSectionVoice } from "../hooks/useSectionVoice";

export default function HashtagSection() {
  const voiceRef = useSectionVoice(voiceScript.hashtag);
  const [isSaved, setIsSaved] = useState(false);

  const copyHashtag = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(eventData.hashtag);
      } else {
        const helper = document.createElement("textarea");
        helper.value = eventData.hashtag;
        helper.style.position = "fixed";
        helper.style.opacity = "0";
        document.body.appendChild(helper);
        helper.select();
        document.execCommand("copy");
        helper.remove();
      }
      setIsSaved(true);
      window.setTimeout(() => setIsSaved(false), 2200);
    } catch (error) {
      setIsSaved(false);
    }
  };

  return (
    <section ref={voiceRef} className="section section-navy" style={{ position: "relative", textAlign: "center" }}>
      <WaveDivider fill="var(--navy-950)" />
      <ArtworkBackground src={hashtagSkyBg} fadeColor="var(--navy-950)" focalPosition="center" tintOpacity={0.46} />
      <FloatingDecor Icon={Instagram} color="rgba(255,255,255,0.35)" />
      <span className="hashtag-sparkle hashtag-sparkle--one" aria-hidden="true">✦</span>
      <span className="hashtag-sparkle hashtag-sparkle--two" aria-hidden="true">✦</span>
      <span className="hashtag-sparkle hashtag-sparkle--three" aria-hidden="true">✦</span>

      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            width: 54, height: 54, margin: "0 auto 18px", borderRadius: "50%",
            display: "grid", placeItems: "center",
            background: "rgba(247,207,92,0.15)", border: "1px solid rgba(247,207,92,0.4)",
          }}
        >
          <Camera size={22} color="var(--gold-300)" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          Snap &amp; share
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="heading-lg font-display"
          style={{ color: "var(--gold-300)", marginTop: 6, wordBreak: "break-word" }}
        >
          {eventData.hashtag}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ color: "rgba(255,255,255,0.7)", marginTop: 14, maxWidth: 380, marginInline: "auto" }}
        >
          {eventData.hashtagNote}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="hashtag-steps"
        >
          {[
            { Icon: Camera, label: "Snap" },
            { Icon: Send, label: "Post" },
            { Icon: Sparkles, label: "Tag us" },
          ].map(({ Icon, label }) => (
            <div className="hashtag-step" key={label}>
              <span><Icon size={17} /></span>
              <small>{label}</small>
            </div>
          ))}
        </motion.div>

        <motion.button
          type="button"
          onClick={copyHashtag}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileTap={{ scale: 0.97 }}
          className="hashtag-share-btn"
        >
          {isSaved ? <Check size={17} /> : <Copy size={17} />}
          {isSaved ? "Hashtag copied!" : "Copy hashtag"}
        </motion.button>
      </div>
    </section>
  );
}
