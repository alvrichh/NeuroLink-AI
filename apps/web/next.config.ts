import type { NextConfig } from "next";

/**
 * Static export: the site is plain HTML/CSS/JS in `out/` and can be served by
 * any static host. Set NEXT_PUBLIC_BASE_PATH (e.g. "/NeuroLink-AI") when the
 * site is published under a sub-path such as GitHub Pages.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
