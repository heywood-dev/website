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
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="small-caps text-sm md:text-base tracking-widest mb-6 md:mb-8"
          style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
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
            style={{ fontFamily: "var(--font-sans)", color: "var(--foreground)" }}
          >
            Find the break. Build the fix. Make sure it gets used.
          </motion.p>

          <motion.p
            variants={paraVariants}
            className="text-base md:text-lg leading-[1.75]"
            style={{ fontFamily: "var(--font-sans)", color: "var(--foreground)" }}
          >
            That&apos;s the whole job. I&apos;ve done it as a consultant, an operator,
            and a founder, and prototyped well past that, across industries that look
            nothing alike on the surface and exactly alike underneath. Messy data goes
            in. A decision someone can actually make comes out.
          </motion.p>

          <motion.p
            variants={paraVariants}
            className="text-base md:text-lg leading-[1.75]"
            style={{ fontFamily: "var(--font-sans)", color: "var(--foreground)" }}
          >
            I ship fast and I learn faster. I want to work at the intersection of
            client, product, and operations.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
