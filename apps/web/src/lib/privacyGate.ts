/**
 * Privacy gate — a TypeScript mirror of `src/neurolink_ai/privacy_gate.py`,
 * used only to drive the on-page architectural simulation.
 *
 * Same rules as the Python prototype:
 *  - locked by default;
 *  - only an *external* deliberate control can arm it (neural wake words are
 *    not validated, so they are rejected);
 *  - any event that is invalid for the current state fails closed: the gate
 *    locks and every transient buffer is cleared;
 *  - approval releases exactly the reviewed text, once, and relocks.
 *
 * The Python `approve()` returns the text and locks in one step. Here that step
 * is split into SEND → `sent` so the interface can show the moment in which
 * the approved text — and nothing else — crosses the device boundary.
 *
 * It reads no EEG and detects no intention. It is a pure state machine.
 */

export const gateStates = ["LOCKED", "ARMED", "DECODING", "REVIEW", "SEND"] as const;
export type GateState = (typeof gateStates)[number];

export type GateReason =
  | "start"
  | "external"
  | "window"
  | "proposed"
  | "approved"
  | "rejected"
  | "cancelled"
  | "timeout"
  | "relock";

export type GateEvent =
  | { type: "arm"; source: "external" | "neural" }
  | { type: "beginDecoding" }
  | { type: "propose"; text: string }
  | { type: "approve" }
  | { type: "reject" }
  | { type: "cancel" }
  | { type: "timeout" }
  | { type: "sent" };

/** A transition record: states and a reason — never message content. */
export type GateLogEntry = { from: GateState; to: GateState; reason: GateReason };

export type Gate = {
  state: GateState;
  /** Decoded candidate awaiting review. Local only. */
  candidate: string | null;
  /** The explicitly approved text: the only value ever allowed to leave. */
  outbox: string | null;
  /** True when the last event was invalid and the gate failed closed. */
  faulted: boolean;
  log: GateLogEntry[];
};

const LOG_LIMIT = 4;
const MAX_CANDIDATE_LENGTH = 1024;

export function createGate(): Gate {
  return {
    state: "LOCKED",
    candidate: null,
    outbox: null,
    faulted: false,
    log: [{ from: "LOCKED", to: "LOCKED", reason: "start" }],
  };
}

function move(gate: Gate, to: GateState, reason: GateReason, patch: Partial<Gate> = {}): Gate {
  return {
    ...gate,
    faulted: false,
    ...patch,
    state: to,
    log: [...gate.log, { from: gate.state, to, reason }].slice(-LOG_LIMIT),
  };
}

/** Lock and clear every transient buffer. */
function lock(gate: Gate, reason: GateReason, faulted = false): Gate {
  return move(gate, "LOCKED", reason, { candidate: null, outbox: null, faulted });
}

export function transition(gate: Gate, event: GateEvent): Gate {
  switch (event.type) {
    case "cancel":
      return gate.state === "LOCKED" ? gate : lock(gate, "cancelled");
    case "timeout":
      return gate.state === "LOCKED" ? gate : lock(gate, "timeout");
    case "reject":
      return gate.state === "REVIEW" ? lock(gate, "rejected") : lock(gate, "cancelled", true);
    case "arm":
      if (gate.state !== "LOCKED" || event.source !== "external") {
        return lock(gate, "cancelled", true);
      }
      return move(gate, "ARMED", "external");
    case "beginDecoding":
      return gate.state === "ARMED" ? move(gate, "DECODING", "window") : lock(gate, "cancelled", true);
    case "propose": {
      const valid =
        typeof event.text === "string" &&
        event.text.length > 0 &&
        event.text.length <= MAX_CANDIDATE_LENGTH;
      if (gate.state !== "DECODING" || !valid) return lock(gate, "cancelled", true);
      return move(gate, "REVIEW", "proposed", { candidate: event.text });
    }
    case "approve":
      if (gate.state !== "REVIEW" || gate.candidate === null) return lock(gate, "cancelled", true);
      return move(gate, "SEND", "approved", { outbox: gate.candidate, candidate: null });
    case "sent":
      return gate.state === "SEND" ? lock(gate, "relock") : lock(gate, "cancelled", true);
  }
}

/** What may leave the device in a given state: approved text in SEND, else nothing. */
export function leavesDevice(gate: Gate): string | null {
  return gate.state === "SEND" ? gate.outbox : null;
}
