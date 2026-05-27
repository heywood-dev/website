"use client";

import dynamic from "next/dynamic";
import { PreviewShell } from "../_lib/preview-shell";

const HeroBgClouds = dynamic(
  () => import("@/components/ui/hero-bg-clouds").then((m) => m.HeroBgClouds),
  { ssr: false }
);

export default function PreviewClouds() {
  return (
    <PreviewShell
      variant="b"
      HeroBackground={HeroBgClouds}
      label="Hero — Clouds"
      blurb="Drifting volumetric clouds, mouse parts them locally"
    />
  );
}
