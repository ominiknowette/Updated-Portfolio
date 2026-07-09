"use client";

import { useEffect } from "react";

export default function ScrollStability() {
  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;

    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    if (!window.location.hash) {
      window.scrollTo({ left: 0, top: 0, behavior: "auto" });
    }

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  return null;
}
