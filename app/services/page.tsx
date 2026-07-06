import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BentoCard from "@/components/BentoCard";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import { services, process } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Frontend development, mobile app development, product and UI design, and quality assurance work from David.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <SectionHeader
        eyebrow="What I Offer"
        title="Services built around real product needs."
        description="From the first wireframe to a shipped product, I cover the frontend, the interface, and the details in between."
      />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {services.map((s, i) => (
          <BentoCard key={s.title} index={i} tag={`SVC_0${i + 1}`}>
            <ServiceCard {...s} />
          </BentoCard>
        ))}
      </div>

      {/* Process */}
      <div className="mt-4 sm:mt-5">
        <BentoCard tag="HOW I WORK" glow>
          <div>
            <p className="text-[13px] font-medium text-accent-blue">
              PROCESS
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-2xl">
              A simple, honest way of working.
            </h3>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {process.map((step, i) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
                >
                  <span className="font-mono text-[11px] font-medium tracking-[0.05em] text-accent-blue">
                    STEP {i + 1}
                  </span>
                  <h4 className="mt-2 font-display text-base font-semibold leading-snug text-ink">
                    {step.step}
                  </h4>
                  <p className="mt-1.5 text-[15px] leading-[1.62] text-ink-soft">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>
      </div>

      <div className="mt-4 sm:mt-5">
        <BentoCard>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <h3 className="font-display text-xl font-semibold leading-snug text-ink">
                Got a project in mind?
              </h3>
              <p className="mt-1 text-[15px] leading-[1.6] text-ink-soft">
                Let&rsquo;s talk about what you&rsquo;re building.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-2xl bg-accent-gradient px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
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
