"use client";

import { motion, type Variants } from "framer-motion";
import { Mail } from "lucide-react";

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S9 17.44 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

// TODO: replace placeholder handles with real values
const links = [
  {
    icon: Mail,
    label: "Email",
    display: "heywoodd@seas.upenn.edu", // TODO: update to personal/professional email if different
    href: "mailto:heywoodd@seas.upenn.edu",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    display: "linkedin.com/in/[TODO]", // TODO: add LinkedIn handle
    href: "https://linkedin.com/in/[TODO]",
  },
  {
    icon: GitHubIcon,
    label: "GitHub",
    display: "github.com/[TODO]", // TODO: add GitHub username
    href: "https://github.com/[TODO]",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-36 bg-[#FAFAF7]">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
          {/* Label column */}
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
              Contact
            </h2>
          </motion.div>

          {/* Links column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-5"
          >
            {links.map(({ icon: Icon, label, display, href }) => (
              <motion.a
                key={label}
                variants={itemVariants}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <Icon
                  size={16}
                  className="text-[#6B6B63] group-hover:text-[#0F0F0F] transition-colors duration-200 shrink-0"
                  strokeWidth={1.5}
                />
                <span
                  className="text-base text-[#0F0F0F] group-hover:text-[#3a3a3a] transition-colors duration-200 border-b border-[#D8D8D2] group-hover:border-[#3a3a3a]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {display}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
