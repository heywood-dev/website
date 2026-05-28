"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Athletics() {
  return (
    <section id="athletics" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="small-caps text-sm md:text-base tracking-widest mb-6 md:mb-8"
          style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
        >
          Athletics
        </motion.h2>

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
              href="https://past.jamaica-gleaner.com/article/sports/20160208/unstoppable-bromfield-leads-record-fest-western-champs#:~:text=Munro%20College%27s%20Devante%20Heywood%20was%20equally%20impressive%20in%20the%20boys%27%20Class%20Four%20400m%2C%20setting%20a%20new%20record%20of%2052.81%20seconds."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-link"
            >
              national age-group record
              <ArrowUpRight size={14} aria-hidden strokeWidth={1.75} />
            </a>{" "}
            in Jamaica, and a{" "}
            <a
              href="https://pennathletics.com/news/2023/4/29/men-shatter-record-t-f-set-six-program-marks-at-127th-running-of-the-penn-relays.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-link"
            >
              program-history relay finish
              <ArrowUpRight size={14} aria-hidden strokeWidth={1.75} />
            </a>{" "}
            for{" "}
            <a
              href="https://www.jamaicaobserver.com/2022/06/20/quarter-miler-devante-heywood-gets-upenn-opportunity/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-link"
            >
              Penn
              <ArrowUpRight size={14} aria-hidden strokeWidth={1.75} />
            </a>{" "}
            at the Penn Relays.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
