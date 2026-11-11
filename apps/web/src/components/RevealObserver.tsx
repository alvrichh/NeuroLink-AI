"use client";

import { useEffect } from "react";

/**
 * Adds `.is-in` to every [data-reveal] element as it enters the viewport.
 * One shared IntersectionObserver for the whole page; elements are unobserved
 * once revealed. See styles/motion.css for the visual side.
 */
export function RevealObserver() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (document.documentElement.dataset.motion !== "on" || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Reveal on entry, and anything already scrolled past (deep links).
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -7% 0px", threshold: 0.08 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
