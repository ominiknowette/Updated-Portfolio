import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import Hero from "@/components/Hero";
import BentoCard from "@/components/BentoCard";
import StatsCard from "@/components/StatsCard";
import ProjectCard from "@/components/ProjectCard";
import ServiceCard from "@/components/ServiceCard";
import SkillBadge from "@/components/SkillBadge";
import { profile } from "@/data/profile";
import { stats } from "@/data/stats";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { skills } from "@/data/skills";

export default function Home() {
  const featured = projects.slice(0, 2);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-10">
      {/* Hero + Profile */}
      <Hero />

      {/* Stats row */}
      <div className="mt-4 sm:mt-5 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((s, i) => (
          <BentoCard key={s.label} index={i} tag={`0${i + 1}`}>
            <StatsCard {...s} />
          </BentoCard>
        ))}
      </div>

      {/* About preview + mini location card */}
      <div className="mt-4 sm:mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        <BentoCard tag="ABOUT" className="lg:col-span-8">
          <div className="flex h-full flex-col justify-between gap-6">
            <div>
              <p className="text-[13px] font-medium text-accent-blue">
                WHO I AM
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold leading-[1.18] tracking-[-0.015em] text-ink sm:text-[2rem]">
                {profile.about.short}
              </h2>
              <p className="mt-4 max-w-[62ch] text-[15.5px] leading-[1.68] text-ink-soft sm:text-[17px]">
                {profile.about.paragraphs[0]}
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-accent-blue"
            >
              More about me
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </BentoCard>

        <BentoCard tag="BASE" className="lg:col-span-4">
          <div className="flex h-full flex-col justify-between gap-6">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.04] card-border">
              <MapPin className="h-5 w-5 text-accent-violet" />
            </div>
            <div>
              <p className="font-display text-xl font-semibold leading-snug text-ink">
                {profile.location}
              </p>
              <p className="mt-1 text-[15px] leading-[1.6] text-ink-soft">
                Open to remote work &amp; selected local projects.
              </p>
            </div>
          </div>
        </BentoCard>
      </div>

      {/* Featured Projects */}
      <div className="mt-4 sm:mt-5">
        <div className="mb-4 sm:mb-5 flex items-end justify-between">
          <div>
            <p className="text-[13px] font-medium text-accent-blue">
              SELECTED WORK
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-[-0.015em] text-ink sm:text-[2rem]">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/works"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted transition-colors hover:text-ink"
          >
            View all works
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {featured.map((p, i) => (
            <BentoCard key={p.slug} index={i} tag={`PROJECT_0${i + 1}`}>
              <ProjectCard project={p} />
            </BentoCard>
          ))}
        </div>
        <Link
          href="/works"
          className="mt-4 inline-flex sm:hidden items-center gap-1.5 text-sm font-semibold text-ink-muted"
        >
          View all works
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Services preview */}
      <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {services.map((s, i) => (
          <BentoCard key={s.title} index={i} tag={`SVC_0${i + 1}`}>
            <ServiceCard {...s} />
          </BentoCard>
        ))}
      </div>

      {/* Skills + Contact CTA */}
      <div className="mt-4 sm:mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        <BentoCard tag="STACK" className="lg:col-span-7">
          <div>
            <p className="font-mono text-[11px] font-medium tracking-[0.06em] text-accent-blue">
              TECHNOLOGY STACK
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink">
              Tools I build with
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <SkillBadge key={skill} label={skill} />
              ))}
            </div>
          </div>
        </BentoCard>

        <BentoCard glow tag="CTA" className="lg:col-span-5">
          <div className="flex h-full flex-col justify-between gap-6">
            <div>
              <p className="text-[13px] font-medium text-accent-blue">
                LET&rsquo;S BUILD
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-[-0.015em] text-ink sm:text-[2rem]">
                Let&rsquo;s build something{" "}
                <span className="font-serif italic font-normal text-ink-soft">useful.</span>
              </h3>
              <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.65] text-ink-soft">
                Have an idea, project, or digital product you want to bring
                to life? Send me a message and let&rsquo;s talk through it.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex w-fit items-center gap-1.5 rounded-2xl bg-accent-gradient px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Let&rsquo;s build together
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </BentoCard>
      </div>
    </div>
  );
}
