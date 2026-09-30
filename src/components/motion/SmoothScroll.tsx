"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const HEADER_CLEARANCE = 88; // same as html scroll-padding-top: lands content below the sticky header

// Smooth, weighted page scrolling with Lenis (the library terascape.framer.website uses).
// The page eases toward the scroll target instead of jumping, which reads as calm and premium.
// Touch devices keep native scrolling; reduced motion turns the smoothing off (Lenis default).
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.07, // lower = slower, heavier glide (Lenis default 0.1)
      wheelMultiplier: 0.85,
      stopInertiaOnNavigate: true,
      prevent: (node) => node.closest("dialog, .menu-sheet") !== null,
    });

    // In-page links: measure the section's real position at click time, then glide there.
    // (Lenis's own `anchors` option mis-measured targets when scrolling back up.)
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!link || !hash || hash === "#") return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_CLEARANCE;
      lenis.scrollTo(Math.max(0, top), { duration: 1.4 });
      history.pushState(null, "", hash);
      // Move keyboard focus to the section too, as a native anchor jump would.
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
