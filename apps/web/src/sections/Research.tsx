import type { Dictionary, Locale } from "@/content";
import { refs, repoLink, type RefKey } from "@/content/links";
import { photos } from "@/content/media";
import { PhotoFigure } from "@/components/PhotoFigure";
import { Eyebrow, ExtLink, Status, stagger, type StatusKind } from "@/components/ui";

type CardKey = keyof Dictionary["research"]["cards"];

/** Milestone, evidence status and primary citation for each research line. */
const cardMeta: Record<CardKey, { id: string; kind: StatusKind; ref: RefKey }> = {
  decoding: { id: "IS-01", kind: "pilot", ref: "nieto" },
  acquisition: { id: "H0", kind: "reference", ref: "openbciHardware" },
  processing: { id: "IS-01", kind: "pilot", ref: "mne" },
  classification: { id: "IS-02", kind: "planned", ref: "moabbNieto" },
  intent: { id: "NPF-02", kind: "question", ref: "kunz" },
  privacy: { id: "NPF-01", kind: "prototype", ref: "unesco" },
};

const tableRefs: RefKey[] = ["nieto", "wairagkar", "tang", "nihTouch"];

export function Research({
  t,
  common,
  status,
  locale,
}: {
  t: Dictionary["research"];
  common: Dictionary["common"];
  status: Dictionary["status"];
  locale: Locale;
}) {
  const photoLabels = {
    photograph: common.photograph,
    source: common.source,
    unavailable: common.imageUnavailable,
    newTab: common.newTab,
  };

  const meta = (k: CardKey) => (
    <p className="rcard__meta">
      <span className="t-mono rcard__id">{cardMeta[k].id}</span>
      <Status kind={cardMeta[k].kind}>{status[cardMeta[k].kind]}</Status>
    </p>
  );

  const cite = (k: CardKey) => (
    <p className="rcard__cite">
      <span>{t.basedOn}</span>
      <ExtLink href={refs[cardMeta[k].ref]} newTab={common.newTab}>
        {t.cards[k].cite}
      </ExtLink>
    </p>
  );

  return (
    <section id="research" className="section" aria-labelledby="research-title">
      <div className="frame">
        <div className="wrap">
          <div className="grid gap-x-16 gap-y-10 nav:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] nav:items-end">
            <div>
              <Eyebrow index={3}>{t.eyebrow}</Eyebrow>
              <h2 id="research-title" className="t-title mt-6 max-w-[9.5em]" data-reveal="" style={stagger(1)}>
                {t.title}
              </h2>
              <p className="t-lead mt-7 max-w-[23em]" data-reveal="" style={stagger(2)}>
                {t.lead}
              </p>
            </div>
            <p className="research__notice" data-reveal="" style={stagger(2)}>
              {t.notice}
            </p>
          </div>

          <div className="research__grid">
            {/* Feature: inner speech decoding */}
            <article className="card rcard rcard--feature" data-reveal="">
              <PhotoFigure
                photo={photos.experiment}
                alt={t.photos.experiment.alt}
                caption={t.photos.experiment.caption}
                labels={photoLabels}
                ratio="16 / 9"
                focus="50% 30%"
              />
              <div className="rcard__body">
                {meta("decoding")}
                <h3 className="t-heading">{t.cards.decoding.title}</h3>
                <p className="t-body">{t.cards.decoding.text}</p>
                <dl className="facts">
                  {t.cards.decoding.facts.map((fact) => (
                    <div key={fact.label}>
                      <dd>{fact.value}</dd>
                      <dt>{fact.label}</dt>
                    </div>
                  ))}
                </dl>
                <p className="t-small">{t.cards.decoding.factsNote}</p>
                {cite("decoding")}
              </div>
            </article>

            {/* Acquisition, with photograph */}
            <article className="card rcard rcard--photo" data-reveal="" style={stagger(1)}>
              <PhotoFigure
                photo={photos.cap}
                alt={t.photos.cap.alt}
                caption={t.photos.cap.caption}
                labels={photoLabels}
                ratio="4 / 3"
              />
              <div className="rcard__body">
                {meta("acquisition")}
                <h3 className="rcard__title">{t.cards.acquisition.title}</h3>
                <p className="t-small text-body">{t.cards.acquisition.text}</p>
                {cite("acquisition")}
              </div>
            </article>

            {/* Minimal cards */}
            {(["processing", "classification", "intent"] as const).map((k, i) => (
              <article key={k} className="rcard rcard--minimal" data-reveal="" style={stagger(i)}>
                {meta(k)}
                <h3 className="rcard__title">{t.cards[k].title}</h3>
                <p className="t-small text-body">{t.cards[k].text}</p>
                {cite(k)}
              </article>
            ))}

            {/* Wide: the one implemented component */}
            <article className="card-soft rcard rcard--wide" data-reveal="">
              <div>
                {meta("privacy")}
                <h3 className="t-heading mt-4">{t.cards.privacy.title}</h3>
              </div>
              <div className="space-y-4">
                <p className="t-body">{t.cards.privacy.text}</p>
                {cite("privacy")}
                <p className="text-[0.875rem]">
                  <ExtLink href={repoLink("gateExample", locale)} newTab={common.newTab}>
                    {t.cards.privacy.code}
                  </ExtLink>
                </p>
              </div>
            </article>
          </div>

          {/* Evidence table */}
          <div className="mt-[clamp(4rem,8vw,7rem)]">
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4" data-reveal="">
              <div>
                <h3 className="t-heading">{t.table.title}</h3>
                <p className="t-small mt-3 max-w-[36em]">{t.table.lead}</p>
              </div>
              <p className="text-[0.875rem]">
                <ExtLink href={repoLink("science", locale)} newTab={common.newTab}>
                  {t.table.more}
                </ExtLink>
              </p>
            </div>

            <div className="etable" role="table" aria-label={t.table.title} data-reveal="">
              <div className="etable__head" role="row">
                {t.table.columns.map((column) => (
                  <span key={column} role="columnheader">
                    {column}
                  </span>
                ))}
              </div>
              {t.table.rows.map((row, i) => (
                <div className="etable__row" role="row" key={row.approach}>
                  <div role="cell">
                    <p className="etable__approach">{row.approach}</p>
                    <p className="mt-1.5 text-[0.8125rem]">
                      <ExtLink href={refs[tableRefs[i] ?? "nieto"]} newTab={common.newTab}>
                        {row.cite}
                      </ExtLink>
                    </p>
                  </div>
                  <p role="cell" data-label={t.table.columns[1]}>
                    {row.shown}
                  </p>
                  <p role="cell" data-label={t.table.columns[2]} className="etable__limit">
                    {row.limit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
