"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface Project {
  year: string;
  title: string;
  tag: string;
  description: string;
}

const projects: Project[] = [
  {
    year: "2025",
    title: "AI Operations Copilot",
    tag: "AI / Decision Systems",
    description:
      "Agent-based decision system that translates operational datasets into real-time, plain-language diagnostics for non-technical users. Stress-tested across varied datasets to validate behavior under production-like failure modes. The interesting part was not the model. It was making the output trustworthy enough that someone would act on it.",
  },
  {
    year: "2025",
    title: "Contributor Pipeline Simulation",
    tag: "AI Data Operations",
    description:
      "Five-scenario simulation modeling contributor throughput, acceptance rates, and quality failures across teams. Pivot-based dashboards surface bottlenecks, batch rejection patterns, and quality gaps. Built to mirror the operational reality of running a labeling or RL environment pipeline at an AI company.",
  },
  {
    year: "2025",
    title: "Repayment Risk Simulator",
    tag: "Decision Systems",
    description:
      "Predictive risk engine trained on 2 million-plus loan records. Identifies borrower risk patterns and translates model outputs into auditable approve, decline, and refer decisions. Designed for the constraint that matters most in lending: every call has to hold up under review.",
  },
  {
    year: "2025",
    title: "Handheld Comms Device",
    tag: "Hardware",
    description:
      "Raspberry Pi Pico W, OLED display, RF receiver, and a custom snap-fit enclosure designed in CAD and printed in PLA. End to end from board to firmware to physical product. Most of what I learned was about the tolerances between layers, not the code.",
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

function ProjectRow({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={rowVariants}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* TODO: project image — add a hover thumbnail here later */}
      <div className="flex items-baseline gap-4 md:gap-8 py-5 border-t border-[#D8D8D2]">
        <span
          className="w-10 shrink-0 text-xs text-[#6B6B63] tabular-nums"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {project.year}
        </span>

        <span
          className="flex-1 text-lg md:text-xl text-[#0F0F0F] leading-snug transition-colors duration-200 group-hover:text-[#3a3a3a]"
          style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300 }}
        >
          {project.title}
        </span>

        <span
          className="shrink-0 small-caps text-xs text-[#6B6B63] tracking-wider text-right hidden md:block"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {project.tag}
        </span>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-out",
          hovered ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p
          className="pb-5 pl-[4.5rem] text-sm text-[#6B6B63] leading-relaxed max-w-[60ch]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-36 bg-[#FAFAF7]">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14 text-xs small-caps tracking-widest text-[#6B6B63]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Projects
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {projects.map((p) => (
            <ProjectRow key={p.title} project={p} />
          ))}
        </motion.div>

        <div className="border-t border-[#D8D8D2]" />
      </div>
    </section>
  );
}
