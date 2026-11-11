# Neural Privacy Firewall — proof of concept

**Simulation only.** The code tests message-consent transitions; it does not decode EEG, recognize a mental wake-word or cut physical power.

```bash
PYTHONPATH=src python -m unittest discover -s tests -v
```

```python
from neurolink_ai.privacy_gate import PrivacyGate

gate = PrivacyGate()
gate.power_on()                     # software-only representation
gate.arm(source="external")         # neural activation not supported
gate.begin_decoding()
gate.propose("arriba")              # synthetic string, NOT decoded EEG
# An actual UI must gather independent approval.
approved = gate.approve()           # returns only approved text; gate locks
```

The prototype has no EEG interface, no physical isolation, no real user authentication, no UI and no network capability. Python process memory is not a strong security boundary against malicious software; a real device would need hardware and operating-system security review. Expiry is checked on gate operations, not by a background timer.

[Español](../../docs/technical/neural-privacy-firewall.md) · [English specification](../../docs/en/technical/neural-privacy-firewall.md).
