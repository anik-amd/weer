import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "weer-theme";

/** The theme in force right now, read from the document root. */
const current = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

/**
 * Light or dark, remembered between visits and following the system
 * preference until the reader chooses for themselves.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(current);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* a private browser may refuse; the theme still applies for this visit */
    }
  }, [theme]);

  const toggle = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );

  return { theme, toggle };
}
