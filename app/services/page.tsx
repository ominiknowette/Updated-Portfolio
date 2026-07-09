import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services, process } from "@/data/services";
import { GridCard, Overline } from "@/components/GridPrimitives";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Frontend development, mobile app development, product and UI design, and quality assurance work from David.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 pt-10 sm:px-6 lg:px-0 lg:pt-12">
      <div className="mb-8 flex items-end justify-between">
        <h1 className="font-display text-[40px] font-semibold uppercase leading-none tracking-[-0.03em] text-grid-ink">
          Services
        </h1>
        <Link href="/contact" className="hidden items-center gap-2 text-xs font-semibold text-grid-soft transition hover:text-accent-blue sm:flex">
          Start a project
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
        {services.map((service) => (
          <GridCard key={service.title} className="min-h-[205px] p-5 lg:p-6">
            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1d1d1d] text-grid-soft">
                <service.icon className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <div>
                <Overline>Service</Overline>
                <h2 className="mt-2 font-display text-lg font-semibold text-grid-ink">
                  {service.title}
                </h2>
                <p className="mt-3 max-w-[46ch] text-xs leading-5 text-grid-soft">
                  {service.description}
                </p>
              </div>
            </div>
          </GridCard>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4 lg:mt-5 lg:gap-5">
        {process.map((step, index) => (
          <GridCard key={step.step} className="min-h-[145px]">
            <div className="relative z-10">
              <Overline>Step {index + 1}</Overline>
              <h3 className="mt-3 font-display text-base font-semibold text-grid-ink">
                {step.step}
              </h3>
              <p className="mt-2 text-xs leading-5 text-grid-muted">{step.detail}</p>
            </div>
          </GridCard>
        ))}
      </div>
    </div>
  );
}
