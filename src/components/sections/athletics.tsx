"use client";

import { motion } from "framer-motion";

export function Athletics() {
  return (
    <section id="athletics" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_3fr] gap-12 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2
              className="small-caps text-sm md:text-base tracking-widest"
              style={{ fontFamily: "var(--font-sans)", color: "#6B6B66" }}
            >
              Athletics
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p
              className="text-lg md:text-xl leading-snug max-w-[52ch]"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300, color: "#1A1A18" }}
            >
              Participated at the highest levels of the sport, including a national
              age-group{" "}
              <a
                href="https://www.jamaicaobserver.com/2022/06/20/quarter-miler-devante-heywood-gets-upenn-opportunity/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-transparent hover:border-current transition-colors duration-200"
                style={{ color: "inherit" }}
              >
                record
              </a>{" "}
              in Jamaica that has stood for over a decade.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
