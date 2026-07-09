import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import { currentYear } from "@/lib/utils";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Works", href: "/works" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 pb-8 pt-10 md:pb-11 md:pt-[68px]">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center px-4 text-center sm:px-6 lg:px-0">
        <BrandMark href="/" className="text-[21px] md:text-[22px]" />
        <nav className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:mt-7 md:gap-x-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] font-semibold uppercase tracking-[0.08em] text-grid-muted transition hover:text-grid-soft"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="mt-5 text-[10px] text-grid-faint md:mt-8">
          © {currentYear()} David Okafor. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
