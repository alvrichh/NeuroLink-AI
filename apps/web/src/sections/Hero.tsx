import type { Dictionary } from "@/content";
import { REPO_URL } from "@/content/links";
import { ArrowDown, GitHubIcon, LockIcon } from "@/components/icons";
import { HeroThreads } from "@/viz/HeroThreads";

export function Hero({ t, common }: { t: Dictionary["hero"]; common: Dictionary["common"] }) {
  const words = t.title.split(" ");
  const [labelIn, labelGate, labelOut] = t.vizLabels;

  return (
    <section id="overview" className="hero" aria-labelledby="hero-title">
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
      </div>

      <div className="hero__viz enter-fade" style={{ ["--i" as string]: 3 }} role="img" aria-label={t.vizAlt}>
        <div className="hero__viz-inner">
          <HeroThreads gateSelector=".hero__gate" />
          <div className="hero__gate glass" aria-hidden="true">
            <LockIcon size={17} />
          </div>
          <span className="hero__label-gate" aria-hidden="true">
            {labelGate}
          </span>
          <div className="frame hero__labels" aria-hidden="true">
            <div className="wrap hero__labels-row">
              <span>{labelIn}</span>
              <span>{labelOut}</span>
            </div>
          </div>
          <p className="evidence-label hero__caption">
            {common.conceptual} · {common.notData}
          </p>
        </div>
      </div>
    </section>
  );
}
