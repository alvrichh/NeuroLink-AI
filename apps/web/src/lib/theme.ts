"use client";

import { useCallback, useSyncExternalStore } from "react";

import { THEME_COLORS, THEME_STORAGE_KEY, type Theme } from "./themeConfig";

export type { Theme };

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
}

/** Notifies when <html data-theme> changes, and follows the system while no choice is saved. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const followSystem = () => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      /* storage unavailable: keep following the system */
    }
    if (saved !== "dark" && saved !== "light") applyTheme(media.matches ? "dark" : "light");
  };
  media.addEventListener("change", followSystem);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", followSystem);
  };
}

/** Current theme and a setter that remembers the visitor's choice. */
export function useTheme(): [Theme, (theme: Theme) => void] {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "light");

  const setTheme = useCallback((next: Theme) => {
    if (next === readTheme()) return;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* private mode: the choice simply lasts for this page view */
    }
    const animate =
      document.documentElement.dataset.motion === "on" && "startViewTransition" in document;
    // Cross-fade the whole page where the browser can; otherwise switch at once.
    if (animate) document.startViewTransition(() => applyTheme(next));
    else applyTheme(next);
  }, []);

  return [theme, setTheme];
}

/** Subscribe a non-React consumer (the hero canvas) to theme changes. */
export function onThemeChange(listener: () => void): () => void {
  const observer = new MutationObserver(listener);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
