/**
 * Global ambient background.
 *
 * Purely decorative — a few soft, slow-moving glow orbs plus a faint
 * aurora ribbon sweep behind all page content. No JS, no canvas, no
 * WebGL, no video, no particles, no mouse tracking: everything here is
 * plain CSS (see .ambient-orb / .ambient-ribbon in globals.css), so it
 * costs effectively nothing at runtime.
 *
 * Mobile (<768px) and prefers-reduced-motion both fall back to a static,
 * low-opacity glow with no animation — handled entirely by the media
 * queries in globals.css, not by this component.
 */
export default function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="ambient-orb ambient-orb-blue absolute -top-32 left-[6%] h-[380px] w-[380px] sm:h-[560px] sm:w-[560px]" />
      <div className="ambient-orb ambient-orb-violet absolute top-[18%] right-[-12%] h-[340px] w-[340px] sm:h-[520px] sm:w-[520px]" />
      <div className="ambient-orb ambient-orb-indigo absolute bottom-[-10%] left-[28%] h-[320px] w-[320px] sm:h-[480px] sm:w-[480px]" />
      <div className="ambient-ribbon" />
    </div>
  );
}
