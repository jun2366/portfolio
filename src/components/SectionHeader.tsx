import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Small tinted label above the heading. */
  label: string;
  /** Full heading text. */
  title: string;
  /** One word (or phrase) inside `title` to highlight in teal. Must appear in `title` exactly. */
  highlight?: string;
  subtitle?: string;
  /** id for the heading, so the section can use aria-labelledby. */
  id?: string;
  className?: string;
}

const SectionHeader = ({ label, title, highlight, subtitle, id, className }: SectionHeaderProps) => {
  const revealRef = useScrollReveal();

  const index = highlight ? title.indexOf(highlight) : -1;
  const heading =
    highlight && index >= 0 ? (
      <>
        {title.slice(0, index)}
        <span className="text-gradient">{highlight}</span>
        {title.slice(index + highlight.length)}
      </>
    ) : (
      title
    );

  return (
    <div ref={revealRef} className={cn("reveal mx-auto mb-12 max-w-2xl text-center md:mb-16", className)}>
      <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
        {label}
      </span>
      <h2 id={id} className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
        {heading}
      </h2>
      {subtitle && <p className="text-base leading-relaxed text-text-secondary md:text-lg">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
