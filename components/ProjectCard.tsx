import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import ProjectPreview from "./ProjectPreview";
import { cn } from "@/lib/utils";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col">
      <ProjectPreview type={project.preview} />

      <div className="mt-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-[13px] font-medium text-accent-blue">
            {project.type}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold leading-snug text-ink">
            {project.title}
          </h3>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.05em]",
            project.status === "Completed"
              ? "border-accent-blue/30 bg-accent-blue/10 text-accent-blue"
              : "border-amber-400/30 bg-amber-400/10 text-amber-300"
          )}
        >
          {project.status === "Completed" ? "SHIPPED" : "IN PROGRESS"}
        </span>
      </div>

      <p className="mt-3 flex-1 text-[15px] leading-[1.62] text-ink-soft">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tools.slice(0, 6).map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-ink-muted"
          >
            {t}
          </span>
        ))}
        {project.tools.length > 6 && (
          <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-ink-muted">
            +{project.tools.length - 6}
          </span>
        )}
      </div>

      <div className="mt-5">
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent-blue"
          >
            View Project
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted">
            Live link coming soon
          </span>
        )}
      </div>
    </div>
  );
}
