import { Nav } from "@/components/nav";
import { HeroPortrait } from "@/components/sections/hero-portrait";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Projects } from "@/components/sections/work";
import { Writing } from "@/components/sections/writing";
import { Athletics } from "@/components/sections/athletics";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
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
    </>
  );
}
