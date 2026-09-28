"use client";

import { useEffect } from "react";

/** One-shot enhancements only: all document content is visible without JS. */
export function PublicMotion() {
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("desk-in-view");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: .25 });
    document.querySelectorAll("[data-desk-motion]").forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return null;
}
