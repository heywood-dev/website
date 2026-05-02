"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const GenerativeMountainScene = dynamic(
  () => import("@/components/ui/mountain-scene"),
  { ssr: false }
);

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-[#FAFAF7]"
    >
      {/* Mountain scene — low opacity texture */}
      <div className="absolute inset-0 z-0 opacity-40">
        <GenerativeMountainScene />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="leading-none tracking-tight text-[#0F0F0F]"
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            fontWeight: 300,
          }}
        >
          Devante Heywood
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.18 }}
          className="mt-6 text-base md:text-lg text-[#3a3a3a] max-w-xl"
          style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.01em" }}
        >
          I build operational systems that non-technical teams actually use.
        </motion.p>
      </div>

      {/* Scroll cue — 1px hairline, no animation */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-12 bg-[#D8D8D2]"
        aria-hidden
      />
    </section>
  );
}
