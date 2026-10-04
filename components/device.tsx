import Image from "next/image";
import type { Shot, Venture } from "@/lib/content";
import { VenturePoster } from "./venture-poster";

export function PhoneFrame({
  shot,
  className = "",
  sizes = "280px",
  priority = false,
}: {
  shot: Shot;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2.2rem] border-[7px] border-[#0e1017] bg-[#0e1017] shadow-[0_30px_60px_-20px_rgb(14_16_23/0.45)] ${className}`}
    >
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.w}
        height={shot.h}
        sizes={sizes}
        priority={priority}
        className="block h-auto w-full rounded-[1.6rem]"
      />
    </div>
  );
}

export function BrowserFrame({
  shot,
  url,
  className = "",
  sizes = "(min-width: 1024px) 900px, 100vw",
  priority = false,
}: {
  shot: Shot;
  url?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-white shadow-[0_30px_60px_-24px_rgb(14_16_23/0.35)] ${className}`}
    >
      <div
        className="flex items-center gap-2 border-b border-line bg-surface px-4 py-2.5"
        aria-hidden
      >
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        {url && (
          <span className="ms-3 truncate rounded-md bg-white px-3 py-0.5 text-[11px] text-faint">
            {url}
          </span>
        )}
      </div>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.w}
        height={shot.h}
        sizes={sizes}
        priority={priority}
        className="block h-auto w-full"
      />
    </div>
  );
}

/**
 * The cover for a venture: real screenshots on a soft tint of the venture's
 * colour. Phones fan out; browser shots stack. Falls back to the poster art.
 */
export function VentureCover({
  venture,
  className = "",
  size = "card",
  priority = false,
}: {
  venture: Venture;
  className?: string;
  size?: "card" | "hero";
  priority?: boolean;
}) {
  const [a, b] = venture.gradient;
  const shots = venture.shots;
  if (!shots.length) return <VenturePoster venture={venture} size={size} className={className} />;

  const tint = { background: `linear-gradient(135deg, ${a}1f 0%, ${b}29 100%), #f7f7f8` };

  if (shots[0]!.frame === "browser") {
    return (
      <div className={`relative isolate overflow-hidden ${className}`} style={tint}>
        <div
          className={`absolute ${size === "hero" ? "inset-x-[6%] top-[10%]" : "inset-x-[7%] top-[12%]"}`}
        >
          <BrowserFrame
            shot={shots[0]!}
            url={venture.urlLabel ?? `${venture.name} · API Hub`}
            priority={priority}
            sizes={size === "hero" ? "(min-width: 1024px) 1200px, 100vw" : "600px"}
          />
        </div>
      </div>
    );
  }

  const fan = (count: number, cls: string, hero: boolean) => {
    const visible = shots.slice(0, Math.min(shots.length, count));
    const mid = (visible.length - 1) / 2;
    return (
      <div className={`absolute inset-0 items-start justify-center pt-[8%] ${cls}`}>
        {visible.map((shot, i) => {
          const offset = i - mid;
          return (
            <div
              key={shot.src}
              className={`${hero ? "w-[17%]" : "w-[30%]"} shrink-0`}
              style={{
                transform: `translateY(${Math.abs(offset) * (hero ? 7 : 9)}%) rotate(${offset * 3}deg)`,
                marginInline: hero ? "1.2%" : "-2%",
                zIndex: 10 - Math.abs(Math.round(offset)),
              }}
            >
              <PhoneFrame
                shot={shot}
                priority={priority && i === 0}
                sizes={hero ? "(min-width: 1024px) 240px, 30vw" : "(min-width: 768px) 200px, 30vw"}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`relative isolate overflow-hidden ${className}`} style={tint}>
      {size === "hero" ? (
        <>
          {fan(3, "flex md:hidden", false)}
          {fan(5, "hidden md:flex", true)}
        </>
      ) : (
        fan(3, "flex", false)
      )}
    </div>
  );
}
