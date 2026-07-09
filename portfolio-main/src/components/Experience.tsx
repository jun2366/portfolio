import { Briefcase, CheckCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const responsibilities = [
  "Building and optimizing CRM structures in GoHighLevel",
  "Designing multi-step workflow automations for lead management",
  "Integrating third-party tools via APIs, webhooks, and Zapier/n8n",
  "Configuring lead routing, scoring, and automated follow-up sequences",
  "Setting up reporting dashboards and performance tracking",
  "Creating SOPs for automation maintenance and troubleshooting",
];

const Experience = () => {
  const headerRef = useScrollReveal();
  const cardRef = useScrollReveal();

  return (
    <section id="experience" className="py-24 bg-card/50 border-y border-border">
      <div className="container px-6">
        <div ref={headerRef} className="max-w-2xl mb-16 reveal">
          <p className="text-primary font-mono text-sm mb-3 tracking-wider uppercase">Experience</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Built for Scale From Day One
          </h2>
          <p className="text-text-secondary text-lg">
            Every system I build is designed to grow with the business — reliable, documented, and maintainable.
          </p>
        </div>

        <div ref={cardRef} className="surface-card p-8 max-w-3xl reveal">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Automation Specialist</h3>
              <p className="text-text-secondary font-mono text-sm">November 2025 — Present</p>
            </div>
          </div>

          <div className="space-y-3">
            {responsibilities.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-primary mt-1 shrink-0" />
                <p className="text-text-secondary text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
