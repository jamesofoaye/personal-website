"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { trackEvent } from "@/lib/analytics";

/**
 * A dotted Earth with a live arc from Accra to Abu Dhabi.
 * - ~14k land dots (precomputed by scripts/build-globe-points.mjs)
 * - the dots fly in and assemble the continents on first load
 * - fresnel atmosphere, travelling light along the arc, pulsing city pins
 * - a slow orbit ring of gold particles for depth
 * - tap or click the globe to send a ripple through the land; the cities
 *   send one out on their own every few seconds
 * - drag to spin with inertia; the globe turns toward Abu Dhabi as you scroll
 *   and leans toward the cursor on desktop
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

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !coarse, // high-DPR phones don't need MSAA on round dots
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.5 : 2));

    // No GPU (software rendering): draw a still frame instead of animating, so
    // the main thread stays free on low-end devices and in lab tools.
    const gl = renderer.getContext();
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    const gpu = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : "";
    // ?forcegl animates anyway (for testing in headless browsers)
    const softwareGL =
      /swiftshader|llvmpipe|software|basic render/i.test(gpu) &&
      !new URLSearchParams(window.location.search).has("forcegl");
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
      uIntro: { value: 0 },
      uRipple: { value: new THREE.Vector3(0, 0, 1) },
      uRippleT: { value: -10 },
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

    // Orbit ring: a tilted band of gold specks circling the globe
    const ringCount = coarse ? 420 : 900;
    const ringPos = new Float32Array(ringCount * 3);
    const ringRnd = new Float32Array(ringCount);
    for (let i = 0; i < ringCount; i++) {
      const ang = Math.random() * Math.PI * 2;
      const r = 1.42 + (Math.random() - 0.5) * 0.12 + Math.pow(Math.random(), 4) * 0.25;
      ringPos.set([Math.cos(ang) * r, (Math.random() - 0.5) * 0.025, Math.sin(ang) * r], i * 3);
      ringRnd[i] = Math.random();
    }
    const ringGeo = new THREE.BufferGeometry();
    ringGeo.setAttribute("position", new THREE.BufferAttribute(ringPos, 3));
    ringGeo.setAttribute("aRnd", new THREE.BufferAttribute(ringRnd, 1));
    const orbit = new THREE.Points(
      ringGeo,
      new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        vertexShader: /* glsl */ `
          uniform float uPixelRatio; uniform float uSize; uniform float uTime; uniform float uIntro;
          attribute float aRnd;
          varying float vA;
          void main(){
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            // fade the half of the ring that sits behind the globe
            float front = smoothstep(-0.6, 0.4, (modelMatrix * vec4(position,1.0)).z);
            vA = (0.25 + 0.75 * front) * (0.4 + 0.6 * fract(aRnd * 7.0 + uTime * 0.05)) * clamp(uIntro * 1.5 - 0.5, 0.0, 1.0);
            gl_PointSize = (1.2 + aRnd * 1.6) * uPixelRatio * uSize;
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uGold; varying float vA;
          void main(){
            vec2 c = gl_PointCoord - 0.5;
            if (dot(c,c) > 0.25) discard;
            gl_FragColor = vec4(uGold, vA * 0.55);
          }`,
      }),
    );
    const orbitPivot = new THREE.Group();
    orbitPivot.rotation.set(-0.42, 0, 0.32);
    orbitPivot.add(orbit);
    scene.add(orbitPivot);

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
        const startPos = new Float32Array(n * 3);
        const accra = toVec3(CITIES.accra.lat, CITIES.accra.lon);
        const ad = toVec3(CITIES.abuDhabi.lat, CITIES.abuDhabi.lon);
        const v = new THREE.Vector3();
        for (let i = 0; i < n; i++) {
          v.copy(toVec3(data[i * 2]! / 100, data[i * 2 + 1]! / 100));
          pos.set([v.x, v.y, v.z], i * 3);
          rnd[i] = Math.random();
          // fly in from a scattered shell, mostly from the camera side
          const s = 1.8 + Math.random() * 2.2;
          startPos.set(
            [
              v.x * s + (Math.random() - 0.5) * 1.6,
              v.y * s + (Math.random() - 0.5) * 1.6,
              v.z * s + Math.random() * 1.2,
            ],
            i * 3,
          );
          dist[i] = Math.min(v.distanceTo(accra), v.distanceTo(ad));
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        geo.setAttribute("aRnd", new THREE.BufferAttribute(rnd, 1));
        geo.setAttribute("aDist", new THREE.BufferAttribute(dist, 1));
        geo.setAttribute("aStart", new THREE.BufferAttribute(startPos, 3));
        points = new THREE.Points(
          geo,
          new THREE.ShaderMaterial({
            uniforms,
            transparent: true,
            depthWrite: false,
            vertexShader: /* glsl */ `
              uniform float uTime; uniform float uPixelRatio; uniform float uSize;
              uniform float uIntro; uniform vec3 uRipple; uniform float uRippleT;
              attribute float aRnd; attribute float aDist; attribute vec3 aStart;
              varying float vAlpha; varying float vNear; varying float vWave;
              void main(){
                // assemble: each dot lands at its own moment
                float k = clamp(uIntro * 1.7 - aRnd * 0.7, 0.0, 1.0);
                k = 1.0 - pow(1.0 - k, 3.0);
                // ripple: a ring of light that travels across the surface
                float age = uTime - uRippleT;
                float d = distance(position, uRipple);
                float front = age * 0.85;
                float wave = smoothstep(0.16, 0.0, abs(d - front)) * smoothstep(2.4, 0.2, age);
                vWave = wave;
                vec3 p = mix(aStart, position * (1.0 + wave * 0.045), k);
                vec4 mv = modelViewMatrix * vec4(p, 1.0);
                vec3 n = normalize(normalMatrix * position);
                float facing = clamp(dot(n, vec3(0.0,0.0,1.0)), 0.0, 1.0);
                float tw = 0.75 + 0.25 * sin(uTime * 1.5 + aRnd * 40.0);
                vNear = smoothstep(0.35, 0.0, aDist);
                vAlpha = mix(0.35, (0.18 + 0.82 * pow(facing, 1.4)) * tw, k) * k;
                gl_PointSize = (2.1 + vNear * 1.6 + wave * 1.8) * uPixelRatio * uSize * (0.55 + 0.45 * facing);
                gl_Position = projectionMatrix * mv;
              }`,
            fragmentShader: /* glsl */ `
              uniform vec3 uDot; uniform vec3 uGold;
              varying float vAlpha; varying float vNear; varying float vWave;
              void main(){
                vec2 c = gl_PointCoord - 0.5;
                if (dot(c,c) > 0.25) discard;
                float g = clamp(vNear * 0.85 + vWave, 0.0, 1.0);
                gl_FragColor = vec4(mix(uDot, uGold, g), vAlpha * (0.55 + 0.45 * max(vNear, vWave)));
              }`,
          }),
        );
        spin.add(points);
        introStart = performance.now();
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
    let downX = 0;
    let downY = 0;
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const ripple = (local: THREE.Vector3, at: number) => {
      uniforms.uRipple.value.copy(local);
      uniforms.uRippleT.value = at;
    };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      downX = e.clientX;
      downY = e.clientY;
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
    const onUp = (e: PointerEvent) => {
      dragging = false;
      wrap.style.cursor = "";
      // a tap (not a drag) sends a ripple out from where it landed
      if (e.type === "pointerup" && Math.hypot(e.clientX - downX, e.clientY - downY) < 8) {
        const r = canvas.getBoundingClientRect();
        ndc.set(
          ((e.clientX - r.left) / r.width) * 2 - 1,
          -((e.clientY - r.top) / r.height) * 2 + 1,
        );
        raycaster.setFromCamera(ndc, camera);
        const hit = raycaster.intersectObject(occluder)[0];
        if (hit) {
          ripple(spin.worldToLocal(hit.point.clone()).normalize(), uniforms.uTime.value);
          nextAuto = uniforms.uTime.value + 7;
          start();
        }
      }
    };

    // Desktop: lean a little toward the cursor
    let leanX = 0;
    let leanY = 0;
    let leanTX = 0;
    let leanTY = 0;
    const onWindowMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      leanTY = (e.clientX / window.innerWidth - 0.5) * 0.35;
      leanTX = (e.clientY / window.innerHeight - 0.5) * 0.18;
    };
    window.addEventListener("pointermove", onWindowMove, { passive: true });

    // Scroll: turn toward Abu Dhabi while the hero leaves the screen
    let scrollTurn = 0;
    const onScroll = () => {
      const h = host.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -h.top / Math.max(1, h.height)));
      scrollTurn = p;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
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
    let introStart = 0;
    let nextAuto = 3.2;
    let autoCity = 0;
    const cityLocal = [a.clone(), b.clone()];
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
      // linear here; each dot eases itself in the shader
      uniforms.uIntro.value = still ? 1 : introStart ? Math.min(1, (now - introStart) / 2400) : 0;

      if (!still) {
        // the cities pulse a ripple across the land every few seconds
        if (introStart && t > nextAuto) {
          ripple(cityLocal[autoCity % 2]!, t);
          autoCity++;
          nextAuto = t + 6.5;
        }
        leanX += (leanTX - leanX) * 0.04;
        leanY += (leanTY - leanY) * 0.04;
        orbit.rotation.y = t * 0.06;
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
        spin.rotation.y = -CENTER_LON * DEG + sway + userOffset + leanY - scrollTurn * 0.9;
        tilt.rotation.x = CENTER_LAT * DEG + userTilt + leanX + scrollTurn * 0.15;
        orbitPivot.rotation.y = leanY * 0.6;
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
      window.removeEventListener("pointermove", onWindowMove);
      window.removeEventListener("scroll", onScroll);
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
          <span className="ml-3 -translate-y-1/2 inline-block rounded-full border border-line bg-bg/70 px-2.5 py-1 font-mono text-[11px] tracking-wider whitespace-nowrap text-ink uppercase backdrop-blur-md">
            {CITIES[key].label}
          </span>
        </div>
      ))}
    </div>
  );
}
