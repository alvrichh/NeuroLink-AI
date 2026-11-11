import { brand } from "@/styles/brand/tokens";

/** Deployment base path (empty at the domain root). See next.config.ts. */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** Prefix a public asset or internal path with the deployment base path. */
export function withBase(path: string): string {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

type BrandAsset = { src: string; width: number; height: number };

function asset(entry: { file: string; width: number; height: number }): BrandAsset {
  return { src: withBase(`/brand/${entry.file}`), width: entry.width, height: entry.height };
}

/** The official logo, in the forms the brand provides. Never redrawn or recoloured. */
export const logo = {
  /** Brain-and-orbit mark on its own. */
  symbol: asset(brand.assets.symbol),
  /** "NeuroLink AI" lettering on its own. */
  wordmark: asset(brand.assets.wordmark),
  /** Full logo: symbol, wordmark and the "Brain · Privacy · AI" line. */
  lockup: asset(brand.assets.lockup),
} as const;

/** Favicon and app icons: the symbol on a white tile (see /assets/branding/icons). */
export const icons = {
  favicon: withBase("/favicon.ico"),
  png32: withBase("/brand/icons/icon-32.png"),
  png192: withBase("/brand/icons/icon-192.png"),
  png512: withBase("/brand/icons/icon-512.png"),
  apple: withBase("/brand/icons/apple-touch-icon.png"),
} as const;

/** Optional absolute origin, used only for canonical and Open Graph URLs. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
