import type { Dictionary, Locale } from "@/content";
import { REPO_URL, repoLink } from "@/content/links";
import { ArrowUpRight, GitHubIcon } from "@/components/icons";
import { Eyebrow, ThemedLogo, stagger } from "@/components/ui";
import { logo } from "@/lib/site";

type LinkKey = keyof Dictionary["open"]["links"];

export function OpenResearch({
  t,
  common,
  locale,
}: {
  t: Dictionary["open"];
  common: Dictionary["common"];
  locale: Locale;
}) {
  const targets: Record<LinkKey, string> = {
    repository: REPO_URL,
    docs: repoLink("docsHome", locale),
    firewall: repoLink("firewall", locale),
    electronics: repoLink("hardware", locale),
    references: repoLink("references", locale),
    prototype: repoLink("gateExample", locale),
    diagrams: repoLink("diagrams", locale),
    provenance: repoLink("sources", locale),
  };
  const keys = Object.keys(targets) as LinkKey[];

  return (
    <section id="open" className="section open" aria-labelledby="open-title">
      <div className="open__field" aria-hidden="true" />
      <div className="frame">
        <div className="wrap">
          <Eyebrow index={7}>{t.eyebrow}</Eyebrow>
          <h2 id="open-title" className="t-display open__title mt-6" data-reveal="" style={stagger(1)}>
            {t.title}
          </h2>

          <div className="mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-x-16 gap-y-8 nav:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <p className="t-lead max-w-[21em]" data-reveal="" style={stagger(2)}>
              {t.lead}
            </p>
            <div>
              <p className="t-body max-w-[32em]" data-reveal="" style={stagger(3)}>
                {t.text}
              </p>
              <p className="mt-7" data-reveal="" style={stagger(4)}>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  aria-label={`${t.cta} (${common.newTab})`}
                >
                  <GitHubIcon size={17} />
                  {t.cta}
                  <ArrowUpRight className="arrow" />
                </a>
              </p>
            </div>
          </div>

          <ul className="linkrows" data-reveal="">
            {keys.map((key, i) => (
              <li key={key}>
                <a href={targets[key]} target="_blank" rel="noreferrer" className="linkrow">
                  <span className="t-mono linkrow__n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="linkrow__title">{t.links[key].title}</span>
                  <span className="linkrow__text">{t.links[key].text}</span>
                  <ArrowUpRight className="linkrow__arrow" size={18} />
                  <span className="sr-only"> ({common.newTab})</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({
  footer,
  common,
  locale,
}: {
  footer: Dictionary["footer"];
  common: Dictionary["common"];
  locale: Locale;
}) {
  return (
    <footer className="footer">
      <div className="frame">
        <div className="wrap footer__inner">
          <a href="#overview" className="footer__brand" aria-label={common.home}>
            <ThemedLogo asset={logo.lockup} alt={common.logoAlt} />
          </a>
          <div className="footer__text">
            <p>{footer.statement}</p>
            <p className="mt-3">{footer.credits}</p>
            <p className="footer__links">
              <a href={repoLink("photos", locale)} target="_blank" rel="noreferrer" className="link">
                {footer.creditsLink}
                <span className="sr-only"> ({common.newTab})</span>
              </a>
              <a href={repoLink("brand", locale)} target="_blank" rel="noreferrer" className="link">
                {footer.brandLink}
                <span className="sr-only"> ({common.newTab})</span>
              </a>
              <a href="#overview" className="link">
                {footer.top}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
