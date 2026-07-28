"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useIsTouch, useReducedMotion } from "@/hooks/use-interaction-prefs";

interface Post {
  date: string; // display date
  title: string;
  subtitle: string;
  href: string;
  /** Screenshot of the article page for the cursor-following preview. */
  preview: string;
}

const SUBSTACK_URL = "https://powerstackhq.substack.com";
// Power Stack's own amber, tuned for legibility on the sand background.
const AMBER = "#B4661C";

const posts: Post[] = [
  {
    date: "Jul 2026",
    title: "2031 Is the Earliest You Can Buy a Large Gas Turbine",
    subtitle:
      "GE Vernova expects its gas turbine slots to be mostly sold out through 2030 by December, and the AI buildout's escape route from the grid now runs through the turbine factory.",
    href: "https://powerstackhq.substack.com/p/2031-is-the-earliest-you-can-buy",
    preview: "/writing/2031-is-the-earliest-you-can-buy.png",
  },
  {
    date: "Jul 2026",
    title: "Who Gets to Say No to a Data Center",
    subtitle:
      "New York paused permits for 50-megawatt data centers, PJM cleared at its price ceiling and still missed its reliability target, and the buildout is already moving toward dedicated generation.",
    href: "https://powerstackhq.substack.com/p/who-gets-to-say-no-to-a-data-center",
    preview: "/writing/who-gets-to-say-no-to-a-data-center.png",
  },
  {
    date: "Jul 2026",
    title: "Why Texas Stopped Studying Data Centers One at a Time",
    subtitle:
      "Texas is being asked for five times the electricity it has ever used, and it can no longer tell which of that demand will ever exist.",
    href: "https://powerstackhq.substack.com/p/why-texas-stopped-studying-data-centers",
    preview: "/writing/why-texas-stopped-studying-data-centers.png",
  },
  {
    date: "Jul 2026",
    title: "Why Walmart Signed a 15-Year Nuclear Deal",
    subtitle:
      "AI made firm power scarce enough that a grocery retailer just locked up nuclear for 15 years.",
    href: "https://powerstackhq.substack.com/p/why-walmart-signed-a-15-year-nuclear",
    preview: "/writing/why-walmart-signed-a-15-year-nuclear.png",
  },
];

const [featured, ...rest] = posts;

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

const CARD_BG = "color-mix(in srgb, var(--background) 52%, #ffffff)";

