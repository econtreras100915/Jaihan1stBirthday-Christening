/**
 * =============================================================================
 *  App
 * =============================================================================
 *  Top-level page composition. Renders <LandingGate> first; the rest of the
 *  invitation is mounted underneath but the page is scroll-locked until the
 *  guest taps "Open Invitation", matching the cover-then-reveal pattern used
 *  by digital invitation sites (e.g. littlemoments.digital).
 *
 *  Section order (edit here to reorder the invitation):
 *    1.  HeroSection         — name, portrait, date
 *    2.  WelcomeSection       — family's welcome note
 *    3.  EventDetailsSection  — ceremony/reception cards, directions, calendar
 *    4.  CountdownSection     — live countdown
 *    5.  ProgramSection       — flow of the day
 *    6.  EventProgramSection  — kid-party activities (bubble show, photobooth...)
 *    7.  GodparentsSection    — principal sponsors (hidden until filled in)
 *    8.  FamilySection        — family portrait
 *    9.  GallerySection       — photo grid
 *    10. HashtagSection       — social hashtag prompt
 *    11. RSVPSection          — RSVP form (embedded Google Form)
 *    12. GiftSection          — gift guide note
 *    13. FAQSection           — frequently asked questions
 *    14. ThankYouSection      — closing note + footer credit
 *
 *  Edit event text/dates in src/data/eventData.js — not here.
 * =============================================================================
 */
import React, { useEffect, useState } from "react";
import LandingGate from "./components/LandingGate";
import ScrollProgress from "./components/ScrollProgress";
import HeroSection from "./components/HeroSection";
import WelcomeSection from "./components/WelcomeSection";
import EventDetailsSection from "./components/EventDetailsSection";
import CountdownSection from "./components/CountdownSection";
import ProgramSection from "./components/ProgramSection";
import EventProgramSection from "./components/EventProgramSection";
import GodparentsSection from "./components/GodparentsSection";
import FamilySection from "./components/FamilySection";
import GallerySection from "./components/GallerySection";
import HashtagSection from "./components/HashtagSection";
import RSVPSection from "./components/RSVPSection";
import GiftSection from "./components/GiftSection";
import FAQSection from "./components/FAQSection";
import ThankYouSection from "./components/ThankYouSection";
import FallingKidsDecor from "./components/FallingKidsDecor";
import FlyingBossTrail from "./components/FlyingBossTrail";
import VoiceToggle from "./components/VoiceToggle";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock background scrolling while the landing gate is showing, and make
  // sure the guest always lands back at the very top of the page (Hero)
  // the moment the gate opens — some mobile browsers otherwise keep
  // whatever scroll position the (hidden) page happened to have.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "" : "hidden";
    if (isOpen) {
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {!isOpen && <LandingGate onOpen={() => setIsOpen(true)} />}

      {/* Mounted always (not just after isOpen) so guests can mute the
          voice invitation right from the landing gate if they want to. */}
      <VoiceToggle />

      {isOpen && <ScrollProgress />}

      <main>
        {isOpen && <FallingKidsDecor />}
        {isOpen && <FlyingBossTrail showBalloons={false} siteWide />}
        <HeroSection />
        <WelcomeSection />
        <EventDetailsSection />
        <CountdownSection />
        <ProgramSection />
        <EventProgramSection />
        <GodparentsSection />
        <FamilySection />
        <GallerySection />
        <HashtagSection />
        <RSVPSection />
        <GiftSection />
        <FAQSection />
        <ThankYouSection />
      </main>
    </>
  );
}
