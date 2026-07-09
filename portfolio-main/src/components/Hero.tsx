import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import profileImg from "@/assets/profile.jpg";

const Hero = () => {
  const revealRef = useScrollReveal();

  const handleScrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />

      <div ref={revealRef} className="container relative z-10 px-6 py-20 reveal">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Picture & Identity */}
          <div className="mb-10 flex flex-col items-center gap-4 animate-fade-in">
            <div className="relative">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-primary/30 glow-border">
                <img
                  src={profileImg}
                  alt="Junriel Pajal - Automation Specialist"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Junriel Pajal</h2>
              <p className="text-sm text-text-secondary font-mono mt-1">Automation Specialist</p>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            I Build Systems That Run{" "}
            <span className="text-gradient">Your Business</span>{" "}
            on Autopilot
          </h1>

          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            Custom CRM setups, sales funnels, and workflow automations using{" "}
            <span className="text-foreground font-medium">GoHighLevel</span>,{" "}
            <span className="text-foreground font-medium">Zapier</span>, and{" "}
            <span className="text-foreground font-medium">n8n</span> — so you can focus on growth, not grunt work.
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