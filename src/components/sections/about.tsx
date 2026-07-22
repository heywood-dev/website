"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useIsTouch, useReducedMotion } from "@/hooks/use-interaction-prefs";
import { JAMAICA_PATH } from "./_jamaica-path";

const copyVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: "easeOut" },
  }),
};

// Wakefield, Trelawny in the silhouette's 1024 coordinate space (just inland
// of the north-central coast).
const WK_X = 335;
const WK_Y = 380;
const AMBER = "#B4661C";

function JamaicaWatermark({
  reduce,
  isTouch,
  showMarker,
}: {
  reduce: boolean;
  isTouch: boolean;
  showMarker: boolean;
}) {
  const dxRaw = useMotionValue(0);
  const dyRaw = useMotionValue(0);
  const driftX = useSpring(dxRaw, { stiffness: 50, damping: 20, mass: 0.7 });
  const driftY = useSpring(dyRaw, { stiffness: 50, damping: 20, mass: 0.7 });

  useEffect(() => {
    if (reduce || isTouch) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        dxRaw.set((e.clientX / window.innerWidth - 0.5) * 20); // ±10px, very calm
        dyRaw.set((e.clientY / window.innerHeight - 0.5) * 14);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce, isTouch, dxRaw, dyRaw]);

  return (
    <motion.div
      style={{
        x: reduce ? 0 : driftX,
        y: reduce ? 0 : driftY,
        width: "min(1080px, 92vw)",
        marginRight: "clamp(-160px, -7vw, -30px)",
      }}
    >
      <svg viewBox="8 292 984 426" className="w-full h-auto" aria-hidden>
        {/* Faint filled silhouette — only slightly darker than the oat page */}
        <g
          transform="translate(0,1024) scale(0.1,-0.1)"
          fill="var(--foreground)"
          fillOpacity={0.06}
          stroke="none"
        >
          <path d={JAMAICA_PATH} />
        </g>

        {/* Wakefield — small editorial crosshair + dot + label. Hidden on
            mobile so it never sits on the paragraph text. */}
        {showMarker && (
        <g>
          {/* Soft ground shadow beneath the pin tip */}
          <ellipse cx={WK_X} cy={WK_Y + 2} rx={13} ry={3.6} fill="var(--foreground)" opacity={0.13} />

          {/* Ground ripple — a quiet pulse radiating from Wakefield */}
          {!reduce && (
            <>
              <motion.ellipse
                cx={WK_X}
                cy={WK_Y + 2}
                rx={8}
                ry={2.6}
                fill="none"
                stroke={AMBER}
                strokeWidth={1.4}
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 3.6, opacity: 0 }}
                transition={{ duration: 2.6, ease: "easeOut", repeat: Infinity, repeatDelay: 0.3 }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
              <motion.ellipse
                cx={WK_X}
                cy={WK_Y + 2}
                rx={8}
                ry={2.6}
                fill="none"
                stroke={AMBER}
                strokeWidth={1.4}
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 3.6, opacity: 0 }}
                transition={{ duration: 2.6, ease: "easeOut", repeat: Infinity, repeatDelay: 0.3, delay: 1.3 }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            </>
          )}

          {/* Teardrop map pin — tip at Wakefield, hole lets the page show through */}
          <g transform={`translate(${WK_X}, ${WK_Y})`}>
            <g transform="translate(-19.2, -36.8) scale(1.6)">
              <path
                fillRule="evenodd"
                fill="var(--foreground)"
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
              />
            </g>
          </g>

          {/* Label, set clear to the right of the pin */}
          <text
            x={WK_X + 26}
            y={WK_Y - 14}
            fill="var(--muted)"
            fontSize={16}
            letterSpacing={1.6}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            WAKEFIELD, TRELAWNY
          </text>
        </g>
        )}
      </svg>
    </motion.div>
  );
}

export function About() {
  const reduce = useReducedMotion();
  const isTouch = useIsTouch();
  const [desktop, setDesktop] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], [-34, 34]);

  return (
    <section id="about" ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden">
      {/* Jamaica watermark — behind the copy, slightly right of center */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-end"
        style={{ y: reduce ? 0 : scrollY }}
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        aria-hidden
      >
        <JamaicaWatermark reduce={reduce} isTouch={isTouch} showMarker={desktop} />
      </motion.div>

      {/* Single reading column, aligned with the hero text column */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        <div style={{ maxWidth: "clamp(560px, 52vw, 660px)" }}>
          <motion.span
            custom={0.05}
            variants={copyVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="small-caps text-sm md:text-base tracking-widest block mb-6"
            style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
          >
            About
          </motion.span>

          <motion.h2
            custom={0.16}
            variants={copyVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="leading-snug"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontWeight: 300,
              fontSize: "clamp(1.7rem, 3.2vw, 2.7rem)",
              color: "var(--foreground)",
              textWrap: "balance",
            }}
          >
            Ideas shape direction. Systems shape outcomes.
          </motion.h2>

          <div className="mt-8 space-y-6">
            <motion.p
              custom={0.3}
              variants={copyVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-base md:text-lg leading-[1.75]"
              style={{ fontFamily: "var(--font-sans)", color: "var(--foreground)" }}
            >
              I work in the space between an idea and what it becomes. Engineering
              taught me to understand how parts interact. Entrepreneurship taught me
              to move from understanding to action. Systems thinking is what connects
              the two.
            </motion.p>

            <motion.p
              custom={0.42}
              variants={copyVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-base md:text-lg leading-[1.75]"
              style={{ fontFamily: "var(--font-sans)", color: "var(--foreground)" }}
            >
              My work spans strategy, technology, automation, research, and building
              new ventures. Across each of them, I return to the same practice:
              understand the forces at work, decide what matters, and create structures
              that can hold up in the real world. I care about ideas, but even more
              about what allows them to become useful, repeatable, and lasting.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
