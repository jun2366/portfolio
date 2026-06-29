import { useState, useEffect } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

import ghlCert from "@/assets/ghl.jpg";
import zapierCert from "@/assets/zapier.jpg";
import n8nCert from "@/assets/n8n.jpg";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  description: string;
  image: string;
  tags: string[];
}

const certificates: Certificate[] = [
  {
    id: "ghl",
    title: "GoHighLevel Certification",
    issuer: "GoHighLevel",
    description: "Validation of expertise in managing CRM pipelines, creating automated marketing campaigns, designing calendars, and configuring custom automation triggers within the GoHighLevel SaaS ecosystem.",
    image: ghlCert,
    tags: ["GoHighLevel", "CRM", "SaaS Automation", "Workflows"]
  },
  {
    id: "zapier",
    title: "Zapier Expert Certification",
    issuer: "Zapier",
    description: "Certified proficiency in configuring multi-step zaps, implementing webhooks, utilizing conditional logic, managing data formatting, and constructing complex app integrations.",
    image: zapierCert,
    tags: ["Zapier", "Integrations", "Webhooks", "Workflow Logic"]
  },
  {
    id: "n8n",
    title: "n8n Advanced Automation Certification",
    issuer: "n8n",
    description: "Advanced competency in building node-based self-hosted automations, execution error handling, processing HTTP requests, and custom JavaScript operations.",
    image: n8nCert,
    tags: ["n8n", "Node Automations", "API Orchestration", "Javascript"]
  }
];

const Certificates = () => {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Close modal on escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      } else if (e.key === "ArrowLeft" && activeIndex !== null) {
        handlePrev();
      } else if (e.key === "ArrowRight" && activeIndex !== null) {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  const handlePrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : certificates.length - 1));
  };

  const handleNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev !== null && prev < certificates.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="certificates" className="py-24 border-t border-border/30 bg-background relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl mb-16 reveal text-center mx-auto">
          <p className="text-primary font-mono text-sm mb-3 tracking-wider uppercase">Credentials</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Professional Certifications
          </h2>
          <p className="text-text-secondary text-lg">
            Verified expertise in industry-leading automation, integration, and CRM platforms.
          </p>
        </div>

        {/* Certificates Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
          {certificates.map((cert, index) => (
            <div
              key={cert.id}
              className="surface-card flex flex-col group click-scale cursor-pointer overflow-hidden border border-border/60 hover:border-primary/40 hover:shadow-xl transition-all duration-300"
              onClick={() => setActiveIndex(index)}
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] bg-muted/20 overflow-hidden border-b border-border">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-opacity duration-300 backdrop-blur-sm">
                  <div className="p-3 bg-primary/10 text-primary rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-medium text-foreground tracking-wider uppercase">
                    Preview Certificate
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-2">
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">
                    {cert.issuer}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                  {cert.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed flex-1">
                  {cert.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-border/60">
                  {cert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-secondary/35 text-text-secondary border border-border/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md transition-all duration-300 p-4 sm:p-6"
          onClick={() => setActiveIndex(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-secondary/80 text-foreground hover:text-primary border border-border/80 hover:border-primary/30 transition-all duration-200 cursor-pointer active:scale-95"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(null);
            }}
            aria-label="Close preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Navigation Arrow */}
          <button
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-secondary/80 text-foreground hover:text-primary border border-border/80 hover:border-primary/30 transition-all duration-200 cursor-pointer active:scale-95"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous certificate"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Center Content Container */}
          <div
            className="flex flex-col items-center max-w-4xl w-full mx-auto select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Wrapper with subtle shadow and border */}
            <div className="relative bg-card border border-border rounded-xl overflow-hidden max-h-[75vh] flex items-center justify-center shadow-2xl">
              <img
                src={certificates[activeIndex].image}
                alt={certificates[activeIndex].title}
                className="max-w-full max-h-[75vh] object-contain animate-in fade-in zoom-in-95 duration-300"
              />
            </div>

            {/* Certificate Details */}
            <div className="mt-4 text-center max-w-2xl px-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <span className="text-xs font-mono text-primary uppercase tracking-widest">
                {certificates[activeIndex].issuer}
              </span>
              <h3 className="text-xl font-bold text-foreground mt-1">
                {certificates[activeIndex].title}
              </h3>
              <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                {certificates[activeIndex].description}
              </p>
            </div>
          </div>

          {/* Right Navigation Arrow */}
          <button
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-secondary/80 text-foreground hover:text-primary border border-border/80 hover:border-primary/30 transition-all duration-200 cursor-pointer active:scale-95"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next certificate"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};

export default Certificates;
