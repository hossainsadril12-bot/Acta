"use client";

import { useEffect } from "react";

// One observer for every [data-reveal] element on the page (see src/lib/reveal.ts).
// Each element is revealed once, when about 15% of it is on screen.
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const els = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    // A wiped heading starts fully clipped, which gives it no visible area, so the observer
    // would never see it enter. Watch its parent box instead and reveal the heading from there.
    const byTarget = new Map<Element, HTMLElement[]>();
    for (const el of els) {
      const target = el.dataset.reveal === "wipe" && el.parentElement ? el.parentElement : el;
      byTarget.set(target, [...(byTarget.get(target) ?? []), el]);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          byTarget.get(entry.target)?.forEach((el) => el.classList.add("is-in"));
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    byTarget.forEach((_, target) => io.observe(target));
    root.classList.add("reveal-ready");
    return () => io.disconnect();
  }, []);

  return null;
}
