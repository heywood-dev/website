import type { CSSProperties } from "react";
import { Nav } from "@/components/nav";
import { HeroEditorial } from "@/components/sections/hero-editorial";
import { About } from "@/components/sections/about";
import { Writing } from "@/components/sections/writing";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Projects } from "@/components/sections/work";
import { Athletics } from "@/components/sections/athletics";
import { Contact } from "@/components/sections/contact";

// Direction A — Editorial. Cream + Power Stack amber. Writing pulled high.
const skin = {
  "--background": "#F5F2EC",
  "--foreground": "#211D16",
  "--muted": "#6E5F4E",
  "--accent": "#C85A1E",
  "--hairline": "rgba(33, 29, 22, 0.14)",
  "--scrim": "rgba(245, 242, 236, 0.62)",
  background: "var(--background)",
  color: "var(--foreground)",
  minHeight: "100vh",
} as CSSProperties;

export default function PreviewA() {
  return (
    <div style={skin}>
      <Nav />
      <main>
        <HeroEditorial />
        <About />
        <Writing />
        <Experience />
        <Education />
        <Projects />
        <Athletics />
        <Contact />
        <footer className="border-t py-8" style={{ borderColor: "var(--hairline)" }}>
          <div className="mx-auto max-w-4xl px-6 md:px-12 flex items-center justify-between">
            <span className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}>
              Devanté Heywood
            </span>
            <span className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}>
              Direction A · Editorial
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
