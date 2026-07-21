"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-interaction-prefs";

/**
 * Hand-painted landmark illustration used as a soft background watermark:
 * placed to the right, bleeding off the edge, toned tone-on-tone and faded so
 * the copy stays readable on the left. Fades in on view.
 */
export function ImageWatermark({
  src,
  justify = "end",
  innerStyle,
  imgStyle,
}: {
  src: string;
  justify?: "center" | "end";
  innerStyle?: CSSProperties;
  imgStyle?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`absolute inset-0 z-0 pointer-events-none flex items-center ${
        justify === "end" ? "justify-end" : "justify-center"
      }`}
      initial={reduce ? { opacity: 1 } : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      aria-hidden
    >
      <div style={innerStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="block h-auto w-full" style={imgStyle} />
      </div>
    </motion.div>
  );
}
