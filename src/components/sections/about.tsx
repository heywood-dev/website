"use client";

import { motion, type Variants } from "framer-motion";

const paragraphs = [
  `I am a senior at Penn studying Systems Engineering with a concentration in AI and Data Analytics. I graduate in May 2026.`,
  `What I do is narrower than my resume makes it look. I build operational systems that non-technical people actually use. I have done it at three different scales. As a founder in Jamaica I ran logistics and tutoring businesses from zero, owning pricing, routing, and hiring while generating 3 million JMD in revenue and 25 percent unit profitability growth. As a consultant at Black Wharton I led engagements that drove 200,000 dollars in savings, 8 to 12 percent revenue lift, and a 30 percent cut in reporting latency for clients. As an internal operator at Penn Residential Operations I deployed planning systems across a 10,000-resident population and redesigned KPI tracking to lift accuracy by 20 percent. The technical projects on this site are how I sharpen the same skill in different domains.`,
  `I went deep in the interview process at Deeptune for a Strategic Projects Lead role and learned more in those rounds than I have in most courses. Contributor pipelines, throughput tracking, domain expert networks, the operational layer underneath modern AI products. The Pipeline Simulation project on this site came directly out of that work.`,
  `Outside the classroom I run track for Penn, where I earned Second Team All-Ivy in the 400 meters and sprint relays. In high school at Munro College in Jamaica I set a national age-group record of 52 seconds in the 400 that has stood for over a decade. I also teach personal finance to 700-plus high school students nationwide through the Wharton Global Youth Program. The thread across all of it is the same one I bring to operations work. Small inputs, repeated under pressure, compound into something serious.`,
  `I am looking for Strategy and Operations, BizOps, Strategic Projects, or Product Operations roles at AI-native startups, Seed through Series D and beyond. New York preferred, with the broader Northeast on the table. If you are building something that has outgrown its operational layer, reach out.`,
];

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
    <section id="about" className="py-24 md:py-36 bg-[#FAFAF7]">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2
              className="small-caps text-xs tracking-widest text-[#6B6B63]"
              style={{ fontFamily: "var(--font-inter)" }}
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
            {paragraphs.map((text, i) => (
              <motion.p
                key={i}
                variants={paraVariants}
                className="text-base md:text-lg text-[#0F0F0F] leading-[1.75] max-w-[65ch]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {text}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
