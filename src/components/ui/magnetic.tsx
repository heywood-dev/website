"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouch, useReducedMotion } from "@/hooks/use-interaction-prefs";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // 0-1, fraction of mouse-to-center vector applied as offset
  radius?: number;   // pixel radius of activation
  className?: string;
  as?: "span" | "div";
}

/**
 * Wraps an interactive element so it gently eases toward the cursor when nearby
 * and springs back when the cursor leaves. Disabled on touch and under
 * prefers-reduced-motion.
 */
export function Magnetic({
  children,
  strength = 0.25,
  radius = 70,
  className,
  as = "span",
}: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.5 });

  const reduceMotion = useReducedMotion();
  const isTouch = useIsTouch();
  const enabled = !reduceMotion && !isTouch;

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        const factor = (1 - dist / radius) * strength;
        x.set(dx * factor);
        y.set(dy * factor);
      } else if (x.get() !== 0 || y.get() !== 0) {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, radius, strength, x, y]);

  if (!enabled) {
    if (as === "div") return <div className={className}>{children}</div>;
    return <span className={className}>{children}</span>;
  }

  if (as === "div") {
    return (
      <motion.div
        ref={ref as React.Ref<HTMLDivElement>}
        className={className}
        style={{ x: springX, y: springY }}
        data-magnetic
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.span
      ref={ref as React.Ref<HTMLSpanElement>}
      className={className}
      style={{ x: springX, y: springY, display: "inline-block" }}
      data-magnetic
    >
      {children}
    </motion.span>
  );
}

export default Magnetic;
