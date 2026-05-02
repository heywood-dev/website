"use client";

import { motion } from "framer-motion";

export function Writing() {
  return (
    <section id="writing" className="py-24 md:py-36" style={{ backgroundColor: "#F5F1EA" }}>
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2
              className="small-caps text-xs tracking-widest"
              style={{ fontFamily: "var(--font-inter)", color: "#6B6358" }}
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
              style={{ fontFamily: "var(--font-inter)", color: "#6B6358" }}
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
