/**
 * Theme constants shared by server and client code. Kept apart from the React
 * hooks in theme.ts, because a server component cannot read values exported
 * from a "use client" module.
 */

export type Theme = "light" | "dark";

/** Key under which an explicit choice is remembered. Absent = follow the system. */
export const THEME_STORAGE_KEY = "nl-theme";

/** Browser-chrome colour per theme (the page background). Mirrors --paper. */
export const THEME_COLORS: Record<Theme, string> = { light: "#FFFFFF", dark: "#000816" };

/**
 * Runs inline before first paint (see SiteDocument): applies the saved theme,
 * or the system preference when nothing was saved, so the page never flashes
 * the wrong theme. Kept as a string because it must not wait for hydration.
 */
export const themeBootstrap = `(function(){try{var d=document.documentElement;var s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var t=(s==='dark'||s==='light')?s:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');d.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='dark'?${JSON.stringify(
  THEME_COLORS.dark,
)}:${JSON.stringify(THEME_COLORS.light)});}catch(e){document.documentElement.dataset.theme='light';}})();`;
