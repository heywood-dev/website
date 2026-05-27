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
  { label: "Writing",    href: "#writing" },
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
      {/* Desktop nav: md and up. Single subtle glass tint on the floating bar. */}
      <nav
        className="fixed top-4 right-4 z-50 px-5 py-3 rounded-lg transition-opacity duration-300 hidden md:block"
        style={{
          opacity: scrolled ? 0.78 : 1,
          backgroundColor: "rgba(237, 228, 211, 0.55)",
          backdropFilter: "blur(10px) saturate(1.05)",
          WebkitBackdropFilter: "blur(10px) saturate(1.05)",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = scrolled ? "0.78" : "1"; }}
      >
        <ul className="flex items-center gap-6 lg:gap-8">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Magnetic strength={0.3} radius={70}>
                <a
                  href={href}
                  className="small-caps text-base md:text-lg tracking-widest transition-colors duration-200"
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

      {/* Mobile burger button */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        className="fixed top-4 right-4 z-[60] md:hidden p-2 rounded-md"
        style={{
          color: "var(--foreground)",
          backgroundColor: open ? "transparent" : "rgba(237, 228, 211, 0.55)",
          backdropFilter: open ? "none" : "blur(10px) saturate(1.05)",
        }}
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile overlay menu */}
      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden flex flex-col items-center justify-center"
          style={{ backgroundColor: "rgba(237, 228, 211, 0.97)" }}
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
