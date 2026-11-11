import type { MetadataRoute } from "next";
import { icons, withBase } from "@/lib/site";
import { brand } from "@/styles/brand/tokens";

export const dynamic = "force-static";

/** Web app manifest: name and icons for "add to home screen" and browser UI. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: brand.name,
    description:
      "Open research into voluntary communication between inner speech and AI, with mental privacy at its core.",
    start_url: withBase("/"),
    display: "browser",
    background_color: brand.hex.white,
    theme_color: brand.hex.white,
    icons: [
      { src: icons.png192, sizes: "192x192", type: "image/png" },
      { src: icons.png512, sizes: "512x512", type: "image/png" },
    ],
  };
}
