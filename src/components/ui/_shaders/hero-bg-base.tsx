"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/use-interaction-prefs";
import { FULLSCREEN_VS } from "./noise";

interface HeroBgBaseProps {
  fragmentShader: string;
  /** Static fallback shown when prefers-reduced-motion is set. */
  staticBackground: string;
}

/**
 * Shared scaffold for hero background shaders. Sets up a full-screen quad with
 * an orthographic camera, threads through `time`, `mouse` (0–1, y-up), and
 * `resolution` uniforms, and disposes everything on unmount. Reduced-motion
 * returns a static CSS gradient instead of rendering WebGL.
 */
export function HeroBgBase({ fragmentShader, staticBackground }: HeroBgBaseProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const el = mountRef.current;
    if (!el) return;

    const w = el.clientWidth;
    const h = el.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VS,
      fragmentShader,
      uniforms: {
        time:       { value: 0 },
        mouse:      { value: new THREE.Vector2(0.5, 0.5) },
        resolution: { value: new THREE.Vector2(w, h) },
      },
    });
    const geo = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geo, material);
    scene.add(mesh);

    // Smoothed mouse position (target → current with damping each frame).
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    const smoothMouse = new THREE.Vector2(0.5, 0.5);

    const updateMouse = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      targetMouse.set(
        (clientX - rect.left) / rect.width,
        1 - (clientY - rect.top) / rect.height
      );
    };

    const onMouseMove = (e: MouseEvent) => updateMouse(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) updateMouse(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const onResize = () => {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      renderer.setSize(nw, nh);
      material.uniforms.resolution.value.set(nw, nh);
    };
    window.addEventListener("resize", onResize);

    let frame = 0;
    const startTime = performance.now();

    const tick = () => {
      const t = (performance.now() - startTime) / 1000;
      material.uniforms.time.value = t;
      smoothMouse.lerp(targetMouse, 0.08);
      material.uniforms.mouse.value.copy(smoothMouse);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      geo.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [fragmentShader, reduceMotion]);

  if (reduceMotion) {
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0, background: staticBackground }}
        aria-hidden
      />
    );
  }

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden
    />
  );
}

export default HeroBgBase;
