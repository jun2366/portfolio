import type { RefObject } from "react";
import profileImg from "@/assets/profile.jpg";
import { useTilt } from "@/hooks/use-tilt";
import { cn } from "@/lib/utils";

interface HeroPortraitProps {
  /** Element that tracks the pointer for the tilt (usually the hero section). */
  areaRef: RefObject<HTMLElement>;
}

/** Decorative tool chips. `depth` is the parallax shift in px; larger than the card's so they read as closer. */
const CHIPS = [
  { label: "GoHighLevel", depth: 18, delay: "0s", position: "-left-8 top-[16%] md:-left-20" },
  { label: "n8n", depth: 24, delay: "-1.8s", position: "-right-6 top-[44%] md:-right-14" },
  { label: "Zapier", depth: 14, delay: "-3.4s", position: "-left-5 bottom-[12%] md:-left-12" },
];

const HeroPortrait = ({ areaRef }: HeroPortraitProps) => {
  const { stageRef, cardRef, glareRef } = useTilt(areaRef, { maxTilt: 8 });

  return (
    <div ref={stageRef} className="relative w-[220px] md:w-[300px] aspect-square">
      {/* Soft glow behind the frame */}
      <div aria-hidden="true" className="portrait-glow absolute -inset-4 md:-inset-6 rounded-full blur-3xl" />

      <div className="portrait-float relative h-full w-full">
        <div ref={cardRef} className="portrait-arch portrait-border relative h-full w-full p-[3px] will-change-transform">
          <div className="portrait-arch relative h-full w-full overflow-hidden bg-surface [transform:translateZ(0)]">
            <img
              src={profileImg}
              alt="Junriel Pajal"
              width={1024}
              height={1024}
              loading="eager"
              decoding="async"
              draggable={false}
              className="h-full w-full select-none object-cover object-top origin-top scale-[1.25]"
            />
            {/* Fades the bottom of the suit into the frame so there is no hard edge */}
            <div aria-hidden="true" className="portrait-fade pointer-events-none absolute inset-x-0 bottom-0 h-2/5" />
            {/* Light reflection, moved by the tilt hook */}
            <div
              ref={glareRef}
              aria-hidden="true"
              className="portrait-glare pointer-events-none absolute -inset-1/2 opacity-0 will-change-transform"
            />
          </div>
        </div>
      </div>

      {CHIPS.map((chip) => (
        <div key={chip.label} aria-hidden="true" className={cn("absolute z-20", chip.position)}>
          <div data-tilt-depth={chip.depth} className="will-change-transform">
            <div
              className="chip-float flex items-center gap-1.5 rounded-full border border-primary/40 bg-card/90 px-2.5 py-1 text-[11px] md:text-xs font-mono font-medium text-foreground shadow-lg shadow-black/10 backdrop-blur-sm"
              style={{ animationDelay: chip.delay }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {chip.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroPortrait;
