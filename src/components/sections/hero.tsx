"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Soft radial scrim. Paper color fades to transparent so the ripple shows around,
          but the hero name and positioning line stay crisp at center. */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at center, rgba(245, 241, 234, 0.92) 0%, rgba(245, 241, 234, 0.78) 35%, rgba(245, 241, 234, 0) 75%)",
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
            color: "#1A1612",
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
            fontFamily: "var(--font-inter)",
            letterSpacing: "0.01em",
            color: "#1A1612",
          }}
        >
          I build operational systems that non-technical teams actually use.
        </motion.p>
      </div>

      {/* Scroll cue, 1px hairline */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-12"
        style={{ backgroundColor: "#D9D2C5" }}
        aria-hidden
      />
    </section>
  );
}
