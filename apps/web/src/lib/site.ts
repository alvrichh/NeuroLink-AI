/** Deployment base path (empty at the domain root). See next.config.ts. */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** Prefix a public asset or internal path with the deployment base path. */
export function withBase(path: string): string {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

export const logoSrc = withBase("/brand/neurolink-ai-logo.webp");

/** Optional absolute origin, used only for canonical and Open Graph URLs. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
