# Safety, research ethics and neural data

[Español](../../technical/safety-privacy.md)

**Scope:** independent software research using publicly available EEG recordings and non-invasive, appropriately evaluated recording equipment. No DIY neural stimulation, implants, medical diagnoses or experimental circuit connection to participants.

## Non-negotiable rules

- A chip marketed for EEG is **not** an electrically safe complete acquisition device. Patient-contact protection, leakage currents, power, isolation, EMC and single-fault conditions require specialist review.
- Laboratory evaluation modules, including the TI ADS1299EEG-FE, are not assumed suitable for direct human connection.
- Before any person is involved: appropriate ethical review, informed consent, the planned data lifecycle, visual-stimulus safety evaluation, professional electrical risk review and clear immediate-stop control.
- Avoid unsupported flashing visual-stimulus protocols, especially with participants who may be photosensitive.
- Never feed unconfirmed EEG character candidates directly to external tools or communications.
- Keep raw neural records local by default; encrypt sensitive records, minimise identifiable data and define retention/deletion in advance.
- Publish only authorized, appropriately aggregated scientific outputs. Do not include identifiable EEG, participant metadata, consent forms or API credentials in GitHub.

## Software-specific safeguards

Use explicit user confirmation, uncertainty and abstention, a working cancel path, controlled web permissions, prompt-injection-resistant tool boundaries and transparent separation of EEG-derived selection from language-model predictions.

## Standards and policy context

Applicable rules depend on the device and intended use. Assess relevant parts of IEC 60601-1, IEC 60601-1-2 and IEC 80601-2-26:2019 professionally; a citation of a standard is **not certification**.

The [UNESCO Recommendation on the Ethics of Neurotechnology (2025)](https://www.unesco.org/en/legal-affairs/recommendation-ethics-neurotechnology) discusses autonomy, mental privacy and neural data protection. In Ireland/EU, evaluate applicable data protection and research obligations before collecting personal EEG.

[Hardware safety details (ES)](../../../hardware/safety-review.md) · [Research protocol (ES)](../../technical/research-protocol.md).
