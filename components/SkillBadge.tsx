export default function SkillBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] font-normal tracking-[0.04em] text-ink-soft transition-colors hover:border-accent-violet/40 hover:text-ink hover:bg-white/[0.06]">
      {label}
    </span>
  );
}
