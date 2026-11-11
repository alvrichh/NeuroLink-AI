import type { NextConfig } from "next";

/**
 * Static export: the site is plain HTML/CSS/JS in `out/` and can be served by
 * any static host. Set NEXT_PUBLIC_BASE_PATH (e.g. "/NeuroLink-AI") when the
 * site is published under a sub-path such as GitHub Pages.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";

/**
 * Deployment origin for canonical, hreflang and social URLs. Set it explicitly
 * with NEXT_PUBLIC_SITE_URL; on Vercel it falls back to the project's
 * production domain, so a zero-configuration deploy still gets correct URLs.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  reactStrictMode: true,
  poweredByHeader: false,
  // Do not let `next dev` write an AGENTS.md into the repository.
  agentRules: false,
  images: { unoptimized: true },
  env: siteUrl ? { NEXT_PUBLIC_SITE_URL: siteUrl } : {},
};

export default nextConfig;
