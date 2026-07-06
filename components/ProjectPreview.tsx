import { Heart, Sparkles, BarChart3, LayoutGrid, GraduationCap } from "lucide-react";
import type { Project } from "@/data/projects";

function Calculator() {
  const keys = ["7", "8", "9", "+", "4", "5", "6", "−", "1", "2", "3", "×"];
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-[190px] rounded-2xl bg-black/30 p-3 card-border">
        <div className="mb-2 rounded-lg bg-black/40 px-3 py-2 text-right font-mono text-sm text-ink">
          sum([2,7,9,4]) <span className="text-accent-blue">= 22</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {keys.map((k, i) => (
            <div
              key={i}
              className="flex h-7 items-center justify-center rounded-md bg-white/[0.05] font-mono text-[11px] text-ink-muted"
            >
              {k}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Romantic() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute h-40 w-40 rounded-full bg-accent-violet/25 blur-3xl" />
      <div className="absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-accent-blue/25 blur-3xl" />
      <div className="relative z-10 flex flex-col items-center gap-2">
        <Heart className="h-8 w-8 text-accent-violet" strokeWidth={1.5} fill="currentColor" fillOpacity={0.15} />
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-accent-blue" />
          <span className="font-display text-sm text-ink-soft">will you?</span>
          <Sparkles className="h-3.5 w-3.5 text-accent-blue" />
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="grid h-full w-full grid-cols-3 gap-2">
      <div className="col-span-2 rounded-xl bg-black/30 p-2.5 card-border">
        <div className="flex h-full items-end gap-1.5">
          {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-accent-blue/60 to-accent-violet/60"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex-1 rounded-xl bg-black/30 p-2 card-border flex items-center justify-center">
          <BarChart3 className="h-4 w-4 text-accent-blue" />
        </div>
        <div className="flex-1 rounded-xl bg-black/30 p-2 card-border">
          <div className="h-1.5 w-3/4 rounded-full bg-white/10 mb-1.5" />
          <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function Portfolio() {
  return (
    <div className="grid h-full w-full grid-cols-3 grid-rows-2 gap-2">
      <div className="col-span-2 rounded-xl bg-black/30 card-border flex items-center justify-center">
        <LayoutGrid className="h-5 w-5 text-ink-muted" />
      </div>
      <div className="rounded-xl bg-gradient-to-br from-accent-blue/30 to-accent-violet/30 card-border" />
      <div className="rounded-xl bg-gradient-to-br from-accent-violet/25 to-accent-blue/10 card-border" />
      <div className="col-span-2 rounded-xl bg-black/30 card-border p-2 flex flex-col justify-center gap-1.5">
        <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
        <div className="h-1.5 w-1/3 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

function School() {
  return (
    <div className="flex h-full w-full gap-2">
      <div className="flex w-1/3 flex-col items-center justify-center gap-2 rounded-xl bg-black/30 card-border p-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-gradient/20 border border-white/10">
          <GraduationCap className="h-4 w-4 text-accent-blue" />
        </div>
        <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex-1 rounded-xl bg-black/30 card-border p-2.5 flex flex-col justify-center gap-1.5">
          <div className="h-1.5 w-full rounded-full bg-white/10" />
          <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
        </div>
        <div className="flex-1 rounded-xl bg-black/30 card-border grid grid-cols-3 gap-1.5 p-2.5">
          <div className="rounded-md bg-white/[0.06]" />
          <div className="rounded-md bg-white/[0.06]" />
          <div className="rounded-md bg-accent-blue/20" />
        </div>
      </div>
    </div>
  );
}

const map: Record<Project["preview"], () => JSX.Element> = {
  calculator: Calculator,
  romantic: Romantic,
  dashboard: Dashboard,
  portfolio: Portfolio,
  school: School,
};

export default function ProjectPreview({ type }: { type: Project["preview"] }) {
  const Comp = map[type];
  return (
    <div className="h-36 sm:h-40 w-full rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent p-3 card-border">
      <Comp />
    </div>
  );
}
