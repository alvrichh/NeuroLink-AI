"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { Dictionary, Locale } from "@/content";
import { resolveLink, type LinkTarget } from "@/content/links";
import { cx } from "@/lib/site";
import { ArrowUpRight } from "@/components/icons";
import { Status, type StatusKind } from "@/components/ui";

type TechCopy = Dictionary["technology"];
type StageKey = keyof TechCopy["stages"];
type Domain = keyof TechCopy["domains"];

/**
 * The signal chain, in order. `kind` says who built the stage:
 * an external reference, our software prototype, or planned work.
 */
const stages: Array<{ key: StageKey; domain: Domain; kind: StatusKind; link: LinkTarget }> = [
  { key: "electrodes", domain: "analog", kind: "reference", link: { ref: "nieto" } },
  { key: "afe", domain: "analog", kind: "reference", link: { ref: "ads1299" } },
  { key: "adc", domain: "analog", kind: "reference", link: { ref: "ads1299" } },
  { key: "mcu", domain: "digital", kind: "reference", link: { ref: "cyton" } },
  { key: "dsp", domain: "host", kind: "planned", link: { ref: "mne" } },
  { key: "decoder", domain: "host", kind: "planned", link: { repo: "protocol" } },
  { key: "firewall", domain: "host", kind: "prototype", link: { repo: "gateCode" } },
  { key: "ai", domain: "external", kind: "planned", link: { repo: "architecture" } },
];

const domainSpans: Array<{ domain: Domain; span: number }> = [
  { domain: "analog", span: 3 },
  { domain: "digital", span: 1 },
  { domain: "host", span: 3 },
  { domain: "external", span: 1 },
];

const legendKinds: StatusKind[] = ["reference", "prototype", "planned"];

/**
 * Interactive architecture: EEG acquisition → AFE → ADC → MCU → signal
 * processing → decoder → privacy firewall → AI. The lit part of the rail shows
 * how far the signal has travelled to reach the selected stage.
 */
export function SystemChain({
  copy,
  status,
  common,
  locale,
}: {
  copy: TechCopy;
  status: Dictionary["status"];
  common: Dictionary["common"];
  locale: Locale;
}) {
  const [active, setActive] = useState(6); // open on our own work: the firewall
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const scroller = useRef<HTMLDivElement>(null);
  const baseId = useId();

  // On narrow screens the chain scrolls sideways: keep the selected stage
  // centred, moving only the strip (never the page).
  useEffect(() => {
    const strip = scroller.current;
    const tab = tabs.current[active];
    if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return;
    const target = tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2;
    strip.scrollTo({
      left: target,
      behavior: document.documentElement.dataset.motion === "on" ? "smooth" : "auto",
    });
  }, [active]);
  const current = stages[active] ?? stages[0]!;
  const info = copy.stages[current.key];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const count = stages.length;
    const next =
      event.key === "ArrowRight"
        ? (active + 1) % count
        : event.key === "ArrowLeft"
          ? (active - 1 + count) % count
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? count - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <div className="chain" style={{ ["--count" as string]: stages.length, ["--active" as string]: active }}>
      <div className="chain__scroller scrollbar-none" ref={scroller}>
        <div className="chain__inner">
          <div className="chain__domains" aria-hidden="true">
            {domainSpans.map(({ domain, span }) => (
              <span key={domain} style={{ gridColumn: `span ${span}` }} data-on={current.domain === domain}>
                {copy.domains[domain]}
              </span>
            ))}
          </div>

          <div className="chain__blocks" role="tablist" aria-label={copy.chainLabel} onKeyDown={onKeyDown}>
            {stages.map((stage, i) => {
              const selected = i === active;
              return (
                <button
                  key={stage.key}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${stage.key}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  className={cx("chain__block", i < active && "is-lit")}
                  onClick={() => setActive(i)}
                >
                  <span className="chain__block-top">
                    <span className="t-mono">{String(i + 1).padStart(2, "0")}</span>
                    <i className="status-mark" data-kind={stage.kind} aria-hidden="true" />
                  </span>
                  <span className="chain__block-label">{copy.stages[stage.key].label}</span>
                  <span className="sr-only"> — {status[stage.kind]}</span>
                </button>
              );
            })}
          </div>

          <div className="chain__rail" aria-hidden="true">
            <i />
          </div>
        </div>
      </div>

      <div
        className="chain__detail"
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${current.key}`}
        tabIndex={0}
      >
        <div className="chain__detail-inner" key={current.key}>
          <div>
            <p className="t-mono chain__where">
              <b>{String(active + 1).padStart(2, "0")}</b> / {String(stages.length).padStart(2, "0")}
              <span>{copy.domains[current.domain]}</span>
            </p>
            <h3 className="t-heading mt-4">{info.title}</h3>
            <p className="t-body mt-4 max-w-[34em]">{info.text}</p>
          </div>

          <dl className="spec">
            <div>
              <dt>{copy.detail.input}</dt>
              <dd>{info.input}</dd>
            </div>
            <div>
              <dt>{copy.detail.output}</dt>
              <dd className="spec__out">{info.output}</dd>
            </div>
            <div>
              <dt>{copy.detail.reference}</dt>
              <dd>
                {info.reference}{" "}
                <a href={resolveLink(current.link, locale)} target="_blank" rel="noreferrer" className="link whitespace-nowrap">
                  {common.source}
                  <ArrowUpRight className="ml-0.5 inline-block align-[-0.1em]" size={13} />
                  <span className="sr-only"> ({common.newTab})</span>
                </a>
              </dd>
            </div>
            <div>
              <dt>{copy.detail.status}</dt>
              <dd>
                <Status kind={current.kind}>{status[current.kind]}</Status>
                <span className="mt-1.5 block">{info.statusNote}</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="chain__legend">
        <span className="t-mono uppercase tracking-[0.07em] text-muted">{copy.legendTitle}</span>
        {legendKinds.map((kind) => (
          <Status key={kind} kind={kind}>
            {status[kind]}
          </Status>
        ))}
      </div>
    </div>
  );
}
