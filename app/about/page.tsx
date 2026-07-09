import type { Metadata } from "next";
import Image from "next/image";
import { Github, Instagram, Linkedin } from "lucide-react";
import { profile, contact } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { GridCard, MarkSpark, Overline, SocialButton } from "@/components/GridPrimitives";
import CredentialsCard from "@/components/CredentialsCard";
import Sparkle from "@/components/decorations/Sparkle";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet David, a Lagos-based Computer Science student, frontend developer, and product designer who also loves football, gaming, and jogging.",
};

const summaryParagraphs = [
  profile.about.paragraphs[0],
  "I'm 19, from Delta State, Nigeria, and currently based in Lagos. I build across frontend development, mobile app development, and product design, with a focus on making digital experiences clear, useful, and easy to understand.",
  profile.about.paragraphs[1],
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 pt-10 sm:px-6 lg:px-0 lg:pt-12">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 lg:gap-5">
        <div className="flex min-h-[250px] items-center justify-center md:col-span-4 md:min-h-[320px] lg:min-h-[330px]">
          <div className="relative flex h-full w-full items-center justify-center">
            <div
              aria-hidden="true"
              className="absolute h-[230px] w-[230px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,rgba(145,145,150,0.07)_45%,transparent_72%)] blur-2xl md:h-[250px] md:w-[250px]"
            />
            <div className="relative h-[210px] w-[210px] overflow-hidden rounded-full border border-white/[0.09] bg-[#171717] shadow-[0_22px_58px_-22px_rgba(0,0,0,0.8),0_0_34px_rgba(255,255,255,0.045)] min-[390px]:h-[230px] min-[390px]:w-[230px] md:h-[245px] md:w-[245px] lg:h-[255px] lg:w-[255px]">
              <Image
                src="/images/david-profile.jpg"
                alt="Okafor Onyekachukwu David"
                fill
                priority
                sizes="(max-width: 389px) 210px, (max-width: 767px) 230px, (min-width: 768px) 245px, 255px"
                className="object-cover object-[center_46%]"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="relative mb-4 flex items-center gap-2 min-[390px]:gap-3">
            <Sparkle variant="four" className="static h-6 w-6 shrink-0 text-white/28 min-[390px]:h-7 min-[390px]:w-7" />
            <h1 className="font-display text-[28px] font-semibold uppercase leading-none tracking-[-0.02em] text-grid-ink min-[390px]:text-[32px] sm:text-[40px]">
              Self-Summary
            </h1>
            <Sparkle variant="four" className="static hidden h-8 w-8 shrink-0 text-white/20 sm:block" />
          </div>
          <GridCard className="min-h-[285px] p-6 md:min-h-[256px] md:p-6 lg:min-h-[266px] lg:p-7">
            <MarkSpark className="left-auto right-5 top-5 h-8 w-8 text-white/18 md:right-6 md:h-11 md:w-11" />
            <div className="relative z-10 flex h-full flex-col justify-center pr-6 md:pr-12 lg:pr-14">
              <h2 className="font-display text-[21px] font-semibold leading-tight text-grid-ink md:text-[22px]">
                {profile.fullName}
              </h2>
              <div className="mt-4 max-w-[78ch] space-y-3 text-[13px] leading-[1.6] text-grid-soft md:text-[13.5px]">
                {summaryParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </GridCard>
        </div>

        <GridCard className="md:col-span-6 md:h-[235px]">
          <div className="relative z-10">
            <Overline>Journey</Overline>
            <div className="mt-4 space-y-4 md:mt-5 md:space-y-5">
              {profile.journey.slice(0, 2).map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] text-grid-muted">{item.period}</p>
                  <h3 className="mt-1 text-sm font-semibold text-grid-ink">{item.label}</h3>
                  <p className="mt-1 text-[11px] leading-4 text-grid-muted">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </GridCard>

        <GridCard className="md:col-span-6 md:h-[235px]">
          <div className="relative z-10">
            <Overline>Learning</Overline>
            <div className="mt-5 space-y-5">
              {skillGroups.slice(0, 2).map((group) => (
                <div key={group.label}>
                  <p className="text-[10px] text-grid-muted">{group.label}</p>
                  <h3 className="mt-1 text-sm font-semibold text-grid-ink">
                    {group.skills.slice(0, 3).join(", ")}
                  </h3>
                  <p className="mt-1 text-[11px] leading-4 text-grid-muted">
                    Building practical foundations through projects and continuous practice.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </GridCard>

        <GridCard className="md:col-span-3 md:h-[185px]" arrow>
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="grid w-fit grid-cols-3 gap-3">
              <SocialButton href={contact.github} label="GitHub" icon={Github} />
              <SocialButton href={contact.linkedin} label="LinkedIn" icon={Linkedin} />
              <SocialButton href={contact.instagramUrl} label="Instagram" icon={Instagram} />
            </div>
            <div>
              <Overline>Stay with me</Overline>
              <h2 className="mt-2 font-display text-sm font-semibold text-grid-ink">
                Profiles
              </h2>
            </div>
          </div>
        </GridCard>

        <GridCard href="/contact" arrow className="md:col-span-6 md:h-[185px]">
          <MarkSpark className="h-8 w-8 text-white/18 md:h-11 md:w-11" />
          <div className="relative z-10 flex h-full items-center">
            <h2 className="font-display text-[26px] font-semibold leading-[1.08] text-grid-ink md:text-[28px]">
              Let&rsquo;s<br />work <span className="text-accent-blue">together.</span>
            </h2>
          </div>
        </GridCard>

        <CredentialsCard className="md:col-span-3 md:h-[185px]" titleClassName="text-sm" />
      </div>
    </div>
  );
}
