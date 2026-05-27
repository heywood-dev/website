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
              style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
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
              className="text-lg md:text-xl leading-snug max-w-[60ch]"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300, color: "var(--foreground)" }}
            >
              Participated at the highest levels of the sport, including a{" "}
              <a
                href="https://past.jamaica-gleaner.com/article/sports/20160208/unstoppable-bromfield-leads-record-fest-western-champs"
                target="_blank"
                rel="noopener noreferrer"
                className="athletics-link"
              >
                national age-group record
              </a>{" "}
              in Jamaica that has{" "}
              <a
                href="https://www.jamaicaobserver.com/2022/06/20/quarter-miler-devante-heywood-gets-upenn-opportunity/"
                target="_blank"
                rel="noopener noreferrer"
                className="athletics-link"
              >
                stood for over a decade
              </a>
              , and a{" "}
              <a
                href="https://pennathletics.com/news/2023/4/29/men-shatter-record-t-f-set-six-program-marks-at-127th-running-of-the-penn-relays.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="athletics-link"
              >
                program-history relay finish
              </a>{" "}
              for Penn at the Penn Relays.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
