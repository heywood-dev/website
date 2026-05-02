"use client";

import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const paraVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export function About() {
  return (
    <section id="about" className="py-24 md:py-36" style={{ backgroundColor: "#F5F1EA" }}>
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
              About
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-6"
          >
            <motion.p
              variants={paraVariants}
              className="text-base md:text-lg leading-[1.75] max-w-[65ch]"
              style={{ fontFamily: "var(--font-inter)", color: "#1A1612" }}
            >
              I&apos;m a senior at Penn studying Systems Engineering with a concentration
              in AI and Data Analytics. I graduate in May 2026.
            </motion.p>

            <motion.p
              variants={paraVariants}
              className="text-base md:text-lg leading-[1.75] max-w-[65ch]"
              style={{ fontFamily: "var(--font-inter)", color: "#1A1612" }}
            >
              What I do is narrower than my resume makes it look. I build operational
              systems that non-technical teams actually use, and I have done it as a
              founder, a consultant, and an internal operator. The numbers and the
              stories are in Experience. The technical projects below are how I sharpen
              the same skill across different domains.
            </motion.p>

            <motion.p
              variants={paraVariants}
              className="text-base md:text-lg leading-[1.75] max-w-[65ch]"
              style={{ fontFamily: "var(--font-inter)", color: "#1A1612" }}
            >
              Outside that, I run track for Penn. Second Team All-Ivy in the 400 and
              sprint relays. In high school at Munro College in Jamaica I set a national
              age-group record in the 400 that has stood for over a decade, which{" "}
              <a
                href="https://www.jamaicaobserver.com/2022/06/20/quarter-miler-devante-heywood-gets-upenn-opportunity/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-transparent hover:border-current transition-colors duration-200"
                style={{ color: "inherit" }}
              >
                the Jamaica Observer covered
              </a>{" "}
              when I committed to Penn. I also teach personal finance to 700 high school
              students nationwide through the Wharton Global Youth Program. The thread
              across all of it is the same one I bring to operations work. Small inputs,
              repeated under pressure, compound.
            </motion.p>

            <motion.p
              variants={paraVariants}
              className="text-base md:text-lg leading-[1.75] max-w-[65ch]"
              style={{ fontFamily: "var(--font-inter)", color: "#1A1612" }}
            >
              I am looking for Strategy and Operations, BizOps, Strategic Projects, or
              Product Operations roles at AI-native startups, Seed through Series D and
              beyond. New York preferred, the broader Northeast on the table. If you are
              building something that has outgrown its operational layer, reach out.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
