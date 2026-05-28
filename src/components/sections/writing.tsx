"use client";

import { motion } from "framer-motion";

export function Writing() {
  return (
    <section id="writing" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="small-caps text-sm md:text-base tracking-widest mb-6 md:mb-8"
          style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
        >
          Writing
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p
            className="text-base leading-relaxed"
            style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
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
    </section>
  );
}
