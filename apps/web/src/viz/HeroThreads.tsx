"use client";

import { useEffect, useRef } from "react";
import { onThemeChange } from "@/lib/theme";
import { brand } from "@/styles/brand/tokens";

/**
 * Hero illustration — CONCEPTUAL, not recorded data.
 *
 * Many organic threads (inner speech) drift in from the left. Most fade out
 * before a narrow gate: they stay private. A few pass through and leave as
 * ordered, evenly spaced, sampled lines: an intentional message.
 *
 * Drawn on a 2D canvas with hairlines only; the loop pauses when the hero is
 * off screen or the tab is hidden, and renders a single still frame when
 * motion is reduced.
 */

type Thread = {
  lane: number; // -1..1 position at the left edge
  pass: boolean; // continues through the gate
  out: number; // -1..1 lane on the ordered side (passers only)
  alpha: number;
  p1: number;
  p2: number;
  p3: number;
  k1: number;
  k2: number;
};

type Pulse = { thread: number; q: number; speed: number };

const rgba = (c: readonly number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Small deterministic generator so the composition is identical on every load.
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

export function HeroThreads({ gateSelector }: { gateSelector: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const host = canvas?.parentElement;
    if (!canvas || !ctx || !host) return;

    // Colours come from the active theme (--viz-* in globals.css), falling back
    // to the brand constants: navy threads on white, pale threads on navy.
    let navy: readonly number[] = brand.rgb.navy;
    let blue: readonly number[] = brand.rgb.electricBlue;
    let cyan: readonly number[] = brand.rgb.cyan;
    const readPalette = () => {
      const style = getComputedStyle(document.documentElement);
      const triplet = (name: string, fallback: readonly number[]) => {
        const parts = style.getPropertyValue(name).trim().split(/\s+/).map(Number);
        return parts.length === 3 && parts.every(Number.isFinite) ? parts : fallback;
      };
      navy = triplet("--viz-ink", brand.rgb.navy);
      blue = triplet("--viz-signal", brand.rgb.electricBlue);
      cyan = triplet("--viz-glow", brand.rgb.cyan);
    };
    const animate = document.documentElement.dataset.motion === "on";

    let width = 0;
    let height = 0;
    let gateX = 0;
    let threads: Thread[] = [];
    let pulses: Pulse[] = [];
    let gradPass: CanvasGradient | null = null;
    let gradStop: CanvasGradient | null = null;
    let gradSamples: CanvasGradient | null = null;
    let fanEnd = 0;
    let energy = 0;
    let flowTime = 0; // advances faster while the message is flowing

    // Story state, from the pinned hero's scroll progress (0 when not pinned):
    // closed — the gate holds everything back; open — it has been opened;
    // flow — the approved message is travelling. All zero at scroll 0.
    const story = { closed: 0, open: 0, flow: 0 };
    const section = host.closest<HTMLElement>(".hero");
    const readStory = () => {
      const p = Number(section?.style.getPropertyValue("--hero-p")) || 0;
      story.closed = smooth(0.06, 0.16, p) * (1 - smooth(0.36, 0.46, p));
      story.open = smooth(0.36, 0.46, p);
      story.flow = smooth(0.66, 0.78, p);
    };
    let frame = 0;
    let running = false;
    let last = 0;
    let time = 14; // start mid-motion so the first frame is already composed

    const build = () => {
      readPalette();
      const rect = host.getBoundingClientRect();
      width = Math.max(1, rect.width);
      // Hairlines stay crisp at 1.5× on phones, at well under the fill cost of 3×.
      const dpr = Math.min(window.devicePixelRatio || 1, width < 700 ? 1.5 : 2);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gate = host.querySelector<HTMLElement>(gateSelector);
      const measured = gate ? gate.offsetLeft + gate.offsetWidth / 2 : width * 0.58;
      // Keep the gate inside the canvas even during transient zero-size layouts.
      gateX = Math.min(width * 0.86, Math.max(width * 0.2, measured));

      const random = seeded(7);
      const count = Math.round(Math.min(72, Math.max(30, width / 21)));
      const every = 3;
      const passers = Math.ceil(count / every);
      threads = Array.from({ length: count }, (_, i) => {
        const pass = i % every === 1;
        const order = Math.floor(i / every);
        return {
          lane: (i / (count - 1)) * 2 - 1,
          pass,
          out: passers > 1 ? (order / (passers - 1)) * 2 - 1 : 0,
          alpha: 0.5 + random() * 0.5,
          p1: random() * Math.PI * 2,
          p2: random() * Math.PI * 2,
          p3: random() * Math.PI * 2,
          k1: 0.0042 + random() * 0.004,
          k2: 0.011 + random() * 0.008,
        };
      });

      const passIdx = threads.flatMap((t, i) => (t.pass ? [i] : []));
      const stopIdx = threads.flatMap((t, i) => (t.pass ? [] : [i]));
      const pulseCount = width < 700 ? 6 : 11;
      pulses = Array.from({ length: pulseCount }, (_, i) => {
        const pool = i % 3 === 2 ? stopIdx : passIdx;
        return {
          thread: pool[Math.floor(random() * pool.length)] ?? 0,
          q: random(),
          speed: 0.045 + random() * 0.035,
        };
      });

      const g = gateX / width;
      gradPass = ctx.createLinearGradient(0, 0, width, 0);
      gradPass.addColorStop(0, rgba(navy, 0));
      gradPass.addColorStop(Math.min(0.04, g * 0.2), rgba(navy, 0.3));
      gradPass.addColorStop(Math.max(0.05, g - 0.14), rgba(navy, 0.4));
      gradPass.addColorStop(g, rgba(blue, 0.8));
      gradPass.addColorStop(Math.min(0.98, g + 0.22), rgba(blue, 0.55));
      gradPass.addColorStop(0.985, rgba(blue, 0.3));
      gradPass.addColorStop(1, rgba(blue, 0));

      fanEnd = gateX + (width - gateX) * 0.5;
      gradSamples = ctx.createLinearGradient(fanEnd - 40, 0, width, 0);
      gradSamples.addColorStop(0, rgba(blue, 0));
      gradSamples.addColorStop(0.18, rgba(blue, 0.75));
      gradSamples.addColorStop(0.9, rgba(blue, 0.5));
      gradSamples.addColorStop(1, rgba(blue, 0));

      gradStop = ctx.createLinearGradient(0, 0, width, 0);
      gradStop.addColorStop(0, rgba(navy, 0));
      gradStop.addColorStop(Math.min(0.04, g * 0.2), rgba(navy, 0.22));
      gradStop.addColorStop(g * 0.6, rgba(navy, 0.2));
      gradStop.addColorStop(Math.max(0.06, g - 0.03), rgba(navy, 0));
      gradStop.addColorStop(1, rgba(navy, 0));
    };

    const yAt = (t: Thread, x: number, now: number) => {
      const cy = height * 0.5;
      const aperture = Math.min(9, height * 0.03);
      if (x <= gateX) {
        const u = (gateX - x) / gateX; // 0 at the gate, 1 at the left edge
        const envelope = Math.pow(u, 1.45);
        const organic =
          Math.sin(x * t.k1 + t.p1 + now * 0.33) * 0.55 +
          Math.sin(x * t.k2 + t.p2 - now * 0.21) * 0.28 +
          Math.sin(x * 0.0017 + t.p3 + now * 0.09) * 0.45;
        return (
          cy +
          t.lane * aperture +
          envelope * (t.lane * (height * 0.43 - aperture) + organic * height * 0.19)
        );
      }
      const v = (x - gateX) / Math.max(1, width - gateX);
      const spread = smooth(0, 0.5, v);
      return cy + t.lane * aperture * (1 - spread) + spread * t.out * height * 0.36;
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const step = 12;

      // Gate glow — sits behind the glass capsule and is blurred by it.
      if (energy > 0.01) {
        const r = Math.min(height * 0.3, 96);
        const glow = ctx.createRadialGradient(gateX, height / 2, 0, gateX, height / 2, r);
        glow.addColorStop(0, rgba(cyan, 0.32 * energy));
        glow.addColorStop(1, rgba(cyan, 0));
        ctx.fillStyle = glow;
        ctx.fillRect(gateX - r, height / 2 - r, r * 2, r * 2);
      }

      ctx.lineWidth = 0.85;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.setLineDash([]);

      // How strongly the ordered side shows: dimmed while the gate is closed,
      // slightly lifted while the message flows.
      const ordered = Math.min(1.25, 1 - 0.8 * story.closed + 0.25 * story.flow);

      // Threads that stay private: they fade out before the gate.
      ctx.strokeStyle = gradStop ?? rgba(navy, 0.2);
      for (const t of threads) {
        if (t.pass) continue;
        ctx.globalAlpha = Math.min(1, t.alpha * (1 + 0.5 * story.closed));
        ctx.beginPath();
        for (let x = 0; x <= gateX; x += step) {
          const y = yAt(t, x, now);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Threads that pass: organic → ordered.
      ctx.strokeStyle = gradPass ?? rgba(blue, 0.5);
      for (const t of threads) {
        if (!t.pass) continue;
        const base = 0.65 + t.alpha * 0.35;
        // Up to the gate…
        ctx.globalAlpha = base;
        ctx.beginPath();
        for (let x = 0; x < gateX; x += step) {
          const y = yAt(t, x, now);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(gateX, yAt(t, gateX, now));
        ctx.stroke();
        // …and beyond it.
        ctx.globalAlpha = Math.min(1, base * ordered);
        ctx.beginPath();
        ctx.moveTo(gateX, yAt(t, gateX, now));
        for (let x = gateX + step; x < fanEnd; x += step) ctx.lineTo(x, yAt(t, x, now));
        const yEnd = yAt(t, fanEnd, now);
        ctx.lineTo(fanEnd, yEnd);
        ctx.lineTo(width, yEnd);
        ctx.stroke();
      }

      // Ordered side: discrete samples marching along each lane.
      ctx.globalAlpha = Math.min(1, ordered);
      ctx.lineWidth = 1.7;
      ctx.setLineDash([0.01, 13]);
      ctx.strokeStyle = gradSamples ?? rgba(blue, 0.6);
      threads.forEach((t, i) => {
        if (!t.pass) return;
        const y = yAt(t, width, now);
        ctx.lineDashOffset = -(flowTime * 22 + i * 5.3);
        ctx.beginPath();
        ctx.moveTo(fanEnd - 40, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      });
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      // Pulses: a short bright segment with a soft cyan head.
      for (const pulse of pulses) {
        const t = threads[pulse.thread];
        if (!t) continue;
        const head = -0.08 * width + pulse.q * width * 1.16;
        const tail = 96;
        let visibility = 1;
        if (!t.pass) visibility = 1 - smooth(gateX * 0.5, gateX - width * 0.035, head);
        // While the gate is closed, nothing gets through it.
        else visibility = 1 - story.closed * smooth(gateX * 0.6, gateX - width * 0.02, head);
        if (visibility <= 0.01 || head < 0) continue;

        const color = t.pass && head > gateX - 60 ? blue : navy;
        const segment = ctx.createLinearGradient(head - tail, 0, head, 0);
        segment.addColorStop(0, rgba(color, 0));
        segment.addColorStop(1, rgba(color, 0.9 * visibility));
        ctx.strokeStyle = segment;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let x = Math.max(0, head - tail); x <= head; x += 6) {
          const y = yAt(t, x, now);
          if (x === Math.max(0, head - tail)) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const hy = yAt(t, head, now);
        ctx.lineTo(head, hy);
        ctx.stroke();

        const halo = ctx.createRadialGradient(head, hy, 0, head, hy, 9);
        halo.addColorStop(0, rgba(cyan, 0.55 * visibility));
        halo.addColorStop(1, rgba(cyan, 0));
        ctx.fillStyle = halo;
        ctx.fillRect(head - 9, hy - 9, 18, 18);
        ctx.fillStyle = rgba(color, 0.95 * visibility);
        ctx.beginPath();
        ctx.arc(head, hy, 1.9, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = (stamp: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (stamp - last) / 1000 || 0);
      last = stamp;
      time += dt;
      flowTime += dt * (1 + 1.6 * story.flow);
      for (const pulse of pulses) {
        const before = -0.08 * width + pulse.q * width * 1.16;
        pulse.q += pulse.speed * dt * (1 + 1.4 * story.flow);
        const after = -0.08 * width + pulse.q * width * 1.16;
        if (threads[pulse.thread]?.pass && before < gateX && after >= gateX && story.closed < 0.5) energy = 1;
        if (pulse.q > 1) pulse.q -= 1;
      }
      energy *= Math.pow(0.12, dt); // decays over roughly a second
      // An opened gate keeps a steady glow, easing once the message is flowing.
      energy = Math.max(energy, 0.85 * story.open * (1 - 0.55 * story.flow));
      draw(time);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || !animate) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    build();
    draw(time);

    const resize = new ResizeObserver(() => {
      build();
      if (!running) draw(time);
    });
    resize.observe(host);

    const stopThemeWatch = onThemeChange(() => {
      build();
      if (!running) draw(time);
    });

    // Scroll progress through the pinned hero (see HeroScroll). Redraw at once
    // when the loop is not running, e.g. during its start-up delay.
    const onProgress = () => {
      readStory();
      if (!running) {
        energy = Math.max(energy, 0.85 * story.open * (1 - 0.55 * story.flow));
        draw(time);
      }
    };
    section?.addEventListener("heroprogress", onProgress);
    readStory();

    // The first frame is already drawn; hold the loop back until the entrance
    // has painted, so it never competes with first render on slow devices.
    let ready = false;
    let visible = true;
    const sync = () => (ready && visible && !document.hidden ? start() : stop());
    const warmup = window.setTimeout(() => {
      ready = true;
      sync();
    }, 1400);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      sync();
    });
    io.observe(host);
    document.addEventListener("visibilitychange", sync);

    return () => {
      window.clearTimeout(warmup);
      section?.removeEventListener("heroprogress", onProgress);
      stopThemeWatch();
      stop();
      resize.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [gateSelector]);

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />;
}
