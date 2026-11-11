"use client";

import { useEffect } from "react";

/** Scroll progress at which each step of the pinned hero takes over. */
const BEAT_STARTS = [0.1, 0.4, 0.7];

/** Smallest height the illustration band may shrink to (min-height in hero.css). */
const MIN_BAND_PX = 128;

/**
 * Drives the pinned hero. While the hero is held in place (see hero.css), this
 * writes the scroll progress through it to `--hero-p` and the current step to
 * `data-beat` on the section; CSS and the canvas do the rest.
 *
 * One passive, rAF-throttled scroll listener; no React state, no layout writes.
 * It does nothing when motion is off or the hero is not pinned.
 */
export function HeroScroll({ target }: { target: string }) {
  useEffect(() => {
    const hero = document.getElementById(target);
    const pin = hero?.querySelector<HTMLElement>(".hero__pin");
    const frameEl = hero?.querySelector<HTMLElement>(".hero__frame");
    const content = hero?.querySelector<HTMLElement>(".hero__content");
    if (!hero || !pin || !frameEl || !content) return;
    if (document.documentElement.dataset.motion !== "on") return;

    let frame = 0;
    let lastProgress = -1;
    let lastBeat = -1;

    const update = () => {
      frame = 0;
      // If the copy plus the smallest allowed illustration band cannot fit in
      // the viewport, opt out: the hero then scrolls normally, exactly as
      // without this effect. Measured from the content itself, so the answer
      // does not depend on whether the hero is currently pinned.
      const frameStyle = getComputedStyle(frameEl);
      const needed =
        content.offsetHeight +
        parseFloat(frameStyle.paddingTop) +
        parseFloat(frameStyle.paddingBottom) +
        MIN_BAND_PX;
      hero.dataset.pin = needed > window.innerHeight ? "off" : "on";
      const pinned = getComputedStyle(pin).position === "sticky";
      const travel = hero.offsetHeight - pin.offsetHeight;
      const progress =
        pinned && travel > 0 ? Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / travel)) : 0;
      if (Math.abs(progress - lastProgress) < 0.0005) return;
      lastProgress = progress;

      hero.style.setProperty("--hero-p", progress.toFixed(4));
      const beat = BEAT_STARTS.filter((start) => progress >= start).length;
      if (beat !== lastBeat) {
        lastBeat = beat;
        hero.dataset.beat = String(beat);
      }
      hero.dispatchEvent(new Event("heroprogress"));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update(); // correct state on load, including a reload part-way through
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [target]);

  return null;
}
