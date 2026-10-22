import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../lib/cart";
import { useTheme } from "../lib/theme";

const LINKS = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About us" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const { count, openCart } = useCart();
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  const { toggle } = useTheme();

  useEffect(() => setMenu(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 h-[var(--header-h)] w-full bg-ground">
      <div className="frame flex h-full items-center justify-between gap-4">
        <Link
          to="/"
          className="t-lead leading-none font-extrabold tracking-[-0.045em]"
          style={{ fontVariationSettings: '"wdth" 118' }}
        >
          WEER
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `link-line t-small ${
                  isActive ? "font-semibold" : "text-ink-2 hover:text-ink"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            className="link-line t-small font-medium"
            aria-label="Switch between the light and the dark theme"
          >
            <span className="theme-label theme-label--light">Dark</span>
            <span className="theme-label theme-label--dark">Light</span>
          </button>
          <button
            type="button"
            onClick={openCart}
            className="link-line t-small font-medium"
          >
            Bag{count > 0 ? ` (${count})` : ""}
          </button>
          <button
            type="button"
            className="t-small md:hidden"
            aria-expanded={menu}
            aria-controls="mobile-menu"
            onClick={() => setMenu((m) => !m)}
          >
            {menu ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {menu && (
        <nav
          id="mobile-menu"
          className="frame bg-ground-2 py-3 md:hidden"
          aria-label="Main"
        >
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className="block py-2 t-lead font-semibold tracking-[-0.02em]"
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
