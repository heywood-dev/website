"use client";

import { motion } from "framer-motion";
import { HeroWarp } from "@/components/ui/warp-background";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Mobile-only shader scoped to the hero. Desktop uses the global WarpBackground. */}
      <HeroWarp />

      {/* Dark radial scrim so the name and positioning line stay crisp over the shader. */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at center, rgba(236, 236, 232, 0.5) 0%, rgba(236, 236, 232, 0.25) 35%, rgba(236, 236, 232, 0) 78%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="leading-none tracking-tight"
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            fontWeight: 300,
            color: "#1A1A18",
          }}
        >
          Devanté Heywood
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.18 }}
          className="mt-6 text-base md:text-lg max-w-xl"
          style={{
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.01em",
            color: "#1A1A18",
          }}
        >
          I build operational systems that non-technical teams actually use.
        </motion.p>
      </div>

      {/* Scroll cue, 1px hairline */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-12 z-10"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        aria-hidden
      />
    </section>
  );
}
