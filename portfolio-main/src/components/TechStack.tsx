import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const techTools = [
  { name: "PHP", icon: "https://cdn.simpleicons.org/php" },
  { name: "Laravel", icon: "https://cdn.simpleicons.org/laravel" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql" },
  { name: "HTML5", icon: "https://cdn.simpleicons.org/html5" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript" },
  { name: "React", icon: "https://cdn.simpleicons.org/react" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss" },
  { name: "Three.js", icon: "https://cdn.simpleicons.org/threedotjs/ffffff" },
  { name: "WordPress", icon: "https://cdn.simpleicons.org/wordpress" },
  { name: "Elementor", icon: "https://cdn.simpleicons.org/elementor" },
  { name: "Webflow", icon: "https://cdn.simpleicons.org/webflow" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git" },
  { name: "Hostinger", icon: "https://cdn.simpleicons.org/hostinger" },
];

const marqueeTools = [...techTools, ...techTools];

const TechStack = () => {
  const revealRef = useScrollReveal();
  const fallbackIcon =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='6' fill='%239CA3AF'/%3E%3Cpath d='M7 8h10v2H7zm0 4h7v2H7zm0 4h6v2H7z' fill='%23ffffff'/%3E%3C/svg%3E";

  return (
    <section ref={revealRef} className="relative py-20 overflow-hidden reveal">
      <div className="container px-6 mb-10 text-center">
        <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-3">
          Development
        </p>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Web Development Tech Stack
        </h2>
      </div>

      <div className="relative group">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <div className="flex w-max animate-marquee-slow group-hover:[animation-play-state:paused]">
          {marqueeTools.map((tool, i) => (
            <div
              key={`${tool.name}-${i}`}
              className="flex flex-col items-center justify-center mx-6 md:mx-8 w-20 md:w-24 shrink-0 transition-all duration-300 ease-in-out hover:scale-105 cursor-default group/tool"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-secondary/50 border border-border transition-all duration-300 ease-in-out group-hover/tool:border-primary/40 group-hover/tool:shadow-[0_0_20px_-5px_hsl(var(--glow)/0.25)]">
                <img
                  src={tool.icon}
                  alt={tool.name}
                  onError={(event) => {
                    const target = event.currentTarget;
                    target.onerror = null;
                    target.src = fallbackIcon;
                  }}
                  className="w-6 h-6 md:w-7 md:h-7 opacity-[0.85] transition-all duration-300 ease-in-out group-hover/tool:opacity-100 group-hover/tool:drop-shadow-[0_0_6px_hsl(var(--glow)/0.4)]"
                  loading="lazy"
                />
              </div>
              <span className="mt-2 text-[10px] md:text-xs font-mono text-text-tertiary transition-colors duration-300 group-hover/tool:text-foreground text-center leading-tight">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
