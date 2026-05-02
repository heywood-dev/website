"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Simplex noise functions (GLSL port)
const noiseGLSL = `
  vec3 mod289v3(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289v4(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x)  { return mod289v4(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289v3(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j   = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

const fragmentShader = `
  ${noiseGLSL}

  uniform float time;
  uniform vec2  mouse;
  uniform vec2  resolution;
  uniform vec3  color;
  varying vec2  vUv;

  void main() {
    vec2 uv = vUv;

    // Correct for aspect ratio so contours aren't stretched
    float aspect = resolution.x / resolution.y;
    vec2 uva = vec2(uv.x * aspect, uv.y);

    // Soft mouse-driven radial warp
    vec2 mouseAspect = vec2(mouse.x * aspect, mouse.y);
    vec2 toMouse = mouseAspect - uva;
    float dist = length(toMouse);
    float warp = exp(-dist * dist * 5.0) * 0.18;
    if (dist > 0.001) uva += normalize(toMouse) * warp;

    // Multi-octave noise — slow drift
    float n = 0.0;
    n += snoise(vec3(uva * 2.2, time * 0.05)) * 0.55;
    n += snoise(vec3(uva * 4.5, time * 0.035)) * 0.30;
    n += snoise(vec3(uva * 9.0, time * 0.06))  * 0.15;

    // Lift to 0–1
    float h = clamp(n * 0.5 + 0.5, 0.0, 1.0);

    // Contour bands — thin lines at each level boundary
    float numBands = 14.0;
    float band = fract(h * numBands);
    float lineWidth = 0.06;
    float onLine = 1.0 - smoothstep(0.0, lineWidth, band);
    onLine = clamp(onLine + smoothstep(1.0 - lineWidth, 1.0, band), 0.0, 1.0);

    // Vary opacity: slightly bolder lines at higher elevations
    float alpha = onLine * (0.12 + h * 0.11);

    gl_FragColor = vec4(color, alpha);
  }
`;

export function TopoLandscape() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const w = el.clientWidth;
    const h = el.clientHeight;

    const scene    = new THREE.Scene();
    const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        time:       { value: 0 },
        mouse:      { value: new THREE.Vector2(0.5, 0.5) },
        resolution: { value: new THREE.Vector2(w, h) },
        color:      { value: new THREE.Color("#3a3a3a") },
      },
    });

    scene.add(new THREE.Mesh(geometry, material));

    let frameId: number;
    const animate = (t: number) => {
      material.uniforms.time.value = t * 0.001;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate(0);

    const onResize = () => {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      renderer.setSize(nw, nh);
      material.uniforms.resolution.value.set(nw, nh);
    };

    const onMouse = (e: MouseEvent) => {
      material.uniforms.mouse.value.set(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      );
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}

export default TopoLandscape;
