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

  // Mouse-driven local swirl: rotate UVs around the cursor with a tight falloff.
  vec2 mouseA = vec2(mouse.x * aspect, mouse.y);
  vec2 toMouse = uvA - mouseA;
  float mouseDist = length(toMouse);
  float swirlForce = exp(-mouseDist * mouseDist * 9.0);
  float swirlAngle = swirlForce * 0.7;
  float c = cos(swirlAngle);
  float s = sin(swirlAngle);
  vec2 rotated = mat2(c, -s, s, c) * toMouse;
  vec2 sampleUv = mouseA + rotated;

  // Slow drift so the surface reshapes over time.
  sampleUv += vec2(time * 0.006, -time * 0.004);

  // Low-frequency multi-octave noise for soft warm variation.
  float n1 = snoise(vec3(sampleUv * 1.2, time * 0.030)) * 0.60;
  float n2 = snoise(vec3(sampleUv * 2.7, time * 0.045)) * 0.30;
  float n3 = snoise(vec3(sampleUv * 5.5, time * 0.075)) * 0.10;
  float n  = (n1 + n2 + n3) * 0.5 + 0.5;

  // Warm cream / sand palette.
  vec3 darkCream  = vec3(0.860, 0.820, 0.705);
  vec3 lightCream = vec3(0.965, 0.945, 0.875);
  vec3 col = mix(darkCream, lightCream, n);

  // Fine paper grain: high-frequency noise at low amplitude.
  float grain = snoise(vec3(uvA * 65.0, time * 0.5));
  col += grain * 0.012;

  gl_FragColor = vec4(col, 1.0);
}
`;

const STATIC_FALLBACK =
  "radial-gradient(ellipse at 50% 40%, hsl(36, 28%, 92%) 0%, hsl(34, 22%, 82%) 70%)";

export function HeroBgGrain() {
  return <HeroBgBase fragmentShader={FRAGMENT} staticBackground={STATIC_FALLBACK} />;
}

export default HeroBgGrain;
