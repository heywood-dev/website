"use client";

import { motion } from "framer-motion";

/**
 * Direction A — Editorial.
 * No portrait. An atmospheric topographic / energy field behind the name,
 * tinted with Power Stack amber. Large serif display type. Reads as a
 * writer's home base.
 */
export function HeroEditorial() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Topographic contour field */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="edGlow" cx="50%" cy="42%" r="60%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.20" />
              <stop offset="45%" stopColor="var(--accent)" stopOpacity="0.06" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1200" height="800" fill="url(#edGlow)" />
          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeOpacity="0.22"
            className="ed-drift"
          >
            {Array.from({ length: 22 }).map((_, i) => {
              const y = 40 + i * 34;
              const amp = 26 + (i % 5) * 7;
              return (
                <path
                  key={i}
                  d={`M -100 ${y} C 200 ${y - amp}, 400 ${y + amp}, 600 ${y} S 1000 ${y - amp}, 1300 ${y}`}
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* Soft scrim so the name stays crisp over the field */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 62% 48% at center 44%, var(--scrim) 0%, color-mix(in srgb, var(--scrim) 45%, transparent) 40%, transparent 78%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="small-caps text-xs md:text-sm tracking-[0.28em] mb-6"
          style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
        >
          Operator · Writer
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.06 }}
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
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="mt-7 text-base md:text-lg max-w-2xl leading-relaxed"
          style={{
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.01em",
            color: "var(--foreground)",
          }}
        >
          I build operational systems that non-technical teams{" "}
          <span className="accent-emph">actually</span> use, and I write{" "}
          <span className="accent-emph">Power Stack</span>, on the energy behind AI.
        </motion.p>
      </div>

      {/* Long fade into the body */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 md:h-40 z-[5] pointer-events-none"
        aria-hidden
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, var(--background) 82%, var(--background) 100%)",
        }}
      />
    </section>
  );
}
