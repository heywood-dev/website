"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, type Variants } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { useIsTouch, useReducedMotion } from "@/hooks/use-interaction-prefs";

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
    title: "Arphie Customer Health",
    tag: "Customer Success",
    repo: "https://github.com/heywoodd-cmyk/arphie-customer-health",
    demo: "https://arphie-customer-health.vercel.app",
    description:
      "A customer-health dashboard for Arphie, the AI platform that automates RFP and security-questionnaire responses. Scores 14 accounts live across product usage, sentiment, and contract signals, then surfaces who's thriving, who's at risk, and why. Built so a small CS team can spot churn risk before the renewal call, not after.",
  },
  {
    year: "2026",
    title: "Modal Pricing Analyzer",
    tag: "Pricing Strategy",
    repo: "https://github.com/heywoodd-cmyk/modal-pricing-analyzer",
    demo: "https://modal-pricing-analyzerr.streamlit.app/",
    description:
      "Models what running AI workloads on Modal's pay-per-second GPU service actually costs in production. Plug in a workload and see how the production multipliers can quietly turn a $1,000 estimate into a $6,000 bill, plus where pay-per-second wins against renting servers outright and where it stops being cheaper.",
  },
  {
    year: "2026",
    title: "Launch Readiness Checker",
    tag: "Revenue Ops",
    repo: "https://github.com/heywoodd-cmyk/launch-readiness-checker",
    demo: "https://launch-readiness-checker.vercel.app",
    description:
      "Catches the expensive mistakes in an ad campaign before it goes live: the misconfigured offers, the brand-safety conflicts, the missing creative, right at the moment money is about to be spent. Built to show how an operations team could catch these automatically instead of discovering them after the budget is gone.",
  },
  {
    year: "2026",
    title: "APLD Switching Analysis",
    tag: "Healthcare Analytics",
    repo: "https://github.com/heywoodd-cmyk/apld-switching-analysis",
    demo: "https://apld-switching-analysis.streamlit.app/",
    description:
      "A tool that digs through real Medicare prescription data to answer a question a pharma team actually has: which patients are on the wrong medication for their condition, and how many. The answer here was striking. Roughly a third of the group was on a drug their heart or kidney history argues against. It ships as a short insight deck plus a live tool the team can re-filter by age, state, or condition on their own, so the analysis never has to be rebuilt from scratch when the question shifts.",
  },
  {
    year: "2026",
    title: "AEO Visibility Layer",
    tag: "Growth Analytics",
    repo: "https://github.com/heywoodd-cmyk/aeo-visibility-diff",
    demo: "https://aeo-visibility-diff.streamlit.app",
    description:
      "Measures how often a company shows up when people ask AI assistants like ChatGPT, Claude, and Gemini for recommendations. It runs real questions across all three and compares the results. An early take on a problem every company is about to care about: being found inside AI answers, not just Google.",
  },
  {
    year: "2025",
    title: "Ops Intelligence Dashboard",
    tag: "AI / Analytics",
    repo: "https://github.com/heywoodd-cmyk/ops-intelligence-dashboard",
    demo: "https://ops-intelligence-dashboard-gamma.vercel.app",
    description:
      "Upload a messy spreadsheet and get back a clear read on what's actually slowing the team down: where work is piling up, what's overdue, who's overloaded. It turns the hours an ops lead spends cleaning data into a few seconds of clarity.",
  },
  {
    year: "2025",
    title: "AI Operations Copilot",
    tag: "AI / Decision Systems",
    repo: "https://github.com/heywoodd-cmyk/ai-operations-copilot",
    description:
      "Turns raw operational data into plain-language read-outs a non-technical team can act on, tested hard to make sure it holds up when the data gets weird.",
  },
  {
    year: "2025",
    title: "AI Content Workflow Bot",
    tag: "GTM Automation",
    repo: "https://github.com/heywoodd-cmyk/ai-content-workflow-bot",
    description:
      "Turns internal product updates into ready-to-post LinkedIn and Twitter drafts in the team's voice. One command, finished drafts, less time between a product change and the world hearing about it.",
  },
  {
    year: "2025",
    title: "Repayment Risk Simulator",
    tag: "Decision Systems",
    repo: "https://github.com/heywoodd-cmyk/repayment-risk-simulator",
    description:
      "Built on two million real loan records, it flags which borrowers are likely to struggle to repay and turns that into clear approve, decline, or review decisions that hold up when someone checks the work.",
  },
  {
    year: "2025",
    title: "Contributor Pipeline Simulation",
    tag: "AI Data Operations",
    description:
      "Models how work flows through a large team: where it gets stuck, where quality slips, where things get rejected in batches. Built during a late-stage interview process for a strategic role at an a16z-backed AI startup.",
  },
  {
    year: "2025",
    title: "Handheld Comms Device",
    tag: "Hardware",
    description:
      "A working handheld communication device I built end to end, from the circuit board and firmware to a custom 3D-printed case. Most of the lesson was in the physical fit, not the code.",
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
  const accent = hovered ? "#E0A062" : "rgba(255, 255, 255, 0.7)";

  const rowRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 240, damping: 22, mass: 0.4 });
  const sy = useSpring(ry, { stiffness: 240, damping: 22, mass: 0.4 });

  const reduceMotion = useReducedMotion();
  const isTouch = useIsTouch();
  const tiltEnabled = !reduceMotion && !isTouch;

  const onMove = (e: React.MouseEvent) => {
    if (!tiltEnabled) return;
    const el = rowRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;  // 0-1
    const py = (e.clientY - rect.top) / rect.height;  // 0-1
    rx.set((py - 0.5) * -8); // max ~4 deg in either direction
    ry.set((px - 0.5) * 10); // slightly more on Y axis (wider rows)
  };

  const onLeave = () => {
    setHovered(false);
    if (tiltEnabled) {
      rx.set(0);
      ry.set(0);
    }
  };

  return (
    <motion.div
      layout
      ref={rowRef}
      variants={rowVariants}
      className="group relative"
      data-interactive
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      style={tiltEnabled ? { perspective: "1200px" } : undefined}
    >
      <motion.div
        style={
          tiltEnabled
            ? { rotateX: sx, rotateY: sy, transformStyle: "preserve-3d" }
            : undefined
        }
      >
      <div
        className="flex items-baseline gap-4 md:gap-8 py-5 border-t"
        style={{ borderColor: "rgba(255, 255, 255, 0.15)" }}
      >
        <span
          className="w-16 shrink-0 text-xs tabular-nums"
          style={{ fontFamily: "var(--font-mono)", color: "rgba(255, 255, 255, 0.7)" }}
        >
          {project.year}
        </span>

        <span className="flex-1 flex items-baseline gap-2">
          <Magnetic strength={0.15} radius={55}>
            <span
              className="text-lg md:text-xl leading-snug transition-colors duration-200"
              style={{
                fontFamily: "var(--font-fraunces)",
                fontWeight: 300,
                color: hovered ? "#E0A062" : "#FFFFFF",
              }}
            >
              {project.title}
            </span>
          </Magnetic>
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
          style={{ fontFamily: "var(--font-sans)", color: "rgba(255, 255, 255, 0.7)" }}
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
            style={{ fontFamily: "var(--font-sans)", color: "#FFFFFF" }}
          >
            {project.description}
          </motion.p>
        )}
      </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-6 md:px-12 py-16 md:py-24" style={{ background: "radial-gradient(ellipse at center, rgba(12, 12, 12, 0.80) 0%, rgba(12, 12, 12, 0.78) 55%, rgba(12, 12, 12, 0.55) 80%, rgba(12, 12, 12, 0.22) 94%, rgba(12, 12, 12, 0) 100%)" }}>
        <div className="grid md:grid-cols-[1fr_3fr] gap-12 md:gap-16 items-start">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="small-caps text-sm md:text-base tracking-widest"
            style={{ fontFamily: "var(--font-sans)", color: "rgba(255, 255, 255, 0.7)" }}
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
            <div className="border-t" style={{ borderColor: "rgba(255, 255, 255, 0.15)" }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
