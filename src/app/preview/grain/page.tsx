"use client";

import dynamic from "next/dynamic";
import { PreviewShell } from "../_lib/preview-shell";

const HeroBgGrain = dynamic(
  () => import("@/components/ui/hero-bg-grain").then((m) => m.HeroBgGrain),
  { ssr: false }
);

export default function PreviewGrain() {
  return (
    <PreviewShell
      variant="b"
      HeroBackground={HeroBgGrain}
      label="Hero — Grain"
      blurb="Drifting cream surface, mouse swirls the texture"
    />
  );
}
