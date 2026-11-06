import { Settings, GitBranch, Workflow, Plug, Zap } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "@/components/SectionHeader";

const services = [
  {
    icon: Settings,
    title: "GoHighLevel CRM Setup & Optimization",
    description: "Full CRM buildout tailored to your sales process: pipelines, automations, tags, and custom fields configured for maximum efficiency.",
  },
  {
    icon: GitBranch,
    title: "Sales Funnels & Pipelines",
    description: "High-converting funnels and structured pipelines that move leads from cold to closed with automated follow-ups at every stage.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Eliminate repetitive tasks with smart workflows. From lead routing to appointment booking, every step runs without manual input.",
  },
  {
    icon: Plug,
    title: "API & Webhook Integrations",
    description: "Connect your tools seamlessly. Payment processors, calendars, email platforms, all synced and communicating in real-time.",
  },
  {
    icon: Zap,
    title: "Custom n8n & Zapier Systems",
    description: "Advanced multi-step automations that tie your entire tech stack together, with error handling and monitoring built in.",
  },
];

const Services = () => {
  const cardsRef = useScrollReveal();

  return (
    <section id="services" aria-labelledby="services-heading" className="py-24 relative scroll-mt-16">
      <div className="container px-6">
        <SectionHeader
          id="services-heading"
          label="Services"
          title="What I Build"
          highlight="Build"
          subtitle="Automations, websites, and digital systems, designed to save you time and scale your business."
        />

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
          {services.map((service, i) => (
            <div
              key={i}
              className="surface-card p-6 hover:border-primary/30 group click-scale cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
