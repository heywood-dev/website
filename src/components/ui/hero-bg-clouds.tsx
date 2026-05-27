"use client";

import { HeroBgBase } from "./_shaders/hero-bg-base";
import { SIMPLEX_NOISE_3D } from "./_shaders/noise";

const FRAGMENT = `
${SIMPLEX_NOISE_3D}

uniform float time;
uniform vec2  mouse;
uniform vec2  resolution;
varying vec2  vUv;

// Fractal Brownian motion over 4 octaves for soft volumetric look.
float fbm(vec3 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    v += snoise(p) * amp;
    p *= 2.0;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  float aspect = resolution.x / resolution.y;
  vec2 uvA = vec2(uv.x * aspect, uv.y);

  // Mouse-driven local parting: displace UVs away from cursor.
  vec2 mouseA = vec2(mouse.x * aspect, mouse.y);
  vec2 toMouse = uvA - mouseA;
  float mouseDist = length(toMouse);
  float partForce = exp(-mouseDist * mouseDist * 4.0) * 0.10;
  vec2 sampleUv = uvA;
  if (mouseDist > 0.001) {
    sampleUv += normalize(toMouse) * partForce;
  }

  // Very slow drift across the field.
  sampleUv += vec2(time * 0.010, time * 0.006);

  // Two FBM layers: structure and brighter highlights.
  float clouds     = fbm(vec3(sampleUv * 1.7, time * 0.035));
  float highlights = fbm(vec3(sampleUv * 3.3, time * 0.055));
  clouds     = clouds * 0.5 + 0.5;
  highlights = max(0.0, highlights);

  // Warm cream palette with implied depth.
  vec3 base      = vec3(0.920, 0.890, 0.810);
  vec3 highlight = vec3(0.970, 0.950, 0.880);
  vec3 shadow    = vec3(0.830, 0.780, 0.680);

  vec3 col = mix(shadow, highlight, clouds);
  col = mix(col, base, 0.30);                // calm the contrast
  col = mix(col, highlight, highlights * 0.16); // soft bright spots

  gl_FragColor = vec4(col, 1.0);
}
`;

const STATIC_FALLBACK =
  "radial-gradient(ellipse at 50% 30%, hsl(36, 28%, 92%) 0%, hsl(36, 22%, 86%) 50%, hsl(34, 22%, 78%) 100%)";

export function HeroBgClouds() {
  return <HeroBgBase fragmentShader={FRAGMENT} staticBackground={STATIC_FALLBACK} />;
}

export default HeroBgClouds;
