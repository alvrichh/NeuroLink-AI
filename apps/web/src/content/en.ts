/**
 * English content. This object also defines the `Dictionary` type that every
 * other locale must satisfy, so a missing translation is a type error.
 *
 * Editorial rule (see docs/VISUAL_STANDARDS.md): never describe a planned or
 * conceptual item as demonstrated. Figures quoted here are published by the
 * cited authors, not results of NeuroLink AI.
 */
export const en = {
  locale: "en",
  meta: {
    title: "NeuroLink AI — Beyond words",
    description:
      "An open research project exploring voluntary communication between human inner speech and artificial intelligence, with mental privacy at its core.",
  },
  common: {
    skip: "Skip to content",
    brand: "NeuroLink AI",
    logoAlt:
      "NeuroLink AI logo: a blue brain crossed by circuit traces and circled by an orbit, above the NeuroLink AI wordmark and the line “Brain · Privacy · AI”",
    home: "NeuroLink AI — back to top",
    sections: "Sections",
    menuOpen: "Open navigation",
    menuClose: "Close navigation",
    language: "Language",
    theme: "Appearance",
    themeLight: "Light",
    themeDark: "Dark",
    github: "GitHub",
    githubLong: "View on GitHub",
    newTab: "opens in a new tab",
    stage: "Research stage",
    stageNote: "Nothing here is validated yet",
    conceptual: "Conceptual illustration",
    notData: "not recorded data",
    photograph: "Photograph",
    source: "Source",
    readMore: "Read the document",
    imageUnavailable: "Photograph unavailable — follow the source link.",
  },
  status: {
    documented: "Documented",
    prototype: "Software prototype",
    planned: "Planned",
    optional: "Optional",
    reference: "External reference",
    question: "Open question",
  },
  nav: {
    overview: "Overview",
    vision: "Vision",
    privacy: "Privacy Firewall",
    research: "Research",
    technology: "Technology",
    exchange: "Bidirectional",
    dreams: "Dreams",
    roadmap: "Roadmap",
    open: "Open Research",
  },
  hero: {
    eyebrow: "Inner speech → AI",
    eyebrowNote: "An open research project",
    title: "Beyond words.",
    lead: "What if your inner voice could communicate with artificial intelligence?",
    text: "Exploring the future of voluntary brain-to-AI communication, with mental privacy at its core.",
    primary: "Explore the research",
    secondary: "View on GitHub",
    vizLabels: ["Inner speech", "Consent", "Intentional message"],
    vizAlt:
      "Abstract illustration: many fine organic threads converge on a narrow gate and leave it as ordered parallel lines.",
    scroll: "Scroll",
    // Shown one at a time while the hero is pinned; each pairs with a viz label.
    beats: [
      "By design, inner speech stays private.",
      "Only a deliberate act would open the channel.",
      "Only what you approve would reach the AI.",
    ],
    beatsLabel: "The proposed design, in three steps",
  },
  vision: {
    eyebrow: "The vision",
    title: "From inner speech to interaction.",
    statement: "We do not want people to type using a mental keyboard.",
    paragraphs: [
      "Brain–computer spellers ask a person to pick letters one at a time. That is selection by attention — valuable, but far from how anyone actually thinks.",
      "NeuroLink AI asks a different question: can the words people silently say to themselves — their inner speech — be interpreted as intentional digital communication? Only when they choose to communicate, and never by default.",
    ],
    contrast: {
      not: {
        tag: "Secondary reference",
        title: "Spelling by attention",
        text: "A P300 speller infers which flashing row and column a person is attending to, one character at a time. We keep it as a non-invasive baseline — not as the interface.",
        figure: "Schematic of a letter-matrix speller with one row and one column highlighted.",
      },
      yes: {
        tag: "Primary research question",
        quote: "Explain how black holes work.",
        title: "Inner speech",
        text: "A sentence said silently, to yourself. Could it one day become a message to an AI — only when you deliberately decide it should?",
      },
    },
    sequence: {
      title: "The intended interaction",
      hint: "Five stages. Select one.",
      statusLabel: "Status",
      disclaimer:
        "This sequence is a research design. NeuroLink AI has not validated any of these stages end to end.",
      stages: {
        speech: {
          label: "Inner speech",
          title: "Words you say only to yourself",
          text: "Inner speech is the silent, voluntary use of language: no sound, no movement, no letters to select. It is where the interaction begins — and by default it stays private.",
          status: "The research question",
        },
        signals: {
          label: "Neural signals",
          title: "Activity measured at the scalp",
          text: "Scalp EEG records small voltage differences produced by large populations of neurons. The signal is spatially mixed and sensitive to eye, muscle and environmental artifacts. It does not expose arbitrary thoughts.",
          status: "Established measurement, strict limits",
        },
        decoding: {
          label: "Decoding",
          title: "A small, labelled vocabulary first",
          text: "The first experiment is deliberately narrow: classify four prompted, imagined Spanish words in a public EEG dataset. Open-ended language is a long-term scientific goal, not a current capability.",
          status: "Planned · milestone IS-01",
        },
        consent: {
          label: "User consent",
          title: "A decoded word is not permission",
          text: "Each candidate is shown locally, together with its uncertainty. The person can edit, reject or cancel. Nothing is sent on classifier confidence alone — approval is a separate, explicit act.",
          status: "Design principle · software prototype",
        },
        response: {
          label: "AI response",
          title: "Only approved text reaches the AI",
          text: "The assistant receives the confirmed message, never raw neural data, and answers through ordinary senses: text on a screen, or audio.",
          status: "Planned · milestone AI-01",
        },
      },
    },
  },
  privacy: {
    eyebrow: "Neural Privacy Firewall",
    title: "Your mind. Your permission.",
    lead: "Private thoughts must remain private. Inner speech is not consent.",
    paragraphs: [
      "A person can talk to themselves without meaning to tell anyone. So the proposed system is locked by default. It opens only after deliberate activation, decodes a short window locally, asks for explicit confirmation, sends the approved text — and locks again.",
      "If anything fails — a timeout, a fault, a lost connection — the channel closes and nothing is transmitted.",
    ],
    intent: {
  "title": "Thinking, perceiving and communicating are different.",
  "intro": "Inner speech can accompany reading or writing. A sensation can also prompt words or mental images: these experiences overlap, and we do not assume EEG can reliably separate them.",
  "items": [
    "Perception: hearing or reading “up” must not activate a command. Smelling something and thinking about it does not imply an intention to communicate either.",
    "Private thought: talking to yourself, preparing a sentence or imagining a scene does not authorize transmission. Not all thought takes the form of words.",
    "Voluntary communication: open the channel with an explicit control, formulate a message and confirm the text before sending it. Recognizing words does not establish consent."
  ],
  "status": "NPF-02 proposal · not yet executed. We will compare the same words heard, read, privately imagined and addressed to the assistant, alongside nonverbal controls and rest. We will measure false activations per hour and sensitivity in held-out participants.",
  "limit": "The current EEG pilot did not demonstrate above-chance performance (26.5%; p = 0.46) and did not evaluate this distinction.",
  "link": "Read the experimental conditions, controls and criteria"
},
    sim: {
      tag: "Architectural simulation",
      title: "See how the path changes",
      note: "This demonstration mirrors the software state machine in the repository. It reads no neural signal. NeuroLink AI has not developed a functioning neural intention detector.",
      codeLink: "View privacy_gate.py",
      modeLabel: "Communication state",
      modePrivate: "Private",
      modeAuthorized: "Authorized",
      diagramLabel: "Communication path for the current state",
      nodes: {
        mind: "Inner speech",
        gate: "Privacy gate",
        decoder: "Local decoding",
        review: "Review & consent",
        ai: "AI assistant",
      },
      boundary: "On device · local only",
      channel: "Approved text only",
      channelIdle: "Nothing leaves",
      readDecoding: "Language decoding",
      readLeaves: "Leaves the device",
      statesLabel: "Firewall states",
      states: {
        LOCKED: {
          name: "Private / Locked",
          text: "The default. No language decoding runs, and nothing leaves the device.",
          decoding: "Off",
          leaves: "Nothing",
        },
        ARMED: {
          name: "Intentional activation",
          text: "The person deliberately opens the channel using an external control. A neural wake word remains an unvalidated hypothesis.",
          decoding: "Standing by",
          leaves: "Nothing",
        },
        DECODING: {
          name: "Local decoding",
          text: "A short, bounded window is processed on the device. A timeout or fault relocks immediately.",
          decoding: "Local · bounded window",
          leaves: "Nothing",
        },
        REVIEW: {
          name: "Review and consent",
          text: "The candidate is shown locally with its uncertainty. Approving or rejecting it is your decision — independent of decoder confidence.",
          decoding: "Window closed",
          leaves: "Nothing",
        },
        SEND: {
          name: "Secure communication",
          text: "Only the explicitly approved text is transmitted. Raw neural data never is. Buffers are cleared and the gate relocks.",
          decoding: "Window closed",
          leaves: "Approved text only",
        },
      },
      actions: {
        activate: "Activate deliberately",
        lock: "Cancel and lock",
        approve: "Approve and send",
        reject: "Reject",
      },
      candidateLabel: "Candidate message",
      candidate: "arriba",
      candidateNote: "Synthetic example string — not decoded EEG.",
      autoLock: "Auto-lock in",
      seconds: "s",
      log: {
        title: "Transition log",
        note: "States only — never content",
        start: "default state",
        external: "external control",
        window: "window opened",
        proposed: "candidate proposed",
        approved: "explicit approval",
        rejected: "rejected · buffers cleared",
        cancelled: "cancelled · buffers cleared",
        timeout: "timeout · buffers cleared",
        relock: "sent · buffers cleared",
      },
    },
    layers: {
      title: "Defence in depth",
      intro:
        "Seven proposed layers, from hardware to audit. None has been validated against real neural data.",
      items: [
        "A physical privacy disconnect with an independent state indicator — for a future, professionally assessed device.",
        "A local activation detector restricted to one small task. No general inner-speech inference while locked.",
        "Hard timeouts, immediate cancel, and fail-closed behaviour.",
        "Separate activation and content decoders, least privilege, ephemeral buffers.",
        "Consent that is independent of decoding-confidence scores.",
        "Offline-first operation. No raw EEG export, and web tools cannot read neural buffers.",
        "Minimal audit: transitions and aggregate metrics, never a history of thoughts.",
      ],
      hardOffTitle: "A software lock is not a hardware switch",
      hardOff:
        "A lock that listens for a mental wake word still acquires some signal while powered. Only a verified physical disconnect — not yet designed — gives a stronger acquisition boundary.",
    },
    evidence: {
      tag: "What the evidence says",
      text: "Kunz and colleagues demonstrated inner-speech decoding and a mental keyword lock in participants with implanted electrodes. A real-time test in one participant reported 98.75% keyword-detection accuracy. That is not a privacy guarantee, and it is not a result for non-invasive scalp EEG.",
      cite: "Kunz et al., Cell (2025)",
      spec: "Read the firewall specification",
    },
  },
  research: {
    eyebrow: "Research",
    title: "Understanding the inner voice.",
    lead: "Six lines of investigation, grounded in published science — and explicit about what has not been shown.",
    notice:
      "NeuroLink AI has not produced validated neural decoding, human-subject tests or a custom electronic device. What follows is a research design, and references to work published by others.",
    basedOn: "Based on",
    cards: {
      decoding: {
        title: "Inner speech decoding",
        text: "Can recorded EEG predict a small, closed set of internally imagined words on independent trials and sessions? We begin with four prompted Spanish words — arriba, abajo, derecha, izquierda — from a public dataset.",
        facts: [
          { value: "10", label: "participants" },
          { value: "3", label: "sessions" },
          { value: "5,640", label: "trials" },
          { value: "4", label: "imagined words" },
        ],
        factsNote:
          "Dataset figures as published by Nieto et al. They describe the recordings, not a NeuroLink AI result.",
        cite: "Nieto et al., Scientific Data (2022)",
      },
      acquisition: {
        title: "EEG signal acquisition",
        text: "Scalp EEG reaches software through electrodes, an analog front end and a converter. We study research-grade and open hardware before considering any design of our own.",
        cite: "OpenBCI hardware documentation",
      },
      processing: {
        title: "Neural signal processing",
        text: "Referencing, filtering, artifact rejection and epoching — every transform fitted on training data only, with eye and muscle channels inspected for confounds.",
        cite: "MNE-Python",
      },
      classification: {
        title: "Machine learning classification",
        text: "Interpretable baselines first: LDA, logistic regression, SVM — tested against shuffled labels. With four balanced classes, chance is 25%. We will report balanced accuracy, macro-F1 and abstention.",
        cite: "MOABB · Nieto2022 loader",
      },
      intent: {
        title: "Intentional communication detection",
        text: "Can EEG tell inner speech deliberately addressed to an assistant from ordinary private inner speech? The public dataset has no such labels. This needs a separate, ethically reviewed protocol, measured in false unlocks per hour.",
        cite: "Kunz et al., Cell (2025) · implanted electrodes",
      },
      privacy: {
        title: "Neural privacy research",
        text: "A fail-closed state machine — locked by default, explicit approval, automatic relock — is the one component implemented so far. It is software only, tested with synthetic events, and reads no EEG.",
        cite: "UNESCO Recommendation on the Ethics of Neurotechnology (2025)",
        code: "Prototype source",
      },
    },
    photos: {
      experiment: {
        alt: "A participant wearing an EEG electrode cap sits at a computer screen during a brain–computer interface experiment.",
        caption:
          "A 2013 EEG cursor-control study. Not a NeuroLink AI experiment, and no evidence of inner-speech decoding.",
      },
      cap: {
        alt: "A multi-channel EEG electrode cap fitted on a demonstration model.",
        caption: "A research EEG cap on a demonstration model. Not our equipment.",
      },
    },
    table: {
      title: "Evidence at a glance",
      lead: "What published research has demonstrated — and what cannot be inferred from it.",
      columns: ["Approach", "Demonstrated in research", "Cannot be inferred"],
      rows: [
        {
          approach: "Scalp EEG · imagined speech",
          shown: "Restricted-task classification under experimental conditions.",
          limit: "Universal speech-to-text by thought alone.",
          cite: "Nieto et al. (2022)",
        },
        {
          approach: "Implanted electrodes · attempted speech",
          shown:
            "Real-time speech synthesis for one participant with ALS, using 256 implanted microelectrodes.",
          limit: "The same performance through scalp EEG.",
          cite: "Wairagkar et al., Nature (2025)",
        },
        {
          approach: "fMRI · semantic decoder",
          shown:
            "Approximate meaning, with individually trained decoders and cooperating participants.",
          limit: "Portable EEG extracting spontaneous inner speech.",
          cite: "Tang et al., Nature Neuroscience (2023)",
        },
        {
          approach: "Intracortical stimulation",
          shown: "Limited artificial tactile sensations in clinical research.",
          limit: "Uploading facts or complex AI answers into a brain.",
          cite: "NIH Research Matters (2025)",
        },
      ],
      more: "Scientific evidence and limits",
    },
  },
  technology: {
    eyebrow: "Technology",
    title: "Inside the system.",
    lead: "From microvolts at the scalp to a message you approved: eight stages, each with a defined boundary.",
    chainLabel: "System architecture. Select a stage.",
    legendTitle: "Who built what",
    domains: {
      analog: "Analog",
      digital: "Digital",
      host: "Host software",
      external: "External",
    },
    detail: {
      input: "In",
      output: "Out",
      reference: "Reference",
      status: "Status",
    },
    stages: {
      electrodes: {
        label: "EEG acquisition",
        short: "Electrodes",
        title: "Electrodes at the scalp",
        text: "Electrodes pick up voltage differences produced by the combined activity of large neural populations. The interface to a person is a safety-critical design problem: protection, leakage current and isolation need professional review.",
        input: "Scalp potentials",
        output: "Low-level analog signal · µV",
        reference: "The Nieto et al. recordings used a BioSemi ActiveTwo: 128 EEG + 8 EOG/EMG channels at 1,024 Hz.",
        statusNote: "We use published recordings. No electrode hardware of our own.",
      },
      afe: {
        label: "Analog front-end",
        short: "AFE",
        title: "Low-noise analog front end",
        text: "The front end amplifies microvolt signals with a programmable-gain amplifier while rejecting common-mode interference. Noise, input impedance and protection are decided here — digital logic cannot replace it.",
        input: "Low-level analog signal",
        output: "Conditioned analog signal",
        reference: "Texas Instruments ADS1299 — a biopotential front end with integrated amplifiers. A reference component, not an approved schematic.",
        statusNote: "Studied from vendor documentation only.",
      },
      adc: {
        label: "ADC",
        short: "ADC",
        title: "Analog-to-digital conversion",
        text: "Each channel is sampled simultaneously and converted to digital words. Word format, data-ready timing and sample counting must be exact, or every later stage inherits the error.",
        input: "Conditioned analog signal",
        output: "24-bit samples over SPI",
        reference: "ADS1299: 4, 6 or 8 channels, 24-bit simultaneous-sampling converter, SPI interface.",
        statusNote: "Studied from vendor documentation only.",
      },
      mcu: {
        label: "Microcontroller",
        short: "MCU",
        title: "Microcontroller and firmware",
        text: "Firmware drives the SPI bus, counts samples, attaches timestamps and frames the data for transport. An FPGA is optional, and only if a measured requirement justifies it.",
        input: "SPI samples",
        output: "Framed samples + event markers",
        reference: "OpenBCI Cyton pairs an ADS1299 with a PIC32 microcontroller and a radio. Our only digital work is a SystemVerilog teaching register for synthetic values.",
        statusNote: "Reference platform studied; teaching HDL in the repository.",
      },
      dsp: {
        label: "Signal processing",
        short: "DSP",
        title: "Signal processing",
        text: "Re-referencing, filtering, artifact rejection and segmentation into epochs. Normalisation is fitted on training data only, so evaluation is not contaminated.",
        input: "Framed samples + event markers",
        output: "Clean, time-aligned epochs",
        reference: "Planned stack: Python, MNE-Python, MOABB and BrainFlow where relevant.",
        statusNote: "Specified in the protocol; not yet implemented.",
      },
      decoder: {
        label: "Neural decoder",
        short: "Decoder",
        title: "Inner-speech research decoder",
        text: "A classifier for a small, closed vocabulary that outputs a candidate with its uncertainty — and can abstain. Language-model completion is never reported as neural decoding.",
        input: "Clean epochs",
        output: "Candidate + uncertainty",
        reference: "Baselines: LDA, logistic regression, SVM, evaluated on held-out sessions and subjects.",
        statusNote: "No classifier has been trained.",
      },
      firewall: {
        label: "Privacy Firewall",
        short: "Firewall",
        title: "Neural Privacy Firewall",
        text: "The gate wraps the decoder: locked before decoding, explicit consent after it. On any failure it closes. Only confirmed text may pass.",
        input: "Candidate + uncertainty",
        output: "Approved text only",
        reference: "A fail-closed Python state machine with unit tests, driven by synthetic events.",
        statusNote: "Software only. Neural intent detection is not implemented.",
      },
      ai: {
        label: "AI",
        short: "AI",
        title: "AI assistant",
        text: "The assistant receives confirmed text and returns a traceable response as text or audio. It can begin as a deterministic local stub; an external model is optional and never sees raw EEG.",
        input: "Approved text",
        output: "Text or audio response",
        reference: "Web tools are disabled by default; read-only tools come first.",
        statusNote: "Planned as milestone AI-01.",
      },
    },
    hardware: {
      title: "Reference hardware, clearly labelled.",
      text: "We study existing designs before proposing our own. The components below are third-party references; none is a NeuroLink AI product, and none is presumed safe to connect to a person.",
      photoAlt: "An early OpenBCI 32-bit biosensing circuit board, photographed from above.",
      photoCaption:
        "OpenBCI 32-bit ChipKIT v3, photographed in 2014. A historical third-party board — not NeuroLink AI hardware.",
      specs: [
        {
          name: "Texas Instruments ADS1299",
          kind: "reference",
          rows: [
            ["Function", "EEG analog front end + ADC"],
            ["Channels", "4 / 6 / 8"],
            ["Resolution", "24-bit, simultaneous sampling"],
            ["Interface", "SPI"],
          ],
          link: "Product documentation",
        },
        {
          name: "OpenBCI Cyton",
          kind: "reference",
          rows: [
            ["Function", "Open biosensing board"],
            ["Front end", "ADS1299"],
            ["Controller", "PIC32 microcontroller"],
            ["Link", "Radio module"],
          ],
          link: "Cyton specifications",
        },
        {
          name: "sample_register.sv",
          kind: "prototype",
          rows: [
            ["Function", "Valid/ready sample register"],
            ["Width", "24-bit, synthetic values"],
            ["Scope", "Teaching example only"],
            ["Evidence", "No physical test"],
          ],
          link: "View the HDL source",
        },
      ],
      safetyTitle: "Human safety comes first",
      safety:
        "An evaluation module or a self-built board is not automatically safe to connect to a person, even on battery power. We have not designed patient-contact hardware, and the project implements no neural stimulation.",
      safetyLink: "Safety and privacy rules",
    },
  },
  exchange: {
    eyebrow: "Bidirectional communication",
    title: "Two directions. Two very different problems.",
    lead: "Sending a message out of the mind is an open research question. Getting an answer back already has a safe, ordinary route: your senses.",
    diagramAlt:
      "Diagram of two pathways between a person and an AI: an upper path from person to AI through a consent gate, and a lower path from AI back to the person through screen and audio.",
    person: "Person",
    ai: "AI",
    gate: "Consent",
    senses: "Screen · Audio",
    out: {
      tag: "Human → AI",
      title: "Decoding voluntary inner speech",
      text: "Under investigation. Every step outward passes through a boundary the person controls.",
      steps: [
        {
          name: "A closed vocabulary first",
          text: "Four prompted, imagined words in published EEG recordings.",
          status: "planned",
        },
        {
          name: "Locked by default",
          text: "Nothing is decoded until the channel is deliberately opened.",
          status: "prototype",
        },
        {
          name: "Explicit consent",
          text: "Only text the person has approved ever reaches the AI.",
          status: "prototype",
        },
      ],
    },
    back: {
      tag: "AI → Human",
      title: "Answers through the senses",
      text: "Responses begin as text and audio. Anything beyond that is a separate research question.",
      levels: [
        {
          name: "Screen and audio",
          text: "The starting point. Readable, repeatable, interruptible.",
          status: "planned",
        },
        {
          name: "External tactile codes",
          text: "A possible independent track: a few vibration patterns for states such as yes, no or confirm. Not natural language.",
          status: "optional",
        },
        {
          name: "Direct neural stimulation",
          text: "Regulated clinical research with implanted devices. Outside this project; literature review only.",
          status: "reference",
        },
      ],
    },
    statement:
      "Direct transfer of complex AI-generated knowledge into the brain is not an established capability.",
    statementNote:
      "Clinical studies with implanted electrodes have evoked limited tactile sensations such as shape and motion. That is not the transfer of text, memories or meaning.",
    statementCite: "NIH Research Matters (2025)",
  },
  dreams: {
    "eyebrow": "Dreams & consciousness",
    "title": "A world within the mind.",
    "lead": "Could we consciously explore an experience created entirely by the brain?",
    "intro": "Dreams already create immersive experiences. Lucid dreaming adds awareness that the experience is a dream, sometimes with voluntary control. Designing a stable, programmable world remains an open question.",
    "reviewed": "Literature reviewed · 12 November 2026",
    "scope": "Published research by other teams. NeuroLink AI has not run a sleep experiment or built a dream interface.",
    "evidenceTitle": "What the evidence supports",
    "evidence": [
      {
        "label": "Demonstrated in a laboratory",
        "title": "Limited dialogue during dreams",
        "text": "In a 2021 study, six of 36 participants gave 29 correct answers during verified REM sleep, using eye movements or facial muscle signals. Communication was intermittent, not a continuous conversation.",
        "source": "Konkoly et al. · 2021"
      },
      {
        "label": "Experimental influence",
        "title": "Suggesting a theme",
        "text": "Dormio used audio prompts around sleep onset to influence reported dream themes. This is partial dream incubation, not the ability to write a scene or guarantee a lucid dream.",
        "source": "Haar Horowitz et al. · 2020"
      },
      {
        "label": "Not demonstrated",
        "title": "A programmable inner world",
        "text": "These studies do not establish a way to upload a complete experience, freely read a dream or create a shared external reality. An immersive experience and precise technological control are different claims.",
        "source": "Read the research and its limits"
      }
    ],
    "articleTitle": "Lucid dreams, the body and rest",
    "articleHint": "Open a question to explore the evidence.",
    "questions": {
      "lucidity": {
        "title": "Is lucid dreaming real, and how might it work?",
        "paragraphs": [
          "Lucidity means knowing that you are dreaming while the dream continues. It does not guarantee control over the story, emotions or awakening. Laboratory studies combine sleep recordings with pre-agreed eye signals to identify lucid episodes.",
          "A 2025 EEG study found differences in brain activity and connectivity associated with lucid REM sleep. These are correlates of awareness, not proof of a single mechanism or a reliable switch for lucidity. Eye-movement artifacts remain important when interpreting EEG."
        ],
        "source": "Demirel et al. · EEG study, 2025"
      },
      "body": {
        "title": "Are sleep paralysis and “astral travel” the same thing?",
        "paragraphs": [
          "Sleep paralysis is temporary inability to move or speak when falling asleep or waking. It can include a vivid sense of presence and can be frightening, but is usually harmless. It is not required for lucid dreaming.",
          "An out-of-body experience can feel convincing without showing that consciousness has physically left the body. In one patient evaluated for epilepsy, focal brain stimulation repeatedly elicited this sensation. This supports a role for how the brain integrates bodily signals; it does not explain every such experience."
        ],
        "source": "Blanke et al. · Single-patient report, 2002"
      },
      "rest": {
        "title": "Does an immersive dream wear out neurons?",
        "paragraphs": [
          "There is no established evidence that occasional lucid dreaming wears out or kills neurons. That is not proof that intensive induction is risk-free: long-term effects are insufficiently studied, and mental effort or tiredness should not be equated with neuronal damage.",
          "In a short study of 355 participants, successful induction was not associated with worse self-reported sleep quality. The study did not measure neuronal damage. Techniques involving repeated awakenings can disrupt rest; lucid nightmares and distress are also possible. Persistent sleep problems deserve clinical attention."
        ],
        "source": "Aspy · Induction study, 2020"
      },
      "learning": {
        "title": "Can lucidity be learned?",
        "paragraphs": [
          "Some techniques increase the likelihood of lucidity, but none promises full control every night. MILD uses an intention to remember that one is dreaming. A systematic review found it promising, while noting limitations in the evidence.",
          "Preserving sleep takes priority over induction. This article is not a protocol for sleep deprivation, deliberate sleep paralysis, medication or brain stimulation. Frequent frightening paralysis, fear of sleeping or persistent daytime tiredness are reasons to seek professional advice."
        ],
        "source": "Tan & Fan · Systematic review, 2023"
      }
    },
    "futureTitle": "A research question for NeuroLink AI",
    "future": "A possible future study could combine sleep staging, a pre-agreed eye signal for lucidity and a simple auditory question, measuring correct responses, awakenings and next-day sleepiness. This would require a separate protocol, appropriate oversight and consent; it is not an implemented feature or part of the imagined-word EEG pilot.",
    "privacy": "Consent to a bounded sleep study is not permission to record or transmit private dream content. Any future work would need explicit recording limits, data minimisation and a clear withdrawal process.",
    "sourcesTitle": "Read the sources",
    "sources": {
      "dialogue": "Limited REM dialogue · Konkoly et al., 2021",
      "incubation": "Dream incubation · Haar Horowitz et al., 2020",
      "neural": "EEG correlates of lucidity · Demirel et al., 2025",
      "body": "Out-of-body sensations · Blanke et al., 2002",
      "rest": "Induction and sleep quality · Aspy, 2020",
      "induction": "Induction techniques · Tan & Fan, 2023",
      "paralysis": "Sleep paralysis · NHS guidance"
    },
    "document": "Read the full research note"
  },
  roadmap: {
    eyebrow: "Roadmap",
    title: "Building the connection.",
    lead: "Seven objectives, each with an evidence gate. A milestone is complete when its evidence exists — not when a diagram does.",
    legend: "How to read this",
    deliverable: "Deliverable",
    gate: "Evidence gate",
    items: [
      {
        id: "IS-00",
        title: "Scientific foundations",
        deliverable: "Literature, datasets, licences and experimental protocol.",
        gate: "A reproducible, documented specification.",
        note: "Specification and sources are published in this repository.",
      },
      {
        id: "IS-01 · IS-02",
        title: "Inner speech EEG experiments",
        deliverable:
          "Four-class classification of imagined Spanish words on the Nieto et al. recordings, then generalisation and artifact tests.",
        gate: "Balanced accuracy and macro-F1 on held-out subjects and sessions, with negative controls.",
        note: "No classifier has been trained.",
      },
      {
        id: "NPF-01",
        title: "Neural Privacy Firewall",
        deliverable: "A software privacy state machine that fails closed.",
        gate: "No unapproved message output under test.",
        note: "State machine and unit tests are in the repository, driven by synthetic events. Not connected to any neural signal.",
      },
      {
        id: "NPF-02",
        title: "Intent detection research",
        deliverable: "Distinguish intentional activation from private thought.",
        gate: "Separate, ethically reviewed data; false unlocks per hour.",
        note: "Requires a new protocol. No public dataset carries these labels.",
      },
      {
        id: "AI-01",
        title: "AI integration",
        deliverable: "A confirmed candidate reaches a local assistant.",
        gate: "Provenance, user permission and cancellation tests.",
        note: "Begins only once independent confirmation and cancellation exist.",
      },
      {
        id: "FB-01",
        title: "Sensory feedback",
        deliverable: "Text and speech responses; optional external tactile codes.",
        gate: "Comprehension and timing metrics.",
        note: "Screen and audio first. No neural stimulation.",
      },
      {
        id: "NET-01",
        title: "Optional Internet integration",
        deliverable: "Web queries from explicitly approved messages.",
        gate: "Least-privilege, read-only tools with confirmation.",
        note: "Secondary. It must not hide the decoder's limitations.",
      },
    ],
    hardware: {
      title: "Parallel hardware track",
      note: "The repository contains a teaching HDL module and testbench for H1; no simulator run has been recorded as evidence yet.",
      items: [
        { id: "H0", text: "Acquisition requirements: AFE, ADC, MCU." },
        { id: "H1", text: "Synthetic digital testbench." },
        { id: "H2", text: "Physical privacy-off switch and state indicator." },
        { id: "H3", text: "Commercial EEG review and bench tests." },
        { id: "H4", text: "FPGA / Verilog, only if measurements justify it." },
      ],
    },
    link: "Full research roadmap",
  },
  open: {
    eyebrow: "Open research",
    title: "Open by design.",
    lead: "NeuroLink AI is developed in public: the documentation, the reasoning, the limits and the progress.",
    text: "Read the specifications, question the assumptions, run the tests. If a claim here is not supported by a document in the repository, we want to know.",
    cta: "View on GitHub",
    links: {
      repository: { title: "Repository", text: "Source, issues and history" },
      docs: { title: "Documentation", text: "Start here, by audience" },
      firewall: { title: "Neural Privacy Firewall", text: "Specification and limits" },
      electronics: { title: "Electronics", text: "Signal chain and safety" },
      references: { title: "Research references", text: "Primary sources and datasets" },
      prototype: { title: "Privacy gate prototype", text: "Python source and tests" },
      diagrams: { title: "Engineering diagrams", text: "Editable Mermaid sources" },
      provenance: { title: "Image provenance", text: "Licences and attribution" },
    },
  },
  footer: {
    statement:
      "An independent research project. Not a medical device, and not a product. No neural decoding, human-subject test or custom hardware has been validated.",
    credits: "Photographs are third-party works shown with attribution under their Creative Commons licences.",
    creditsLink: "Photo credits and sources",
    brandLink: "Brand style guide",
    top: "Back to top",
  },
};

export type Dictionary = typeof en;
