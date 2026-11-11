import type { Dictionary, Locale } from "@/content";
import { repoLink } from "@/content/links";
import { Eyebrow, ExtLink, Status, stagger, type StatusKind } from "@/components/ui";

/**
 * Evidence status of each objective, in page order, taken from the repository:
 * IS-00 is documented, NPF-01 exists as a unit-tested software prototype,
 * everything else is planned. Nothing is marked complete on aspiration.
 */
const itemStatus: StatusKind[] = [
  "documented",
  "planned",
  "prototype",
  "planned",
  "planned",
  "planned",
  "optional",
];

const legend: StatusKind[] = ["documented", "prototype", "planned", "optional"];

export function Roadmap({
  t,
  common,
  status,
  locale,
}: {
  t: Dictionary["roadmap"];
  common: Dictionary["common"];
  status: Dictionary["status"];
  locale: Locale;
}) {
  return (
    <section id="roadmap" className="section roadmap" aria-labelledby="roadmap-title">
      <div className="frame">
        <div className="wrap grid gap-x-16 gap-y-12 nav:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <div className="roadmap__aside">
            <Eyebrow index={6}>{t.eyebrow}</Eyebrow>
            <h2 id="roadmap-title" className="t-title roadmap__title mt-6" data-reveal="" style={stagger(1)}>
              {t.title}
            </h2>
            <p className="t-lead mt-7" data-reveal="" style={stagger(2)}>
              {t.lead}
            </p>
            <div className="roadmap__legend" data-reveal="" style={stagger(3)}>
              <p className="t-mono uppercase tracking-[0.07em] text-muted">{t.legend}</p>
              <ul>
                {legend.map((kind) => (
                  <li key={kind}>
                    <Status kind={kind}>{status[kind]}</Status>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-8 text-[0.9375rem]" data-reveal="" style={stagger(4)}>
              <ExtLink href={repoLink("roadmap", locale)} newTab={common.newTab}>
                {t.link}
              </ExtLink>
            </p>
          </div>

          <div>
            <ol className="spine">
              {t.items.map((item, i) => {
                const kind = itemStatus[i] ?? "planned";
                return (
                  <li key={item.id} className="spine__item" data-kind={kind} data-reveal="">
                    <span className="spine__mark" aria-hidden="true">
                      <i className="status-mark" data-kind={kind} />
                    </span>
                    <div className="spine__body">
                      <p className="spine__meta">
                        <span className="t-mono spine__id">{item.id}</span>
                        <Status kind={kind}>{status[kind]}</Status>
                      </p>
                      <h3 className="spine__title">{item.title}</h3>
                      <dl className="spine__facts">
                        <div>
                          <dt>{t.deliverable}</dt>
                          <dd>{item.deliverable}</dd>
                        </div>
                        <div>
                          <dt>{t.gate}</dt>
                          <dd>{item.gate}</dd>
                        </div>
                      </dl>
                      <p className="spine__note">{item.note}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="hwtrack" data-reveal="">
              <div className="hwtrack__head">
                <h3 className="text-[1.0625rem] font-semibold tracking-[-0.02em]">{t.hardware.title}</h3>
                <Status kind="planned">{status.planned}</Status>
              </div>
              <ol>
                {t.hardware.items.map((item) => (
                  <li key={item.id}>
                    <span className="t-mono">{item.id}</span>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ol>
              <p className="t-small mt-4">{t.hardware.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
