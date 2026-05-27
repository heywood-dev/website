"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface Role {
  year: string;
  title: string;
  tag: string;
  description: string;
}

const roles: Role[] = [
  {
    year: "2023–2025",
    title: "Black Wharton Consulting",
    tag: "Strategy & Delivery",
    description:
      "Built decision systems on top of unstructured operational data for mid-market clients and drove adoption with non-technical teams. For a Philadelphia restaurant chain running strong sales but bleeding margin, traced the problem to variable costs and in-unit waste, then shipped a weekly dashboard that surfaced where to look across locations. Across engagements: $200K in client savings, 8 to 12 percent revenue lift, and a 30 percent reduction in reporting latency.",
  },
  {
    year: "2024",
    title: "University of Pennsylvania Residential Operations",
    tag: "BizOps",
    description:
      "Ran operations and data systems for a 10,000-resident population. Deployed the planning systems behind daily allocation decisions, led the cross-functional rollout including training and documentation, and redesigned KPI tracking to lift accuracy by 20 percent.",
  },
  {
    year: "2021–2022",
    title: "Aureon Ventures",
    tag: "Founding",
    description:
      "Founded and ran a logistics and tutoring business across Jamaica from zero. Owned pricing, routing, hiring, and the service workflow end to end, building pricing and routing models against real demand. Generated 3 million JMD in revenue and grew unit profitability by 25 percent.",
  },
  {
    year: "2021–2022",
    title: "William Knibb High School",
    tag: "Coaching & Mentorship",
    description:
      "Assistant Track and Field Coach and Mentor in Trelawny, Jamaica. Designed the training programs that lifted the school's national ranking from 40th to top 15, and worked alongside athletes on academics and placement, helping mentees secure hundreds of thousands of dollars in scholarships to universities abroad.",
  },
  {
    year: "2020",
    title: "Everglades Farms (CPO Office)",
    tag: "Strategy",
    description:
      "Operations Strategy intern reporting into the Chief Product Officer. Mapped operational workflows to find breakdowns and built decision models for pricing, fulfillment, and demand that the operating team put into use.",
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
      layout
      variants={rowVariants}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex items-baseline gap-4 md:gap-8 py-5 border-t"
        style={{ borderColor: "var(--hairline)" }}
      >
        <span
          className="w-16 shrink-0 text-xs tabular-nums"
          style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
        >
          {role.year}
        </span>

        <span
          className="flex-1 text-lg md:text-xl leading-snug transition-colors duration-200"
          style={{
            fontFamily: "var(--font-fraunces)",
            fontWeight: 300,
            color: hovered ? "var(--accent)" : "var(--foreground)",
          }}
        >
          {role.title}
        </span>

        <span
          className="shrink-0 small-caps text-xs tracking-wider text-right hidden md:block"
          style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
        >
          {role.tag}
        </span>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.p
            key="desc"
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 7 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
            className="pb-5 pl-20 text-sm leading-relaxed max-w-[60ch]"
            style={{ fontFamily: "var(--font-sans)", color: "var(--foreground)" }}
          >
            {role.description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28">
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
            Experience
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {roles.map((r) => (
              <RoleRow key={r.title + r.year} role={r} />
            ))}
            <div className="border-t" style={{ borderColor: "var(--hairline)" }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
