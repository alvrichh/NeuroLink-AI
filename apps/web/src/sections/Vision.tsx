import type { Dictionary, Locale } from "@/content";
import { repoLink } from "@/content/links";
import { Eyebrow, ExtLink, Status, stagger } from "@/components/ui";
import { VisionSequence } from "@/viz/VisionSequence";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

/** Schematic of a row/column speller. An interface mock-up, not a recording. */
function SpellerMatrix({ label }: { label: string }) {
  return (
    <div className="speller" role="img" aria-label={label}>
      {letters.map((char, i) => {
        const row = Math.floor(i / 6);
        const col = i % 6;
        return (
          <span key={char} data-row={row === 2} data-col={col === 3} data-hit={row === 2 && col === 3}>
            {char}
          </span>
        );
      })}
    </div>
  );
}

export function Vision({
  t,
  common,
  status,
  locale,
}: {
  t: Dictionary["vision"];
  common: Dictionary["common"];
  status: Dictionary["status"];
  locale: Locale;
}) {
  return (
    <section id="vision" className="section" aria-labelledby="vision-title">
      <div className="frame">
        <div className="wrap">
          {/* Same pattern as the roadmap: the heading stays in place on wide
              screens while the argument scrolls past beside it. */}
          <div className="vision__split">
            <div className="vision__aside">
              <Eyebrow index={1}>{t.eyebrow}</Eyebrow>
              <h2 id="vision-title" className="t-title vision__title mt-6" data-reveal="" style={stagger(1)}>
                {t.title}
              </h2>
              <p className="vision__statement" data-reveal="" style={stagger(2)}>
                {t.statement}
              </p>
            </div>

            <div className="vision__flow">
              <div className="vision__copy">
                {t.paragraphs.map((text, i) => (
                  <p key={i} className="t-body text-[1.125rem]" data-reveal="" style={stagger(i + 1)}>
                    {text}
                  </p>
                ))}
              </div>

              <div className="vision__cards">
                <article className="card-soft vision__not" data-reveal="">
                  <Status kind="reference">{t.contrast.not.tag}</Status>
                  <SpellerMatrix label={t.contrast.not.figure} />
                  <div>
                    <h3 className="text-[1.125rem] font-semibold tracking-[-0.02em]">{t.contrast.not.title}</h3>
                    <p className="t-small mt-2">{t.contrast.not.text}</p>
                    <p className="mt-3 text-[0.8125rem]">
                      <ExtLink href={repoLink("p300", locale)} newTab={common.newTab}>
                        {common.readMore}
                      </ExtLink>
                    </p>
                  </div>
                </article>

                <article className="card vision__yes" data-reveal="" style={stagger(1)}>
                  <span className="vision__yes-glow" aria-hidden="true" />
                  <Status kind="question">{t.contrast.yes.tag}</Status>
                  <blockquote className="vision__quote">
                    <span aria-hidden="true">“</span>
                    {t.contrast.yes.quote}
                    <span aria-hidden="true">”</span>
                  </blockquote>
                  <div className="max-w-[30em]">
                    <h3 className="text-[1.125rem] font-semibold tracking-[-0.02em]">{t.contrast.yes.title}</h3>
                    <p className="t-small mt-2">{t.contrast.yes.text}</p>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div className="vision__sequence" data-reveal="">
            <VisionSequence copy={t.sequence} conceptual={`${common.conceptual} · ${status.planned}`} />
          </div>
        </div>
      </div>
    </section>
  );
}
