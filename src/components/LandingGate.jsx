/**
 * =============================================================================
 *  LandingGate
 * =============================================================================
 *  The very first thing a guest sees: a full-screen cover with the
 *  celebrant's name, a personalized "Dear <guest>" line (read from the
 *  ?to= URL parameter, e.g. share a link like site.com/?to=Tita+Mars),
 *  and a gold "Open Invitation" button.
 *
 *  Clicking the button fires a confetti burst (canvas-confetti) and then
 *  hands control back to <App>, which unmounts this gate and reveals the
 *  full scrolling invitation underneath.
 *
 *  Used in: App.jsx (rendered first, before the rest of the page).
 * =============================================================================
 */
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import heroImg from "../assets/babyboss/hero.jpg";
import heroBg from "../assets/backgrounds/hero-bg.jpg";
import ArtworkBackground from "./ArtworkBackground";
import FlyingBossTrail from "./FlyingBossTrail";
import { BalloonCluster, GiftBoxCorner, CloudRow, CrownMedallion } from "./FestiveDecor";
import { eventData } from "../data/eventData";

function getGuestName() {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  return params.get("to") || params.get("guest") || "";
}

function fireConfetti() {
  const colors = ["#f7cf5c", "#eab223", "#5fb1c7", "#ffffff"];
  confetti({ particleCount: 90, spread: 80, startVelocity: 42, origin: { y: 0.65 }, colors });
  confetti({ particleCount: 60, spread: 120, startVelocity: 30, origin: { y: 0.5, x: 0.15 }, colors });
  confetti({ particleCount: 60, spread: 120, startVelocity: 30, origin: { y: 0.5, x: 0.85 }, colors });
}

export default function LandingGate({ onOpen }) {
  const [isClosing, setIsClosing] = useState(false);
  const guestName = useMemo(getGuestName, []);

  function handleOpen() {
    fireConfetti();
    setIsClosing(true);
    // Snap straight back to the top of the page so the reveal always
    // starts at the Hero section, never mid-scroll.
    window.scrollTo(0, 0);
    window.setTimeout(() => {
      onOpen();
    }, 650);
  }

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "linear-gradient(160deg, #0c3733 0%, #1a655c 55%, #5fb1c7 130%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <ArtworkBackground src={heroBg} fadeColor="var(--navy-950)" focalPosition="center" tintOpacity={0.55} />
          <FlyingBossTrail />
          <CloudRow />
          <BalloonCluster side="left" />
          <BalloonCluster side="right" palette={["var(--white)", "var(--gold-300)", "var(--gold-500)"]} />
          <GiftBoxCorner side="left" color="var(--navy-700)" />
          <GiftBoxCorner side="right" color="var(--blue-500)" />

          {/* twinkling star field */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
            {starField.map((s, i) => (
              <span
                key={i}
                className="twinkle"
                style={{
                  position: "absolute",
                  top: s.top,
                  left: s.left,
                  width: s.size,
                  height: s.size,
                  borderRadius: "50%",
                  background: "var(--gold-300)",
                  animationDelay: s.delay,
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              padding: "32px 24px",
              maxWidth: 420,
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.55 }}
              className="gate-invite"
            >
              You're Invited
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.55 }}
              className="gate-intro"
            >
              A joyful celebration awaits you.
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
              className="heading-xl heading-bubble gate-name"
            >
              {eventData.celebrantName.toUpperCase()}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              className="gate-portrait"
              style={{ width: 170, margin: "18px auto", position: "relative" }}
            >
              <CrownMedallion size={38} />
              <img src={heroImg} alt="Jaihann, the birthday boss baby" style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", objectPosition: "top center", borderRadius: 28, border: "5px solid var(--gold-400)", outline: "2px solid rgba(255,255,255,0.45)", outlineOffset: 4, boxShadow: "var(--shadow-soft)", background: "var(--cream-50)" }} />
            </motion.div>

            <p className="gate-celebration">1st Birthday &amp; Christening</p>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              style={{ marginTop: 14 }}
            >
              <span className="ribbon-banner gate-date">{eventData.eventDayLabel}, {eventData.eventDateLabel}</span>
            </motion.div>


            {guestName && (
              <p style={{ marginTop: 18, color: "var(--white)", fontSize: 15 }}>
                Dear <strong style={{ color: "var(--gold-300)" }}>{guestName}</strong>, the boss requests your presence.
              </p>
            )}

            <motion.button
              onClick={handleOpen}
              whileTap={{ scale: 0.94 }}
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }}
              transition={{ rotate: { duration: 0.5 } }}
              className="btn btn-gold pulse-glow"
              style={{ marginTop: 24 }}
            >
              🚀 Open Invitation
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const starField = [
  { top: "12%", left: "18%", size: 4, delay: "0s" },
  { top: "22%", left: "78%", size: 3, delay: "0.6s" },
  { top: "68%", left: "12%", size: 3, delay: "1.1s" },
  { top: "78%", left: "82%", size: 4, delay: "1.6s" },
  { top: "40%", left: "8%", size: 3, delay: "2.1s" },
  { top: "10%", left: "50%", size: 3, delay: "0.9s" },
  { top: "85%", left: "45%", size: 4, delay: "1.4s" },
  { top: "50%", left: "90%", size: 3, delay: "1.9s" },
];
