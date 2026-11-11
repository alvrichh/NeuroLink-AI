"use client";

import { useEffect, useReducer, useState } from "react";
import type { Dictionary } from "@/content";
import { createGate, gateStates, leavesDevice, transition, type GateState } from "@/lib/privacyGate";
import { cx } from "@/lib/site";
import { ArrowRight, ArrowUpRight, CheckIcon, CloseIcon, LockIcon } from "@/components/icons";
import { Status } from "@/components/ui";

type SimCopy = Dictionary["privacy"]["sim"];

/** Demo pacing. The real prototype uses a configurable window (30 s default). */
const ARM_MS = 1500;
const DECODE_MS = 2800;
const SEND_MS = 2800;
const REVIEW_SECONDS = 15;

type Line = "idle" | "private" | "live" | "done";

/** How each connector of the path is drawn in each state. */
const lines: Record<GateState, [Line, Line, Line, Line]> = {
  LOCKED: ["private", "idle", "idle", "idle"],
  ARMED: ["live", "idle", "idle", "idle"],
  DECODING: ["live", "live", "idle", "idle"],
  REVIEW: ["private", "done", "done", "idle"],
  SEND: ["private", "done", "done", "live"],
};

// Decorative backdrop threads (deterministic, so server and client agree).
// Rounded so server and browser floating-point output is byte-identical.
const r = (value: number) => Math.round(value * 10) / 10;
const backdrop = Array.from({ length: 14 }, (_, i) => {
  const y = 30 + i * 26;
  const a = 40 * Math.sin(i * 1.7);
  const b = 55 * Math.cos(i * 2.3);
  return `M-20 ${y} C 180 ${r(y + a)}, 320 ${r(y - b)}, 520 ${r(y + a * 0.6)} S 860 ${r(y + b * 0.7)}, 1040 ${r(y - a * 0.5)}`;
});

function Connector({ state, vertical = false, label }: { state: Line; vertical?: boolean; label?: string }) {
  return (
    <span className={cx("fw-line", vertical && "fw-line--boundary")} data-state={state} aria-hidden="true">
      <i />
      {label ? <b>{label}</b> : null}
    </span>
  );
}

/**
 * Neural Privacy Firewall — ARCHITECTURAL SIMULATION.
 * Drives the same state machine as the repository's Python prototype with
 * button presses and timers. No neural signal is read and no intention is
 * detected; the candidate is a fixed synthetic string.
 */
