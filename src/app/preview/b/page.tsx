import type { CSSProperties } from "react";
import { Nav } from "@/components/nav";
import { HeroPortrait } from "@/components/sections/hero-portrait";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Projects } from "@/components/sections/work";
import { Writing } from "@/components/sections/writing";
import { Athletics } from "@/components/sections/athletics";
import { Contact } from "@/components/sections/contact";

// Direction B — Refined operator. Sand + terracotta, duotone portrait.
const skin = {
  "--background": "#E4D5BA",
  "--foreground": "#1E1812",
  "--muted": "#6E5F4E",
  "--accent": "#B5563A",
  "--hairline": "rgba(30, 24, 18, 0.16)",
  "--scrim": "rgba(228, 213, 186, 0.55)",
  background: "var(--background)",
  color: "var(--foreground)",
  minHeight: "100vh",
} as CSSProperties;

export default function PreviewB() {
  return (
    <div style={skin}>
      <Nav />
      <main>
        <HeroPortrait />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Writing />
        <Athletics />
        <Contact />
        <footer className="border-t py-8" style={{ borderColor: "var(--hairline)" }}>
          <div className="mx-auto max-w-4xl px-6 md:px-12 flex items-center justify-between">
            <span className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}>
              Devanté Heywood
            </span>
            <span className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}>
              Direction B · Refined operator
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
