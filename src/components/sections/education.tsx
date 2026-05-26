"use client";

import { motion } from "framer-motion";

export function Education() {
  return (
    <section id="education" className="py-32 md:py-48">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_3fr] gap-12 md:gap-16 items-start">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="small-caps text-xs tracking-widest"
            style={{ fontFamily: "var(--font-inter)", color: "#6B6358" }}
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
              style={{ fontFamily: "var(--font-inter)", color: "#1A1612" }}
            >
              University of Pennsylvania. B.S.E. Systems Engineering, concentration in
              AI and Data Analytics. May 2026.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
