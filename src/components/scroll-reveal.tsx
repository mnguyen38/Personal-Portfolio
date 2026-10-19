"use client";

import { useEffect } from "react";

const VISIBLE_RATIO = 0.15;

// Toggles `is-revealed` on every [data-reveal] element as it enters and leaves the viewport,
// so reveals replay in both scroll directions. `data-reveal-from` records which edge an
// element left through, so it re-enters from that side. Transitions live in globals.css.
export function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          if (entry.intersectionRatio >= VISIBLE_RATIO) {
            if (!element.classList.contains("is-revealed")) {
              element.classList.add("is-revealed");
              element.dispatchEvent(new Event("reveal"));
            }
          } else if (!entry.isIntersecting) {
            // Fully off screen: reset, remembering whether it left above or below.
            element.dataset.revealFrom = entry.boundingClientRect.top < 0 ? "above" : "below";
            element.classList.remove("is-revealed");
          }
        }
      },
      { threshold: [0, VISIBLE_RATIO] },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
