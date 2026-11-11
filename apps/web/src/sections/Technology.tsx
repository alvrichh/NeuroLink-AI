import type { Dictionary, Locale } from "@/content";
import { refs, repoLink } from "@/content/links";
import { photos } from "@/content/media";
import { PhotoFigure } from "@/components/PhotoFigure";
import { Eyebrow, ExtLink, Status, stagger, type StatusKind } from "@/components/ui";
import { SystemChain } from "@/viz/SystemChain";

export function Technology({
  t,
  common,
  status,
  locale,
}: {
  t: Dictionary["technology"];
  common: Dictionary["common"];
  status: Dictionary["status"];
  locale: Locale;
}) {
  const specLinks = [refs.ads1299, refs.cyton, repoLink("hdl", locale)];

  return (
    <section id="technology" className="section technology" aria-labelledby="technology-title">
      <div className="frame">
        <div className="wrap">
          <Eyebrow index={4}>{t.eyebrow}</Eyebrow>
          <div className="mt-6 grid gap-x-16 gap-y-6 nav:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] nav:items-end">
            <h2 id="technology-title" className="t-title" data-reveal="" style={stagger(1)}>
              {t.title}
            </h2>
            <p className="t-lead max-w-[22em] nav:pb-2" data-reveal="" style={stagger(2)}>
              {t.lead}
            </p>
          </div>

          <div className="mt-[clamp(2.5rem,5vw,4.5rem)]" data-reveal="">
            <SystemChain copy={t} status={status} common={common} locale={locale} />
          </div>

          {/* Reference hardware */}
          <div className="mt-[clamp(4rem,8vw,7rem)] grid gap-x-14 gap-y-10 nav:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] nav:items-center">
            <div data-reveal="scale">
              <PhotoFigure
                photo={photos.openbci}
                alt={t.hardware.photoAlt}
                caption={t.hardware.photoCaption}
                labels={{
                  photograph: common.photograph,
                  source: common.source,
                  unavailable: common.imageUnavailable,
                  newTab: common.newTab,
                }}
                ratio="4 / 3"
                className="hardware__photo"
              >
                <span className="glass glass-thin hardware__chip">
                  <Status kind="reference">{status.reference}</Status>
                </span>
              </PhotoFigure>
            </div>
            <div>
              <h3 className="t-heading max-w-[13em]" data-reveal="">
                {t.hardware.title}
              </h3>
              <p className="t-body mt-5" data-reveal="" style={stagger(1)}>
                {t.hardware.text}
              </p>
              <div className="hardware__safety" data-reveal="" style={stagger(2)}>
                <h4>{t.hardware.safetyTitle}</h4>
                <p>{t.hardware.safety}</p>
                <p className="mt-3 text-[0.875rem]">
                  <ExtLink href={repoLink("safety", locale)} newTab={common.newTab}>
                    {t.hardware.safetyLink}
                  </ExtLink>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-4 md:grid-cols-3">
            {t.hardware.specs.map((spec, i) => (
              <article key={spec.name} className="specblock" data-reveal="" style={stagger(i)}>
                <header>
                  <h4 className="t-mono">{spec.name}</h4>
                  <Status kind={spec.kind as StatusKind}>{status[spec.kind as StatusKind]}</Status>
                </header>
                <dl>
                  {spec.rows.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="text-[0.8125rem]">
                  <ExtLink href={specLinks[i] ?? refs.ads1299} newTab={common.newTab}>
                    {spec.link}
                  </ExtLink>
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