export function FirewallSimulation({
  copy,
  codeHref,
  newTab,
}: {
  copy: SimCopy;
  codeHref: string;
  newTab: string;
}) {
  const [gate, dispatch] = useReducer(transition, undefined, createGate);
  const [seconds, setSeconds] = useState(REVIEW_SECONDS);
  const { state } = gate;

  // Timed transitions. Every pending timer is cleared when the state changes,
  // so cancelling always wins.
  useEffect(() => {
    if (state === "ARMED") {
      const id = window.setTimeout(() => dispatch({ type: "beginDecoding" }), ARM_MS);
      return () => window.clearTimeout(id);
    }
    if (state === "DECODING") {
      const id = window.setTimeout(() => dispatch({ type: "propose", text: copy.candidate }), DECODE_MS);
      return () => window.clearTimeout(id);
    }
    if (state === "SEND") {
      const id = window.setTimeout(() => dispatch({ type: "sent" }), SEND_MS);
      return () => window.clearTimeout(id);
    }
    if (state === "REVIEW") {
      let left = REVIEW_SECONDS;
      const id = window.setInterval(() => {
        left -= 1;
        setSeconds(left);
        if (left <= 0) dispatch({ type: "timeout" });
      }, 1000);
      return () => {
        window.clearInterval(id);
        setSeconds(REVIEW_SECONDS);
      };
    }
  }, [state, copy.candidate]);

  const info = copy.states[state];
  const [l1, l2, l3, l4] = lines[state];
  const authorized = state !== "LOCKED";
  const gateOpen = state === "ARMED" || state === "DECODING";
  const sent = leavesDevice(gate);
  const stateIndex = gateStates.indexOf(state);

  const nodeState = (activeIn: GateState[], doneIn: GateState[]) =>
    activeIn.includes(state) ? "active" : doneIn.includes(state) ? "done" : "idle";

  return (
    <div className="fw" data-state={state}>
      <svg className="fw__backdrop" viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true">
        {backdrop.map((d, i) => (
          <path key={i} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>

      <header className="fw__head">
        <div>
          <Status kind="prototype">{copy.tag}</Status>
          <h3 className="t-heading mt-3">{copy.title}</h3>
        </div>

        <div className="fw-mode" role="group" aria-label={copy.modeLabel} data-on={authorized}>
          <button
            type="button"
            aria-pressed={!authorized}
            onClick={() => dispatch({ type: "cancel" })}
            className="fw-mode__btn"
          >
            <LockIcon size={15} />
            {copy.modePrivate}
          </button>
          <button
            type="button"
            aria-pressed={authorized}
            onClick={() => {
              if (!authorized) dispatch({ type: "arm", source: "external" });
            }}
            className="fw-mode__btn"
          >
            <LockIcon size={15} open />
            {copy.modeAuthorized}
          </button>
          <span className="fw-mode__thumb" aria-hidden="true" />
        </div>
      </header>

      {/* ------------------------------------------------ communication path */}
      <div className="fw__stage" role="group" aria-label={copy.diagramLabel}>
        <div className="fw-node" data-state="done">
          <span className="fw-node__disc">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.500" strokeLinecap="round" aria-hidden="true">
              <path d="M3 9c3-3.500 6 3.500 9 0s6 3.500 9 0M3 15c3-3.500 6 3.500 9 0s6 3.500 9 0" />
            </svg>
          </span>
          <span className="fw-node__label">{copy.nodes.mind}</span>
        </div>

        <Connector state={l1} />

        <div className="fw__device">
          <span className="fw__device-label t-mono">{copy.boundary}</span>

          <div className="fw-node fw-node--gate" data-state={gateOpen ? "active" : "idle"}>
            <span className="fw-node__disc glass">
              <LockIcon size={20} open={gateOpen} />
            </span>
            <span className="fw-node__label">{copy.nodes.gate}</span>
          </div>

          <Connector state={l2} />

          <div className="fw-node" data-state={nodeState(["DECODING"], ["REVIEW", "SEND"])}>
            <span className="fw-node__disc">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.500" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="4" y="5" width="7" height="6" rx="1.800" />
                <rect x="13" y="5" width="7" height="6" rx="1.800" />
                <rect x="4" y="13" width="7" height="6" rx="1.800" />
                <rect x="13" y="13" width="7" height="6" rx="1.800" />
              </svg>
              {state === "DECODING" ? <i className="fw-node__timer" /> : null}
            </span>
            <span className="fw-node__label">{copy.nodes.decoder}</span>
          </div>

          <Connector state={l3} />

          <div className="fw-node" data-state={nodeState(["REVIEW"], ["SEND"])}>
            <span className="fw-node__disc">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.500" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3.500" y="5" width="17" height="14" rx="3.500" />
                <path d="m8 12.500 2.500 2.500 5-5.500" />
              </svg>
            </span>
            <span className="fw-node__label">{copy.nodes.review}</span>
          </div>
        </div>

        <Connector state={l4} vertical label={sent ? copy.channel : copy.channelIdle} />

        <div className="fw-node" data-state={nodeState(["SEND"], [])}>
          <span className="fw-node__disc fw-node__disc--square">
            <span className="fw-node__ai">AI</span>
          </span>
          <span className="fw-node__label">{copy.nodes.ai}</span>
        </div>
      </div>

      {/* ------------------------------------------------ states + console */}
      <div className="fw__lower">
        <ol className="fw-states" aria-label={copy.statesLabel}>
          {gateStates.map((code, i) => (
            <li
              key={code}
              className="fw-states__item"
              data-current={code === state}
              data-past={i < stateIndex}
              aria-current={code === state ? "step" : undefined}
            >
              <span className="fw-states__code t-mono">{code}</span>
              <span className="fw-states__name">{copy.states[code].name}</span>
            </li>
          ))}
        </ol>

        <div className="fw-console glass">
          <div className="fw-console__body" key={state}>
            <p className="t-mono fw-console__code">{state}</p>
            <p className="fw-console__name">{info.name}</p>
            <p className="t-small mt-2 text-body">{info.text}</p>
          </div>

          <dl className="fw-read">
            <div>
              <dt>{copy.readDecoding}</dt>
              <dd>{info.decoding}</dd>
            </div>
            <div data-alert={sent !== null}>
              <dt>{copy.readLeaves}</dt>
              <dd>{sent !== null ? `“${sent}”` : info.leaves}</dd>
            </div>
          </dl>

          {state === "REVIEW" ? (
            <div className="fw-candidate">
              <p className="t-mono uppercase tracking-[0.06em] text-muted">{copy.candidateLabel}</p>
              <p className="fw-candidate__text">“{gate.candidate}”</p>
              <p className="text-[0.75rem] leading-snug text-muted">{copy.candidateNote}</p>
            </div>
          ) : null}

          <div className="fw-console__actions">
            {state === "LOCKED" ? (
              <button type="button" className="btn btn-primary btn-sm" onClick={() => dispatch({ type: "arm", source: "external" })}>
                {copy.actions.activate}
                <ArrowRight className="arrow" />
              </button>
            ) : null}
            {state === "ARMED" || state === "DECODING" ? (
              <button type="button" className="btn btn-quiet btn-sm" onClick={() => dispatch({ type: "cancel" })}>
                <CloseIcon />
                {copy.actions.lock}
              </button>
            ) : null}
            {state === "REVIEW" ? (
              <>
                <button type="button" className="btn btn-primary btn-sm" onClick={() => dispatch({ type: "approve" })}>
                  <CheckIcon />
                  {copy.actions.approve}
                </button>
                <button type="button" className="btn btn-quiet btn-sm" onClick={() => dispatch({ type: "reject" })}>
                  {copy.actions.reject}
                </button>
              </>
            ) : null}
            {state === "SEND" ? (
              <button type="button" className="btn btn-primary btn-sm" disabled>
                <LockIcon size={15} />
                {copy.states.LOCKED.name}…
              </button>
            ) : null}
          </div>

          {state === "REVIEW" ? (
            <p className="fw-console__timer t-mono" aria-hidden="true">
              <i style={{ animationDuration: `${REVIEW_SECONDS}s` }} />
              {copy.autoLock} {seconds} {copy.seconds}
            </p>
          ) : null}
        </div>
      </div>

      <div className="fw__foot">
        <div className="fw-log">
          <p className="t-mono fw-log__title">
            {copy.log.title} <span>— {copy.log.note}</span>
          </p>
          <ol>
            {gate.log.map((entry, i) => (
              <li key={`${i}-${entry.to}-${entry.reason}`} className="t-mono">
                <span>{entry.from}</span>
                <span aria-hidden="true">→</span>
                <span>{entry.to}</span>
                <em>{copy.log[entry.reason]}</em>
              </li>
            ))}
          </ol>
        </div>
        <p className="fw__note">
          {copy.note}{" "}
          <a href={codeHref} target="_blank" rel="noreferrer" className="link whitespace-nowrap">
            {copy.codeLink}
            <ArrowUpRight className="ml-0.5 inline-block align-[-0.1em]" size={13} />
            <span className="sr-only"> ({newTab})</span>
          </a>
        </p>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {state}: {info.name}. {copy.readLeaves}: {sent !== null ? copy.channel : info.leaves}.
      </p>
    </div>
  );
}
