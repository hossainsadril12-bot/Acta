"use client";

import { useEffect, useRef } from "react";

// Plays a scripted mock demo once, when it scrolls into view, by adding `.play`. The demo parts are
// hidden beforehand only when html.reveal is armed (see components.css), so without JavaScript
// the finished mock is shown.
export function DemoPlayer({
  className = "",
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("play");
      return;
    }
    // Play once, as soon as a fifth of the demo is on screen, and never replay: a replay would
    // blank the finished mock and rebuild it every time the reader scrolls back.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("play");
        io.disconnect();
      },
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`demo ${className}`}>
      {children}
    </Tag>
  );
}
