/**
 * Global aurora background — "soft living light behind glass UI".
 *
 * A calm, three-layer atmospheric system. No image file, no canvas, no
 * WebGL, no particle libraries, no mouse tracking, no Framer Motion. Every
 * moving layer here animates `translate3d` (and, very subtly, `opacity`)
 * only — never `scale`, `blur`, `box-shadow`, or `width`/`height` — so
 * nothing ever touches layout and the browser never has to repaint, only
 * recomposite. That's also what keeps the UI on top perfectly still: the
 * background has its own stacking context and can't leak transforms onto
 * anything else on the page.
 *
 * Layer map (see the "Aurora background" block in globals.css):
 *  - .aurora-base   — Layer A: static near-black/navy gradient, no motion
 *  - .aurora-glow-a — Layer B: large, very-low-opacity ambient glow field
 *  - .aurora-glow-b — Layer B: second ambient glow field, offset + reversed
 *  - .aurora-ribbon — Layer C: single soft aurora wave drifting sideways
 *
 * Mobile (<768px) keeps only `.aurora-ribbon` alive — everything else is
 * hidden via `.aurora-desktop-only` — at reduced opacity, a smaller travel
 * range, and a slower duration, so low-end Android stays smooth.
 * `prefers-reduced-motion` freezes all motion and leaves only the static
 * glow in place.
 */
export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="aurora-root fixed inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <div className="aurora-base" />
      <div className="aurora-glow-a aurora-desktop-only" />
      <div className="aurora-glow-b aurora-desktop-only" />
      <div className="aurora-ribbon" />
    </div>
  );
}
