import { useCallback } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "weer-theme";

/** The browser chrome should match the page, not fight it. */
const CHROME: Record<Theme, string> = { light: "#e4e6e0", dark: "#121815" };

/** The theme in force right now, read from the document root. */
const current = (): Theme =>
  typeof document !== "undefined" &&
  document.documentElement.dataset.theme === "dark"
    ? "dark"
    : "light";

/** Puts a theme on the document: the colour scheme and the browser chrome. */
export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", CHROME[theme]);
}

/**
 * Light or dark.
 *
 * The theme lives on the document, not in React state. The server cannot know
 * the reader's choice, and the page is painted before the bundle arrives, so
 * the boot script in `index.html` has already decided by then. Keeping the
 * state in React would mean the server's markup and the browser's first
 * render could disagree. The button's label is chosen by CSS from the same
 * attribute, so it is right from the first paint.
 */
export function useTheme() {
  const toggle = useCallback(() => {
    const next: Theme = current() === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* a private browser may refuse; the theme still applies for this visit */
    }
  }, []);

  return { toggle };
}
