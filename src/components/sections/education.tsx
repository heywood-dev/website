"use client";

import { motion } from "framer-motion";

export function Education() {
  return (
    <section id="education" className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-6 md:px-12 py-16 md:py-24" style={{ background: "radial-gradient(ellipse at center, rgba(12, 12, 12, 0.80) 0%, rgba(12, 12, 12, 0.78) 55%, rgba(12, 12, 12, 0.55) 80%, rgba(12, 12, 12, 0.22) 94%, rgba(12, 12, 12, 0) 100%)" }}>
        <div className="grid md:grid-cols-[1fr_3fr] gap-12 md:gap-16 items-start">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="small-caps text-sm md:text-base tracking-widest"
            style={{ fontFamily: "var(--font-sans)", color: "rgba(255, 255, 255, 0.7)" }}
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
              style={{ fontFamily: "var(--font-sans)", color: "#FFFFFF" }}
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
