"use client";

import { HeroBgBase } from "./_shaders/hero-bg-base";
import { SIMPLEX_NOISE_3D } from "./_shaders/noise";

const FRAGMENT = `
${SIMPLEX_NOISE_3D}

uniform float time;
uniform vec2  mouse;
uniform vec2  resolution;
varying vec2  vUv;

void main() {
  vec2 uv = vUv;
  float aspect = resolution.x / resolution.y;
  vec2 uvA = vec2(uv.x * aspect, uv.y);

  // Mouse-local distortion: bend waves near cursor and settle out with distance.
  vec2 mouseA = vec2(mouse.x * aspect, mouse.y);
  vec2 toMouse = uvA - mouseA;
  float mouseDist = length(toMouse);
  float mouseInfluence = exp(-mouseDist * mouseDist * 5.0);

  // Three layered slow sine waves at different frequencies, plus very slow noise.
  float w1 = sin(uvA.x * 5.0 + time * 0.35) * 0.040;
  float w2 = sin(uvA.x * 8.0 - time * 0.28 + uvA.y * 4.0) * 0.025;
  float w3 = sin(uvA.y * 6.0 + time * 0.22) * 0.030;
  float mouseWave = sin(mouseDist * 26.0 - time * 2.4) * mouseInfluence * 0.05;

  float wave = w1 + w2 + w3 + mouseWave;
  float n = snoise(vec3(uvA * 1.4, time * 0.05)) * 0.5 + 0.5;

  float t = clamp(uv.y + wave * 2.0 + (n - 0.5) * 0.18, 0.0, 1.0);

  // Warm cream / sand gradient.
  vec3 highlight = vec3(0.965, 0.945, 0.875); // light cream
  vec3 base      = vec3(0.915, 0.880, 0.790); // mid sand
  vec3 shadow    = vec3(0.820, 0.770, 0.660); // deeper warm sand

  vec3 col;
  if (t > 0.5) {
    col = mix(base, highlight, (t - 0.5) * 2.0);
  } else {
    col = mix(shadow, base, t * 2.0);
  }

  gl_FragColor = vec4(col, 1.0);
}
`;

const STATIC_FALLBACK =
  "linear-gradient(180deg, hsl(36, 25%, 88%) 0%, hsl(34, 22%, 80%) 100%)";

export function HeroBgWaves() {
  return <HeroBgBase fragmentShader={FRAGMENT} staticBackground={STATIC_FALLBACK} />;
}

export default HeroBgWaves;
