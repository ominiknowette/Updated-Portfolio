"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Code2, Smartphone } from "lucide-react";
import { profile } from "@/data/profile";
import { useIsMobile } from "@/lib/useIsMobile";
import BentoCard from "./BentoCard";
import Avatar from "./Avatar";

// Hero copy + buttons stagger in on mount (not on scroll-into-view — the
// hero is always the first thing on screen, so gating it behind an
// IntersectionObserver just adds a chance for it to never fire). The same
// variants are used on every viewport; reduced-motion users skip the
// transform/opacity animation entirely and render at full opacity.
// Content never starts hidden without a guaranteed "show" target — see the
// always-on `animate="show"` below. (Previously this branched on isMobile,
// which flips shortly after mount and left content stuck at opacity 0.)
const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

function useHeroItemVariants() {
  const prefersReducedMotion = useReducedMotion();
  return {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };
}

export default function Hero() {
  const isMobile = useIsMobile();
  const heroItem = useHeroItemVariants();

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:h-[clamp(500px,calc(100svh-220px),580px)] lg:grid-cols-12">
      <BentoCard
        index={0}
        glow
        tag="Hero introduction"
        className="order-2 lg:order-1 lg:col-span-7 lg:row-span-2 lg:h-full lg:p-8 xl:p-9"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={heroContainer}
          className="relative z-10 flex h-full min-h-0 flex-col justify-between gap-5 py-1 sm:py-0"
        >
          <div>
            <motion.div
              variants={heroItem}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-blue opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-blue" />
              </span>
              <span className="font-mono text-[11px] tracking-wide text-ink-soft">
                {profile.availabilityLabel}
              </span>
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="mt-5 max-w-[12.5em] font-display text-[clamp(2.25rem,9vw,2.625rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink lg:max-w-none lg:text-[clamp(3.35rem,3.7vw,3.75rem)] lg:leading-[0.99]"
            >
              <span className="lg:block">Building digital experiences</span>
              <span className="lg:block">
                that feel{" "}
                <span className="font-serif italic font-normal leading-none tracking-[-0.035em] text-ink-soft">
                  simple, thoughtful
                </span>
                ,
              </span>{" "}
              <span className="lg:block">and easy to use.</span>
            </motion.h1>

            <motion.div
              variants={heroItem}
              className="mt-5 max-w-[58ch]"
            >
              <p className="text-[15px] leading-[1.58] text-ink-soft sm:text-[16px]">
                I&rsquo;m David, a Computer Science student, frontend developer,
                mobile app developer, and product designer based in Lagos. I
                turn ideas into clear websites, mobile experiences, and digital
                tools that are easy to use.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={heroItem}
            className="flex shrink-0 flex-wrap items-center gap-3"
          >
            <Link
              href="/works"
              className="inline-flex min-h-12 items-center gap-1.5 rounded-2xl bg-accent-gradient px-5 py-3 text-sm font-semibold text-white transition-transform sm:hover:scale-[1.02]"
            >
              See my work
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center gap-1.5 rounded-2xl border border-white/[0.1] bg-white/[0.02] px-5 py-3 text-sm font-semibold text-ink transition-colors sm:hover:bg-white/[0.06]"
            >
              Let&rsquo;s build together
            </Link>
          </motion.div>
        </motion.div>
      </BentoCard>

      <BentoCard
        index={1}
        tag="Profile card"
        className="order-1 lg:order-2 lg:col-span-5 lg:row-span-2 lg:h-full lg:p-9"
      >
        <div className="relative flex h-full min-h-[220px] flex-col items-center justify-center gap-4 py-3 sm:gap-5 sm:py-4">
          <motion.div
            animate={isMobile ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <Avatar
              priority
              sizeClassName="h-32 w-32 sm:h-40 sm:w-40"
              imageSizes="(min-width: 640px) 160px, 128px"
            />
            <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-card card-border">
              <span className="h-2.5 w-2.5 rounded-full bg-accent-blue" />
            </span>
          </motion.div>

          <div className="text-center">
            <h2 className="font-display text-xl font-semibold leading-tight text-ink sm:text-[22px]">
              {profile.fullName}
            </h2>
            <p className="mt-1 text-sm font-normal leading-snug text-ink-soft sm:text-[15px]">{profile.title}</p>
            <p className="mt-1 text-[13px] font-medium text-accent-blue">
              {profile.location}
            </p>
          </div>

          {/* Floating skill chips: desktop only — kept off mobile so they never
              overlap the avatar/text on small cards, and to avoid running
              continuous animations on phones. */}
          {!isMobile && (
            <>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="hidden sm:flex absolute left-1 top-3 items-center gap-1.5 rounded-2xl border border-white/[0.08] bg-card-soft px-3 py-2 shadow-card"
              >
                <Code2 className="h-3.5 w-3.5 text-accent-blue" />
                <span className="font-mono text-[10px] text-ink-soft">Frontend</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="hidden sm:flex absolute right-1 bottom-3 items-center gap-1.5 rounded-2xl border border-white/[0.08] bg-card-soft px-3 py-2 shadow-card"
              >
                <Smartphone className="h-3.5 w-3.5 text-accent-violet" />
                <span className="font-mono text-[10px] text-ink-soft">Mobile</span>
              </motion.div>
            </>
          )}
        </div>
      </BentoCard>
    </div>
  );
}
