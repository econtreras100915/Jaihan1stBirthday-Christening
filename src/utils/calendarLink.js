/**
 * =============================================================================
 *  calendarLink — builds a "Add to Google Calendar" URL
 * =============================================================================
 *  Takes the eventDateISO + calendar block from eventData.js and returns a
 *  ready-to-use Google Calendar link. No API key or backend needed — Google
 *  Calendar accepts event details straight in the URL query string.
 *
 *  Used in: components/EventDetailsSection.jsx
 * =============================================================================
 */
function toGoogleDate(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function buildGoogleCalendarLink({ title, details, location, startISO, durationHours = 2 }) {
  const start = new Date(startISO);
  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details: details || "",
    location: location || "",
    dates: `${toGoogleDate(start)}/${toGoogleDate(end)}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
