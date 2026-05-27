"use client";

import { motion, type Variants } from "framer-motion";
import { Mail, FileText } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

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

type IconComponent = React.ComponentType<{ size?: number; strokeWidth?: number; className?: string; color?: string }>;

const links: { icon: IconComponent; label: string; display: string; href: string }[] = [
  {
    icon: Mail,
    label: "Email",
    display: "heywoodd@seas.upenn.edu",
    href: "mailto:heywoodd@seas.upenn.edu",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    display: "linkedin.com/in/devanteheywood",
    href: "https://www.linkedin.com/in/devanteheywood/",
  },
  {
    icon: GitHubIcon,
    label: "GitHub",
    display: "github.com/heywoodd-cmyk",
    href: "https://github.com/heywoodd-cmyk",
  },
  {
    icon: FileText,
    label: "Resume",
    display: "Resume (PDF)",
    href: "/resume.pdf",
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
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_3fr] gap-12 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2
              className="small-caps text-sm md:text-base tracking-widest"
              style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
            >
              Contact
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-5"
          >
            {links.map(({ icon: Icon, label, display, href }) => (
              <motion.div key={label} variants={itemVariants}>
                <Magnetic as="div" strength={0.2} radius={80}>
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="flex items-center gap-4 group w-fit"
                  >
                <span className="shrink-0 transition-colors duration-200" style={{ color: "var(--muted)" }}>
                  <Icon size={16} strokeWidth={1.5} />
                </span>
                <span
                  className="text-base inline-link"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {display}
                </span>
                  </a>
                </Magnetic>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
