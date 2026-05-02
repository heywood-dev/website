"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Writing", href: "#writing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
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
      className={cn(
        "fixed top-0 right-0 z-50 p-6 md:p-8 transition-opacity duration-300",
        scrolled ? "opacity-70 hover:opacity-100" : "opacity-100"
      )}
    >
      <ul className="flex items-center gap-5 md:gap-7">
        {links.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              className="small-caps text-xs tracking-widest text-[#0F0F0F] hover:text-[#3a3a3a] transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
