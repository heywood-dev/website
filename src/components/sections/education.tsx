"use client";

import { motion } from "framer-motion";

export function Education() {
  return (
    <section id="education" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
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
            AI and Data Analytics. May 2026.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
