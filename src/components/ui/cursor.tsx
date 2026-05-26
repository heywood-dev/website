"use client";

import { useEffect, useRef, useState } from "react";
import { useIsTouch, useReducedMotion } from "@/hooks/use-interaction-prefs";

const INTERACTIVE_SELECTOR =
  'a, button, [data-magnetic], [data-interactive], input, textarea, select, [role="button"]';

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const isTouch = useIsTouch();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (isTouch) return;

    const ring = ringRef.current;
    if (!ring) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    // Reduced-motion: snap to cursor (smoothing = 1). Otherwise mild lag.
    const smoothing = reduceMotion ? 1 : 0.22;

    const onMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(INTERACTIVE_SELECTOR);
      setHovered(!!interactive);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    let frame = 0;
    const tick = () => {
      currentX += (targetX - currentX) * smoothing;
      currentY += (targetY - currentY) * smoothing;
      ring.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
    // visible intentionally not in deps; we don't need to re-run on every visible change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouch, reduceMotion]);

  if (isTouch) return null;

  const size = hovered ? 34 : 20;

  return (
    <div
      ref={ringRef}
      aria-hidden
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        zIndex: 9998,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        border: "1.5px solid #3a3a3a",
        backgroundColor: hovered ? "rgba(58, 58, 58, 0.12)" : "transparent",
        opacity: visible ? 1 : 0,
        transition:
          "width 220ms ease, height 220ms ease, background-color 220ms ease, opacity 200ms ease",
        mixBlendMode: "multiply",
      }}
    />
  );
}

export default Cursor;
