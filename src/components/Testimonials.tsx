import { Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const testimonials = [
  {
    name: "Marcus Delgado",
    role: "Founder, Delgado Property Group",
    quote: "Junriel rebuilt our entire lead management system in under two weeks. Our team went from chasing spreadsheets to closing deals on autopilot. Response times dropped by 80% and our pipeline finally makes sense.",
  },
  {
    name: "Sarah Kim",
    role: "CEO, BrightPath Coaching",
    quote: "Before working with Junriel, I was spending 3 hours a day on manual follow-ups. Now everything runs automatically — booking confirmations, reminders, nurture emails. I got my time back and my revenue went up.",
  },
  {
    name: "Daniel Okoro",
    role: "Operations Manager, SwiftCart",
    quote: "The automation system Junriel built for our order processing is bulletproof. Zero errors in three months. Our team trusts it completely, and we've been able to scale without adding headcount.",
  },
];

const Testimonials = () => {
  const headerRef = useScrollReveal();
  const cardsRef = useScrollReveal();

  return (
    <section id="testimonials" className="py-24 bg-card/50 border-y border-border">
      <div className="container px-6">
        <div ref={headerRef} className="max-w-2xl mb-16 reveal">
          <p className="text-primary font-mono text-sm mb-3 tracking-wider uppercase">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Trusted by Business Owners Who Value Their Time
          </h2>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 reveal-stagger">
          {testimonials.map((t, i) => (
            <div key={i} className="surface-card p-6 flex flex-col click-scale cursor-default">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-6">
                "{t.quote}"
              </p>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-text-tertiary">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
