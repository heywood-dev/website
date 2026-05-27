"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-interaction-prefs";

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
 * Hero-scoped Warp shader. Renders absolute inside the hero element so it
 * cannot bleed below. Returns null under prefers-reduced-motion so the
 * static body background takes over.
 */
export function HeroWarp() {
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (reduceMotion) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      <Warp style={{ height: "100%", width: "100%" }} {...SHADER_PROPS} />
    </div>
  );
}

export default HeroWarp;
