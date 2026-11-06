import { useEffect, useState, type CSSProperties, type RefObject } from "react";
import profileImg from "@/assets/profile.jpg";
import { useTilt } from "@/hooks/use-tilt";

interface HeroPortraitProps {
  /** Element that tracks the pointer for the tilt (usually the hero section). */
  areaRef: RefObject<HTMLElement>;
}

/**
 * Decorative tool chips that orbit the portrait, 120 degrees apart.
 * `angle` is the start position (0deg = right, 90deg = bottom); with reduced motion they stay here.
 * `depth` is the mouse parallax shift in px, larger than the card's so the chips read as closer.
 */
const CHIPS = [
  { label: "GoHighLevel", angle: -150, depth: 12 },
  { label: "n8n", angle: -30, depth: 24 },
  { label: "Zapier", angle: 90, depth: 16 },
];

/** Pauses the orbit while the portrait is off screen. Browsers already stop CSS animations in hidden tabs. */
function useInView(ref: RefObject<HTMLElement>) {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}

const HeroPortrait = ({ areaRef }: HeroPortraitProps) => {
  const { stageRef, cardRef, glareRef } = useTilt(areaRef, { maxTilt: 8 });
  const inView = useInView(stageRef);

  return (
    <div ref={stageRef} className="relative w-[220px] md:w-[300px] aspect-square">
      {/* Soft static glow behind the ring */}
      <div aria-hidden="true" className="portrait-glow absolute -inset-4 md:-inset-6 rounded-full blur-3xl" />

      <div ref={cardRef} className="portrait-border relative h-full w-full rounded-full p-[3px] will-change-transform">
        <div className="relative h-full w-full overflow-hidden rounded-full bg-surface [transform:translateZ(0)]">
            <img
              src={profileImg}
              alt="Junriel Pajal"
              width={1024}
              height={1024}
              loading="eager"
              decoding="async"
              draggable={false}
              className="portrait-photo h-full w-full select-none object-cover"
            />
          {/* Fades the bottom of the suit into the circle edge so there is no hard cut */}
          <div aria-hidden="true" className="portrait-fade pointer-events-none absolute inset-x-0 bottom-0 h-2/5" />
          {/* Light reflection, moved by the tilt hook */}
          <div
            ref={glareRef}
            aria-hidden="true"
            className="portrait-glare pointer-events-none absolute -inset-1/2 opacity-0 will-change-transform"
          />
        </div>
      </div>

      {/*
        Orbit: the ring rotates, each arm places a chip on the radius at its start angle,
        and each chip counter-rotates at the same speed so the text stays upright.
        The ring is a sibling of the tilted card, so the tilt and the orbit never share a transform.
      */}
      <div aria-hidden="true" className={inView ? "orbit-ring" : "orbit-ring orbit-paused"}>
        {CHIPS.map((chip) => (
          <div key={chip.label} className="orbit-arm" style={{ "--orbit-angle": `${chip.angle}deg` } as CSSProperties}>
            <div className="orbit-counter">
              <div className="w-max -translate-x-1/2 -translate-y-1/2">
                <div data-tilt-depth={chip.depth}>
                  <div className="flex items-center gap-1 whitespace-nowrap rounded-full border border-primary/45 bg-card/85 px-2 py-0.5 font-mono text-[10px] font-medium text-foreground shadow-md shadow-black/10 md:gap-1.5 md:px-2.5 md:py-1 md:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {chip.label}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroPortrait;
