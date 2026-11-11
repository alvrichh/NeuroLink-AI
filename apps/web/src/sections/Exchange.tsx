import type { Dictionary, Locale } from "@/content";
import { refs, repoLink } from "@/content/links";
import { Eyebrow, ExtLink, Sentences, Status, stagger, type StatusKind } from "@/components/ui";
import { ExchangeDiagram } from "@/viz/ExchangeDiagram";

export function Exchange({
  t,
  common,
  status,
  locale,
}: {
  t: Dictionary["exchange"];
  common: Dictionary["common"];
  status: Dictionary["status"];
  locale: Locale;
}) {
  return (
    <section id="exchange" className="section" aria-labelledby="exchange-title">
      <div className="frame">
        <div className="wrap">
          <div className="max-w-[54rem]">
            <Eyebrow index={5}>{t.eyebrow}</Eyebrow>
            <h2 id="exchange-title" className="t-title mt-6" data-reveal="" style={stagger(1)}>
              <Sentences text={t.title} />
            </h2>
            <p className="t-lead mt-7 max-w-[26em]" data-reveal="" style={stagger(2)}>
              {t.lead}
            </p>
          </div>

          <div className="exchange__panel" data-reveal="scale">
            <p className="evidence-label exchange__label">{common.conceptual}</p>
            <ExchangeDiagram copy={t} />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <article className="card exchange__card exchange__card--out" data-reveal="">
              <p className="exchange__tag exchange__tag--out">
                <span className="exchange__stroke exchange__stroke--dashed" aria-hidden="true" />
                {t.out.tag}
              </p>
              <h3 className="t-heading mt-5">{t.out.title}</h3>
              <p className="t-body mt-4">{t.out.text}</p>
              <ol className="levels">
                {t.out.steps.map((step, i) => (
                  <li key={step.name}>
                    <span className="t-mono levels__n">{i + 1}</span>
                    <div>
                      <p className="levels__name">{step.name}</p>
                      <p className="t-small mt-1">{step.text}</p>
                    </div>
                    <Status kind={step.status as StatusKind} className="levels__status">
                      {status[step.status as StatusKind]}
                    </Status>
                  </li>
                ))}
              </ol>
            </article>

            <article className="card exchange__card" data-reveal="" style={stagger(1)}>
              <p className="exchange__tag">
                <span className="exchange__stroke" aria-hidden="true" />
                {t.back.tag}
              </p>
              <h3 className="t-heading mt-5">{t.back.title}</h3>
              <p className="t-body mt-4">{t.back.text}</p>
              <ol className="levels">
                {t.back.levels.map((level, i) => (
                  <li key={level.name}>
                    <span className="t-mono levels__n">{i + 1}</span>
                    <div>
                      <p className="levels__name">{level.name}</p>
                      <p className="t-small mt-1">{level.text}</p>
                    </div>
                    <Status kind={level.status as StatusKind} className="levels__status">
                      {status[level.status as StatusKind]}
                    </Status>
                  </li>
                ))}
              </ol>
            </article>
          </div>

          <figure className="exchange__statement" data-reveal="">
            <blockquote>{t.statement}</blockquote>
            <figcaption>
              <p>{t.statementNote}</p>
              <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[0.875rem]">
                <ExtLink href={refs.nihTouch} newTab={common.newTab}>
                  {t.statementCite}
                </ExtLink>
                <ExtLink href={repoLink("phase2", locale)} newTab={common.newTab}>
                  {common.readMore}
                </ExtLink>
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
