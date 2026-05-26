"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

// Tuned to the warm Swiss palette: graphite particles forming a slow torus knot
// drift over the warm paper background, with mouse-repulsion physics.
const PARTICLE_COUNT       = 26000;
const TORUS_KNOT_RADIUS    = 1.35;
const TUBE_RADIUS          = 0.42;
const REPULSION_RADIUS     = 0.72;
const REPULSION_RADIUS_SQ  = REPULSION_RADIUS * REPULSION_RADIUS;
const REPULSION_STRENGTH   = 0.028;
const RETURN_STRENGTH      = 0.024;
const DAMPING              = 0.91;
const ROTATION_SPEED       = 0.00022;

export function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const w = el.clientWidth;
    const h = el.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.set(0, 0, 4.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // fully transparent: warm paper bg shows through
    el.appendChild(renderer.domElement);

    // Sample home positions from a torus knot surface
    const knotGeo = new THREE.TorusKnotGeometry(
      TORUS_KNOT_RADIUS,
      TUBE_RADIUS,
      220,
      28
    );
    const knotPositions = knotGeo.attributes.position;

    const sourcePositions = new Float32Array(PARTICLE_COUNT * 3);
    const positions       = new Float32Array(PARTICLE_COUNT * 3);
    const velocities      = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const sIdx = Math.floor(Math.random() * knotPositions.count);
      const px = knotPositions.getX(sIdx);
      const py = knotPositions.getY(sIdx);
      const pz = knotPositions.getZ(sIdx);
      const i3 = i * 3;
      sourcePositions[i3]     = px;
      sourcePositions[i3 + 1] = py;
      sourcePositions[i3 + 2] = pz;
      positions[i3]     = px;
      positions[i3 + 1] = py;
      positions[i3 + 2] = pz;
    }
    knotGeo.dispose(); // we only needed it for sampling

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Single graphite tone, low opacity, NormalBlending (not additive).
    // The matte look matches the rest of the site, no glow.
    const material = new THREE.PointsMaterial({
      color: 0x3a3a3a,
      size: 0.022,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(particleGeo, material);
    scene.add(points);

    // Mouse in world space at the z=0 plane. Start "off-screen" so no force.
    const mouseWorld = new THREE.Vector3(100, 100, 0);

    const updateMouseFromClient = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;

      const v = new THREE.Vector3(ndcX, ndcY, 0.5);
      v.unproject(camera);
      const dir = v.sub(camera.position).normalize();
      const t = -camera.position.z / dir.z;
      mouseWorld.copy(camera.position).add(dir.multiplyScalar(t));
    };

    const onMouseMove = (e: MouseEvent) => updateMouseFromClient(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) updateMouseFromClient(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onMouseOut = () => mouseWorld.set(100, 100, 0);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseout", onMouseOut);

    const onResize = () => {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    let frameId: number;

    const animate = () => {
      points.rotation.y += ROTATION_SPEED;
      const a = points.rotation.y;
      const cosA = Math.cos(-a);
      const sinA = Math.sin(-a);

      // Transform mouse from world space to particle-local space (Y-rotation only)
      const lmX = mouseWorld.x * cosA - mouseWorld.z * sinA;
      const lmY = mouseWorld.y;
      const lmZ = mouseWorld.x * sinA + mouseWorld.z * cosA;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;

        const px = positions[i3];
        const py = positions[i3 + 1];
        const pz = positions[i3 + 2];

        // Spring back toward home
        let vx = velocities[i3]     + (sourcePositions[i3]     - px) * RETURN_STRENGTH;
        let vy = velocities[i3 + 1] + (sourcePositions[i3 + 1] - py) * RETURN_STRENGTH;
        let vz = velocities[i3 + 2] + (sourcePositions[i3 + 2] - pz) * RETURN_STRENGTH;

        // Mouse repulsion
        const dx = px - lmX;
        const dy = py - lmY;
        const dz = pz - lmZ;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < REPULSION_RADIUS_SQ && distSq > 0.0001) {
          const d = Math.sqrt(distSq);
          const falloff = 1 - d / REPULSION_RADIUS;
          const f = REPULSION_STRENGTH * falloff * falloff;
          const inv = 1 / d;
          vx += dx * inv * f;
          vy += dy * inv * f;
          vz += dz * inv * f;
        }

        // Damping
        vx *= DAMPING;
        vy *= DAMPING;
        vz *= DAMPING;

        velocities[i3]     = vx;
        velocities[i3 + 1] = vy;
        velocities[i3 + 2] = vz;

        positions[i3]     = px + vx;
        positions[i3 + 1] = py + vy;
        positions[i3 + 2] = pz + vz;
      }

      particleGeo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("resize", onResize);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      particleGeo.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}

export default ParticleField;
