import { getDictionary, type Locale } from "@/content";
import { Dreams } from "@/sections/Dreams";
import { Exchange } from "@/sections/Exchange";
import { Hero } from "@/sections/Hero";
import { OpenResearch, SiteFooter } from "@/sections/OpenResearch";
import { Privacy } from "@/sections/Privacy";
import { Research } from "@/sections/Research";
import { Roadmap } from "@/sections/Roadmap";
import { Technology } from "@/sections/Technology";
import { Vision } from "@/sections/Vision";

/** The single page of the site, rendered once per locale. */
export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const shared = { common: t.common, status: t.status, locale };
  return (
    <>
      <main id="main">
      <Hero t={t.hero} common={t.common} />
      <Vision t={t.vision} {...shared} />
      <Privacy t={t.privacy} common={t.common} locale={locale} />
      <Research t={t.research} {...shared} />
      <Technology t={t.technology} {...shared} />
      <Exchange t={t.exchange} {...shared} />
      <Dreams t={t.dreams} common={t.common} locale={locale} />
      <Roadmap t={t.roadmap} {...shared} />
      <OpenResearch t={t.open} common={t.common} locale={locale} />
    </main>
    <SiteFooter footer={t.footer} common={t.common} locale={locale} />
    </>
  );
}
