"use client";

import { useEffect, useId, useState } from "react";
import { localePath, locales, sectionIds, type Locale, type SectionId } from "@/content";
import type { Dictionary } from "@/content";
import { REPO_URL } from "@/content/links";
import { useTheme, type Theme } from "@/lib/theme";
import { useActiveSection } from "@/lib/useActiveSection";
import { cx, logo, withBase } from "@/lib/site";
import { ArrowUpRight, GitHubIcon, MoonIcon, SunIcon, sectionIcons } from "./icons";
import { ThemedLogo } from "./ui";

type NavProps = {
  locale: Locale;
  labels: Dictionary["nav"];
  common: Dictionary["common"];
};

const localeNames: Record<Locale, { short: string; long: string }> = {
  en: { short: "EN", long: "English" },
  es: { short: "ES", long: "Español" },
};

/**
 * Site navigation in two forms that share one scroll-tracking state:
 * a floating glass panel on wide screens, and a compact glass bar that
 * expands into a sheet on tablets and phones.
 */
export function Navigation({ locale, labels, common }: NavProps) {
  const active = useActiveSection();
  const activeIndex = sectionIds.indexOf(active);

  return (
    <>
      <SidePanel locale={locale} labels={labels} common={common} active={active} index={activeIndex} />
      <MobileBar locale={locale} labels={labels} common={common} active={active} index={activeIndex} />
    </>
  );
}

type PanelProps = NavProps & { active: SectionId; index: number };

function LanguageSwitch({
  locale,
  active,
  label,
}: {
  locale: Locale;
  active: SectionId;
  label: string;
}) {
  // Keep the reader's place when switching language.
  const hash = active === "overview" ? "" : `#${active}`;
  return (
    <div className="lang-switch" role="group" aria-label={label}>
      {locales.map((code) => {
        const current = code === locale;
        return (
          <a
            key={code}
            href={`${withBase(localePath(code))}${hash}`}
            hrefLang={code}
            lang={code}
            aria-current={current ? "true" : undefined}
            title={localeNames[code].long}
            className="lang-switch__item"
          >
            {localeNames[code].short}
            <span className="sr-only"> — {localeNames[code].long}</span>
          </a>
        );
      })}
      <span className="lang-switch__thumb" data-pos={locales.indexOf(locale)} aria-hidden="true" />
    </div>
  );
}

/** Light / dark appearance. Follows the system until the visitor chooses. */
function ThemeSwitch({ common }: { common: Dictionary["common"] }) {
  const [theme, setTheme] = useTheme();
  const options: Array<{ value: Theme; label: string; Icon: typeof SunIcon }> = [
    { value: "light", label: common.themeLight, Icon: SunIcon },
    { value: "dark", label: common.themeDark, Icon: MoonIcon },
  ];
  return (
    <div className="lang-switch theme-switch" role="group" aria-label={common.theme}>
      {options.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          className="lang-switch__item"
          aria-pressed={theme === value}
          aria-label={label}
          title={label}
          onClick={() => setTheme(value)}
        >
          <Icon />
        </button>
      ))}
      <span className="lang-switch__thumb" data-pos={theme === "dark" ? 1 : 0} aria-hidden="true" />
    </div>
  );
}

function SidePanel({ locale, labels, common, active, index }: PanelProps) {
  return (
    <aside className="side-nav glass" aria-label={common.sections}>
      <div className="side-nav__sheen" aria-hidden="true">
        <span />
      </div>

      {/* Symbol over wordmark, in the same proportions as the official lockup. */}
      <a href="#overview" className="side-nav__brand" aria-label={common.home}>
        <ThemedLogo asset={logo.symbol} alt="" className="side-nav__symbol" />
        <ThemedLogo asset={logo.wordmark} alt={common.brand} className="side-nav__wordmark" />
      </a>

      <span className="side-nav__progress" aria-hidden="true">
        <i />
      </span>

      <nav aria-label={common.sections} className="side-nav__nav">
        <ul className="side-nav__list" style={{ ["--active" as string]: index }}>
          <li className="side-nav__indicator" aria-hidden="true" role="presentation" />
          {sectionIds.map((id) => {
            const Icon = sectionIcons[id];
            const current = id === active;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="side-nav__link"
                  aria-current={current ? "location" : undefined}
                >
                  <Icon className="side-nav__icon" />
                  <span>{labels[id]}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="side-nav__foot">
        <p className="side-nav__stage">
          <span className="side-nav__stage-dot" aria-hidden="true" />
          <span>
            <strong>{common.stage}</strong>
            <span>{common.stageNote}</span>
          </span>
        </p>
        <div className="side-nav__actions">
          <div className="side-nav__switches">
            <LanguageSwitch locale={locale} active={active} label={common.language} />
            <ThemeSwitch common={common} />
          </div>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="side-nav__github"
            aria-label={`${common.githubLong} (${common.newTab})`}
          >
            <GitHubIcon size={17} />
            <span>{common.github}</span>
            <ArrowUpRight className="ml-auto opacity-50" />
          </a>
        </div>
      </div>
    </aside>
  );
}

function MobileBar({ locale, labels, common, active, index }: PanelProps) {
  const [open, setOpen] = useState(false);
  const sheetId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={cx("mobile-nav__scrim", open && "is-open")}
        aria-hidden="true"
        tabIndex={-1}
        onClick={() => setOpen(false)}
      />
      <header className={cx("mobile-nav glass", open && "is-open")}>
        <div className="mobile-nav__bar">
          <a href="#overview" className="mobile-nav__brand" aria-label={common.home} onClick={() => setOpen(false)}>
            <ThemedLogo asset={logo.symbol} alt="" className="mobile-nav__symbol" />
            <ThemedLogo asset={logo.wordmark} alt={common.brand} className="mobile-nav__wordmark" />
          </a>

          <p className="mobile-nav__where" aria-live="off">
            <span className="t-mono mobile-nav__count">
              {String(index + 1).padStart(2, "0")}
              <i>/{String(sectionIds.length).padStart(2, "0")}</i>
            </span>
            <span className="mobile-nav__label" key={active}>
              {labels[active]}
            </span>
          </p>

          <button
            type="button"
            className="mobile-nav__toggle"
            aria-expanded={open}
            aria-controls={sheetId}
            aria-label={open ? common.menuClose : common.menuOpen}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="mobile-nav__burger" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
          <span className="mobile-nav__progress" aria-hidden="true" />
        </div>

        <div className="mobile-nav__sheet" id={sheetId} inert={!open}>
          <div className="mobile-nav__sheet-inner">
            <nav aria-label={common.sections}>
              <ul className="mobile-nav__list">
                {sectionIds.map((id, i) => {
                  const Icon = sectionIcons[id];
                  return (
                    <li key={id} style={{ ["--i" as string]: i }}>
                      <a
                        href={`#${id}`}
                        className="mobile-nav__link"
                        aria-current={id === active ? "location" : undefined}
                        onClick={() => setOpen(false)}
                      >
                        <Icon className="mobile-nav__icon" />
                        <span>{labels[id]}</span>
                        <span className="t-mono mobile-nav__num">{String(i + 1).padStart(2, "0")}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mobile-nav__foot">
              <div className="mobile-nav__switches">
                <LanguageSwitch locale={locale} active={active} label={common.language} />
                <ThemeSwitch common={common} />
              </div>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-quiet btn-sm"
                aria-label={`${common.githubLong} (${common.newTab})`}
              >
                <GitHubIcon size={16} />
                {common.github}
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
