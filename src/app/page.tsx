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
        <footer
          className="border-t py-8"
          style={{ borderColor: "#D9D2C5", backgroundColor: "#F5F1EA" }}
        >
          <div className="mx-auto max-w-4xl px-6 md:px-12 flex items-center justify-between">
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-inter)", color: "#6B6358" }}
            >
              Devanté Heywood
            </span>
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-inter)", color: "#6B6358" }}
            >
              {new Date().getFullYear()}
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
