import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/work";
import { Athletics } from "@/components/sections/athletics";
import { Writing } from "@/components/sections/writing";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Athletics />
        <Writing />
        <Education />
        <Contact />
        <footer
          className="border-t py-8"
          style={{ borderColor: "rgba(255, 255, 255, 0.15)" }}
        >
          <div className="mx-auto max-w-4xl px-6 md:px-12 flex items-center justify-between">
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-sans)", color: "rgba(255, 255, 255, 0.7)" }}
            >
              Devanté Heywood
            </span>
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-sans)", color: "rgba(255, 255, 255, 0.7)" }}
            >
              {new Date().getFullYear()}
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
