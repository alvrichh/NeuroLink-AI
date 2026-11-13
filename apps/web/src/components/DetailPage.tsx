import { getDictionary, localePath, type Locale } from "@/content";
import { articles } from "@/content/pages";
import { pageLabels, type PageId } from "@/content/routes";
import { repoLink, REPO_URL } from "@/content/links";
import { withBase } from "@/lib/site";
import { Dreams } from "@/sections/Dreams";
import { SiteFooter } from "@/sections/OpenResearch";
import { ResearchPages } from "./ResearchPages";
import { ExtLink } from "./ui";

export function DetailPage({ locale, page }: { locale: Locale; page: PageId }) {
  const t = getDictionary(locale);
  const article = articles[locale][page];
  const es = locale === "es";
  return <>
    <main id="main">
      <article className="section research-article" aria-labelledby="article-title"><div className="frame"><div className="wrap">
        <nav aria-label={es ? "Ruta de navegación" : "Breadcrumb"} className="t-small"><a className="link" href={withBase(localePath(locale))}>{es ? "Inicio" : "Home"}</a> / {pageLabels[locale][page]}</nav>
        <p className="t-mono mt-10">{article.tag}</p>
        <h1 id="article-title" className="t-title mt-5 max-w-[16em]">{article.title}</h1>
        <p className="t-lead mt-7 max-w-[32em]">{article.lead}</p>
        <p className="t-small mt-5"><time dateTime="2026-11-13">{es ? "Actualizado: 13 de noviembre de 2026" : "Updated: 13 November 2026"}</time></p>
        {article.rows.length > 0 ? <div className="article-table mt-10"><table>
          <caption>{es ? "Resumen" : "Summary"} · {article.tag}</caption>
          <thead><tr>{article.columns.map((c) => <th scope="col" key={c}>{c}</th>)}</tr></thead>
          <tbody>{article.rows.map((row) => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th scope="row" key={i}>{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody>
        </table></div> : null}
        <div className="article-sections">{article.sections.map((section) => <section key={section.title}>
          <h2 className="t-heading">{section.title}</h2><p className="t-body mt-5">{section.text}</p>
        </section>)}</div>
        {page !== "dreams" ? <aside className="mt-10" aria-label={es ? "Fuentes y métodos" : "Sources and methods"}>
          <h2 className="t-heading">{es ? "Fuentes y métodos" : "Sources and methods"}</h2>
          <ul className="mt-5 space-y-4">
            <li><ExtLink href={repoLink("protocol", locale)} newTab={t.common.newTab}>{es ? "Protocolo completo IS-01 / NPF-02" : "Full IS-01 / NPF-02 protocol"}</ExtLink></li>
            <li><ExtLink href={`${REPO_URL}/blob/main/experiments/is01/reports/pilot-sub01.md`} newTab={t.common.newTab}>{es ? "Informe del piloto y limitaciones (inglés)" : "Pilot report and limitations"}</ExtLink></li>
            <li><ExtLink href={`${REPO_URL}/blob/main/experiments/is01/README.md`} newTab={t.common.newTab}>{es ? "Métodos, datos y reproducción (inglés)" : "Methods, data and reproduction"}</ExtLink></li>
            {page === "innerSpeech" ? <li><ExtLink href="https://pubmed.ncbi.nlm.nih.gov/26011789/" newTab={t.common.newTab}>{es ? "Revisión sobre habla interna · Alderson-Day y Fernyhough" : "Inner speech review · Alderson-Day and Fernyhough"}</ExtLink></li> : null}
          </ul>
        </aside> : null}
      </div></div></article>
      {page === "dreams" ? <Dreams t={t.dreams} common={t.common} locale={locale} /> : null}
      <ResearchPages locale={locale} />
    </main>
    <SiteFooter footer={t.footer} common={t.common} locale={locale} />
  </>;
}
