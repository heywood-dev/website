"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ExternalLink } from "lucide-react";

function GitHubIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S9 17.44 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface Project {
  year: string;
  title: string;
  tag: string;
  description: string;
  repo?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    year: "2026",
    title: "Modal Pricing Analyzer",
    tag: "Pricing Strategy",
    repo: "https://github.com/heywoodd-cmyk/modal-pricing-analyzer",
    demo: "https://modal-pricing-analyzerr.streamlit.app/",
    description:
      "Streamlit tool for modeling serverless GPU pricing. Configure a workload and see cost per job against the production multipliers, region and guaranteed-execution stacking, that quietly push a $1,000 estimate past $6,000. Plots the breakeven against reserved instances, which lands near 50 to 65 percent utilization for H100-class GPUs, and adds packaging notes on where per-second billing is a moat and where it drives churn.",
  },
  {
    year: "2026",
    title: "Launch Readiness Checker",
    tag: "Revenue Ops",
    repo: "https://github.com/heywoodd-cmyk/launch-readiness-checker",
    demo: "https://launch-readiness-checker.vercel.app",
    description:
      "Validates checkout-offer configurations before they go live, catching pacing leaks, brand-safety conflicts, and missing creative at the transaction moment. Built to show how an ad-network operations team catches these failures automatically rather than after the spend.",
  },
  {
    year: "2026",
    title: "APLD Switching Analysis",
    tag: "Healthcare Analytics",
    repo: "https://github.com/heywoodd-cmyk/apld-switching-analysis",
    demo: "https://apld-switching-analysis.streamlit.app/",
    description:
      "An end-to-end anonymized patient-level data workflow on real CMS Medicare claims, built for a Type 2 Diabetes brand team. Maps prescription fills to drug classes, derives comorbidity profiles, and quantifies treatment discordance. The headline: a third of the on-therapy cohort is on a regimen their cardiac or kidney profile argues against. Ships as a three-slide insight deck plus a parametric Streamlit tool, so the brand team can re-slice by age, state, or comorbidity without rebuilding the analysis.",
  },
  {
    year: "2026",
    title: "AEO Visibility Layer",
    tag: "Growth Analytics",
    repo: "https://github.com/heywoodd-cmyk/aeo-visibility-diff",
    demo: "https://aeo-visibility-diff.streamlit.app",
    description:
      "A measurement layer for answer-engine optimization that quantifies how a company surfaces across ChatGPT, Claude, and Gemini. Runs real API calls against each model and diffs visibility between them. A working v0 for an emerging problem: being found inside AI-generated answers, not just search results.",
  },
  {
    year: "2025",
    title: "Ops Intelligence Dashboard",
    tag: "AI / Analytics",
    repo: "https://github.com/heywoodd-cmyk/ops-intelligence-dashboard",
    demo: "https://ops-intelligence-dashboard-gamma.vercel.app",
    description:
      "Upload a CSV and get bottleneck analysis, overdue patterns, and workload imbalance surfaced in seconds. Replaces the hours ops leads spend cleaning spreadsheets with a clean read on what is actually breaking.",
  },
  {
    year: "2025",
    title: "AI Operations Copilot",
    tag: "AI / Decision Systems",
    repo: "https://github.com/heywoodd-cmyk/ai-operations-copilot",
    description:
      "Agent-based decision system that turns operational datasets into real-time, plain-language diagnostics for non-technical users, stress-tested across varied datasets for production-like failure modes.",
  },
  {
    year: "2025",
    title: "AI Content Workflow Bot",
    tag: "GTM Automation",
    repo: "https://github.com/heywoodd-cmyk/ai-content-workflow-bot",
    description:
      "Converts internal product content into reviewable LinkedIn and Twitter drafts in the team's voice. One command in, structured drafts out, shortening the loop between product change and public-facing copy.",
  },
  {
    year: "2025",
    title: "Repayment Risk Simulator",
    tag: "Decision Systems",
    repo: "https://github.com/heywoodd-cmyk/repayment-risk-simulator",
    description:
      "Consumer repayment risk and decision-support tool built on 2 million-plus loan records. Predictive modeling, segmentation, and an interactive dashboard that turns model output into auditable approve, decline, and refer decisions.",
  },
  {
    year: "2025",
    title: "Contributor Pipeline Simulation",
    tag: "AI Data Operations",
    description:
      "Five-scenario simulation modeling contributor throughput, acceptance rates, and quality failures across teams, with dashboards that surface bottlenecks and batch rejection patterns. Built during a deep-stage interview process for a Strategic Projects Lead role at an a16z-backed AI startup.",
  },
  {
    year: "2025",
    title: "Handheld Comms Device",
    tag: "Hardware",
    description:
      "Raspberry Pi Pico W, OLED display, RF receiver, and a custom snap-fit enclosure designed in CAD and printed in PLA. End to end from board to firmware to physical product.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
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
  const accent = hovered ? "#B8643C" : "#6B6358";

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
        style={{ borderColor: "#D9D2C5" }}
      >
        <span
          className="w-16 shrink-0 text-xs tabular-nums"
          style={{ fontFamily: "var(--font-mono)", color: "#6B6358" }}
        >
          {project.year}
        </span>

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
              className="shrink-0 transition-colors duration-200"
              style={{ color: accent }}
              aria-label={`${project.title} on GitHub`}
              title="View source on GitHub"
            >
              <GitHubIcon size={13} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 transition-colors duration-200"
              style={{ color: accent }}
              aria-label={`${project.title} live demo`}
              title="Open live app"
            >
              <ExternalLink size={13} strokeWidth={1.5} />
            </a>
          )}
        </span>

        <span
          className="shrink-0 small-caps text-xs tracking-wider text-right hidden md:block"
          style={{ fontFamily: "var(--font-inter)", color: "#6B6358" }}
        >
          {project.tag}
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
    <section id="projects" className="py-32 md:py-48" style={{ backgroundColor: "#F5F1EA" }}>
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
            <div className="border-t" style={{ borderColor: "#D9D2C5" }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
