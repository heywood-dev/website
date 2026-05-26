"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-interaction-prefs";

const SPACING         = 22;
const DOT_RADIUS      = 0.95;
const DOT_OPACITY     = 0.42;
const DOT_COLOR       = "#3a3a3a";
const RIPPLE_RADIUS   = 200;
const RIPPLE_STRENGTH = 26;
const RETURN_STRENGTH = 0.08;
const DAMPING         = 0.82;

type Dot = { hx: number; hy: number; x: number; y: number; vx: number; vy: number };

export function PaperRippleBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let dots: Dot[] = [];
    const mouse = { x: -9999, y: -9999, active: false };

    const seed = () => {
      dots = [];
      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      const offsetX = (w - (cols - 1) * SPACING) / 2;
      const offsetY = (h - (rows - 1) * SPACING) / 2;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const hx = offsetX + i * SPACING;
          const hy = offsetY + j * SPACING;
          dots.push({ hx, hy, x: hx, y: hy, vx: 0, vy: 0 });
        }
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = DOT_COLOR;
      ctx.globalAlpha = DOT_OPACITY;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        ctx.beginPath();
        ctx.arc(d.hx, d.hy, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduceMotion) drawStatic();
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      // Static grid only, no animation, no ripple.
      return () => {
        window.removeEventListener("resize", resize);
      };
    }

    // Window-level listeners. The canvas itself has pointer-events: none.
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        mouse.active = false;
        mouse.x = -9999;
        mouse.y = -9999;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    };
    const onTouchEnd = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseout", onMouseOut);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    let frame = 0;
    const rippleRadiusSq = RIPPLE_RADIUS * RIPPLE_RADIUS;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = DOT_COLOR;
      ctx.globalAlpha = DOT_OPACITY;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        let vx = d.vx + (d.hx - d.x) * RETURN_STRENGTH;
        let vy = d.vy + (d.hy - d.y) * RETURN_STRENGTH;

        if (mouse.active) {
          const dx = d.hx - mouse.x;
          const dy = d.hy - mouse.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < rippleRadiusSq && dSq > 0.5) {
            const dist = Math.sqrt(dSq);
            const t = dist / RIPPLE_RADIUS;
            const falloff = Math.sin(t * Math.PI);
            const f = (RIPPLE_STRENGTH * falloff * falloff) / dist;
            vx += dx * f * RETURN_STRENGTH;
            vy += dy * f * RETURN_STRENGTH;
          }
        }

        vx *= DAMPING;
        vy *= DAMPING;
        d.vx = vx;
        d.vy = vy;
        d.x += vx;
        d.y += vy;

        ctx.beginPath();
        ctx.arc(d.x, d.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", resize);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

export default PaperRippleBg;
