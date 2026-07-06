import type { Stat } from "@/data/stats";

export default function StatsCard({ value, label }: Stat) {
  return (
    <div className="flex h-full flex-col justify-between">
      <span className="font-display text-3xl font-semibold leading-none tracking-[-0.02em] text-ink sm:text-4xl">
        {value}
      </span>
      <span className="mt-2 text-xs leading-snug text-ink-soft sm:text-sm">
        {label}
      </span>
    </div>
  );
}
