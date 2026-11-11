import assert from "node:assert/strict";
import { test } from "node:test";
import { createGate, leavesDevice, transition, type Gate, type GateEvent } from "./privacyGate.ts";

const run = (events: GateEvent[], gate: Gate = createGate()) => events.reduce(transition, gate);
const toReview: GateEvent[] = [
  { type: "arm", source: "external" },
  { type: "beginDecoding" },
  { type: "propose", text: "arriba" },
];

test("locked by default, with nothing leaving the device", () => {
  const gate = createGate();
  assert.equal(gate.state, "LOCKED");
  assert.equal(leavesDevice(gate), null);
});

test("a locked gate cannot decode", () => {
  const gate = run([{ type: "beginDecoding" }]);
  assert.equal(gate.state, "LOCKED");
  assert.equal(gate.faulted, true);
});

test("an unvalidated neural wake word is rejected", () => {
  const gate = run([{ type: "arm", source: "neural" }]);
  assert.equal(gate.state, "LOCKED");
  assert.equal(gate.faulted, true);
});

test("no approval without review", () => {
  assert.equal(run([{ type: "approve" }]).state, "LOCKED");
  assert.equal(run([{ type: "arm", source: "external" }, { type: "approve" }]).state, "LOCKED");
});

test("the happy path releases exactly the approved text, once", () => {
  const review = run(toReview);
  assert.equal(review.state, "REVIEW");
  assert.equal(leavesDevice(review), null, "nothing leaves during review");

  const send = transition(review, { type: "approve" });
  assert.equal(send.state, "SEND");
  assert.equal(leavesDevice(send), "arriba");
  assert.equal(send.candidate, null);

  const relocked = transition(send, { type: "sent" });
  assert.equal(relocked.state, "LOCKED");
  assert.equal(relocked.outbox, null);
  assert.equal(transition(relocked, { type: "approve" }).state, "LOCKED");
});

test("cancel, reject and timeout discard the candidate", () => {
  for (const type of ["cancel", "reject", "timeout"] as const) {
    const gate = transition(run(toReview), { type });
    assert.equal(gate.state, "LOCKED");
    assert.equal(gate.candidate, null);
    assert.equal(leavesDevice(gate), null);
  }
});

test("an invalid candidate fails closed", () => {
  const armed: GateEvent[] = [{ type: "arm", source: "external" }, { type: "beginDecoding" }];
  for (const text of ["", "x".repeat(1025)]) {
    const gate = run([...armed, { type: "propose", text }]);
    assert.equal(gate.state, "LOCKED");
    assert.equal(gate.faulted, true);
  }
});

test("nothing leaves the device in any state other than SEND", () => {
  let gate = createGate();
  for (const event of toReview) {
    gate = transition(gate, event);
    assert.equal(leavesDevice(gate), null, `leak in ${gate.state}`);
  }
});

test("the log records states and reasons, never content", () => {
  const gate = run([...toReview, { type: "approve" }, { type: "sent" }]);
  assert.ok(gate.log.length <= 4);
  assert.ok(!JSON.stringify(gate.log).includes("arriba"));
});
