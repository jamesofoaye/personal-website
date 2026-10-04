"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { trackEvent } from "@/lib/analytics";

/**
 * A dotted Earth with a live arc from Accra to Abu Dhabi.
 * - ~14k land dots (precomputed by scripts/build-globe-points.mjs)
 * - fresnel atmosphere, travelling light along the arc, pulsing city pins
 * - drag to spin with inertia; gentle sway otherwise
 * - pauses when off-screen or the tab is hidden; static under reduced motion
 */

const CITIES = {
  accra: { label: "Accra", lat: 5.6037, lon: -0.187 },
  abuDhabi: { label: "Abu Dhabi", lat: 24.4539, lon: 54.3773 },
} as const;

const CENTER_LON = 26;
const CENTER_LAT = 14;
const DEG = Math.PI / 180;

function toVec3(lat: number, lon: number, r = 1) {
  const phi = lat * DEG;
  const lam = lon * DEG;
  return new THREE.Vector3(
    r * Math.cos(phi) * Math.sin(lam),
    r * Math.sin(phi),
    r * Math.cos(phi) * Math.cos(lam),
  );
}

function cssColor(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return new THREE.Color(v || fallback);
}

export default function Globe({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const host: HTMLDivElement = wrap;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.5 : 2));

    // No GPU (software rendering): draw a still frame instead of animating, so
    // the main thread stays free on low-end devices and in lab tools.
    const gl = renderer.getContext();
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    const gpu = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : "";
    const softwareGL = /swiftshader|llvmpipe|software|basic render/i.test(gpu);
    const still = reduceMotion || softwareGL;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    // tilt (x) wraps spin (y) so dragging always spins around the poles
    const tilt = new THREE.Group();
    tilt.rotation.x = CENTER_LAT * DEG;
    const spin = new THREE.Group();
    spin.rotation.y = -CENTER_LON * DEG;
    tilt.add(spin);
    scene.add(tilt);

    const uniforms = {
      uTime: { value: 0 },
      uDot: { value: cssColor("--globe-dot", "#efe6d4") },
      uGold: { value: cssColor("--globe-glow", "#e6af2e") },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uSize: { value: 1 },
    };

    // Occluder: writes depth only, so dots on the far side are hidden.
    const occluder = new THREE.Mesh(
      new THREE.SphereGeometry(0.995, 64, 64),
      new THREE.MeshBasicMaterial({ colorWrite: false }),
    );
    spin.add(occluder);

    // Atmosphere rim
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.18, 64, 64),
      new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        vertexShader: /* glsl */ `
          varying vec3 vN;
          void main(){
            vN = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uGold;
          varying vec3 vN;
          void main(){
            // back faces: 0 at the outer rim, strongest where it meets the globe
            float d = -dot(vN, vec3(0.0, 0.0, 1.0));
            float i = pow(clamp(d / 0.55, 0.0, 1.0), 2.2);
            gl_FragColor = vec4(uGold, i * 0.42);
          }`,
      }),
    );
    scene.add(atmosphere);

    // City pins + pulse rings
    const pins: { key: keyof typeof CITIES; pos: THREE.Vector3; ring: THREE.Mesh }[] = [];
    const pinGroup = new THREE.Group();
    spin.add(pinGroup);
    (Object.keys(CITIES) as (keyof typeof CITIES)[]).forEach((key, i) => {
      const c = CITIES[key];
      const pos = toVec3(c.lat, c.lon, 1.003);
      const dot = new THREE.Mesh(
        new THREE.CircleGeometry(0.016, 24),
        new THREE.MeshBasicMaterial({ color: uniforms.uGold.value }),
      );
      dot.position.copy(pos);
      dot.lookAt(pos.clone().multiplyScalar(2));
      pinGroup.add(dot);
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.022, 0.03, 40),
        new THREE.MeshBasicMaterial({
          color: uniforms.uGold.value,
          transparent: true,
          depthWrite: false,
        }),
      );
      ring.position.copy(pos);
      ring.lookAt(pos.clone().multiplyScalar(2));
      ring.userData.offset = i * 0.5;
      pinGroup.add(ring);
      pins.push({ key, pos, ring });
    });

    // The arc: a lifted great-circle curve with a light travelling along it
    const a = toVec3(CITIES.accra.lat, CITIES.accra.lon);
    const b = toVec3(CITIES.abuDhabi.lat, CITIES.abuDhabi.lon);
    const mid = a.clone().add(b).normalize().multiplyScalar(1.38);
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    const arcGeo = new THREE.TubeGeometry(curve, 160, 0.0055, 8, false);
    const arc = new THREE.Mesh(
      arcGeo,
      new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: /* glsl */ `
          uniform float uTime; uniform vec3 uGold;
          varying vec2 vUv;
          void main(){
            float t = fract(uTime * 0.22);
            float head = smoothstep(0.18, 0.0, abs(vUv.x - t)) ;
            float a = 0.28 + head * 1.4;
            gl_FragColor = vec4(mix(uGold, vec3(1.0), head * 0.45), a);
          }`,
      }),
    );
    spin.add(arc);

    // Land dots (loaded async so first paint isn't blocked)
    let points: THREE.Points | null = null;
    fetch("/globe/land.bin")
      .then((r) => r.arrayBuffer())
      .then((buf) => {
        if (disposed) return;
        const data = new Int16Array(buf);
        const n = data.length / 2;
        const pos = new Float32Array(n * 3);
        const rnd = new Float32Array(n);
        const dist = new Float32Array(n);
        const accra = toVec3(CITIES.accra.lat, CITIES.accra.lon);
        const ad = toVec3(CITIES.abuDhabi.lat, CITIES.abuDhabi.lon);
        const v = new THREE.Vector3();
        for (let i = 0; i < n; i++) {
          v.copy(toVec3(data[i * 2]! / 100, data[i * 2 + 1]! / 100));
          pos.set([v.x, v.y, v.z], i * 3);
          rnd[i] = Math.random();
          dist[i] = Math.min(v.distanceTo(accra), v.distanceTo(ad));
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        geo.setAttribute("aRnd", new THREE.BufferAttribute(rnd, 1));
        geo.setAttribute("aDist", new THREE.BufferAttribute(dist, 1));
        points = new THREE.Points(
          geo,
          new THREE.ShaderMaterial({
            uniforms,
            transparent: true,
            depthWrite: false,
            vertexShader: /* glsl */ `
              uniform float uTime; uniform float uPixelRatio; uniform float uSize;
              attribute float aRnd; attribute float aDist;
              varying float vAlpha; varying float vNear;
              void main(){
                vec4 mv = modelViewMatrix * vec4(position, 1.0);
                vec3 n = normalize(normalMatrix * position);
                float facing = clamp(dot(n, vec3(0.0,0.0,1.0)), 0.0, 1.0);
                float tw = 0.75 + 0.25 * sin(uTime * 1.5 + aRnd * 40.0);
                vNear = smoothstep(0.35, 0.0, aDist);
                vAlpha = (0.18 + 0.82 * pow(facing, 1.4)) * tw;
                gl_PointSize = (2.1 + vNear * 1.6) * uPixelRatio * uSize * (0.55 + 0.45 * facing);
                gl_Position = projectionMatrix * mv;
              }`,
            fragmentShader: /* glsl */ `
              uniform vec3 uDot; uniform vec3 uGold;
              varying float vAlpha; varying float vNear;
              void main(){
                vec2 c = gl_PointCoord - 0.5;
                if (dot(c,c) > 0.25) discard;
                gl_FragColor = vec4(mix(uDot, uGold, vNear * 0.85), vAlpha * (0.55 + 0.45 * vNear));
              }`,
          }),
        );
        spin.add(points);
        wrap.dataset.ready = "true";
        if (still) {
          running = false;
          start();
        }
      })
      .catch(() => {
        /* the globe simply stays as atmosphere + arc */
      });

    // Theme changes: re-read colours from CSS variables
    const mo = new MutationObserver(() => {
      uniforms.uDot.value.copy(cssColor("--globe-dot", "#efe6d4"));
      uniforms.uGold.value.copy(cssColor("--globe-glow", "#e6af2e"));
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Size
    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 600 ? 5.1 : 4.4; // keep labels inside the frame on phones
      camera.updateProjectionMatrix();
      uniforms.uSize.value = Math.max(0.7, Math.min(1.25, width / 640));
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    // Interaction: drag to spin, with inertia
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let velY = 0;
    let velX = 0;
    let userOffset = 0;
    let userTilt = 0;
    let draggedOnce = false;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      if (!draggedOnce) {
        draggedOnce = true;
        trackEvent("globe_dragged", { input: e.pointerType });
      }
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      wrap.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      velY = dx * 0.005;
      velX = dy * 0.003;
    };
    const onUp = () => {
      dragging = false;
      wrap.style.cursor = "";
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    // Run only when visible
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      if (visible) start();
    });
    io.observe(wrap);
    const onVis = () => !document.hidden && start();
    document.addEventListener("visibilitychange", onVis);

    const t0 = performance.now();
    const tmp = new THREE.Vector3();
    const camDir = new THREE.Vector3(0, 0, 1);
    let raf = 0;
    let running = false;

    let last = 0;
    function frame(now = performance.now()) {
      if (disposed) return;
      if (coarse && !still && now - last < 32) {
        raf = requestAnimationFrame(frame);
        return;
      }
      last = now;
      const t = (performance.now() - t0) / 1000;
      uniforms.uTime.value = still ? 1.2 : t;

      if (!still) {
        if (!dragging) {
          velY *= 0.94;
          velX *= 0.9;
          // spring back toward the Africa–Gulf view
          userOffset += (0 - userOffset) * 0.004;
          userTilt += (0 - userTilt) * 0.03;
        }
        userOffset += velY;
        userTilt = THREE.MathUtils.clamp(userTilt + velX, -0.5, 0.5);
        const sway = Math.sin(t * 0.18) * 0.32;
        spin.rotation.y = -CENTER_LON * DEG + sway + userOffset;
        tilt.rotation.x = CENTER_LAT * DEG + userTilt;
        pins.forEach(({ ring }) => {
          const p = (t * 0.6 + (ring.userData.offset as number)) % 1;
          ring.scale.setScalar(1 + p * 2.2);
          (ring.material as THREE.MeshBasicMaterial).opacity = 1 - p;
        });
      }

      renderer.render(scene, camera);

      // HTML labels follow their pins and hide on the far side
      const { width, height } = host.getBoundingClientRect();
      pins.forEach(({ key, pos }) => {
        const el = labelRefs.current[key];
        if (!el) return;
        tmp.copy(pos).applyMatrix4(spin.matrixWorld);
        const facing = tmp.clone().normalize().dot(camDir);
        tmp.project(camera);
        const x = (tmp.x * 0.5 + 0.5) * width;
        const y = (-tmp.y * 0.5 + 0.5) * height;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        el.style.opacity = String(THREE.MathUtils.clamp((facing - 0.15) * 4, 0, 1));
      });

      if (still || !visible || document.hidden) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || disposed) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    start();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Points) {
          o.geometry.dispose();
          const m = o.material as THREE.Material | THREE.Material[];
          (Array.isArray(m) ? m : [m]).forEach((x) => x.dispose());
        }
      });
      points = null;
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`cursor-grab touch-pan-y select-none ${className ?? "relative"}`}
      role="img"
      aria-label="A dotted globe with a glowing arc linking Accra, Ghana and Abu Dhabi, UAE"
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      {(Object.keys(CITIES) as (keyof typeof CITIES)[]).map((key) => (
        <div
          key={key}
          ref={(el) => {
            labelRefs.current[key] = el;
          }}
          className="pointer-events-none absolute top-0 left-0 opacity-0 will-change-transform"
          aria-hidden
        >
          <span className="ml-3 -translate-y-1/2 inline-block rounded-full border border-line bg-bg/70 px-2.5 py-1 font-mono text-[10px] tracking-wider whitespace-nowrap text-ink uppercase backdrop-blur-md">
            {CITIES[key].label}
          </span>
        </div>
      ))}
    </div>
  );
}
