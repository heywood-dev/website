"use client";

import dynamic from "next/dynamic";
import { PreviewShell } from "../_lib/preview-shell";

const HeroBgWaves = dynamic(
  () => import("@/components/ui/hero-bg-waves").then((m) => m.HeroBgWaves),
  { ssr: false }
);

export default function PreviewWaves() {
  return (
    <PreviewShell
      variant="b"
      HeroBackground={HeroBgWaves}
      label="Hero — Waves"
      blurb="Slow organic waves, mouse bends the surface"
    />
  );
}
