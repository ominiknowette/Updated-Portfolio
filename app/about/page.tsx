import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import BentoCard from "@/components/BentoCard";
import SectionHeader from "@/components/SectionHeader";
import SkillBadge from "@/components/SkillBadge";
import Avatar from "@/components/Avatar";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet David, a Lagos-based Computer Science student, frontend developer, and product designer who also loves football, gaming, and jogging.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <SectionHeader
        eyebrow="Self Summary"
        title="A closer look at how I think and build."
        description="Computer Science student, developer, and designer, currently based in Lagos, Nigeria."
      />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        <BentoCard tag="PROFILE" className="lg:col-span-4">
          <div className="flex h-full flex-col items-center justify-center gap-5 py-6 text-center">
            <Avatar sizeClassName="h-24 w-24" imageSizes="96px" />
            <div>
              <h3 className="font-display text-[21px] font-semibold leading-tight text-ink">
                {profile.fullName}
              </h3>
              <p className="mt-1 text-sm leading-snug text-ink-soft">{profile.title}</p>
            </div>
            <p className="text-xs font-medium text-accent-blue">{profile.location}</p>
          </div>
        </BentoCard>

        <BentoCard tag="ABOUT" glow className="lg:col-span-8">
          <div className="flex h-full flex-col justify-center gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent-violet" />
              <p className="text-[13px] font-medium text-accent-blue">
                SELF SUMMARY
              </p>
            </div>
            {profile.about.paragraphs.map((p, i) => (
              <p key={i} className="max-w-[62ch] text-[15.5px] leading-[1.68] text-ink-soft sm:text-[17px]">
                {p}
              </p>
            ))}
          </div>
        </BentoCard>
      </div>

      {/* Journey */}
      <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        {profile.journey.map((j, i) => (
          <BentoCard key={j.label} index={i} tag={j.period.toUpperCase()}>
            <div className="flex h-full flex-col">
              <h3 className="font-display text-base font-semibold leading-snug text-ink">
                {j.label}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.62] text-ink-soft">{j.note}</p>
            </div>
          </BentoCard>
        ))}
      </div>

      {/* Personality */}
      <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        {profile.personality.map((p, i) => (
          <BentoCard key={p.title} index={i} tag={`0${i + 1} / PERSONAL`}>
            <div className="flex h-full flex-col">
              <h3 className="font-display text-base font-semibold leading-snug text-ink">
                {p.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.62] text-ink-soft">{p.text}</p>
            </div>
          </BentoCard>
        ))}
      </div>

      {/* Skill groups */}
      <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {skillGroups.map((group, i) => (
          <BentoCard key={group.label} index={i} tag={group.label.toUpperCase()}>
            <div>
              <h3 className="font-display text-base font-semibold leading-snug text-ink">
                {group.label}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <SkillBadge key={s} label={s} />
                ))}
              </div>
            </div>
          </BentoCard>
        ))}
      </div>
    </div>
  );
}
