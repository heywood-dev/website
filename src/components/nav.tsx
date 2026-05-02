"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Athletics",  href: "#athletics" },
  { label: "Writing",    href: "#writing" },
  { label: "Contact",    href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 right-0 z-50 p-6 md:p-8 transition-opacity duration-300"
      style={{ opacity: scrolled ? 0.65 : 1 }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = scrolled ? "0.65" : "1"; }}
    >
      <ul className="flex items-center gap-5 md:gap-7">
        {links.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              className="small-caps text-xs tracking-widest transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter)", color: "#1A1612" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#B8643C"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#1A1612"; }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
