import type { Metadata } from "next";
import BentoCard from "@/components/BentoCard";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Works",
  description:
    "A collection of projects by David, from small utility tools to full-stack CRM dashboards and school portals.",
};

export default function WorksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <SectionHeader
        eyebrow="Portfolio"
        title="Projects I've built and shipped."
        description="A mix of utility tools, client work, and full-stack products, each one built to solve a real problem."
      />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {projects.map((p, i) => (
          <BentoCard
            key={p.slug}
            index={i}
            tag={`WORK_0${i + 1}`}
            className={i === 2 ? "sm:col-span-2" : undefined}
          >
            <ProjectCard project={p} />
          </BentoCard>
        ))}
      </div>
    </div>
  );
}
