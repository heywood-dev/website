import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/work";
import { About } from "@/components/sections/about";
import { Writing } from "@/components/sections/writing";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <About />
        <Writing />
        <Contact />
        <footer className="border-t border-[#D8D8D2] py-8">
          <div className="mx-auto max-w-4xl px-6 md:px-12 flex items-center justify-between">
            <span
              className="text-xs text-[#6B6B63]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Devante Heywood
            </span>
            <span
              className="text-xs text-[#6B6B63]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {new Date().getFullYear()}
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
