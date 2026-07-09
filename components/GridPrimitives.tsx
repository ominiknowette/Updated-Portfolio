import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Sparkle from "@/components/decorations/Sparkle";

interface GridCardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  arrow?: boolean;
  ariaLabel?: string;
}

export function GridCard({
  children,
  className,
  href,
  arrow = false,
  ariaLabel,
}: GridCardProps) {
  const classes = cn(
    "gridx-card group relative block w-full min-w-0 overflow-hidden rounded-[22px] p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-white/[0.09] sm:rounded-[24px] lg:rounded-[26px]",
    className
  );

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={classes}>
        {children}
        {arrow && <CornerArrow />}
      </Link>
    );
  }

  return (
    <div className={classes}>
      {children}
      {arrow && <CornerArrow />}
    </div>
  );
}

export function CornerArrow() {
  return (
    <span className="absolute bottom-4 right-4 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-white/[0.12] text-[#5e5e5e] transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-[8deg] group-hover:text-[#a0a0a0]">
      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
    </span>
  );
}

export function Overline({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[9px] font-semibold uppercase tracking-[0.04em] text-grid-muted", className)}>
      {children}
    </p>
  );
}

export function SocialButton({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1f1f1f] text-grid-soft shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition hover:bg-[#2a2a2a] hover:text-grid-ink sm:h-12 sm:w-12"
    >
      <Icon className="h-4 w-4" strokeWidth={1.7} />
    </a>
  );
}

export function MarkSpark({ className }: { className?: string }) {
  return <Sparkle variant="eight" className={cn("left-5 top-5 text-white/25", className)} />;
}
