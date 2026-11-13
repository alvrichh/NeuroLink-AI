import type { Locale } from "./links.ts";

export const pageIds = ["experiments", "innerSpeech", "dreams"] as const;
export type PageId = typeof pageIds[number];
export const pageSlugs: Record<Locale, Record<PageId, string>> = {
  en: { experiments: "experiments", innerSpeech: "inner-speech", dreams: "dreams" },
  es: { experiments: "experimentos", innerSpeech: "habla-interna", dreams: "suenos" },
};
export function pagePath(page: PageId, locale: Locale): string {
  return `${locale === "es" ? "/es" : ""}/${pageSlugs[locale][page]}/`;
}
export function pageFromPath(path: string): PageId | undefined {
  const slug = path.replace(/\/$/, "").split("/").pop();
  return pageIds.find((id) => Object.values(pageSlugs).some((locale) => locale[id] === slug));
}
export const pageLabels: Record<Locale, Record<PageId, string>> = {
  en: { experiments: "Experiments", innerSpeech: "Inner speech", dreams: "Dreams" },
  es: { experiments: "Experimentos", innerSpeech: "Habla interna", dreams: "Sueños" },
};
