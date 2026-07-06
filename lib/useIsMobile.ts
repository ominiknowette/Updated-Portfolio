"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the viewport is at or below the given breakpoint.
 * Defaults to false on the server and during the first client render to
 * avoid hydration mismatches; updates immediately after mount.
 */
export function useIsMobile(breakpoint = 640): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}
