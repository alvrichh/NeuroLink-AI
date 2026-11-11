"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { Dictionary } from "@/content";
import { cx } from "@/lib/site";

type SequenceCopy = Dictionary["vision"]["sequence"];
type StageKey = keyof SequenceCopy["stages"];

const order: StageKey[] = ["speech", "signals", "decoding", "consent", "response"];

/** Small schematic glyphs — diagrams of an idea, deliberately not data plots. */
const glyphs: Record<StageKey, React.JSX.Element> = {
  // A silent speech bubble: dashed outline, unspoken words.
  speech: (
    <>
      <path
        d="M14 13h28a6 6 0 0 1 6 6v14a6 6 0 0 1-6 6H29l-9 7v-7h-6a6 6 0 0 1-6-6V19a6 6 0 0 1 6-6Z"
        strokeDasharray="2.5 3.5"
      />
      <path d="M20 26h.01M28 26h.01M36 26h.01" strokeWidth="3" />
    </>
  ),
  // Scalp seen from above with electrode positions.
  signals: (
    <>
      <circle cx="28" cy="29" r="19" />
      <path d="M25 10.500 28 7l3 3.500" />
      {[
        [28, 17],
        [19, 22],
        [37, 22],
        [28, 29],
        [16, 31],
        [40, 31],
        [21, 39],
        [35, 39],
        [28, 42],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.700" className="glyph-dot" style={{ animationDelay: `${i * 0.18}s` }} />
      ))}
    </>
  ),
  // A closed vocabulary of four classes, one selected.
  decoding: (
    <>
      <rect x="8" y="12" width="18" height="13" rx="4" />
      <rect x="30" y="12" width="18" height="13" rx="4" className="glyph-pick" />
      <rect x="8" y="31" width="18" height="13" rx="4" />
      <rect x="30" y="31" width="18" height="13" rx="4" />
      <path d="M13 18.500h8M35 18.500h8M13 37.500h8M35 37.500h8" opacity="0.55" />
    </>
  ),
  // An explicit decision: approve or reject.
  consent: (
    <>
      <rect x="8" y="11" width="40" height="34" rx="8" />
      <circle cx="21" cy="33" r="6" className="glyph-pick" />
      <path d="m18.300 33 2 2 3.500-4" className="glyph-on-pick" />
      <circle cx="36" cy="33" r="6" />
      <path d="m33.700 30.700 4.600 4.600M38.300 30.700l-4.600 4.600" opacity="0.55" />
      <path d="M15 19.500h26" opacity="0.55" />
    </>
  ),
  // A reply on a screen, and as sound.
  response: (
    <>
      <rect x="7" y="12" width="30" height="22" rx="5" />
      <path d="M13 20h18M13 26h11" opacity="0.55" />
      <path d="M17 34v6M27 34v6M13 40h18" />
      <path d="M43 18c2.200 2 3.300 4.300 3.300 7s-1.100 5-3.300 7" className="glyph-wave" />
      <path d="M47.500 14c3.400 3 5 6.700 5 11s-1.600 8-5 11" className="glyph-wave" opacity="0.5" />
    </>
  ),
};

const AUTO_ADVANCE_MS = 5200;

/**
 * Inner speech → neural signals → decoding → user consent → AI response.
 * An accessible tab interface; it advances by itself while on screen until
 * the visitor takes control.
 */
export function VisionSequence({ copy, conceptual }: { copy: SequenceCopy; conceptual: string }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  // Advance automatically only while visible and while motion is enabled.
  useEffect(() => {
    if (!auto || document.documentElement.dataset.motion !== "on") return;
    const root = rootRef.current;
    if (!root) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        window.clearInterval(timer);
        if (entry?.isIntersecting) {
          timer = window.setInterval(() => setActive((i) => (i + 1) % order.length), AUTO_ADVANCE_MS);
        }
      },
      { threshold: 0.5 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [auto]);

  const select = useCallback((index: number, focus = false) => {
    setAuto(false);
    setActive(index);
    if (focus) tabRefs.current[index]?.focus();
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = order.length - 1;
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? (active + 1) % order.length
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? (active - 1 + order.length) % order.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    select(next, true);
  };

  const key = order[active] ?? "speech";
  const stage = copy.stages[key];

  return (
    <div className="seq" ref={rootRef} style={{ ["--active" as string]: active, ["--count" as string]: order.length }}>
      <div className="seq__head">
        <div>
          <h3 className="t-heading">{copy.title}</h3>
          <p className="t-small mt-2">{copy.hint}</p>
        </div>
        <p className="evidence-label">{conceptual}</p>
      </div>

      <div className="seq__scroller scrollbar-none">
        <div
          className="seq__track"
          role="tablist"
          aria-label={copy.title}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
        >
          <span className="seq__line" aria-hidden="true">
            <i />
          </span>
          {order.map((id, i) => {
            const selected = i === active;
            return (
              <button
                key={id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                className={cx("seq__tab", i < active && "is-past")}
                onClick={() => select(i)}
              >
                <span className="seq__node">
                  <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {glyphs[id]}
                  </svg>
                </span>
                <span className="seq__num t-mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="seq__label">{copy.stages[id].label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="seq__panel"
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${key}`}
        tabIndex={0}
      >
        <div className="seq__panel-inner" key={key}>
          {/* Decorative numeral, drawn from CSS so it is not announced or audited as text. */}
          <span className="seq__big" data-n={String(active + 1).padStart(2, "0")} aria-hidden="true" />
          <div>
            <h4 className="t-heading">{stage.title}</h4>
            <p className="t-body mt-4 max-w-[38em]">{stage.text}</p>
            <p className="seq__status">
              <span className="t-mono uppercase tracking-[0.08em] text-muted">{copy.statusLabel}</span>
              <span>{stage.status}</span>
            </p>
          </div>
        </div>
      </div>

      <p className="seq__foot t-small">{copy.disclaimer}</p>
    </div>
  );
}
