import { pageIds, pageLabels, pagePath } from "@/content/routes";
import type { Locale } from "@/content";
import { withBase } from "@/lib/site";

const summaries = {
  es: ["IS-01: resultados reales, controles y reproducción. 26,5 % de acierto equilibrado; sin evidencia de mejora sobre el azar.", "Hablar conmigo mismo o dirigirme a la IA. Qué queremos distinguir, cómo medirlo y qué sigue pendiente.", "Sueños lúcidos, percepción y experiencias simuladas: evidencia publicada, límites e hipótesis."],
  en: ["IS-01: real results, controls and reproduction. 26.5% balanced accuracy; no evidence of above-chance performance.", "Talking to myself or addressing an AI. What we aim to distinguish, how to measure it and what remains untested.", "Lucid dreams, perception and simulated experiences: published evidence, limits and hypotheses."],
};
export function ResearchPages({ locale, home = false }: { locale: Locale; home?: boolean }) {
  return <section id="explore" className="section" aria-labelledby="explore-title"><div className="frame"><div className="wrap">
    <p className="t-mono">{locale === "es" ? "Explora el proyecto" : "Explore the project"}</p>
    <h2 id="explore-title" className="t-heading mt-5">{locale === "es" ? "De las preguntas a la evidencia." : "From questions to evidence."}</h2>
    <div className="mt-7 grid gap-6 md:grid-cols-3">{pageIds.map((id, i) => <article id={home && id === "dreams" ? "dreams" : undefined} className="card p-6" key={id}>
      <h3 className="t-heading"><a className="link" href={withBase(pagePath(id, locale))}>{pageLabels[locale][id]} →</a></h3>
      <p className="t-small mt-5">{summaries[locale][i]}</p>
    </article>)}</div>
  </div></div></section>;
}