function PostRow({ post, showPreview }: { post: Post; showPreview: boolean }) {
  const [hovered, setHovered] = useState(false);
  const isTouch = useIsTouch();
  const showSub = isTouch || hovered;

  return (
    <motion.a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      variants={rowVariants}
      className="group block border-t py-5"
      style={{
        borderColor: "var(--hairline)",
        backgroundColor: hovered
          ? `color-mix(in srgb, ${AMBER} 6%, transparent)`
          : "transparent",
        transition: "background-color 220ms ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex items-baseline gap-4 md:gap-8">
        <span
          className="w-16 shrink-0 text-xs tabular-nums"
          style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
        >
          {post.date}
        </span>
        <span className="flex-1 flex items-baseline gap-2">
          <span
            className="text-lg md:text-xl leading-snug transition-colors duration-200"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontWeight: 300,
              color: hovered ? AMBER : "var(--foreground)",
              borderBottom: `1px solid ${hovered ? AMBER : "transparent"}`,
              paddingBottom: "1px",
            }}
          >
            {post.title}
          </span>
          <span
            className="shrink-0 transition-colors duration-200"
            style={{ color: hovered ? AMBER : "var(--muted)" }}
            aria-hidden
          >
            <ArrowUpRight size={14} strokeWidth={1.5} />
          </span>
        </span>

        {/* Preview — anchored just above the post title, close to the words. */}
        {showPreview && (
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.96, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 6 }}
                transition={{ duration: 0.26, ease: "easeOut" }}
                className="pointer-events-none absolute z-40 hidden lg:block w-[300px] overflow-hidden rounded-xl"
                style={{
                  bottom: "calc(100% + 10px)",
                  left: "clamp(200px, 32%, 380px)",
                  background: CARD_BG,
                  border: "1px solid var(--hairline)",
                  boxShadow: "0 30px 60px -22px rgba(30, 24, 18, 0.45)",
                }}
                aria-hidden
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.preview}
                  alt=""
                  className="block h-[184px] w-full object-cover object-top"
                />
                <div
                  className="flex items-center justify-between border-t px-3 py-2"
                  style={{ borderColor: "var(--hairline)" }}
                >
                  <span
                    className="small-caps text-[10px] tracking-wider"
                    style={{ color: AMBER, fontFamily: "var(--font-sans)" }}
                  >
                    Power Stack
                  </span>
                  <span
                    className="text-[10px]"
                    style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
                  >
                    {post.date}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      <AnimatePresence initial={false}>
        {showSub && (
          <motion.p
            key="sub"
            initial={isTouch ? false : { opacity: 0, height: 0, y: 4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: 4 }}
            transition={{ duration: 0.34, ease: "easeOut" }}
            className="overflow-hidden pl-20 text-sm leading-relaxed max-w-[62ch]"
            style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
          >
            <span className="block pt-2">{post.subtitle}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </motion.a>
  );
}

export function Writing() {
  const reduceMotion = useReducedMotion();
  const isTouch = useIsTouch();
  const floatEnabled = !reduceMotion && !isTouch;

  return (
    <section id="writing" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="small-caps text-sm md:text-base tracking-widest mb-6 md:mb-8"
          style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
        >
          Writing
        </motion.h2>

        {/* Thesis, one line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-xl md:text-2xl leading-snug max-w-[26ch] mb-12"
          style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300, color: "var(--foreground)" }}
        >
          <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" style={{ color: AMBER }}>
            Power Stack
          </a>{" "}
          — who scales and who stalls in the AI power crunch.
        </motion.p>

        {/* Featured latest essay */}
        <motion.a
          href={featured.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="group block mb-14"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] items-center gap-6 md:gap-10">
            <div
              className="overflow-hidden rounded-xl"
              style={{
                border: "1px solid var(--hairline)",
                boxShadow: "0 24px 50px -28px rgba(30, 24, 18, 0.4)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.preview}
                alt=""
                className="block aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div>
              <span
                className="small-caps text-xs tracking-widest"
                style={{ fontFamily: "var(--font-sans)", color: AMBER }}
              >
                Latest · {featured.date}
              </span>
              <h3
                className="mt-3 text-2xl md:text-3xl leading-tight transition-colors duration-200 group-hover:[color:var(--foreground)]"
                style={{ fontFamily: "var(--font-fraunces)", fontWeight: 300, color: "var(--foreground)" }}
              >
                {featured.title}
              </h3>
              <p
                className="mt-3 text-sm md:text-base leading-relaxed max-w-[52ch]"
                style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
              >
                {featured.subtitle}
              </p>
              <span
                className="mt-5 inline-flex items-center gap-1.5 text-sm small-caps tracking-wider"
                style={{ fontFamily: "var(--font-sans)", color: AMBER }}
              >
                Read the essay
                <ArrowUpRight size={14} strokeWidth={1.75} />
              </span>
            </div>
          </div>
        </motion.a>

        {/* The rest of the archive */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {rest.map((post) => (
            <PostRow key={post.href} post={post} showPreview={floatEnabled} />
          ))}
          <div className="border-t" style={{ borderColor: "var(--hairline)" }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-8"
        >
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm small-caps tracking-wider"
            style={{ fontFamily: "var(--font-sans)", color: AMBER }}
          >
            Subscribe on Substack
            <ArrowUpRight size={14} strokeWidth={1.5} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
