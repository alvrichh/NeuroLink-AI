"""Unit tests: synthetic input only, no EEG or neural intent decoder."""
import unittest
from neurolink_ai.privacy_gate import PrivacyGate, State, PrivacyError


class Clock:
    t = 100
    def __call__(self):
        return self.t


class TestPrivacyGate(unittest.TestCase):
    def setUp(self):
        self.clock = Clock()
        self.gate = PrivacyGate(window_seconds=10, clock=self.clock)

    def arm_and_propose(self, text="arriba"):
        self.gate.power_on()
        self.gate.arm(source="external")
        self.gate.begin_decoding()
        self.gate.propose(text)

    def test_off_by_default(self):
        self.assertEqual(self.gate.state, State.HARD_OFF)

    def test_locked_cannot_decode(self):
        self.gate.power_on()
        with self.assertRaises(PrivacyError):
            self.gate.begin_decoding()
        self.assertEqual(self.gate.state, State.LOCKED)

    def test_unvalidated_mental_keyword_rejected(self):
        self.gate.power_on()
        with self.assertRaises(PrivacyError):
            self.gate.arm(source="mental_keyword")
        self.assertEqual(self.gate.state, State.LOCKED)

    def test_no_approval_without_review(self):
        self.gate.power_on()
        with self.assertRaises(PrivacyError):
            self.gate.approve()
        self.assertEqual(self.gate.state, State.LOCKED)

    def test_approve_once_only(self):
        self.arm_and_propose()
        self.assertEqual(self.gate.approve(), "arriba")
        self.assertEqual(self.gate.state, State.LOCKED)
        with self.assertRaises(PrivacyError):
            self.gate.approve()

    def test_cancel_discards(self):
        self.arm_and_propose()
        self.gate.cancel()
        self.assertEqual(self.gate.state, State.LOCKED)
        with self.assertRaises(PrivacyError):
            self.gate.approve()

    def test_expiry_discards(self):
        self.arm_and_propose()
        self.clock.t += 11
        with self.assertRaises(PrivacyError):
            self.gate.approve()
        self.assertEqual(self.gate.state, State.LOCKED)

    def test_off_discards(self):
        self.arm_and_propose()
        self.gate.power_off()
        self.assertEqual(self.gate.state, State.HARD_OFF)
        with self.assertRaises(PrivacyError):
            self.gate.approve()

    def test_invalid_candidate_fails_closed(self):
        self.gate.power_on()
        self.gate.arm(source="external")
        self.gate.begin_decoding()
        with self.assertRaises(PrivacyError):
            self.gate.propose("")
        self.assertEqual(self.gate.state, State.LOCKED)


if __name__ == "__main__":
    unittest.main()
