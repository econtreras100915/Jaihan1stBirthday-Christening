/**
 * =============================================================================
 *  EventDetailsSection
 * =============================================================================
 *  Shows the ceremony (and, if filled in, reception) details as a set of
 *  "boarding pass" style cards, plus an Add to Calendar button generated
 *  from eventData.js. Any optional field left blank in eventData.js is
 *  simply skipped, so this section never shows an awkward empty line.
 *
 *  Used in: App.jsx
 * =============================================================================
 */
import React from "react";
import { motion } from "framer-motion";
import { Church, CalendarPlus, MapPin, Clock, Shirt, CalendarDays } from "lucide-react";
import WaveDivider from "./WaveDivider";
import SectionHeading from "./SectionHeading";
import ArtworkBackground from "./ArtworkBackground";
import eventDetailsTemplate from "../assets/backgrounds/event-details-template.png";
import { eventData } from "../data/eventData";
import { buildGoogleCalendarLink } from "../utils/calendarLink";
import { buildMapsLink } from "../utils/mapsLink";

function DetailCard({ icon, title, lines, mapHref, delay }) {
  return (
    <motion.div
      className="detail-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      style={{ textAlign: "left" }}
    >
      <div
        style={{
          width: 44, height: 44, borderRadius: 14,
          display: "grid", placeItems: "center",
          background: "rgba(125,183,255,0.18)", color: "var(--primary)",
          marginBottom: 14,
        }}
      >
        {icon}
      </div>
      <h3 className="font-display" style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{title}</h3>
      {lines.map((line, i) => (
        <p
          key={i}
          className={i === 0 ? "detail-card-venue" : undefined}
          style={{ margin: "6px 0 0", color: "var(--ink-soft)", fontSize: i === 0 ? undefined : 14.5 }}
        >
          {line}
        </p>
      ))}
      {mapHref && (
        <a
          href={mapHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-gold wiggle-hover"
          style={{ marginTop: 16, padding: "9px 20px", fontSize: 12.5 }}
        >
          <MapPin size={14} /> Map
        </a>
      )}
    </motion.div>
  );
}

export default function EventDetailsSection() {
  const { ceremony, reception, eventDateLabel, eventDayLabel, eventTimeLabel } = eventData;

  const calendarHref = buildGoogleCalendarLink({
    title: eventData.calendar.title,
    details: eventData.calendar.details,
    location: eventData.calendar.location,
    startISO: eventData.eventDateISO,
    durationHours: eventData.calendar.durationHours,
  });

  const showReception = Boolean(reception?.venue);
  const ceremonyMapHref = buildMapsLink(ceremony.venue, ceremony.address);
  const receptionMapHref = showReception ? buildMapsLink(reception.venue, reception.address) : "";

  return (
    <section className="section section-gold-tint event-details-section" style={{ position: "relative" }}>
      <WaveDivider fill="#fdf2d8" />

      <div className="section-inner">
        <SectionHeading
          eyebrow={<><CalendarPlus size={14} /> save the date</>}
          title="Event details"
          subtitle={`Mark your calendars for ${eventDayLabel}, ${eventDateLabel}.`}
        />

        <div className="event-glass-card">
          <div className="event-date-row"><CalendarDays size={19} /><span>{eventDayLabel}, {eventDateLabel}</span></div>
        <div
          className="detail-grid"
          style={{
            display: "grid",
            gridTemplateColumns: showReception ? "1fr 1fr" : "1fr",
            gap: 16,
          }}
        >
          <DetailCard
            icon={<Church size={20} />}
            title={ceremony.name}
            delay={0}
            mapHref={ceremonyMapHref}
            lines={[
              ceremony.venue,
              ceremony.address,
              [eventTimeLabel || ceremony.time].filter(Boolean).join(""),
            ].filter(Boolean)}
          />
          {showReception && (
            <DetailCard
              icon={<MapPin size={20} />}
              title={reception.name}
              delay={0.1}
              mapHref={receptionMapHref}
              lines={[reception.venue, reception.address, reception.time].filter(Boolean)}
            />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.55 }}
          style={{ textAlign: "center", marginTop: 30 }}
        >
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a className="btn btn-gold wiggle-hover" href={calendarHref} target="_blank" rel="noopener noreferrer">
              <CalendarPlus size={18} /> Add to Calendar
            </a>
          </div>

          {!eventTimeLabel && !ceremony.time && (
            <p style={{ marginTop: 14, fontSize: 13, color: "var(--ink-soft)" }}>
              <Clock size={13} style={{ verticalAlign: "-2px", marginRight: 4 }} />
              Exact time to be announced — we'll keep you posted.
            </p>
          )}

          {eventData.dressCode && (
            <p className="badge-pill" style={{ marginTop: 16, background: "rgba(95,177,199,0.14)", border: "1px solid rgba(95,177,199,0.35)", color: "var(--blue-500)" }}>
              <Shirt size={14} /> {eventData.dressCode}
            </p>
          )}
        </motion.div></div>
      </div>
    </section>
  );
}
