import type { Dictionary, Locale } from "@/content";
import { refs, repoLink } from "@/content/links";
import { Eyebrow, ExtLink, Sentences, Status, stagger } from "@/components/ui";
import { FirewallSimulation } from "@/viz/FirewallSimulation";

export function Privacy({
  t,
  common,
  locale,
}: {
  t: Dictionary["privacy"];
  common: Dictionary["common"];
  locale: Locale;
}) {
  return (
    <section id="privacy" className="section privacy" aria-labelledby="privacy-title">
      <div className="frame">
        <div className="wrap">
          <div className="privacy__intro">
            <Eyebrow index={2}>{t.eyebrow}</Eyebrow>
            <h2 id="privacy-title" className="t-title mt-6" data-reveal="" style={stagger(1)}>
              <Sentences text={t.title} />
            </h2>
            <p className="t-lead mt-7 max-w-[24em]" data-reveal="" style={stagger(2)}>
              {t.lead}
            </p>
          </div>

          <div className="mt-10 grid gap-x-12 gap-y-5 md:grid-cols-2">
            {t.paragraphs.map((text, i) => (
              <p key={i} className="t-body text-[1.125rem]" data-reveal="" style={stagger(i)}>
                {text}
              </p>
            ))}
          </div>

          <div id="inner-speech-intent" className="mt-10" aria-labelledby="intent-title">
            <h3 id="intent-title" className="t-heading">{t.intent.title}</h3>
            <p className="t-body mt-5 max-w-[65ch]">{t.intent.intro}</p>
            <ul className="mt-7 grid gap-6 md:grid-cols-3">
              {t.intent.items.map((item) => (
                <li key={item} className="t-body">{item}</li>
              ))}
            </ul>
            <p className="t-small mt-7 max-w-[75ch]">{t.intent.status}</p>
            <p className="t-small mt-3 max-w-[75ch]">{t.intent.limit}</p>
            <p className="mt-5">
              <ExtLink href={`${repoLink("protocol", locale)}#npf-02`} newTab={common.newTab}>
                {t.intent.link}
              </ExtLink>
            </p>
          </div>

          <div className="mt-[clamp(2.5rem,5vw,4.5rem)]" data-reveal="scale">
            <FirewallSimulation copy={t.sim} codeHref={repoLink("gateCode", locale)} newTab={common.newTab} />
          </div>

          <div className="mt-[clamp(3.5rem,7vw,6rem)] grid gap-x-14 gap-y-10 nav:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <div data-reveal="">
              <h3 className="t-heading">{t.layers.title}</h3>
              <p className="t-small mt-3 max-w-[34em]">{t.layers.intro}</p>
              <ol className="layers">
                {t.layers.items.map((item, i) => (
                  <li key={i}>
                    <span className="t-mono">{String(i + 1).padStart(2, "0")}</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="privacy__aside">
              <aside className="glass privacy__evidence" data-reveal="" style={stagger(1)}>
                <Status kind="reference">{t.evidence.tag}</Status>
                <p className="mt-5 text-[1.0625rem] leading-[1.5] text-ink">{t.evidence.text}</p>
                <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.875rem]">
                  <ExtLink href={refs.kunz} newTab={common.newTab}>
                    {t.evidence.cite}
                  </ExtLink>
                  <ExtLink href={repoLink("firewall", locale)} newTab={common.newTab}>
                    {t.evidence.spec}
                  </ExtLink>
                </p>
              </aside>

              <div className="privacy__hardoff" data-reveal="" style={stagger(2)}>
                <span className="privacy__switch" aria-hidden="true">
                  <i />
                </span>
                <div>
                  <h3 className="text-[1.0625rem] font-semibold tracking-[-0.02em]">{t.layers.hardOffTitle}</h3>
                  <p className="t-small mt-2">{t.layers.hardOff}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
