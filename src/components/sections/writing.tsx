"use client";

import { motion } from "framer-motion";

export function Writing() {
  return (
    <section id="writing" className="py-12 md:py-20">
      <div
        className="mx-auto max-w-5xl px-6 md:px-12 py-14 md:py-20 border"
        style={{ backgroundColor: "rgba(20, 20, 20, 0.94)", borderColor: "rgba(255, 255, 255, 0.08)" }}
      >
        <div className="grid md:grid-cols-[1fr_3fr] gap-12 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2
              className="small-caps text-xs tracking-widest"
              style={{ fontFamily: "var(--font-inter)", color: "rgba(255, 255, 255, 0.7)" }}
            >
              Writing
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p
              className="text-base leading-relaxed"
              style={{ fontFamily: "var(--font-inter)", color: "rgba(255, 255, 255, 0.7)" }}
            >
              More soon.
            </p>
            {/*
              To add an essay:
              1. Create src/app/writing/[slug]/page.mdx
              2. Export metadata: { title, date, description }
              3. Add it to an essays array here and link to /writing/[slug]
            */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
