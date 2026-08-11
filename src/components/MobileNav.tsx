import { useState } from "react";
import type { ReactNode } from "react";

export type MobileNavLink = {
  label: string;
  href: string;
};

/**
 * Mobile hamburger menu for the marketing site.
 *
 * Renders a 44px+ hamburger button (visible below `lg`) plus, when open, a
 * full-width dropdown panel anchored to the bottom of the sticky <nav> it lives
 * inside (the nav must be `sticky`/`relative` for `top-full` to resolve).
 *
 * Each link row is ≥44px tall (py-3 + text-base) for comfortable touch targets.
 * The menu closes itself when a link is tapped.
 *
 * `dark` styles the button + panel for dark nav bars (get-started page).
 * `children` is rendered after the links (e.g. a prominent CTA button).
 */
export function MobileNav({
  links,
  dark = false,
  children,
}: {
  links: MobileNavLink[];
  dark?: boolean;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors lg:hidden ${
          dark
            ? "text-slate-300 hover:bg-white/10 hover:text-white"
            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {open ? (
            <>
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </>
          ) : (
            <>
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div
          className={`absolute inset-x-0 top-full border-b shadow-xl shadow-slate-900/5 lg:hidden ${
            dark ? "border-slate-700/60 bg-slate-900" : "border-blue-700 bg-blue-600"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="flex flex-col">
              {links.map((l) => (
                <a
                  key={l.href + l.label}
                  href={l.href}
                  onClick={close}
                  className={`flex min-h-11 items-center rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    dark
                      ? "text-slate-200 hover:bg-white/10 hover:text-white"
                      : "text-white hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {l.label}
                </a>
              ))}
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
