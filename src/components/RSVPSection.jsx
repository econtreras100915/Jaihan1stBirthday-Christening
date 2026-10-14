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
import { Send, ExternalLink, PartyPopper, ShieldCheck, UserRound, UsersRound, MessageCircle, CheckCircle2 } from "lucide-react";
import WaveDivider from "./WaveDivider";
import SectionHeading from "./SectionHeading";
import FloatingDecor from "./FloatingDecor";
import { eventData } from "../data/eventData";
import { voiceScript } from "../data/voiceScript";
import { useSectionVoice } from "../hooks/useSectionVoice";

function getFormResponseUrl(url) {
  return url.replace(/\/viewform(?:\?.*)?$/, "/formResponse");
}

export default function RSVPSection() {
  const { googleFormUrl, deadlineLabel, googleForm } = eventData.rsvp;
  const [form, setForm] = useState({ name: "", attending: "", guests: "", message: "" });
  const [status, setStatus] = useState("idle");
  const voiceRef = useSectionVoice(voiceScript.rsvp);
  const canSubmitDirect = Boolean(
    googleFormUrl && googleForm?.entryIds?.name && googleForm?.entryIds?.attending && googleForm?.entryIds?.guests,
  );

  const updateField = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmitDirect) {
      window.open(googleFormUrl, "_blank", "noopener,noreferrer");
      return;
    }

    setStatus("sending");
    const { entryIds } = googleForm;
    const payload = new URLSearchParams({
      [`entry.${entryIds.name}`]: form.name,
      [`entry.${entryIds.attending}`]: form.attending,
      [`entry.${entryIds.guests}`]: form.guests,
      [`entry.${entryIds.message}`]: form.message,
    });

    try {
      await fetch(getFormResponseUrl(googleFormUrl), {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section ref={voiceRef} id="rsvp" className="section section-navy" style={{ position: "relative", textAlign: "center" }}>
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
            <div className="rsvp-form-frame__header">
              <span><ShieldCheck size={16} /> RSVP form</span>
              <span className="rsvp-form-frame__required">* Required</span>
            </div>
            {status === "success" ? (
              <div className="rsvp-success" role="status">
                <span><CheckCircle2 size={34} /></span>
                <h3>RSVP received!</h3>
                <p>Thank you! The boss has your response and can&apos;t wait to celebrate with you.</p>
              </div>
            ) : (
              <form className="rsvp-native-form" onSubmit={handleSubmit}>
                <label className="rsvp-field">
                  <span><UserRound size={16} /> Your name <b>*</b></span>
                  <input value={form.name} onChange={updateField("name")} placeholder="Type your full name" required maxLength="80" />
                </label>

                <fieldset className="rsvp-attendance">
                  <legend><PartyPopper size={16} /> Will you be attending? <b>*</b></legend>
                  <div className="rsvp-choice-row">
                    <label className={form.attending === "Joyfully yes" ? "rsvp-choice is-selected" : "rsvp-choice"}>
                      <input type="radio" name="attending" value="Joyfully yes" checked={form.attending === "Joyfully yes"} onChange={updateField("attending")} required />
                      <span>🎉 Joyfully yes</span>
                    </label>
                    <label className={form.attending === "Can't make it" ? "rsvp-choice is-selected" : "rsvp-choice"}>
                      <input type="radio" name="attending" value="Can't make it" checked={form.attending === "Can't make it"} onChange={updateField("attending")} />
                      <span>😢 Can&apos;t make it</span>
                    </label>
                  </div>
                </fieldset>

                <label className="rsvp-field">
                  <span><UsersRound size={16} /> Number of guests <b>*</b></span>
                  <input type="number" value={form.guests} onChange={updateField("guests")} placeholder="Including you" min="1" max="20" required />
                </label>

                <label className="rsvp-field">
                  <span><MessageCircle size={16} /> Message for the boss <em>Optional</em></span>
                  <textarea value={form.message} onChange={updateField("message")} placeholder="Wishes, greetings, or anything you want us to know!" maxLength="400" rows="3" />
                </label>

                {status === "error" && <p className="rsvp-error">We couldn&apos;t send your RSVP. Please try again or use the backup form.</p>}
                <button className="btn btn-gold rsvp-submit wiggle-hover" type="submit" disabled={status === "sending"}>
                  <Send size={17} /> {status === "sending" ? "Sending RSVP…" : "Send my RSVP"}
                </button>
              </form>
            )}
            <a className="rsvp-form-frame__backup" href={googleFormUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={14} /> Open backup form
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
