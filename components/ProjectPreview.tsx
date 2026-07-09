import type { Project } from "@/data/projects";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[18px] border border-white/[0.055] bg-[#151515] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_5%,rgba(92,93,246,0.16),transparent_34%)]" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

function Calculator() {
  const keys = ["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "x"];
  return (
    <Frame>
      <div className="mx-auto flex h-full max-w-[230px] flex-col justify-center">
        <div className="rounded-xl border border-white/[0.055] bg-black/35 p-3">
          <div className="rounded-lg bg-black/45 px-3 py-2 text-right font-mono text-[11px] leading-5 text-grid-soft">
            sum([2,7,9,4])
            <span className="ml-2 text-accent-blue">= 22</span>
          </div>
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {keys.map((key) => (
              <span
                key={key}
                className="flex h-7 items-center justify-center rounded-md bg-white/[0.055] font-mono text-[11px] text-grid-muted"
              >
                {key}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

function Romantic() {
  return (
    <Frame>
      <div className="flex h-full items-center justify-center">
        <div className="absolute h-32 w-32 rounded-full bg-accent-violet/15 blur-3xl" />
        <div className="relative w-full max-w-[245px] rounded-2xl border border-white/[0.06] bg-black/25 p-4">
          <svg viewBox="0 0 90 78" className="mx-auto h-14 w-16 text-white/55" fill="none">
            <path
              d="M45 70C18 47 8 35 8 21C8 11 15 6 24 6C34 6 40 13 45 21C50 13 56 6 66 6C75 6 82 11 82 21C82 35 72 47 45 70Z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <p className="mt-2 text-center font-display text-[18px] font-semibold text-grid-ink">Will you?</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <span className="rounded-full bg-accent-blue/20 px-3 py-1.5 text-center text-[10px] text-grid-soft">
              Yes
            </span>
            <span className="rounded-full bg-white/[0.055] px-3 py-1.5 text-center text-[10px] text-grid-muted">
              Tell me more
            </span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function Dashboard() {
  return (
    <Frame>
      <div className="grid h-full grid-cols-[46px_1fr] gap-3">
        <aside className="rounded-xl bg-black/35 p-2">
          <span className="block h-5 w-5 rounded-md bg-accent-blue/45" />
          <div className="mt-5 space-y-2">
            {[18, 26, 16, 23].map((width) => (
              <span key={width} className="block h-1.5 rounded-full bg-white/10" style={{ width }} />
            ))}
          </div>
        </aside>
        <div className="flex min-w-0 flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
            {["42", "18", "91"].map((value, index) => (
              <div key={value} className="rounded-lg bg-black/30 p-2">
                <p className="font-mono text-[13px] text-grid-ink">{value}</p>
                <span className={index === 0 ? "mt-1 block h-1 rounded bg-accent-blue/50" : "mt-1 block h-1 rounded bg-white/10"} />
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-black/30 p-3">
            <svg viewBox="0 0 210 52" className="h-12 w-full" fill="none">
              <path d="M3 44C33 17 55 34 79 22C109 6 128 13 151 30C176 48 189 19 207 13" stroke="rgba(92,93,246,0.9)" strokeWidth="3" />
            </svg>
          </div>
          <div className="space-y-1.5">
            {[0, 1, 2].map((item) => (
              <div key={item} className="grid grid-cols-[1fr_42px] gap-2 rounded-lg bg-white/[0.035] px-2 py-1.5">
                <span className="h-1.5 self-center rounded-full bg-white/12" />
                <span className="h-4 rounded-full bg-accent-blue/15" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

function Portfolio() {
  return (
    <Frame>
      <div className="mx-auto flex h-full max-w-[270px] flex-col rounded-xl border border-white/[0.055] bg-black/25 p-3">
        <div className="flex items-center gap-2 border-b border-white/[0.055] pb-2">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="ml-auto h-1.5 w-16 rounded bg-white/10" />
        </div>
        <div className="grid flex-1 grid-cols-[1.1fr_0.9fr] gap-3 pt-3">
          <div className="flex flex-col justify-center">
            <span className="h-2 w-20 rounded bg-grid-ink/70" />
            <span className="mt-2 h-2 w-28 rounded bg-white/15" />
            <span className="mt-2 h-6 w-16 rounded-full bg-accent-blue/25" />
          </div>
          <div className="rounded-xl bg-white/[0.045] p-2">
            <div className="h-10 rounded-lg bg-white/[0.055]" />
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <span className="h-7 rounded bg-white/[0.055]" />
              <span className="h-7 rounded bg-accent-blue/15" />
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function School() {
  return (
    <Frame>
      <div className="grid h-full grid-cols-[62px_1fr] gap-3">
        <aside className="rounded-xl bg-black/35 p-2">
          <span className="block rounded-full bg-accent-blue/20 px-2 py-1 text-center text-[8px] text-accent-blue">
            School
          </span>
          <div className="mt-4 space-y-2">
            {[34, 26, 38, 22].map((width) => (
              <span key={width} className="block h-1.5 rounded-full bg-white/10" style={{ width }} />
            ))}
          </div>
        </aside>
        <div className="grid min-w-0 grid-rows-[52px_1fr] gap-2">
          <div className="grid grid-cols-[1fr_78px] gap-2">
            <div className="rounded-xl bg-black/30 p-2">
              <span className="block h-1.5 w-24 rounded bg-grid-ink/60" />
              <span className="mt-2 block h-1.5 w-16 rounded bg-white/12" />
            </div>
            <div className="rounded-xl bg-accent-blue/10 p-2 text-[9px] font-semibold text-accent-blue">
              In development
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-black/30 p-2">
              <span className="block h-1.5 w-16 rounded bg-white/14" />
              <div className="mt-3 grid grid-cols-3 gap-1">
                {[0, 1, 2, 3, 4, 5].map((item) => (
                  <span key={item} className="h-5 rounded bg-white/[0.045]" />
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-black/30 p-2">
              <span className="block h-1.5 w-20 rounded bg-white/14" />
              <span className="mt-4 block h-2 rounded-full bg-accent-blue/30" />
              <span className="mt-2 block h-2 w-2/3 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function MobileInternship() {
  return (
    <Frame>
      <div className="relative flex h-full items-center justify-center">
        <div className="absolute right-4 top-4 w-[150px] rounded-xl border border-white/[0.055] bg-black/35 p-3 font-mono text-[8px] leading-4 text-grid-muted">
          <span className="text-accent-blue">debug</span>: layout ready
          <br />
          ui.render(screen)
          <br />
          team.sync()
        </div>
        <div className="relative z-10 h-[138px] w-[74px] rounded-[20px] border border-white/[0.12] bg-[#0f0f0f] p-1.5 shadow-2xl">
          <div className="h-full rounded-[15px] bg-[#191919] p-2">
            <span className="mx-auto block h-1 w-7 rounded-full bg-white/15" />
            <div className="mt-4 space-y-2">
              <span className="block h-7 rounded-lg bg-accent-blue/20" />
              <span className="block h-5 rounded-lg bg-white/[0.06]" />
              <span className="block h-5 rounded-lg bg-white/[0.06]" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-1">
              <span className="h-1.5 rounded-full bg-white/12" />
              <span className="h-1.5 rounded-full bg-accent-blue/45" />
              <span className="h-1.5 rounded-full bg-white/12" />
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

const map: Record<Project["preview"], () => JSX.Element> = {
  calculator: Calculator,
  romantic: Romantic,
  dashboard: Dashboard,
  portfolio: Portfolio,
  school: School,
  "mobile-internship": MobileInternship,
};

export default function ProjectPreview({
  type,
  className,
}: {
  type: Project["preview"];
  className?: string;
}) {
  const Comp = map[type];

  return (
    <div className={cn("h-40 w-full rounded-[20px] bg-[#121212] p-2 sm:h-44 lg:h-48", className)}>
      <Comp />
    </div>
  );
}
