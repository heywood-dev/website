"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_3fr] gap-12 md:gap-16 items-start">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="small-caps text-sm md:text-base tracking-widest"
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
              <a
                href="https://www.jamaicaobserver.com/2022/06/20/quarter-miler-devante-heywood-gets-upenn-opportunity/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-link"
              >
                University of Pennsylvania
                <ArrowUpRight size={14} aria-hidden strokeWidth={1.75} />
              </a>
              . B.S.E. Systems Engineering, concentration in AI and Data Analytics.
              May 2026.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
