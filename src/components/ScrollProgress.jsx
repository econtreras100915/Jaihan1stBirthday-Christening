/**
 * =============================================================================
 *  ScrollProgress
 * =============================================================================
 *  Fixed thin bar at the very top of the page that fills gold as the guest
 *  scrolls further down the invitation. Purely cosmetic wayfinding.
 *
 *  Used in: App.jsx (only rendered once the invitation is open)
 * =============================================================================
 */
import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />;
}
