// Scroll-reveal props, after the Terascape reference (terascape.framer.website):
//   wipe  - big headings uncover top to bottom (clip-path), like Terascape's headline reveal
//   fade  - small text fades in with no movement
//   slide - items slide in from the right while fading (Terascape's stat cards)
//   tilt  - cards swing in from a 3D turn (Terascape's process cards)
// RevealObserver adds `.is-in` once an element enters the viewport; CSS in components.css
// owns the motion. Without JavaScript, or with reduced motion, nothing is hidden.

export type RevealType = "wipe" | "fade" | "slide" | "tilt";

export function reveal(type: RevealType, delayMs = 0) {
  return {
    "data-reveal": type,
    style: { "--d": `${delayMs}ms` } as React.CSSProperties,
  };
}
