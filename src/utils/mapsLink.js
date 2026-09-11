/**
 * =============================================================================
 *  mapsLink — builds a Google Maps search URL
 * =============================================================================
 *  Takes a venue name (and optional address) and returns a Google Maps
 *  search link — no API key needed, works for any place name.
 *
 *  Used in: components/EventDetailsSection.jsx
 * =============================================================================
 */
export function buildMapsLink(venue, address = "") {
  const query = [venue, address].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
