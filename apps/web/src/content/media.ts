/**
 * Third-party photographs.
 *
 * Following the repository's media policy (assets/SOURCES.md), these files are
 * embedded from their original Wikimedia Commons URLs, unmodified apart from
 * Wikimedia's own scaled previews, and always displayed with author, licence
 * and source. No photographic bytes are committed to the repository.
 *
 * None of these photographs shows NeuroLink AI hardware, experiments or results.
 */

export type Photo = {
  src: string;
  /** Intrinsic pixel size of the embedded file, used to reserve layout space. */
  width: number;
  height: number;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
};

export const photos = {
  experiment: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Brain-computer_interface_experiment.jpg/960px-Brain-computer_interface_experiment.jpg",
    width: 960,
    height: 640,
    author: "Laurens R. Krol",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Brain-computer_interface_experiment.jpg",
  },
  cap: {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/58/EEG_Cap_on_melon.jpg",
    width: 960,
    height: 720,
    author: "Sdwilli",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:EEG_Cap_on_melon.jpg",
  },
  openbci: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Openbci-brain-computer-interface-by-omphalosskeptic.png/960px-Openbci-brain-computer-interface-by-omphalosskeptic.png",
    width: 960,
    height: 720,
    author: "Omphalosskeptic",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Openbci-brain-computer-interface-by-omphalosskeptic.png",
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
