import { Bug, Code2, Github, Instagram, Linkedin, PenTool, Smartphone } from "lucide-react";
import CredentialsCard from "@/components/CredentialsCard";
import FloatingProfilePortrait from "@/components/FloatingProfilePortrait";
import { GridCard, MarkSpark, Overline, SocialButton } from "@/components/GridPrimitives";
import { contact, profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { skills } from "@/data/skills";
import { stats } from "@/data/stats";

const serviceIcons = [Code2, Smartphone, PenTool, Bug];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 pt-10 sm:px-6 lg:px-0 lg:pt-12">
      <div className="home-grid grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12 lg:gap-5">
        <GridCard className="home-profile-card order-1 p-6 md:col-span-6 md:p-6 lg:order-none lg:col-span-6 lg:h-[300px] lg:p-5">
          <div className="absolute left-5 top-5 z-20 inline-flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-[#171717]/95 px-2.5 py-1.5 shadow-[0_10px_26px_rgba(0,0,0,0.34)] md:left-6 md:top-6">
            <Code2 className="h-3.5 w-3.5 text-[#b4b4b8]" />
            <span className="text-[10px] font-medium text-[#a5a5aa]">Frontend</span>
          </div>
          <div className="absolute bottom-5 right-5 z-20 inline-flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-[#171717]/95 px-2.5 py-1.5 shadow-[0_10px_26px_rgba(0,0,0,0.34)] md:bottom-6 md:right-6">
            <Smartphone className="h-3.5 w-3.5 text-[#b4b4b8]" />
            <span className="text-[10px] font-medium text-[#a5a5aa]">Mobile</span>
          </div>
          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 text-center lg:gap-2.5">
            <FloatingProfilePortrait priority showBadges={false} />
            <div>
              <h1 className="mx-auto max-w-[19ch] text-balance font-display text-[18px] font-semibold leading-[1.12] text-grid-ink min-[390px]:max-w-[20ch] min-[390px]:text-[19px] md:max-w-[24ch] md:text-[21px] lg:text-[23px]">
                {profile.fullName}
              </h1>
              <p className="mx-auto mt-2 max-w-[30ch] text-xs leading-[1.45] text-grid-soft md:max-w-[360px] md:text-[14px] lg:text-[14px]">
                {profile.title}
              </p>
              <p className="mt-1.5 text-[12px] font-semibold text-[#a5a5aa] md:text-[13px]">
                {profile.location}
              </p>
            </div>
          </div>
        </GridCard>

        <div className="home-featured-group order-2 grid gap-4 md:col-span-6 lg:order-none lg:col-span-6 lg:h-[300px] lg:grid-rows-[44px_1fr] lg:gap-5">
          <GridCard className="home-ticker-card hidden h-[44px] rounded-[18px] px-5 py-0 lg:block">
            <div className="relative z-10 flex h-full items-center overflow-hidden">
              <div className="gridx-marquee gap-8 text-[9px] font-semibold uppercase tracking-[0.04em] text-grid-muted">
                {[0, 1].map((copy) => (
                  <span key={copy} className="whitespace-nowrap">
                    Latest work and featured - Building clear web and mobile experiences -
                  </span>
                ))}
              </div>
            </div>
          </GridCard>
          <div className="home-mini-grid grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
            <CredentialsCard className="home-credentials-card min-h-[144px] lg:h-full" />
            <GridCard href="/works" arrow className="home-projects-card min-h-[172px] lg:h-full">
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="mb-4 h-[86px] w-full overflow-hidden rounded-[14px] lg:mb-0 lg:h-[104px] lg:bg-[#252525] lg:p-2.5">
                  <div className="grid h-full grid-cols-[1fr_1.35fr] gap-2 rounded-[14px] border border-white/[0.055] bg-[#151515] p-2.5 lg:grid-cols-[1.05fr_1fr] lg:gap-3 lg:p-3">
                    <div className="rounded-lg bg-accent-blue/10" />
                    <div className="flex flex-col justify-center gap-1.5 lg:gap-2">
                      <span className="h-2 w-20 rounded-full bg-grid-ink/65 lg:w-[80%]" />
                      <span className="h-2 w-24 rounded-full bg-white/12 lg:w-full" />
                      <span className="h-5 w-16 rounded-full bg-accent-blue/20 lg:h-6 lg:w-[68%]" />
                    </div>
                  </div>
                </div>
                <div>
                  <Overline>Showcase</Overline>
                  <h2 className="mt-2 font-display text-base font-semibold text-grid-ink">
                    Projects
                  </h2>
                </div>
              </div>
            </GridCard>
          </div>
        </div>

        <GridCard className="home-stack-card order-3 min-h-[170px] md:col-span-2 lg:order-none lg:col-span-3 lg:h-[230px]">
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="grid h-20 w-20 grid-cols-2 grid-rows-2 gap-1.5">
              <span className="rounded-full bg-accent-blue" />
              <span className="rounded-tl-2xl rounded-br-2xl bg-[#ffbf3f]" />
              <span className="rounded-bl-2xl rounded-tr-2xl bg-[#ff4d4d]" />
              <span className="rounded-full bg-[#3aa7ff]" />
            </div>
            <div>
              <Overline>Stack</Overline>
              <h2 className="mt-2 font-display text-base font-semibold text-grid-ink">
                {skills.slice(0, 3).join(", ")}
              </h2>
            </div>
          </div>
        </GridCard>

        <GridCard href="/services" arrow className="home-services-card order-4 min-h-[165px] md:col-span-4 lg:order-none lg:col-span-6 lg:h-[230px]">
          <div className="relative z-10 flex h-full flex-col justify-between gap-8 lg:gap-0">
            <div className="flex items-center justify-around pt-1 text-grid-soft lg:pt-4">
              {serviceIcons.map((Icon, index) => (
                <Icon key={services[index].title} className="h-6 w-6 lg:h-7 lg:w-7" strokeWidth={1.5} />
              ))}
            </div>
            <div>
              <Overline>Specialization</Overline>
              <h2 className="mt-2 font-display text-base font-semibold text-grid-ink">
                Services Offering
              </h2>
            </div>
          </div>
        </GridCard>

        <GridCard className="home-profiles-card order-5 min-h-[155px] md:col-span-3 lg:order-none lg:col-span-3 lg:h-[230px]" arrow>
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="grid w-fit grid-cols-3 gap-3 min-[390px]:gap-4">
              <SocialButton href={contact.github} label="GitHub" icon={Github} />
              <SocialButton href={contact.linkedin} label="LinkedIn" icon={Linkedin} />
              <SocialButton href={contact.instagramUrl} label="Instagram" icon={Instagram} />
            </div>
            <div>
              <Overline>Stay with me</Overline>
              <h2 className="mt-2 font-display text-base font-semibold text-grid-ink">
                Profiles
              </h2>
            </div>
          </div>
        </GridCard>

        <GridCard className="home-stats-card order-6 md:col-span-3 lg:order-none lg:col-span-6 lg:h-[205px]">
          <div className="relative z-10 grid h-full grid-cols-1 gap-3 min-[390px]:grid-cols-2 lg:grid-cols-3">
            {stats.slice(0, 3).map((stat, index) => (
              <div key={stat.label} className={`flex min-h-[86px] flex-col items-center justify-center rounded-[16px] bg-[#1b1b1b] px-3 text-center lg:min-h-0 ${index === 2 ? "min-[390px]:col-span-2 lg:col-span-1" : ""}`}>
                <span className="font-display text-[27px] font-semibold text-grid-ink">{stat.value}</span>
                <span className="mt-2 text-[9px] font-semibold uppercase leading-3 tracking-[0.04em] text-grid-muted">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </GridCard>

        <GridCard href="/contact" arrow className="home-cta-card order-7 min-h-[150px] md:col-span-6 lg:order-none lg:col-span-6 lg:h-[205px] lg:p-7">
          <MarkSpark className="h-8 w-8 text-white/18 lg:h-11 lg:w-11" />
          <div className="relative z-10 flex h-full items-center pt-4 lg:pt-0">
            <h2 className="font-display text-[26px] font-semibold leading-[1.08] text-grid-ink min-[390px]:text-[28px] lg:text-[30px]">
              Let&rsquo;s<br />work <span className="text-accent-blue">together.</span>
            </h2>
          </div>
        </GridCard>
      </div>
    </div>
  );
}
