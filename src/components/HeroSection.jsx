/**
 * =============================================================================
 *  HeroSection
 * =============================================================================
 *  Full-height opening section of the scrolling invitation (appears right
 *  after the guest taps "Open Invitation" on <LandingGate>). Features a
 *  subtle mouse-parallax on the portrait, a floating "Boss Baby" badge, and
 *  a bouncing scroll indicator that cues guests to keep scrolling.
 *
 *  Used in: App.jsx, as the first section on the page.
 * =============================================================================
 */
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown, Crown } from "lucide-react";
import heroImg from "../assets/babyboss/hero.jpg";
import heroBg from "../assets/backgrounds/hero-bg.jpg";
import ArtworkBackground from "./ArtworkBackground";
import FloatingDecor from "./FloatingDecor";
import FlyingBossTrail from "./FlyingBossTrail";
import { BalloonCluster, GiftBoxCorner, CloudRow, CrownMedallion } from "./FestiveDecor";
import { eventData } from "../data/eventData";
import { voiceScript } from "../data/voiceScript";
import { useSectionVoice } from "../hooks/useSectionVoice";

export default function HeroSection() {
  const wrapRef = useRef(null);
  const voiceRef = useSectionVoice(voiceScript.hero);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-40, 40], [6, -6]), { stiffness: 120, damping: 14 });
  const rotateY = useSpring(useTransform(mx, [-40, 40], [-6, 6]), { stiffness: 120, damping: 14 });
  function handleMouseMove(e) { const rect = wrapRef.current.getBoundingClientRect(); mx.set(e.clientX - rect.left - rect.width / 2); my.set(e.clientY - rect.top - rect.height / 2); }
  function handleMouseLeave() { mx.set(0); my.set(0); }
  return (
    <section
      ref={voiceRef}
      id="home"
      className="section section-navy"
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        paddingTop: 90,
        paddingBottom: 70,
      }}
    >
      <ArtworkBackground src={heroBg} fadeColor="var(--navy-950)" focalPosition="center" tintOpacity={0.5} />
      <FlyingBossTrail showBalloons={false} />
      <FloatingDecor Icon={Crown} color="var(--gold-400)" />
      <CloudRow /><BalloonCluster side="left" /><BalloonCluster side="right" palette={["var(--white)", "var(--gold-300)", "var(--gold-500)"]} />
      <GiftBoxCorner side="left" color="var(--navy-700)" /><GiftBoxCorner side="right" color="var(--blue-500)" />

      <div className="section-inner hero-content" style={{ textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="badge-pill wiggle-hover"
        >
          <Crown size={14} /> Welcome to Our Celebration
        </motion.p>

        <div
          ref={wrapRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
          className="hero-portrait"
          style={{ perspective: 800, width: 230, margin: "26px auto 20px", position: "relative" }}
        >
          <CrownMedallion size={40} />
          <motion.img src={heroImg} alt={`${eventData.celebrantName} in a tiny suit`} initial={{ opacity: 0, y: 40, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }} style={{ width: "100%", borderRadius: 28, border: "5px solid var(--gold-400)", outline: "2px solid rgba(255,255,255,0.4)", outlineOffset: 4, boxShadow: "0 30px 60px rgba(0,0,0,0.4)", background: "var(--cream-50)", rotateX, rotateY, transformStyle: "preserve-3d" }} />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="heading-xl heading-bubble hero-name"
        >
          {eventData.celebrantName.toUpperCase()}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="hero-celebration"
          style={{ color: "var(--gold-300)", fontFamily: "var(--font-display)", fontSize: 17, marginTop: 8 }}
        >
          1st Birthday &amp; Christening
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <span className="ribbon-banner hero-date">{eventData.eventDayLabel}, {eventData.eventDateLabel}</span>
        </motion.div>

      </div>

      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: 26,
          left: "50%",
          transform: "translateX(-50%)",
          color: "var(--gold-300)",
        }}
      >
        <ChevronDown size={26} />
      </motion.div>
    </section>
  );
}
