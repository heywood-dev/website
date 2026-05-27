"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

const links = [
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Athletics",  href: "#athletics" },
  { label: "Writing",    href: "#writing" },
  { label: "Education",  href: "#education" },
  { label: "Contact",    href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open.
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <>
      {/* Desktop nav: md and up */}
      <nav
        className="fixed top-0 right-0 z-50 p-6 md:p-8 transition-opacity duration-300 hidden md:block"
        style={{ opacity: scrolled ? 0.7 : 1 }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = scrolled ? "0.7" : "1"; }}
      >
        <ul className="flex items-center gap-7 lg:gap-9">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Magnetic strength={0.3} radius={70}>
                <a
                  href={href}
                  className="small-caps text-base md:text-lg tracking-widest transition-colors duration-200"
                  style={{ fontFamily: "var(--font-sans)", color: "#1A1A18" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#B8643C"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#1A1A18"; }}
                >
                  {label}
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile burger button */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        className="fixed top-4 right-4 z-[60] md:hidden p-2 rounded-md"
        style={{
          color: "#1A1A18",
          backgroundColor: open ? "transparent" : "rgba(236, 236, 232, 0.55)",
          backdropFilter: open ? "none" : "blur(6px)",
        }}
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile overlay menu */}
      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden flex flex-col items-center justify-center"
          style={{ backgroundColor: "rgba(236, 236, 232, 0.97)" }}
        >
          <ul className="flex flex-col items-center gap-7">
            {links.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="small-caps text-2xl tracking-widest transition-colors duration-200"
                  style={{ fontFamily: "var(--font-sans)", color: "#1A1A18" }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
