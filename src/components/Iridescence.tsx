"use client";

import { useEffect, useRef } from "react";

/**
 * Procedural pearlescent silk — the hero backdrop.
 *
 * The reference uses a pre-rendered 3-D pearlescent still. That artwork is
 * Microsoft's and is not reproduced here; this generates the same *optics*
 * from scratch: domain-warped folds, thin-film interference along the fold
 * edges, and film grain, all at very low saturation over a warm light neutral.
 *
 * Rendered at a capped DPR because it is a soft, low-frequency image — the
 * grain supplies apparent detail, so there is nothing to gain from a 3× buffer.
 */

const VERT = `#version 300 es
in vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
out vec4 outColor;

uniform vec2  uRes;
uniform float uTime;

/* --- value noise + fbm ------------------------------------------------ */
vec2 hash(vec2 p){
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(dot(hash(i + vec2(0,0)), f - vec2(0,0)),
                 dot(hash(i + vec2(1,0)), f - vec2(1,0)), u.x),
             mix(dot(hash(i + vec2(0,1)), f - vec2(0,1)),
                 dot(hash(i + vec2(1,1)), f - vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

/* Thin-film interference: wavelength-dependent phase -> spectral colour.
   Kept deliberately desaturated; in the reference the rainbow only ever
   appears as a thin edge, never as a field. */
vec3 spectrum(float t){
  return 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67)));
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 st = vec2(uv.x * asp, uv.y);

  float t = uTime * 0.05;

  /* Folds run on a diagonal, roughly 35 degrees, as in the reference. */
  vec2 dir  = normalize(vec2(0.84, 0.545));
  vec2 perp = vec2(-dir.y, dir.x);
  float along  = dot(st, dir);   // bands vary along this axis
  float across = dot(st, perp);  // fold lines run along this axis

  /* The warp is deliberately ANISOTROPIC. Isotropic fbm perturbs the phase
     equally in both axes, which chops the folds into marble-like veins. By
     sampling at a low frequency along the across-axis the perturbation
     changes slowly as you travel down a fold, so the creases stay long,
     smooth and roughly parallel - which is what reads as silk. Single-octave
     noise, not fbm, for the same reason. */
  float bend =
      noise(vec2(along * 1.05, across * 0.28) + vec2(t * 0.22, 0.0)) * 1.00
    + noise(vec2(along * 2.30, across * 0.60) - vec2(t * 0.16, 0.0)) * 0.32;

  /* Primary folds — a few broad creases across the frame. */
  float phase = along * 6.4 + bend * 1.35 + t * 0.7;
  float s = sin(phase);

  /* Secondary, finer folds riding on the primary ones. */
  float phase2 = along * 15.5 + bend * 2.4 - t * 0.45;
  float s2 = sin(phase2);

  /* Broad shading from the fold height. Smooth, no sharpening — the silk
     reads as a soft gradient everywhere except at the creases. */
  vec3 dark  = vec3(0.742, 0.734, 0.722);
  vec3 light = vec3(0.885, 0.882, 0.868);
  vec3 col = mix(dark, light, s * 0.5 + 0.5);
  col += (s2 * 0.5 + 0.5) * 0.022;

  /* Crease: a thin bright caustic where the fold turns over. This is the
     detail that makes it read as fabric rather than as a gradient. */
  float crease  = pow(max(0.0, s), 42.0);
  float crease2 = pow(max(0.0, s2), 60.0);
  col += crease * 0.070 + crease2 * 0.022;

  /* Thin-film dispersion, confined to the crease and kept very quiet. The
     reference shows the rainbow only as a faint edge; pushing this above
     about 0.12 turns the whole hero into neon stripes. */
  col += (spectrum(phase * 0.13 + bend * 1.2) - 0.5) * crease * 0.10;
  col += (spectrum(phase2 * 0.09 + 0.4) - 0.5) * crease2 * 0.06;

  /* Very slight overall pearl cast. */
  col += (spectrum(bend * 0.6) - 0.5) * 0.016;

  /* Soft vignette, biased left where the copy sits. */
  float vig = 1.0 - 0.13 * length((uv - vec2(0.40, 0.52)) * vec2(1.1, 0.85));
  col *= vig;

  /* Film grain — essential. Without it the gradients band badly. */
  float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.545);
  col += (g - 0.5) * 0.030;

  outColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export default function Iridescence({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });
    // No WebGL2 (or software rendering disabled): the CSS fallback gradient
    // painted on the wrapper stays visible, so we simply do nothing.
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      // Cap DPR at 1.5: this is a soft low-frequency image, a 3x buffer costs
      // fill rate for no visible gain.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    let raf = 0;
    let running = true;
    const start = performance.now();

    const frame = () => {
      if (!running) return;
      resize();
      gl.uniform1f(uTime, reduced ? 12 : (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      // A static image still needs one paint; just don't keep looping.
      if (!reduced) raf = requestAnimationFrame(frame);
    };
    frame();

    // Stop burning GPU when the hero is off-screen or the tab is hidden.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running && !reduced) {
          running = true;
          frame();
        } else if (!e.isIntersecting) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        running = true;
        frame();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
