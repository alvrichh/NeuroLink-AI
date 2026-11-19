import type { Dictionary, Locale } from "@/content";
import { refs, repoLink } from "@/content/links";
import { Eyebrow, ExtLink, Status, stagger } from "@/components/ui";
import { withBase } from "@/lib/site";

/** Natural size of the cropped product photograph in /public/partners. */
const PHOTO = { src: "/partners/prometeo-tiara.webp", width: 970, height: 789 };

/**
 * Prometeo Tiara — an EEG headband by Anticipation Technology, a possible
 * hardware partner. Everything here is described as shown by its maker; it has
 * not been tested by NeuroLink AI, and the collaboration is not yet agreed.
 */
export function Tiara({
  t,
  common,
  status,
  locale,
}: {
  t: Dictionary["tiara"];
  common: Dictionary["common"];
  status: Dictionary["status"];
  locale: Locale;
}) {
  return (
    <section id="tiara" className="section tiara" aria-labelledby="tiara-title">
      <div className="frame">
        <div className="wrap">
          <div className="tiara__intro">
            <div>
              <Eyebrow index={5}>{t.eyebrow}</Eyebrow>
              <h2 id="tiara-title" className="t-title mt-6" data-reveal="" style={stagger(1)}>
                {t.title}
              </h2>
              <p className="t-lead mt-7 max-w-[24em]" data-reveal="" style={stagger(2)}>
                {t.lead}
              </p>
              <p className="tiara__status" data-reveal="" style={stagger(3)}>
                <span className="tiara__pulse" aria-hidden="true" />
                {t.statusLabel}
                <span aria-hidden="true">·</span>
                <ExtLink href={refs.anticipation} newTab={common.newTab}>
                  {t.site}
                </ExtLink>
              </p>
            </div>

            <figure className="tiara__photo" data-reveal="scale">
              <div className="tiara__frame">
                <img
                  src={withBase(PHOTO.src)}
                  alt={t.photoAlt}
                  width={PHOTO.width}
                  height={PHOTO.height}
                  loading="lazy"
                  decoding="async"
                />
                <span className="glass glass-thin tiara__chip">
                  <Status kind="reference">{status.reference}</Status>
                </span>
              </div>
              <figcaption className="photo__caption">
                <span className="photo__credit">
                  <span className="photo__kind">{common.photograph}</span>
                </span>
                <span className="photo__note">{t.photoCaption}</span>
              </figcaption>
            </figure>
          </div>

          <div className="tiara__grid">
            <article className="specblock tiara__spec" data-reveal="">
              <header>
                <h3 className="t-mono">{t.specTitle}</h3>
                <Status kind="reference">{status.reference}</Status>
              </header>
              <dl>
                {t.specs.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </article>

            <article className="card tiara__demos" data-reveal="" style={stagger(1)}>
              <h3 className="rcard__title">{t.demosTitle}</h3>
              <ol>
                {t.demos.map((demo, i) => (
                  <li key={demo.title}>
                    <span className="t-mono">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="tiara__demo-title">{demo.title}</p>
                      <p className="t-small mt-1">{demo.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="tiara__note">{t.demosNote}</p>
            </article>
          </div>

          <div className="tiara__fit" data-reveal="">
            <div className="tiara__fit-head">
              <h3 className="t-heading">{t.fitTitle}</h3>
              <p className="t-body max-w-[34em]">{t.fitText}</p>
            </div>
            <ol className="tiara__flow">
              {t.fitSteps.map((step, i) => (
                <li key={step.label} data-partner={i === 0}>
                  <span className="t-mono tiara__owner">{step.owner}</span>
                  <span className="tiara__step">{step.label}</span>
                  <span className="t-small">{step.detail}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="tiara__limits">
            <div data-reveal="">
              <h3 className="t-heading">{t.honestTitle}</h3>
              <ul className="layers">
                {t.honest.map((text, i) => (
                  <li key={i}>
                    <span className="t-mono">{String(i + 1).padStart(2, "0")}</span>
                    <p>{text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hardware__safety" data-reveal="" style={stagger(1)}>
              <h4>{t.safetyTitle}</h4>
              <p>{t.safety}</p>
              <p className="mt-3 text-[0.875rem]">
                <ExtLink href={repoLink("safety", locale)} newTab={common.newTab}>
                  {t.safetyLink}
                </ExtLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
