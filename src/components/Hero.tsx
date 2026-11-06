import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useRef } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import HeroPortrait from "@/components/HeroPortrait";
import RoleTyper from "@/components/RoleTyper";

const Hero = () => {
  const revealRef = useScrollReveal();
  const sectionRef = useRef<HTMLElement>(null);

  const handleScrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div ref={revealRef} className="container relative z-10 px-6 py-20 reveal">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Picture */}
          <div className="mb-8 flex justify-center animate-fade-in md:mb-20">
            <HeroPortrait areaRef={sectionRef} />
          </div>

          {/* Identity: greeting + name form the page's only h1, then the typing role */}
          <h1 className="mb-4">
            <span className="mb-2 block text-lg font-light text-text-secondary md:text-2xl">Hey there! I'm</span>
            <span className="block text-balance break-words text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Junriel Pajal
            </span>
          </h1>

          <div className="mb-10">
            <RoleTyper />
          </div>

          {/* Existing headline, kept as the value statement under the name */}
          <p className="mx-auto mb-5 max-w-3xl text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
            I Build Systems That Run{" "}
            <span className="text-gradient">Your Business</span>{" "}
            on Autopilot
          </p>

          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            Custom CRM setups, sales funnels, and workflow automations using{" "}
            <span className="text-foreground font-medium">GoHighLevel</span>,{" "}
            <span className="text-foreground font-medium">Zapier</span>, and{" "}
            <span className="text-foreground font-medium">n8n</span>, so you can focus on growth, not grunt work.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" className="group" onClick={() => handleScrollTo("#contact")}>
              Book a Call
              <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="heroOutline" size="xl" className="group" onClick={() => handleScrollTo("#work")}>
              <Play className="mr-1 w-4 h-4" />
              View Work
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;