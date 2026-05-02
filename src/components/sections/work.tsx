"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface Project {
  year: string;
  title: string;
  tag: string;
  description: string;
  repo?: string;
}

const projects: Project[] = [
  {
    year: "2025",
    title: "AI Operations Copilot",
    tag: "AI / Decision Systems",
    repo: "https://github.com/heywoodd-cmyk/ai-operations-copilot",
    description:
      "Agent-based decision system that translates operational datasets into real-time, plain-language diagnostics for non-technical users. Stress-tested across varied datasets to validate behavior under production-like failure modes. The interesting part was not the model. It was making the output trustworthy enough that someone would act on it.",
  },
  {
    year: "2025",
    title: "Ops Intelligence Dashboard",
    tag: "AI / Analytics",
    repo: "https://github.com/heywoodd-cmyk/ops-intelligence-dashboard",
    description:
      "AI-powered ops dashboard. Upload a CSV, get bottleneck analysis, overdue patterns, and workload imbalance surfaced in seconds. Built to take the moment ops leads spend cleaning spreadsheets and replace it with a clean read on what is actually breaking.",
  },
  {
    year: "2025",
    title: "AI Content Workflow Bot",
    tag: "GTM Automation",
    repo: "https://github.com/heywoodd-cmyk/ai-content-workflow-bot",
    description:
      "Prototype workflow that converts internal product content into LinkedIn and Twitter drafts for GTM teams. The bottleneck on most marketing orgs is not ideas, it is throughput. This shortens the loop between product change and public-facing copy.",
  },
  {
    year: "2025",
    title: "Repayment Risk Simulator",
    tag: "Decision Systems",
    repo: "https://github.com/heywoodd-cmyk/repayment-risk-simulator",
    description:
      "Consumer repayment risk and payment plan decision support tool built on real lending data. Predictive modeling, business decision insights, and an interactive dashboard. Designed for the constraint that matters most in lending: every call has to hold up under review.",
  },
  {
    year: "2025",
    title: "Contributor Pipeline Simulation",
    tag: "AI Data Operations",
    description:
      "Five-scenario simulation modeling contributor throughput, acceptance rates, and quality failures across teams. Pivot-based dashboards surface bottlenecks, batch rejection patterns, and quality gaps. Built to mirror the operational reality of running a labeling or RL environment pipeline at an AI company. This project came directly out of a deep-stage interview process for a Strategic Projects Lead role at an a16z-backed AI startup, where I learned what running these pipelines actually looks like in production.",
  },
  {
    year: "2025",
    title: "Handheld Comms Device",
    tag: "Hardware",
    description:
      "Raspberry Pi Pico W, OLED display, RF receiver, and a custom snap-fit enclosure I designed in CAD and printed in PLA. End to end from board to firmware to physical product. Most of what I learned was about the tolerances between layers, not the code.",
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
      layout
      variants={rowVariants}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* TODO: project image — add hover thumbnail here */}
      <div
        className="flex items-baseline gap-4 md:gap-8 py-5 border-t"
        style={{ borderColor: "#D9D2C5" }}
      >
        {/* Year */}
        <span
          className="w-10 shrink-0 text-xs tabular-nums"
          style={{ fontFamily: "var(--font-mono)", color: "#B8643C" }}
        >
          {project.year}
        </span>

        {/* Title + optional repo link */}
        <span className="flex-1 flex items-baseline gap-2">
          <span
            className="text-lg md:text-xl leading-snug transition-colors duration-200"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontWeight: 300,
              color: hovered ? "#B8643C" : "#1A1612",
            }}
          >
            {project.title}
          </span>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label={`${project.title} on GitHub`}
            >
              <ExternalLink
                size={12}
                strokeWidth={1.5}
                style={{ color: "#B8643C" }}
              />
            </a>
          )}
        </span>

        {/* Tag */}
        <span
          className="shrink-0 small-caps text-xs tracking-wider text-right hidden md:block"
          style={{ fontFamily: "var(--font-inter)", color: "#6B6358" }}
        >
          {project.tag}
        </span>
      </div>

      {/* Hover description — rises 7px on appear */}
      <AnimatePresence>
        {hovered && (
          <motion.p
            key="desc"
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 7 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
            className="pb-5 pl-14 text-sm leading-relaxed max-w-[60ch]"
            style={{ fontFamily: "var(--font-inter)", color: "#6B6358" }}
          >
            {project.description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-36" style={{ backgroundColor: "#F5F1EA" }}>
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14 text-xs small-caps tracking-widest"
          style={{ fontFamily: "var(--font-inter)", color: "#6B6358" }}
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

        <div className="border-t" style={{ borderColor: "#D9D2C5" }} />
      </div>
    </section>
  );
}
