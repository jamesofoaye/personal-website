"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A field of gold points that moves like a voice: waves roll across it in
 * bursts, the way speech comes in phrases. It sits behind the Applied AI
 * section and nods to Sawt, the Arabic voice companion.
 * - lazy: mounted only when the section comes near the screen
 * - pauses off-screen; a still frame under reduced motion or without a GPU
 * - the cursor (desktop) or a finger (mobile) presses a soft dent into it
 */
export default function VoiceField({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const host: HTMLDivElement = wrap;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    const gl = renderer.getContext();
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    const gpu = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : "";
    const softwareGL =
      /swiftshader|llvmpipe|software|basic render/i.test(gpu) &&
      !new URLSearchParams(window.location.search).has("forcegl");
    const still = reduceMotion || softwareGL;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.set(0, 1.35, 4.2);
    camera.lookAt(0, -0.1, 0);

    const cols = coarse ? 96 : 170;
    const rows = coarse ? 42 : 70;
    const width = 9;
    const depth = 4.4;
    const pos = new Float32Array(cols * rows * 3);
    const rnd = new Float32Array(cols * rows);
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        pos.set([(c / (cols - 1) - 0.5) * width, 0, (r / (rows - 1) - 0.5) * depth], i * 3);
        rnd[i] = Math.random();
        i++;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aRnd", new THREE.BufferAttribute(rnd, 1));

    const uniforms = {
      uTime: { value: 0 },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uPointer: { value: new THREE.Vector2(99, 99) },
      uPress: { value: 0 },
      uScroll: { value: 0 },
      uGold: { value: new THREE.Color("#e6af2e") },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        uniform float uTime; uniform float uPixelRatio; uniform vec2 uPointer;
        uniform float uPress; uniform float uScroll;
        attribute float aRnd;
        varying float vA; varying float vHi;
        // phrases: bursts of energy that travel left to right
        float envelope(float x, float t){
          float e = 0.0;
          e += smoothstep(1.4, 0.0, abs(x - (mod(t * 1.1, 13.0) - 6.5)));
          e += 0.7 * smoothstep(1.1, 0.0, abs(x - (mod(t * 1.1 + 6.0, 13.0) - 6.5)));
          return e;
        }
        void main(){
          vec3 p = position;
          float t = uTime + uScroll * 4.0;
          float env = envelope(p.x, t);
          float z = p.z;
          float wave = sin(p.x * 3.1 - t * 2.4 + z * 0.9) * 0.10
                     + sin(p.x * 7.3 + t * 3.1 - z * 2.0) * 0.045
                     + sin(p.x * 1.3 + t * 0.6) * 0.06;
          float h = wave * (0.25 + env * 1.6) * (1.0 - smoothstep(0.6, 2.2, abs(z)) * 0.6);
          // the pointer presses a soft dent
          float d = distance(p.xz, uPointer);
          h -= smoothstep(1.1, 0.0, d) * 0.28 * uPress;
          p.y += h;
          vHi = clamp(env * 0.8 + h * 2.5, 0.0, 1.0);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          float fog = smoothstep(-9.0, -2.5, mv.z);
          float edge = 1.0 - smoothstep(3.0, 4.5, abs(p.x));
          vA = fog * edge * (0.35 + 0.65 * aRnd) ;
          gl_PointSize = (2.0 + vHi * 3.0) * uPixelRatio * (3.4 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uGold; varying float vA; varying float vHi;
        void main(){
          vec2 c = gl_PointCoord - 0.5;
          float r = dot(c, c);
          if (r > 0.25) discard;
          vec3 col = mix(uGold * 0.75, vec3(1.0, 0.93, 0.75), vHi * 0.6);
          gl_FragColor = vec4(col, vA * (0.55 + vHi * 1.1) * (1.0 - r * 2.0));
        }`,
    });
    const field = new THREE.Points(geo, material);
    scene.add(field);

    const render = () => renderer.render(scene, camera);

    const resize = () => {
      const { width: w, height: h } = host.getBoundingClientRect();
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // keep the whole width of the field in view on narrow screens
      camera.position.z = w < 640 ? 6.2 : 4.2;
      camera.position.y = w < 640 ? 1.7 : 1.35;
      camera.lookAt(0, -0.1, 0);
      camera.updateProjectionMatrix();
      if (still) {
        uniforms.uTime.value = 2.4;
        render();
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    // pointer → point on the field's plane
    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hit = new THREE.Vector3();
    let pressTarget = 0;
    const section = host.closest("section") ?? host;
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      if (ray.ray.intersectPlane(plane, hit) && e.clientY < r.bottom) {
        uniforms.uPointer.value.set(hit.x, hit.z);
        pressTarget = 1;
      } else pressTarget = 0;
    };
    const onLeave = () => (pressTarget = 0);
    section.addEventListener("pointermove", onMove as EventListener, { passive: true });
    section.addEventListener("pointerleave", onLeave);
    section.addEventListener("pointerup", onLeave);

    const onScroll = () => {
      const r = host.getBoundingClientRect();
      uniforms.uScroll.value = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      if (still) render();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let visible = false;
    let running = false;
    let raf = 0;
    let last = 0;
    const t0 = performance.now();
    function frame(now: number) {
      if (coarse && now - last < 32) {
        raf = requestAnimationFrame(frame);
        return;
      }
      last = now;
      uniforms.uTime.value = (now - t0) / 1000;
      uniforms.uPress.value += (pressTarget - uniforms.uPress.value) * 0.08;
      render();
      if (!visible || document.hidden) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    }
    const start = () => {
      if (still) {
        uniforms.uTime.value = 2.4;
        render();
        return;
      }
      if (running || !visible) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible) start();
    });
    io.observe(host);
    const onVis = () => !document.hidden && start();
    document.addEventListener("visibilitychange", onVis);
    host.dataset.ready = "true";

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      section.removeEventListener("pointermove", onMove as EventListener);
      section.removeEventListener("pointerleave", onLeave);
      section.removeEventListener("pointerup", onLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      geo.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
