"use client";

import { HeroBgBase } from "./_shaders/hero-bg-base";
import { SIMPLEX_NOISE_3D } from "./_shaders/noise";

// Deeper sand / oat HSL palette baked into the shader. Reads as warm sand
// in motion rather than cream silk.
//   hsl(36, 28%, 80%)  light sand highlight
//   hsl(34, 26%, 76%)  warm light
//   hsl(32, 30%, 72%)  mid warm sand
//   hsl(28, 28%, 66%)  deeper sand
const FRAGMENT = `
${SIMPLEX_NOISE_3D}

uniform float time;
uniform vec2  mouse;
uniform vec2  resolution;
varying vec2  vUv;

// HSL → RGB. h in [0,1]; s,l in [0,1].
vec3 hsl2rgb(float h, float s, float l) {
  vec3 rgb = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  return l + s * (rgb - 0.5) * (1.0 - abs(2.0 * l - 1.0));
}

void main() {
  vec2 uv = vUv;
  float aspect = resolution.x / resolution.y;
  vec2 uvA = vec2(uv.x * aspect, uv.y);

  vec2 mouseA = vec2(mouse.x * aspect, mouse.y);
  vec2 toMouse = uvA - mouseA;
  float mouseDist = length(toMouse);
  float mouseInfluence = exp(-mouseDist * mouseDist * 5.0);

  float w1 = sin(uvA.x * 5.0 + time * 0.35) * 0.040;
  float w2 = sin(uvA.x * 8.0 - time * 0.28 + uvA.y * 4.0) * 0.025;
  float w3 = sin(uvA.y * 6.0 + time * 0.22) * 0.030;
  float mouseWave = sin(mouseDist * 26.0 - time * 2.4) * mouseInfluence * 0.05;

  float wave = w1 + w2 + w3 + mouseWave;
  float n = snoise(vec3(uvA * 1.4, time * 0.05)) * 0.5 + 0.5;

  float t = clamp(uv.y + wave * 2.0 + (n - 0.5) * 0.18, 0.0, 1.0);

  vec3 highlight = hsl2rgb(36.0 / 360.0, 0.28, 0.80);
  vec3 light     = hsl2rgb(34.0 / 360.0, 0.26, 0.76);
  vec3 mid       = hsl2rgb(32.0 / 360.0, 0.30, 0.72);
  vec3 shadow    = hsl2rgb(28.0 / 360.0, 0.28, 0.66);

  vec3 col;
  if (t > 0.66) {
    col = mix(light, highlight, (t - 0.66) / 0.34);
  } else if (t > 0.33) {
    col = mix(mid, light, (t - 0.33) / 0.33);
  } else {
    col = mix(shadow, mid, t / 0.33);
  }

  gl_FragColor = vec4(col, 1.0);
}
`;

const STATIC_FALLBACK =
  "linear-gradient(180deg, hsl(36, 28%, 80%) 0%, hsl(28, 28%, 66%) 100%)";

export function HeroBgWaves() {
  return <HeroBgBase fragmentShader={FRAGMENT} staticBackground={STATIC_FALLBACK} />;
}

export default HeroBgWaves;
