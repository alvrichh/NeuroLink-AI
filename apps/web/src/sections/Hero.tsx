import type { Dictionary } from "@/content";
import { REPO_URL } from "@/content/links";
import { HeroScroll } from "@/components/HeroScroll";
import { ArrowDown, GitHubIcon, LockIcon } from "@/components/icons";
import { HeroThreads } from "@/viz/HeroThreads";

export function Hero({ t, common }: { t: Dictionary["hero"]; common: Dictionary["common"] }) {
  const words = t.title.split(" ");
  const [labelIn, labelGate, labelOut] = t.vizLabels;

  return (
    <section id="overview" className="hero" aria-labelledby="hero-title" data-beat="0">
      <HeroScroll target="overview" />
      {/* On large screens with motion enabled this block is held in place for
          one viewport of scrolling while the illustration tells its story. */}
      <div className="hero__pin">
        <div className="frame hero__frame">
          <div className="wrap hero__content">
            <p className="t-eyebrow enter" style={{ ["--i" as string]: 0 }}>
              <span className="hero__mark" aria-hidden="true" />
              <span>
                {t.eyebrow}
                <span className="hero__eyebrow-note"> · {t.eyebrowNote}</span>
              </span>
            </p>

            <h1
              id="hero-title"
              className="t-display hero__title"
              data-long={words.length > 2}
              aria-label={t.title}
            >
              {words.map((word, i) => (
                <span key={i} aria-hidden="true">
                  <span className="mask-line">
                    <span style={{ ["--i" as string]: i }}>{word}</span>
                  </span>
                  {i < words.length - 1 ? " " : null}
                </span>
              ))}
            </h1>

            <div className="hero__stage">
              {/* Un-animated wrapper: the entrance animations inside keep their
                  fill, so the scroll fade has to happen one level up. */}
              <div className="hero__intro">
                <p className="t-lead hero__lead enter" style={{ ["--i" as string]: 4 }}>
                  {t.lead}
                </p>
                <p className="t-body hero__text enter" style={{ ["--i" as string]: 5 }}>
                  {t.text}
                </p>

                <div className="hero__cta enter" style={{ ["--i" as string]: 6 }}>
                  <a href="#vision" className="btn btn-primary">
                    {t.primary}
                    <ArrowDown className="arrow arrow-down" />
                  </a>
                  <a
                    href={REPO_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-quiet"
                    aria-label={`${t.secondary} (${common.newTab})`}
                  >
                    <GitHubIcon size={17} />
                    {t.secondary}
                  </a>
                </div>
              </div>

              <ol className="hero__beats" aria-label={t.beatsLabel}>
                {t.beats.map((beat, i) => (
                  <li key={i}>
                    <span className="hero__beat-step">
                      <b>{String(i + 1).padStart(2, "0")}</b>
                      <span aria-hidden="true" />
                      {t.vizLabels[i]}
                    </span>
                    <p className="hero__beat-text">{beat}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="hero__viz enter-fade" style={{ ["--i" as string]: 3 }} role="img" aria-label={t.vizAlt}>
          <div className="hero__viz-inner">
            <HeroThreads gateSelector=".hero__gate" />
            <div className="hero__gate glass" aria-hidden="true">
              <LockIcon size={17} className="hero__lock-closed" />
              <LockIcon size={17} open className="hero__lock-open" />
            </div>
            <span className="hero__label-gate" aria-hidden="true">
              {labelGate}
            </span>
            <div className="frame hero__labels" aria-hidden="true">
              <div className="wrap hero__labels-row">
                <span className="hero__label-in">{labelIn}</span>
                <span className="hero__label-out">{labelOut}</span>
              </div>
            </div>
            <p className="evidence-label hero__caption">
              {common.conceptual} · {common.notData}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
