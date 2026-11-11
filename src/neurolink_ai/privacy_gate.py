"""Software-only, fail-closed privacy gate for a *synthetic* inner-speech message.
HARD_OFF represents a future hardware-off state; Python cannot disconnect power.
Neural wake words and neural decoding are NOT implemented.
"""
from dataclasses import dataclass, field
from enum import Enum, auto
from time import monotonic
from typing import Callable


class State(Enum):
    HARD_OFF = auto()
    LOCKED = auto()
    ARMED = auto()
    DECODING = auto()
    REVIEW = auto()


class PrivacyError(PermissionError):
    pass


@dataclass
class PrivacyGate:
    window_seconds: float = 30.0
    clock: Callable[[], float] = field(default=monotonic, repr=False)
    state: State = field(default=State.HARD_OFF, init=False)
    _deadline: float | None = field(default=None, init=False, repr=False)
    _candidate: str | None = field(default=None, init=False, repr=False)

    def __post_init__(self):
        if self.window_seconds <= 0:
            raise ValueError("window_seconds must be positive")

    def lock(self):
        self._deadline = None
        self._candidate = None
        if self.state != State.HARD_OFF:
            self.state = State.LOCKED

    def _require(self, expected):
        if self._deadline is not None and self.clock() >= self._deadline:
            self.lock()
            raise PrivacyError("privacy window expired")
        if self.state != expected:
            self.lock()
            raise PrivacyError("invalid state; gate is locked")

    def power_on(self):
        self._require(State.HARD_OFF)
        self.state = State.LOCKED

    def power_off(self):
        self.lock()
        self.state = State.HARD_OFF

    def arm(self, *, source):
        self._require(State.LOCKED)
        if source != "external":
            self.lock()
            raise PrivacyError("neural wake words are not validated")
        self._deadline = self.clock() + self.window_seconds
        self.state = State.ARMED

    def begin_decoding(self):
        self._require(State.ARMED)
        self.state = State.DECODING

    def propose(self, text):
        self._require(State.DECODING)
        if not isinstance(text, str) or not 0 < len(text) <= 1024:
            self.lock()
            raise PrivacyError("invalid hypothesis")
        self._candidate = text
        self.state = State.REVIEW

    def approve(self):
        self._require(State.REVIEW)
        if self._candidate is None:
            self.lock()
            raise PrivacyError("nothing to approve")
        approved = self._candidate
        self.lock()
        return approved

    def cancel(self):
        self.lock()

    def timeout(self):
        self.lock()
