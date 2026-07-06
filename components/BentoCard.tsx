"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/useIsMobile";
import type { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
  tag?: string;
  as?: "div" | "article";
  glow?: boolean;
}

export default function BentoCard({
  children,
  className,
  index = 0,
  tag,
  as = "div",
  glow = false,
}: BentoCardProps) {
  const Comp = motion[as];
  const isMobile = useIsMobile();

  return (
    <Comp
      initial={{ opacity: 0, y: isMobile ? 10 : 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: isMobile ? 0.32 : 0.5,
        delay: Math.min(index * 0.06, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={isMobile ? undefined : { y: -4 }}
      className={cn(
        "group relative overflow-hidden rounded-card bg-card card-border p-6 sm:p-7 shadow-sm sm:shadow-card transition-shadow duration-300 sm:hover:shadow-card-hover hover:border-white/[0.14]",
        glow &&
          "before:absolute before:-top-24 before:right-[-40px] before:h-48 before:w-48 before:rounded-full before:bg-accent-blue/20 before:blur-2xl before:opacity-70 sm:before:blur-[70px] sm:before:opacity-100 before:content-['']",
        className
      )}
    >
      {/* `tag` is kept as screen-reader-only context (e.g. "Hero", "Contact
          info") rather than shown as a visible internal-looking label. */}
      {tag && <span className="sr-only">{tag}</span>}
      <div className="relative z-10 h-full">{children}</div>
    </Comp>
  );
}
