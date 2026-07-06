"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock background scroll while the mobile menu is open.
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[padding] duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={cn(
            "flex items-center justify-between rounded-full px-4 sm:px-5 py-2.5 transition-colors duration-300",
            scrolled
              ? "bg-card/90 sm:glass card-border shadow-[0_8px_20px_-14px_rgba(0,0,0,0.6)] sm:shadow-card"
              : "border border-transparent"
          )}
        >
          <Link
            href="/"
            className="font-display text-lg font-semibold text-ink"
          >
            David
            <span className="text-accent-blue">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative select-none rounded-full px-4 py-2 text-[15px] font-medium tracking-normal transition-colors",
                    active ? "text-ink" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.06] card-border"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-accent-gradient px-4 py-2 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-transform hover:scale-[1.03]"
            >
              Let&rsquo;s build together
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full card-border text-ink"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </header>
  );
}

function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/70 md:hidden"
            aria-hidden="true"
          />

          {/* Panel — fixed overlay, animates with opacity + transform only */}
          <motion.div
            key="panel"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[100] flex w-[86%] max-w-sm flex-col bg-card card-border shadow-card md:hidden"
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/[0.06]">
              <Link
                href="/"
                onClick={onClose}
                className="font-display text-lg font-semibold text-ink"
              >
                David
                <span className="text-accent-blue">.</span>
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full card-border text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "rounded-2xl px-4 py-3.5 text-base font-medium tracking-normal transition-colors",
                      active
                        ? "bg-white/[0.06] text-ink"
                        : "text-ink-muted active:bg-white/[0.04]"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="px-3 pb-6 pt-2 border-t border-white/[0.06]">
              <Link
                href="/contact"
                onClick={onClose}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-2xl bg-accent-gradient px-5 py-3.5 text-sm font-semibold text-white"
              >
                Let&rsquo;s build together
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
