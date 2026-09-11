/**
 * =============================================================================
 *  WaveDivider
 * =============================================================================
 *  A soft scalloped edge placed at the top of a section. `fill` should match
 *  the background color of the section this divider belongs to, so it reads
 *  as "this section's top edge" rather than a stray shape.
 *
 *  Used in: WelcomeSection, EventDetailsSection, CountdownSection,
 *  GallerySection, FamilySection, HashtagSection, GiftSection, ThankYouSection.
 * =============================================================================
 */
import React from "react";

export default function WaveDivider({ fill = "#fffaef" }) {
  return (
    <div className="wave-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path
          fill={fill}
          d="M0,32 C120,70 240,0 360,18 C480,36 600,80 720,70 C840,60 960,10 1080,12 C1200,14 1320,60 1440,48 L1440,80 L0,80 Z"
        />
      </svg>
    </div>
  );
}
