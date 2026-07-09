import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { GridCard, Overline } from "@/components/GridPrimitives";
import ProjectPreview from "@/components/ProjectPreview";

export const metadata: Metadata = {
  title: "Works",
  description:
    "A collection of projects by David, from small utility tools to full-stack CRM dashboards and school portals.",
};

const spanBySlug: Record<string, string> = {
  "array-calculator": "lg:col-span-5",
  dashivine: "lg:col-span-7",
  "smart-leads-dashboard": "lg:col-span-7",
  "simple-portfolio": "lg:col-span-5",
  "madonna-catholic-college": "lg:col-span-6",
  "bincom-mobile-app-intern": "lg:col-span-6",
};

export default function WorksPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 pt-10 sm:px-6 lg:px-0 lg:pt-12">
      <div className="mb-6 flex items-end justify-between sm:mb-8">
        <h1 className="font-display text-[40px] font-semibold uppercase leading-none tracking-[-0.03em] text-grid-ink">
          Works
        </h1>
        <p className="hidden max-w-sm text-xs leading-5 text-grid-muted sm:block">
          Compact project snapshots from utility tools to dashboards and web products.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        {projects.map((project) => (
          <GridCard
            key={project.slug}
            href={project.link ?? undefined}
            arrow={Boolean(project.link)}
            className={`${spanBySlug[project.slug] ?? "lg:col-span-6"} md:min-h-[360px]`}
          >
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-5">
                <ProjectPreview type={project.preview} />
              </div>
              <Overline>{project.type}</Overline>
              <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-semibold leading-tight text-grid-ink">
                    {project.title}
                  </h2>
                  {project.organisation && (
                    <p className="mt-1 text-xs font-semibold text-accent-blue">{project.organisation}</p>
                  )}
                </div>
                <span className="rounded-full border border-white/[0.065] bg-white/[0.035] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.04em] text-grid-muted">
                  {project.status}
                </span>
              </div>
              <p className="mt-3 max-w-[58ch] text-xs leading-5 text-grid-soft">{project.description}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-5 pr-9">
                {project.tools.slice(0, 6).map((tool) => (
                  <span key={tool} className="rounded-full bg-[#202020] px-3 py-1 text-[10px] text-grid-muted">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </GridCard>
        ))}
      </div>
    </div>
  );
}
