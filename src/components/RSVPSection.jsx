/**
 * =============================================================================
 *  RSVPSection
 * =============================================================================
 *  RSVPs are collected through the family's live Google Form, embedded
 *  directly in the page (see eventData.rsvp.googleFormUrl) so guests never
 *  have to leave the invitation. Responses land straight in the linked
 *  Google Sheet — reliable and zero setup, since Google handles the
 *  submission itself.
 *
 *  A themed frame + "open full form" fallback link are wrapped around the
 *  embed so it still feels like part of the invitation, and stays usable
 *  for anyone whose browser blocks the iframe.
 *
 *  Used in: App.jsx
 * =============================================================================
 */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, ExternalLink, PartyPopper } from "lucide-react";
import WaveDivider from "./WaveDivider";
import SectionHeading from "./SectionHeading";
import FloatingDecor from "./FloatingDecor";
import { eventData } from "../data/eventData";

/** Turns a normal "viewform" link into Google's embeddable iframe URL. */
function toEmbedUrl(url) {
  if (!url) return "";
  return url.includes("?") ? `${url}&embedded=true` : `${url}?embedded=true`;
}

export default function RSVPSection() {
  const { googleFormUrl, deadlineLabel } = eventData.rsvp;
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="section section-navy" style={{ position: "relative", textAlign: "center" }}>
      <WaveDivider fill="var(--navy-950)" />
      <FloatingDecor Icon={PartyPopper} color="var(--gold-400)" />

      <div className="section-inner">
        <SectionHeading
          eyebrow={<><Send size={14} /> kindly respond</>}
          title="Will you make it?"
          subtitle={deadlineLabel || "Let us know so we can save you a seat at the boss's table."}
        />

        {googleFormUrl ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              maxWidth: 480,
              margin: "0 auto",
              borderRadius: 24,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(6px)",
              padding: 10,
              boxShadow: "var(--shadow-soft)",
            }}
            className="rsvp-form-frame"
          >
            {!loaded && (
              <div style={{ padding: "60px 20px", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-accent)" }}>
                Loading the RSVP form…
              </div>
            )}
            <iframe
              title="RSVP form"
              src={toEmbedUrl(googleFormUrl)}
              width="100%"
              height="920"
              onLoad={() => setLoaded(true)}
              style={{
                border: "none",
                borderRadius: 16,
                background: "var(--white)",
                display: loaded ? "block" : "none",
              }}
            >
              Loading…
            </iframe>

            <a
              className="btn btn-outline wiggle-hover"
              style={{ margin: "14px auto 6px", fontSize: 13 }}
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={15} /> Open form in a new tab
            </a>
          </motion.div>
        ) : (
          <p style={{ marginTop: 14, fontSize: 14, color: "rgba(255,255,255,0.55)", textAlign: "center" }}>
            RSVP details are still being set up — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
