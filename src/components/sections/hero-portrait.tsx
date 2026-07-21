"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HeroBgWaves } from "@/components/ui/hero-bg-waves";
import { useIsTouch, useReducedMotion } from "@/hooks/use-interaction-prefs";

const EASE_OUT_EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];

// Letter-by-letter mask reveal. Each glyph rises from below its own
// overflow-hidden column. `start` is the running glyph index so the stagger
// continues across the two stacked lines.
function MaskLine({
  text,
  start,
  reduce,
}: {
  text: string;
  start: number;
  reduce: boolean;
}) {
  const letters = Array.from(text);
  return (
    <span className="block" style={{ whiteSpace: "nowrap" }}>
      {letters.map((ch, i) => {
        const idx = start + i;
        return (
          <span
            key={idx}
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.12em" }}
          >
            <motion.span
              className="inline-block"
              initial={reduce ? false : { y: "115%" }}
              animate={reduce ? {} : { y: "0%" }}
              transition={{
                delay: 0.42 + idx * 0.045,
                duration: 1.05,
                ease: EASE_OUT_EXPO,
              }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

const softVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: "easeOut" },
  }),
};

export function HeroPortrait() {
  const reduce = useReducedMotion();
  const isTouch = useIsTouch();
  const parallax = !reduce && !isTouch;

  // Cursor counter-parallax on the name (barely-there, opposite the cursor).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const nameX = useSpring(useTransform(px, [-0.5, 0.5], [14, -14]), {
    stiffness: 120,
    damping: 20,
  });
  const nameY = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), {
    stiffness: 120,
    damping: 20,
  });

  useEffect(() => {
    if (!parallax) return;
    const onMove = (e: MouseEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [parallax, px, py]);

  return (
    <section
      id="hero"
      className="relative flex items-center min-h-screen overflow-hidden"
    >
      {/* Shader background blooms in on mount, then rests (and reacts to cursor
          via the shader's own damped mouse uniform). */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={reduce ? false : { opacity: 0, scale: 1.06 }}
        animate={reduce ? {} : { opacity: 1, scale: 1 }}
        transition={{
          opacity: { duration: 1.2, ease: "easeOut" },
          scale: { duration: 1.6, ease: "easeOut" },
        }}
        aria-hidden
      >
        <HeroBgWaves />
      </motion.div>

      {/* Legibility scrim over the waves */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 30% 45%, var(--scrim) 0%, color-mix(in srgb, var(--scrim) 40%, transparent) 45%, transparent 80%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[1.55fr_0.45fr] items-center gap-10 md:gap-14">
          {/* Text column */}
          <div className="order-2 md:order-1">
            <motion.h1
              className="leading-none tracking-tight"
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(2.4rem, 5.6vw, 4.6rem)",
                fontWeight: 300,
                color: "var(--foreground)",
                x: parallax ? nameX : 0,
                y: parallax ? nameY : 0,
              }}
            >
              <MaskLine text="Devanté Heywood" start={0} reduce={reduce} />
            </motion.h1>

            <motion.span
              custom={0.95}
              variants={softVariants}
              initial={reduce ? false : "hidden"}
              animate="visible"
              className="small-caps text-xs md:text-sm tracking-[0.28em] block mt-4"
              style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
            >
              Engineer · Entrepreneur · Systems Thinker
            </motion.span>

            <motion.p
              custom={1.05}
              variants={softVariants}
              initial={reduce ? false : "hidden"}
              animate="visible"
              className="mt-5 text-base md:text-lg max-w-lg leading-relaxed"
              style={{
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.01em",
                color: "var(--foreground)",
              }}
            >
              I&apos;m interested in how belief shapes possibility, and how{" "}
              <span className="accent-emph">systems</span> turn possibility into
              reality.
            </motion.p>
          </div>

          {/* Portrait column — natural colors, soft-feathered circle that melts
              into the sand. */}
          <motion.div
            className="order-1 md:order-2 justify-self-center md:justify-self-end"
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={reduce ? {} : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.9, ease: "easeOut" }}
          >
            <div className="portrait-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/portrait.png" alt="Devanté Heywood" width={240} height={240} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Long fade so the waves melt smoothly into the body sand. End color
          matches the body background exactly, so there's no visible seam. */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 md:h-64 z-[6] pointer-events-none"
        aria-hidden
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--background) 55%, transparent) 55%, var(--background) 92%, var(--background) 100%)",
        }}
      />

      {/* Scroll cue — a softly pulsing down arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{ color: "rgba(30, 24, 18, 0.45)" }}
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? {} : { opacity: 1 }}
        transition={{ delay: 1.25, duration: 0.6, ease: "easeOut" }}
        aria-hidden
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 7, 0], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 1.7, ease: "easeInOut", repeat: Infinity }}
        >
          <ChevronDown size={26} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
