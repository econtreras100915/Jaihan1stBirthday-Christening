import React, { useEffect, useState } from "react";
import { CalendarDays, Camera, Crown, Gift, Home, Menu, Shirt, Sparkles, UsersRound, X } from "lucide-react";

const navigationItems = [
  { id: "home", label: "Home", Icon: Home },
  { id: "details", label: "Event details", Icon: CalendarDays },
  { id: "dress-code", label: "Dress code", Icon: Shirt },
  { id: "countdown", label: "Countdown", Icon: Crown },
  { id: "godparents", label: "Godparents", Icon: UsersRound },
  { id: "gallery", label: "Gallery", Icon: Camera },
  { id: "rsvp", label: "RSVP", Icon: Gift },
];

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => event.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const navigate = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  return (
    <nav className="site-nav" aria-label="Invitation navigation">
      <button className="site-nav__toggle" type="button" aria-expanded={isOpen} aria-controls="invitation-menu" onClick={() => setIsOpen(true)}>
        <Menu size={21} /> <span>Menu</span>
      </button>
      {isOpen && <button className="site-nav__scrim" type="button" aria-label="Close navigation" onClick={() => setIsOpen(false)} />}
      <aside id="invitation-menu" className={isOpen ? "site-nav__drawer site-nav__drawer--open" : "site-nav__drawer"} aria-hidden={!isOpen}>
        <div className="site-nav__brand">
          <span className="site-nav__brand-mark"><Sparkles size={22} /></span>
          <div><small>Jaihann&apos;s</small><strong>Little Boss Day</strong></div>
          <button type="button" className="site-nav__close" aria-label="Close navigation" onClick={() => setIsOpen(false)}><X size={23} /></button>
        </div>
        <div className="site-nav__links">
          {navigationItems.map(({ id, label, Icon }) => (
            <button key={id} type="button" onClick={() => navigate(id)}>
              <span className="site-nav__item-icon"><Icon size={18} /></span>
              <span>{label}</span><b>→</b>
            </button>
          ))}
        </div>
        <button type="button" className="site-nav__rsvp" onClick={() => navigate("rsvp")}>Send your RSVP <span>→</span></button>
        <p>Made for Jaihann&apos;s special day</p>
      </aside>
    </nav>
  );
}
