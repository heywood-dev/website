"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface Role {
  year: string;
  title: string;
  tag: string;
  description: string;
}

const roles: Role[] = [
  {
    year: "2023.2025",
    title: "Black Wharton Consulting",
    tag: "Strategy & Delivery",
    description:
      "AI Systems and Customer Delivery Consultant. Built decision systems on top of unstructured operational data and made sure non-technical stakeholders adopted them. Engagements drove $200K in savings, 8 to 12 percent revenue lift, and a 30 percent cut in reporting latency. The work was less about modeling and more about making the model usable to the person doing the job.",
  },
  {
    year: "2024",
    title: "University of Pennsylvania Residential Operations",
    tag: "BizOps",
    description:
      "Operations and Data Systems Manager during the summer rollout. Deployed planning systems for daily decisions across a 10,000-resident population. Led the cross-functional rollout, owned the training and documentation, and redesigned KPI tracking to lift accuracy by 20 percent. Operating inside an institution this large taught me that the bottleneck is almost never the model. It is the handoff.",
  },
  {
    year: "2021.2022",
    title: "Aureon Ventures",
    tag: "Founding",
    description:
      "Founded and ran a logistics and tutoring business across Jamaica from zero. Owned pricing, routing, hiring, and the service workflow end to end. Built pricing and routing models against real demand patterns. Generated 3 million JMD in revenue and grew unit profitability by 25 percent. The lesson that has stuck: every operational decision should be defensible to the person executing it.",
  },
  {
    year: "2020",
    title: "Everglades Farms (CPO Office)",
    tag: "Strategy",
    description:
      "Operations Strategy intern reporting into the Chief Product Officer. Mapped workflows to find breakdowns and built decision models for pricing, fulfillment, and demand. The output was used by the operating team, which is the only thing that matters in that kind of seat.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function RoleRow({ role }: { role: Role }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={rowVariants}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-baseline gap-4 md:gap-8 py-5 border-t border-[#D8D8D2]">
        <span
          className="w-16 shrink-0 text-xs text-[#6B6B63] tabular-nums"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {role.year}
        </span>

        <span
          className="flex-1 text-lg md:text-xl text-[#0F0F0F] leading-snug transition-colors duration-200 group-hover:text-[#3a3a3a]"
          style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300 }}
        >
          {role.title}
        </span>

        <span
          className="shrink-0 small-caps text-xs text-[#6B6B63] tracking-wider text-right hidden md:block"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {role.tag}
        </span>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-out",
          hovered ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p
          className="pb-5 pl-[5.5rem] text-sm text-[#6B6B63] leading-relaxed max-w-[60ch]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {role.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-36 bg-[#FAFAF7]">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14 text-xs small-caps tracking-widest text-[#6B6B63]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Experience
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {roles.map((r) => (
            <RoleRow key={r.title} role={r} />
          ))}
        </motion.div>

        <div className="border-t border-[#D8D8D2]" />
      </div>
    </section>
  );
}
