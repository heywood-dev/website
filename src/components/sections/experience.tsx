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
    year: "2026–present",
    title: "LiveTrends",
    tag: "Process Automation",
    description:
      "Process & Automation Analyst. I map the workflows a fast-moving operation runs on, find where they break or stall, and build the automations and integrations that take the manual load off the floor.",
  },
  {
    year: "2023–2025",
    title: "Black Wharton Consulting",
    tag: "Strategy & Delivery",
    description:
      "Built decision systems on unstructured operational data for mid-market clients and drove adoption with non-technical teams. For a restaurant chain bleeding margin on strong sales, traced it to variable costs and waste and shipped a weekly dashboard showing where to look. Across engagements: $200K saved, 8–12% revenue lift, 30% less reporting latency.",
  },
  {
    year: "2024",
    title: "University of Pennsylvania Residential Operations",
    tag: "BizOps",
    description:
      "Ran operations and data systems for a 10,000-resident population. Deployed the planning tools behind daily allocation, led the cross-functional rollout, and redesigned KPI tracking to lift accuracy 20%.",
  },
  {
    year: "2021–2022",
    title: "Aureon Ventures",
    tag: "Founding",
    description:
      "Founded and ran a logistics and tutoring business across Jamaica from zero, owning pricing, routing, hiring, and workflow end to end. Generated 3M JMD in revenue and grew unit profitability 25%.",
  },
  {
    year: "2021–2022",
    title: "William Knibb High School",
    tag: "Coaching & Mentorship",
    description:
      "Assistant Track & Field Coach and Mentor in Trelawny, Jamaica. Designed the training programs that lifted the school from 40th to top 15 nationally, and helped athletes secure hundreds of thousands in scholarships abroad.",
  },
  {
    year: "2020",
    title: "Everglades Farms (CPO Office)",
    tag: "Strategy",
    description:
      "Operations Strategy intern under the Chief Product Officer. Mapped workflows to find breakdowns and built pricing, fulfillment, and demand models the operating team put into use.",
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
      style={{
        backgroundColor: hovered
          ? "color-mix(in srgb, var(--accent) 5%, transparent)"
          : "transparent",
        transition: "background-color 220ms ease",
      }}
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
            className="pb-5 pl-20 pr-4 text-sm leading-relaxed max-w-3xl"
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
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="small-caps text-sm md:text-base tracking-widest mb-6 md:mb-8"
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
    </section>
  );
}
