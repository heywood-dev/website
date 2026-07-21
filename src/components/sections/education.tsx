"use client";

import { motion } from "framer-motion";
import { ImageWatermark } from "./_landmarks";

export function Education() {
  return (
    <section id="education" className="relative overflow-hidden py-24 md:py-32">
      <ImageWatermark
        src="/landmarks/education.jpg"
        justify="end"
        innerStyle={{ width: "min(900px, 72vw)", marginRight: "clamp(-90px, -5vw, -10px)" }}
        imgStyle={{
          opacity: 0.62,
          mixBlendMode: "multiply",
          filter: "saturate(0.72) contrast(1.02)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 64% at 62% 46%, #000 14%, rgba(0,0,0,0.4) 48%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse 60% 64% at 62% 46%, #000 14%, rgba(0,0,0,0.4) 48%, transparent 80%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="small-caps text-sm md:text-base tracking-widest mb-6 md:mb-8"
          style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
        >
          Education
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p
            className="text-base md:text-lg leading-relaxed max-w-[60ch]"
            style={{ fontFamily: "var(--font-sans)", color: "var(--foreground)" }}
          >
            University of Pennsylvania. B.S.E. Systems Engineering, concentration in
            AI and Data Analytics. Class of 2026.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
