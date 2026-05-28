"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

const links = [
  { label: "About",      href: "#about" },
  { label: "Education",  href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Athletics",  href: "#athletics" },
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

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <>
      {/* Desktop nav: plain text, no glass tint. */}
      <nav
        className="fixed top-6 right-6 md:top-8 md:right-8 z-50 transition-opacity duration-300 hidden md:block"
        style={{ opacity: scrolled ? 0.78 : 1 }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = scrolled ? "0.78" : "1"; }}
      >
        <ul className="flex items-center gap-5 lg:gap-7">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Magnetic strength={0.3} radius={70}>
                <a
                  href={href}
                  className="small-caps text-sm md:text-base tracking-widest transition-colors duration-200"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--foreground)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--foreground)"; }}
                >
                  {label}
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile burger button: plain, no backdrop. */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        className="fixed top-4 right-4 z-[60] md:hidden p-2"
        style={{ color: "var(--foreground)" }}
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile overlay menu */}
      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden flex flex-col items-center justify-center"
          style={{ backgroundColor: "rgba(228, 213, 186, 0.97)" }}
        >
          <ul className="flex flex-col items-center gap-7">
            {links.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="small-caps text-2xl tracking-widest transition-colors duration-200"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--foreground)" }}
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
