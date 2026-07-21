"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

const links = [
  { label: "About",      href: "#about" },
  { label: "Education",  href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Writing",    href: "#writing" },
  { label: "Athletics",  href: "#athletics" },
  { label: "Contact",    href: "#contact" },
];

export function Nav() {
  const [navOpacity, setNavOpacity] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fade the nav away as the hero scrolls past; brings it back near the top.
    const onScroll = () => {
      const vh = window.innerHeight || 1;
      const y = window.scrollY;
      const start = vh * 0.5;
      const end = vh * 0.92;
      const o = y <= start ? 1 : y >= end ? 0 : 1 - (y - start) / (end - start);
      setNavOpacity(o);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
        className="fixed top-6 right-6 md:top-8 md:right-8 z-50 transition-opacity duration-200 hidden md:block"
        style={{
          opacity: navOpacity,
          pointerEvents: navOpacity < 0.05 ? "none" : "auto",
        }}
      >
        <motion.ul
          className="flex items-center gap-5 lg:gap-7"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6, ease: "easeOut" }}
        >
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
        </motion.ul>
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
