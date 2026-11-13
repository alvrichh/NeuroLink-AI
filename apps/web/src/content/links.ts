/**
 * Every outbound link used by the site, in one place.
 *
 * Repository paths are verified against the working tree by
 * `links.test.ts`, so a renamed document fails the test suite instead of
 * shipping a dead link.
 */

export type Locale = "en" | "es";

export const REPO_URL = "https://github.com/alvrichh/NeuroLink-AI";

/** Repository-relative paths, per locale where a translation exists. */
export const repoPaths = {
  docsHome: { en: "docs/en/README.md", es: "docs/es/README.md" },
  project: { en: "docs/en/simple/01-project.md", es: "docs/simple/01-el-proyecto.md" },
  firewall: {
    en: "docs/en/technical/neural-privacy-firewall.md",
    es: "docs/technical/neural-privacy-firewall.md",
  },
  phase1: {
    en: "docs/en/technical/phase-1-eeg-to-text.md",
    es: "docs/technical/phase-1-eeg-to-text.md",
  },
  protocol: {
    en: "docs/en/technical/inner-speech-protocol.md",
    es: "docs/technical/inner-speech-protocol.md",
  },
  datasets: {
    en: "docs/en/research/inner-speech-datasets.md",
    es: "docs/research/inner-speech-datasets.md",
  },
  science: {
    en: "docs/en/research/state-of-the-science.md",
    es: "docs/research/state-of-the-science.md",
  },
  dreams: { en: "docs/en/research/lucid-dreams.md", es: "docs/research/lucid-dreams.md" },
  roadmap: { en: "docs/en/research/roadmap.md", es: "docs/research/roadmap.md" },
  safety: {
    en: "docs/en/technical/safety-privacy.md",
    es: "docs/technical/safety-privacy.md",
  },
  p300: {
    en: "docs/en/technical/p300-secondary-baseline.md",
    es: "docs/technical/p300-secondary-baseline.md",
  },
  architecture: {
    en: "docs/en/technical/architecture.md",
    es: "docs/technical/architecture.md",
  },
  hardware: { en: "hardware/en/README.md", es: "hardware/README.md" },
  // Single-language documents (linked transparently in both locales).
  references: { en: "docs/research/references.md", es: "docs/research/references.md" },
  phase2: {
    en: "docs/technical/phase-2-bidirectional.md",
    es: "docs/technical/phase-2-bidirectional.md",
  },
  diagrams: { en: "diagrams/README.md", es: "diagrams/README.md" },
  signalChain: { en: "diagrams/hardware-signal-chain.md", es: "diagrams/hardware-signal-chain.md" },
  gateCode: { en: "src/neurolink_ai/privacy_gate.py", es: "src/neurolink_ai/privacy_gate.py" },
  gateTests: { en: "tests/test_privacy_gate.py", es: "tests/test_privacy_gate.py" },
  gateExample: { en: "examples/privacy-gate/README.md", es: "examples/privacy-gate/README.md" },
  hdl: { en: "hardware/hdl/sample_register.sv", es: "hardware/hdl/sample_register.sv" },
  sources: { en: "assets/SOURCES.md", es: "assets/SOURCES.md" },
  photos: { en: "assets/real/README.md", es: "assets/real/README.md" },
  brand: { en: "assets/branding/STYLE_GUIDE.md", es: "assets/branding/STYLE_GUIDE.md" },
} as const;

export type RepoPathKey = keyof typeof repoPaths;

export function repoLink(key: RepoPathKey, locale: Locale): string {
  return `${REPO_URL}/blob/main/${repoPaths[key][locale]}`;
}

/** Primary literature and vendor documentation cited by the project docs. */
export const refs = {
  nieto: "https://www.nature.com/articles/s41597-022-01147-2",
  nemar: "https://nemar.org/dataset/on003626",
  moabbNieto: "https://moabb.neurotechx.com/docs/generated/moabb.datasets.Nieto2022.html",
  kunz: "https://doi.org/10.1016/j.cell.2025.06.015",
  nihInnerSpeech:
    "https://www.nih.gov/news-events/nih-research-matters/decoding-inner-speech-brain-signals",
  wairagkar: "https://www.nature.com/articles/s41586-025-09127-3",
  tang: "https://www.nature.com/articles/s41593-023-01304-9",
  nihTouch: "https://www.nih.gov/news-events/nih-research-matters/creating-artificial-sense-touch",
  unesco: "https://www.unesco.org/en/legal-affairs/recommendation-ethics-neurotechnology",
  ads1299: "https://www.ti.com/product/ADS1299",
  openbciHardware: "https://docs.openbci.com/ForDevelopers/HardwareDevelopment/",
  cyton: "https://docs.openbci.com/Cyton/CytonSpecs/",
  mne: "https://mne.tools/stable/index.html",
  brainflow: "https://brainflow.readthedocs.io/en/stable/index.html",
} as const;


/** Published dream research and clinical background; not project results. */
export const dreamRefs = {
  "dialogue": "https://pubmed.ncbi.nlm.nih.gov/33607035/",
  "incubation": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7590944/",
  "neural": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12079745/",
  "body": "https://www.nature.com/articles/419269a",
  "rest": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7379166/",
  "induction": "https://pubmed.ncbi.nlm.nih.gov/36408823/",
  "paralysis": "https://www.nhs.uk/conditions/sleep-paralysis/"
} as const;

export type RefKey = keyof typeof refs;

/** A link target expressed either as a repository document or a reference. */
export type LinkTarget = { repo: RepoPathKey } | { ref: RefKey } | { href: string };

export function resolveLink(target: LinkTarget, locale: Locale): string {
  if ("repo" in target) return repoLink(target.repo, locale);
  if ("ref" in target) return refs[target.ref];
  return target.href;
}
