"use client";

import { useEffect, useRef } from "react";

// Decorative hero background video (Acta's take on Nick's hero ribbon). Muted, looping, no controls.
// It plays only while the hero is on screen, and never under prefers-reduced-motion, where the
// poster frame is shown instead. The white video background is blended away in CSS (.hero-video).
export function HeroVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Without these APIs (old browsers, test environments) the poster frame stays up.
    if (typeof window.matchMedia !== "function" || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const play = () => video.play().catch(() => {});
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : video.pause()));
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <div className="hero-media" aria-hidden="true">
      <video ref={ref} className="hero-video" src={src} poster={poster} muted loop playsInline preload="metadata" tabIndex={-1} />
    </div>
  );
}
