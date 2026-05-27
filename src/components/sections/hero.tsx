"use client";

import { motion } from "framer-motion";
import { HeroBgWaves } from "@/components/ui/hero-bg-waves";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
    >
      <HeroBgWaves />

      {/* Soft radial scrim behind hero text so it stays crisp over the moving waves. */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at center, var(--scrim) 0%, color-mix(in srgb, var(--scrim) 50%, transparent) 35%, transparent 78%)",
        }}
      />

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
            color: "var(--foreground)",
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
            color: "var(--foreground)",
          }}
        >
          I build operational systems that non-technical teams{" "}
          <span className="accent-emph">actually</span> use.
        </motion.p>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-12 z-10"
        style={{ backgroundColor: "rgba(30, 24, 18, 0.3)" }}
        aria-hidden
      />

      {/* Long fade where the wave shader meets the static body sand.
          End color matches body bg-color exactly (solid #E4D5BA), so the
          transition is seamless and no horizontal edge is visible. */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 md:h-40 z-[5] pointer-events-none"
        aria-hidden
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, var(--background) 75%, var(--background) 100%)",
        }}
      />
    </section>
  );
}
