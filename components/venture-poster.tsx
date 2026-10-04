import type { Venture } from "@/lib/content";

/**
 * Art-directed "poster" for each venture: a colour field, a grid, and a small
 * motif that says what the product does. Stands in until real screenshots land.
 * TODO(james): add device screenshots for Hisab, DrivingInstructor.ae and Dawurobo.
 */
function Motif({ slug }: { slug: string }) {
  const s = {
    stroke: "currentColor",
    fill: "none",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (slug) {
    case "verinvo":
      return (
        <svg viewBox="0 0 200 150" aria-hidden className="size-full">
          <rect x="52" y="14" width="96" height="124" rx="6" {...s} />
          <path d="M66 36h44M66 48h68M66 60h56" {...s} opacity=".7" />
          {[78, 90, 102].map((y) => (
            <g key={y} opacity=".55">
              <path d={`M66 ${y}h40`} {...s} />
              <path d={`M118 ${y}h16`} {...s} />
            </g>
          ))}
          <path d="M66 118h68" {...s} strokeWidth={2} />
          <circle cx="150" cy="118" r="20" {...s} strokeDasharray="3 3" />
          <path d="m141 118 6 6 12-13" {...s} strokeWidth={2} />
          <text x="66" y="30" fill="currentColor" fontSize="7" fontFamily="monospace" opacity=".6">
            PINT-AE · EN | ع
          </text>
        </svg>
      );
    case "hisab":
      return (
        <svg viewBox="0 0 200 150" aria-hidden className="size-full">
          <path d="M20 128h168M20 128V20" {...s} opacity=".35" />
          <path d="M24 34c30 6 40 22 62 34s34 30 54 44 28 14 40 16" {...s} strokeWidth={2.2} />
          <path
            d="M24 34c30 6 40 22 62 34s34 30 54 44 28 14 40 16V128H24Z"
            fill="currentColor"
            opacity=".08"
          />
          <circle cx="180" cy="128" r="5" fill="currentColor" />
          <circle cx="180" cy="128" r="11" {...s} opacity=".5" />
          <text
            x="128"
            y="118"
            fill="currentColor"
            fontSize="8"
            fontFamily="monospace"
            opacity=".75"
          >
            debt-free
          </text>
          {[46, 82, 118].map((x, i) => (
            <path
              key={x}
              d={`M${x} 128v-${[60, 38, 18][i]}`}
              {...s}
              opacity=".25"
              strokeDasharray="2 3"
            />
          ))}
        </svg>
      );
    case "drivinginstructor":
      return (
        <svg viewBox="0 0 200 150" aria-hidden className="size-full">
          <path d="M18 128C56 128 50 86 92 86s38-52 88-52" {...s} strokeWidth={14} opacity=".14" />
          <path d="M18 128C56 128 50 86 92 86s38-52 88-52" {...s} strokeDasharray="6 7" />
          <circle cx="18" cy="128" r="5" fill="currentColor" />
          <path d="M180 18c-7 0-12 5-12 11 0 9 12 19 12 19s12-10 12-19c0-6-5-11-12-11Z" {...s} />
          <circle cx="180" cy="29" r="3.5" fill="currentColor" />
          <text
            x="26"
            y="146"
            fill="currentColor"
            fontSize="7.5"
            fontFamily="monospace"
            opacity=".7"
          >
            first lesson
          </text>
          <text
            x="118"
            y="60"
            fill="currentColor"
            fontSize="7.5"
            fontFamily="monospace"
            opacity=".7"
          >
            first year
          </text>
        </svg>
      );
    case "dawurobo":
      return (
        <svg viewBox="0 0 200 150" aria-hidden className="size-full">
          {(
            [
              [60, 70],
              [100, 50],
              [100, 92],
              [140, 72],
            ] as const
          ).map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <path d={`M${x} ${y}l20-10 20 10-20 10Z`} {...s} />
              <path d={`M${x} ${y}v22l20 10V${y + 10}M${x + 40} ${y}v22l-20 10`} {...s} />
              <path d={`M${x + 10} ${y - 5}l20 10`} {...s} opacity=".5" />
            </g>
          ))}
          <path d="M18 140c40-8 70 4 104-6s46-18 70-16" {...s} strokeDasharray="2 5" opacity=".7" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 200 150" aria-hidden className="size-full">
          <rect x="14" y="34" width="172" height="82" rx="4" {...s} />
          {Array.from({ length: 11 }).map((_, i) => (
            <g key={i} opacity=".6">
              <rect x={20 + i * 15.5} y="38" width="8" height="6" rx="1" {...s} />
              <rect x={20 + i * 15.5} y="106" width="8" height="6" rx="1" {...s} />
            </g>
          ))}
          <rect x="30" y="52" width="40" height="46" rx="2" {...s} opacity=".5" />
          <rect x="80" y="52" width="40" height="46" rx="2" {...s} />
          <rect x="130" y="52" width="40" height="46" rx="2" {...s} opacity=".5" />
          <path d="m95 66 14 9-14 9Z" fill="currentColor" />
        </svg>
      );
  }
}

export function VenturePoster({
  venture,
  size = "card",
  className = "",
}: {
  venture: Venture;
  size?: "card" | "hero";
  className?: string;
}) {
  return (
    <div
      className={`relative isolate overflow-hidden text-white ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 0% 0%, ${venture.accent} 0%, ${venture.accent2} 70%), ${venture.accent2}`,
      }}
    >
      <div
        className="absolute inset-0 -z-10 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(255 255 255 / .5) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / .5) 1px, transparent 1px)",
          backgroundSize: size === "hero" ? "56px 56px" : "32px 32px",
          maskImage: "radial-gradient(ellipse at 70% 60%, black 20%, transparent 75%)",
        }}
      />
      <div
        className={`absolute ${size === "hero" ? "right-[4%] bottom-[6%] w-[52%]" : "top-[16%] right-[4%] w-[48%]"} aspect-[4/3] text-white/85`}
      >
        <Motif slug={venture.slug} />
      </div>
      <div
        className={`relative flex h-full flex-col justify-between ${size === "hero" ? "p-8 sm:p-12" : "p-5 sm:p-6"}`}
      >
        <p className="font-mono text-[10px] tracking-[0.18em] text-white/70 uppercase">
          {venture.kind}
        </p>
        <p
          className={`font-display leading-none ${size === "hero" ? "text-5xl sm:text-7xl" : "text-3xl sm:text-4xl"}`}
        >
          {venture.name}
        </p>
      </div>
    </div>
  );
}
