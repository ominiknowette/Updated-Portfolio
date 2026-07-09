"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import BrandMark from "@/components/BrandMark";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Works", href: "/works" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      requestAnimationFrame(() => {
        const firstLink = panelRef.current?.querySelector<HTMLElement>("a, button");
        firstLink?.focus();
      });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleMenuKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      setOpen(false);
      menuButtonRef.current?.focus();
      return;
    }

    if (e.key !== "Tab" || !panelRef.current) return;

    const focusable = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!first || !last) return;

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  return (
    <header className="relative z-50">
      <nav className="mx-auto flex h-[70px] w-full max-w-[1180px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[82px] lg:px-0">
        <BrandMark href="/" className="text-[25px] md:text-[24px]" />

        <div className="desktop-navigation hidden h-[46px] items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.035] px-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_8px_24px_rgba(0,0,0,0.22)] md:flex md:backdrop-blur-[14px]">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full border px-[15px] py-2.5 text-[14px] font-semibold leading-none transition duration-200 ease-out lg:px-[17px]",
                  active
                    ? "border-white/[0.09] bg-white/[0.07] text-grid-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    : "border-transparent text-grid-muted hover:bg-white/[0.045] hover:text-grid-soft"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="desktop-navigation hidden h-[46px] items-center rounded-[15px] border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.055))] px-6 text-[14px] font-semibold leading-none text-grid-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_8px_20px_rgba(0,0,0,0.2)] transition duration-200 ease-out hover:border-white/[0.11] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.07))] md:flex"
        >
          Let&rsquo;s talk
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="mobile-navigation-trigger fixed right-4 top-[13px] z-50 ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.045] text-grid-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] md:static md:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-base/95 px-4 py-3 md:hidden"
          onMouseDown={(e) => {
            if (e.currentTarget === e.target) setOpen(false);
          }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            onKeyDown={handleMenuKeyDown}
            className="gridx-card mobile-menu-panel ml-auto w-full max-w-[360px] rounded-[24px] p-4 shadow-[0_22px_70px_-42px_rgba(0,0,0,0.95)]"
          >
            <div className="mb-5 flex items-center justify-between">
              <BrandMark href="/" className="text-[24px]" />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => {
                  setOpen(false);
                  menuButtonRef.current?.focus();
                }}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.045] text-grid-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex h-12 items-center rounded-[16px] border px-4 text-[16px] font-semibold text-grid-ink transition",
                    pathname === link.href
                      ? "border-white/[0.08] bg-white/[0.07]"
                      : "border-transparent bg-white/[0.025] text-grid-soft"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
