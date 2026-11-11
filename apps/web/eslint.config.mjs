import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "next-env.d.ts", "src/styles/brand/**"]),
  {
    rules: {
      // The site is a static export and third-party photographs are embedded
      // from their original Wikimedia Commons URLs (see assets/SOURCES.md),
      // so next/image optimisation is neither available nor wanted.
      "@next/next/no-img-element": "off",
    },
  },
]);
