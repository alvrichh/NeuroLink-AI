import type { Dictionary, Locale } from "@/content";
import { dreamRefs, repoLink } from "@/content/links";
import { Eyebrow, ExtLink } from "@/components/ui";

type QuestionKey = keyof Dictionary["dreams"]["questions"];
const questionRefs = {
  lucidity: "neural",
  body: "body",
  rest: "rest",
  learning: "induction",
} as const satisfies Record<QuestionKey, keyof typeof dreamRefs>;
const evidenceRefs = [dreamRefs.dialogue, dreamRefs.incubation] as const;

/** Literature note: static content and native disclosures, no dream simulation. */
export function Dreams({ t, common, locale }: {
  t: Dictionary["dreams"];
  common: Dictionary["common"];
  locale: Locale;
}) {
  return (
    <section id="dreams" className="section" aria-labelledby="dreams-title">
      <div className="frame">
        <div className="wrap">
          <Eyebrow index={6}>{t.eyebrow}</Eyebrow>
          <div className="dreams__intro">
            <div>
              <h2 id="dreams-title" className="t-title max-w-[12em]">{t.title}</h2>
              <p className="t-lead mt-7 max-w-[27em]">{t.lead}</p>
            </div>
            <div className="space-y-5">
              <p className="t-body">{t.intro}</p>
              <p className="t-small"><time dateTime="2026-11-12">{t.reviewed}</time></p>
              <p className="dreams__scope">{t.scope}</p>
            </div>
          </div>

          <h3 className="t-heading mt-12">{t.evidenceTitle}</h3>
          <div className="dreams__evidence">
            {t.evidence.map((card, i) => {
              const source = evidenceRefs[i];
              return (
                <article className="card dreams__card" key={card.title}>
                  <p className="dreams__label">{card.label}</p>
                  <h4 className="rcard__title">{card.title}</h4>
                  <p className="t-small text-body">{card.text}</p>
                  <p className="dreams__cite">
                    {source ? (
                      <ExtLink href={source} newTab={common.newTab}>{card.source}</ExtLink>
                    ) : (
                      <a className="link" href="#dreams-sources">{card.source}</a>
                    )}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="dreams__reading">
            <div>
              <h3 className="t-heading">{t.articleTitle}</h3>
              <p className="t-small mt-3">{t.articleHint}</p>
              <p className="t-small mt-5">
                <ExtLink href={repoLink("dreams", locale)} newTab={common.newTab}>{t.document}</ExtLink>
              </p>
            </div>
            <div className="dreams__questions">
              {(Object.keys(questionRefs) as QuestionKey[]).map((key) => {
                const question = t.questions[key];
                return (
                  <details className="dreams__question" key={key}>
                    <summary>{question.title}</summary>
                    <div className="dreams__answer">
                      {question.paragraphs.map((paragraph) => <p className="t-body" key={paragraph}>{paragraph}</p>)}
                      <p className="t-small">
                        <ExtLink href={dreamRefs[questionRefs[key]]} newTab={common.newTab}>{question.source}</ExtLink>
                        {key === "body" || key === "rest" || key === "learning" ? (
                          <> · <ExtLink href={dreamRefs.paralysis} newTab={common.newTab}>{t.sources.paralysis}</ExtLink></>
                        ) : null}
                      </p>
                    </div>
                  </details>
                );
              })}
            </div>
          </div>

          <aside className="card-soft dreams__future" aria-labelledby="dreams-future-title">
            <h3 id="dreams-future-title" className="t-heading">{t.futureTitle}</h3>
            <p className="t-body">{t.future}</p>
            <p className="t-small">{t.privacy}</p>
          </aside>

          <div id="dreams-sources" className="dreams__sources">
            <h3 className="t-heading">{t.sourcesTitle}</h3>
            <ul>
              {(Object.keys(dreamRefs) as Array<keyof typeof dreamRefs>).map((key) => (
                <li key={key}><ExtLink href={dreamRefs[key]} newTab={common.newTab}>{t.sources[key]}</ExtLink></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
