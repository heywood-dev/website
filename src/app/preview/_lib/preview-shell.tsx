import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/work";
import { Athletics } from "@/components/sections/athletics";
import { Writing } from "@/components/sections/writing";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

export const WARM_CREAM_SHADER = [
  "hsl(36, 18%, 90%)",
  "hsl(34, 16%, 84%)",
  "hsl(32, 14%, 78%)",
  "hsl(38, 18%, 88%)",
];

interface PreviewShellProps {
  variant: "a" | "b" | "c";
  shaderColors?: string[];
  label: string;
  blurb: string;
}

export function PreviewShell({ variant, shaderColors, label, blurb }: PreviewShellProps) {
  return (
    <div data-variant={variant}>
      {/* Variant tag — sits top-left so you know which preview you're looking at. */}
      <div
        className="fixed top-4 left-4 z-[70] px-3 py-1 rounded-md text-xs"
        style={{
          fontFamily: "var(--font-sans)",
          backgroundColor: "rgba(255, 250, 240, 0.7)",
          backdropFilter: "blur(8px)",
          color: "var(--foreground)",
          border: "1px solid var(--hairline)",
        }}
      >
        <span className="small-caps tracking-widest">{label}</span>
        <span style={{ marginLeft: "0.5rem", color: "var(--muted)" }}>·</span>
        <span style={{ marginLeft: "0.5rem", color: "var(--muted)" }}>{blurb}</span>
      </div>

      <Nav />
      <main>
        <Hero shaderColors={shaderColors} />
        <About />
        <Experience />
        <Projects />
        <Athletics />
        <Writing />
        <Education />
        <Contact />
        <footer
          className="border-t py-8"
          style={{ borderColor: "var(--hairline)" }}
        >
          <div className="mx-auto max-w-4xl px-6 md:px-12 flex items-center justify-between">
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
            >
              Devanté Heywood
            </span>
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
            >
              {new Date().getFullYear()}
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
