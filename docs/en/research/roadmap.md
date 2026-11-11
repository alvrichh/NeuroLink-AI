# Research roadmap and acceptance gates

[Español](../../research/roadmap.md)

All software and electronics milestones below are **planned** unless accompanied by actual test artifacts. Documentation has been established; experimental results are pending.

| Stage | Deliverable | Acceptance evidence |
| --- | --- | --- |
| **R0** Planning | Scope, sources, risks, protocols | Reviewed documents with version history |
| **R1** Event decoding | Reproducible P300 Target/NonTarget baseline | Held-out evaluation by subject/session, negative controls |
| **R2** Offline speller | Event aggregation to characters | Character accuracy and correct characters/minute; abstention rates |
| **R3** AI interaction | UI + API + deterministic local assistant | Confirmed messages only; provenance and cancellation tests |
| **R4** Live EEG | Documented commercial device integration | Measured synchronization, quality, ethical/safety review |
| **R5** Sensory feedback | Text/audio and optional external tactility | Objective comprehension, latency and usability metrics |
| **R6** Internet (optional) | Explicitly authorized source retrieval | Read-only permissions and confirmation trail |
| **R7** Clinical literature | Review of direct-neural feedback research | Evidence, limitations and questions for approved clinical partners |

### Parallel electronics workstream

- **H0:** acquisition requirements, manufacturer datasheets, safety architecture.
- **H1:** synthetic sample transport and digital HDL simulation.
- **H2:** lab-bench testing of suitable, evaluated acquisition equipment; **no body contact with experimental boards**.
- **H3:** own schematic and PCB only after proper engineering review and applicable safety planning.
- **H4 (optional):** FPGA/Verilog when measured latency, power or parallelism limits justify it.

### First sprint: R1 baseline

- [ ] Review dataset license and original preprocessing.
- [ ] Fix Python environment and random seeds.
- [ ] Load session-specific EEG and stimulus labels.
- [ ] Build an artifact-aware P300 pipeline.
- [ ] Evaluate LDA / logistic regression, majority baseline and label permutation.
- [ ] Document event-level ROC-AUC and PR-AUC, calibration and failures.
- [ ] Establish whether raw stimulus metadata support genuine character reconstruction.
- [ ] Produce plots from real authorized data using reproducible scripts.

### Rules for calling a milestone complete

No claim of working neural writing until **character-level correctness** is measured. No claim of "real-time brain interaction" using only static screenshots or synthetic streams. No neural electronics connected to a person without independent professional safety review.

[Engineering roadmap diagram](../../../diagrams/tres-fases.md) · [Hardware safety (ES)](../../../hardware/safety-review.md) · [Issues](https://github.com/alvrichh/NeuroLink-AI/issues).
