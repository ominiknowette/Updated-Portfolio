import { cn } from "@/lib/utils";

export default function Sparkle({
  variant = "four",
  className,
  animated = true,
}: {
  variant?: "four" | "eight";
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      fill="none"
      className={cn(
        "pointer-events-none absolute h-12 w-12 text-white/30",
        animated && "sparkle-slow",
        className
      )}
    >
      {variant === "four" ? (
        <>
          <path
            d="M32 4 C34.2 19.4 36.8 28.1 60 32 C36.8 35.9 34.2 44.6 32 60 C29.8 44.6 27.2 35.9 4 32 C27.2 28.1 29.8 19.4 32 4Z"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="32" r="1.4" fill="currentColor" opacity="0.55" />
        </>
      ) : (
        <>
          <path d="M32 3V61" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M3 32H61" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M13 13L51 51" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" />
          <path d="M51 13L13 51" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" />
          <circle cx="32" cy="32" r="1.2" fill="currentColor" opacity="0.5" />
        </>
      )}
    </svg>
  );
}
