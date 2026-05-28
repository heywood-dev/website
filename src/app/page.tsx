import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/work";
import { Athletics } from "@/components/sections/athletics";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
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
