"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useIsTouch, useReducedMotion } from "@/hooks/use-interaction-prefs";

// Lazy-load the WebGL shader on the client only to avoid SSR issues and shave initial JS.
const Warp = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.Warp),
  { ssr: false }
);

const SHADER_PROPS = {
  proportion: 0.45,
  softness: 1,
  distortion: 0.25,
  swirl: 0.8,
  swirlIterations: 10,
  shape: "checks" as const,
  shapeScale: 0.1,
  scale: 1,
  rotation: 0,
  speed: 0.6,
  colors: [
    "hsl(40, 6%, 92%)",
    "hsl(40, 6%, 85%)",
    "hsl(40, 5%, 78%)",
    "hsl(40, 6%, 88%)",
  ],
};

/**
 * Global, fixed full-viewport shader. Runs on desktop only.
 * On touch, returns null so the per-hero variant takes over.
 * On reduced-motion, returns null so the body's static gradient shows.
 */
export function WarpBackground() {
  const [mounted, setMounted] = useState(false);
  const isTouch = useIsTouch();
  const reduceMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (isTouch) return null;
  if (reduceMotion) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      <Warp style={{ height: "100%", width: "100%" }} {...SHADER_PROPS} />
    </div>
  );
}

/**
 * Hero-scoped shader for mobile. Renders absolute inside the hero so it
 * scrolls away with the page. Desktop returns null because the global covers it.
 */
export function HeroWarp() {
  const [mounted, setMounted] = useState(false);
  const isTouch = useIsTouch();
  const reduceMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (!isTouch) return null;
  if (reduceMotion) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      <Warp style={{ height: "100%", width: "100%" }} {...SHADER_PROPS} />
    </div>
  );
}

export default WarpBackground;
