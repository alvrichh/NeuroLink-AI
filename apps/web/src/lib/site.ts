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

/** A logo form in its two versions: for light and for dark backgrounds. */
export type ThemedAsset = { light: BrandAsset; dark: BrandAsset };

/**
 * The official logo, in the forms the brand provides. The site uses the
 * transparent files, so the logo sits directly on tinted or translucent
 * surfaces: navy lettering on light backgrounds, white lettering on dark ones.
 */
export const logo = {
  /** Brain-and-orbit mark on its own. One file works on any background. */
  symbol: { light: asset(brand.assets.symbolClear), dark: asset(brand.assets.symbolClear) },
  /** "NeuroLink AI" lettering on its own. */
  wordmark: { light: asset(brand.assets.wordmarkClear), dark: asset(brand.assets.wordmarkDark) },
  /** Full logo: symbol, wordmark and the "Brain · Privacy · AI" line. */
  lockup: { light: asset(brand.assets.lockupClear), dark: asset(brand.assets.lockupDark) },
} as const satisfies Record<string, ThemedAsset>;

/** The full logo on its white background, for link previews. */
export const logoOnWhite = asset(brand.assets.lockup);

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
