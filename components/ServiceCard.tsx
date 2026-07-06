import type { Service } from "@/data/services";

export default function ServiceCard({ title, description, icon: Icon }: Service) {
  return (
    <div className="flex h-full flex-col">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-gradient/10 border border-white/[0.08]">
        <Icon className="h-5 w-5 text-accent-blue" strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink">{title}</h3>
      <p className="mt-2 text-[15px] leading-[1.62] text-ink-soft">{description}</p>
    </div>
  );
}
