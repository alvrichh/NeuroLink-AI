import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { ReactNode } from "react";
import { getDictionary, localePath, locales, type Locale } from "@/content";
import { icons, logoOnWhite, siteUrl, withBase } from "@/lib/site";
import { THEME_COLORS, themeBootstrap } from "@/lib/themeConfig";
import { brand } from "@/styles/brand/tokens";
import { Navigation } from "./Navigation";
import { RevealObserver } from "./RevealObserver";
import "@/styles/globals.css";

/**
 * Runs before first paint. Motion is enabled only when the visitor has not
 * asked for reduced motion and the URL does not carry `?still` (a switch for
 * full-page captures, where scroll-triggered reveals would never fire).
 */
const motionBootstrap = `(function(){try{var d=document.documentElement;var still=/[?&]still\\b/.test(location.search);var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;d.dataset.motion=(still||reduce)?'off':'on';}catch(e){}})();`;

export const viewport: Viewport = {
  themeColor: THEME_COLORS.light,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function buildMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title: t.meta.title,
    description: t.meta.description,
    applicationName: brand.name,
    icons: {
      icon: [
        { url: icons.favicon, sizes: "48x48" },
        { url: icons.png32, type: "image/png", sizes: "32x32" },
        { url: icons.png192, type: "image/png", sizes: "192x192" },
      ],
      apple: [{ url: icons.apple, sizes: "180x180" }],
    },
    manifest: withBase("/manifest.webmanifest"),
    // Canonical and hreflang must be absolute URLs, so they are emitted only
    // when the deployment origin is known (NEXT_PUBLIC_SITE_URL).
    alternates: siteUrl
      ? {
          canonical: withBase(localePath(locale)),
          languages: {
            ...Object.fromEntries(locales.map((code) => [code, withBase(localePath(code))])),
            "x-default": withBase(localePath("en")),
          },
        }
      : undefined,
    openGraph: {
      type: "website",
      siteName: brand.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: locale === "es" ? "es_ES" : "en_US",
      // An absolute URL is required for social previews; only emit it when the
      // deployment origin is known (NEXT_PUBLIC_SITE_URL).
      ...(siteUrl
        ? {
            images: [
              {
                url: logoOnWhite.src,
                width: logoOnWhite.width,
                height: logoOnWhite.height,
                alt: t.common.logoAlt,
              },
            ],
          }
        : {}),
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
  };
}

/** The <html> document shared by every locale's root layout. */
export function SiteDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getDictionary(locale);
  return (
    <html lang={locale} className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap + motionBootstrap }} />
        <a className="skip-link" href="#main">
          {t.common.skip}
        </a>
        <Navigation locale={locale} labels={t.nav} common={t.common} />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
