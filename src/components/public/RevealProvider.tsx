"use client";

import { useEffect } from "react";

/**
 * Scroll reveal (§29): arms `.reveal` nodes once JS runs so content is
 * never hidden when JS fails. Fires once per page visit, ~15% threshold.
 */
export function RevealProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    const frame = requestAnimationFrame(() => root.classList.add("reveal-ready"));

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (nodes.length === 0) return () => cancelAnimationFrame(frame);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const stagger = Number(el.dataset.stagger ?? "0");
          window.setTimeout(() => el.classList.add("is-visible"), stagger);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [children]);

  return <>{children}</>;
}
