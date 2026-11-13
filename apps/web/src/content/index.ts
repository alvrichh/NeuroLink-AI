import { en, type Dictionary } from "./en.ts";
import { es } from "./es.ts";
import type { Locale } from "./links.ts";

export type { Dictionary, Locale };

export const locales = ["en", "es"] as const satisfies readonly Locale[];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Dictionary> = { en, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Section anchors, in page order. Shared by navigation and scroll tracking. */
export const sectionIds = [
  "overview",
  "vision",
  "privacy",
  "research",
  "technology",
  "exchange",
  "dreams",
  "roadmap",
  "open",
] as const;

export type SectionId = (typeof sectionIds)[number];

/** Path of a locale's home page, without the deployment base path. */
export function localePath(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}/`;
}
