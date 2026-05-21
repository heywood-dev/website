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
    <section id="about" className="py-32 md:py-48" style={{ backgroundColor: "#F5F1EA" }}>
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_3fr] gap-12 md:gap-16 items-start">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="small-caps text-xs tracking-widest"
            style={{ fontFamily: "var(--font-inter)", color: "#6B6358" }}
          >
            About
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-7 max-w-[65ch]"
          >
            <motion.p
              variants={paraVariants}
              className="text-base md:text-lg leading-[1.75]"
              style={{ fontFamily: "var(--font-inter)", color: "#1A1612" }}
            >
              I&apos;m a Systems Engineer trained at Penn, with a concentration in AI
              and Data Analytics. I work across consulting, business operations, and
              founding, and the through-line is the same in each: take messy operational
              data and turn it into something a team can actually use to make decisions.
            </motion.p>

            <motion.p
              variants={paraVariants}
              className="text-base md:text-lg leading-[1.75]"
              style={{ fontFamily: "var(--font-inter)", color: "#1A1612" }}
            >
              The way I work is simple. I find where a system breaks down, build the
              thing that fixes the right part of it, and make sure the people doing the
              job will actually use it. I ship fast and I learn faster. The projects
              below are that instinct applied across different domains.
            </motion.p>

            <motion.p
              variants={paraVariants}
              className="text-base md:text-lg leading-[1.75]"
              style={{ fontFamily: "var(--font-inter)", color: "#1A1612" }}
            >
              I want to work at the intersection of client, product, and operations.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
