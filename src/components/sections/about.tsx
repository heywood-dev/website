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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-6 max-w-[65ch]"
        >
          <motion.p
            variants={paraVariants}
            className="text-base md:text-lg leading-[1.75]"
            style={{ fontFamily: "var(--font-inter)", color: "#1A1612" }}
          >
            I&apos;m a senior at Penn studying Systems Engineering with a concentration
            in AI and Data Analytics. I graduate in May 2026.
          </motion.p>

          <motion.p
            variants={paraVariants}
            className="text-base md:text-lg leading-[1.75]"
            style={{ fontFamily: "var(--font-inter)", color: "#1A1612" }}
          >
            I build operational systems that non-technical teams actually use. I have
            done it across consulting, business operations, and as a founder. The
            technical projects below are how I sharpen the same skill across different
            domains.
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
    </section>
  );
}
