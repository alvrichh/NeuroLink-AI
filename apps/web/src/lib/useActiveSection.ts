"use client";

import { useEffect, useState } from "react";
import { sectionIds, type SectionId } from "@/content";

/**
 * Tracks which page section currently crosses a reading line placed 40% down
 * the viewport. IntersectionObserver only — no scroll listeners.
 */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("overview");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-40% 0px -59% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
