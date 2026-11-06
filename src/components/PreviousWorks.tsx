import { ArrowUpRight, Maximize2 } from "lucide-react";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "@/components/SectionHeader";
import CaseStudyDialog from "@/components/CaseStudyDialog";
import { projects, type Project } from "@/data/projects";
import { CHIP_CLASS, projectCategory } from "@/lib/categories";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Zapier",
  "n8n",
  "GoHighLevel",
  "Web Development",
  /*
  "Webflow",
  "WordPress",
  "Website (Code)",
  "Hostinger",
  "Social Media Graphics"
  */
];

const PreviousWorks = () => {
  const cardsRef = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  // Kept after closing so the modal can play its exit animation with content still in place.
  const [selected, setSelected] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => {
          // treat Website (Code) specially since tags might be "Code" or "Website"
          if (activeCategory === "Website (Code)") {
            return p.tags.some((t) => /code|website/i.test(t));
          }
          return p.tags.includes(activeCategory);
        });

  const openCaseStudy = (project: Project) => {
    setSelected(project);
    setDialogOpen(true);
  };

  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-16 py-24">
      <div className="container px-6">
        <SectionHeader
          id="work-heading"
          label="Previous Work"
          title="Project Sample"
          highlight="Sample"
          subtitle="Sample builds showcasing how automation transforms operations."
        />

        {/* filter buttons */}
        <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects by category">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "btn min-h-11 rounded-full px-4 py-2 text-sm font-medium md:min-h-0",
                activeCategory === cat ? "btn-solid" : "btn-secondary",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={cardsRef} className="grid gap-6 lg:grid-cols-2 reveal-stagger">
          {filteredProjects.map((project) => {
            const chip = CHIP_CLASS[projectCategory(project.tags)];
            return (
            <article
              key={project.title}
              className="surface-card group relative flex flex-col overflow-hidden hover:border-primary/30"
            >
              {project.image && (
                <div className="relative h-52 w-full overflow-hidden border-b border-border">
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <p className={cn("mb-3 self-start rounded-full px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider", chip)}>
                  {project.category}
                </p>
                <h3 className="mb-3 text-lg font-bold">
                  {/* Stretched button: the whole card is clickable, but only this one control is in the tab order. */}
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => openCaseStudy(project)}
                    className="text-left transition-colors duration-200 ease-out after:absolute after:inset-0 after:rounded-xl after:content-[''] hover:text-primary focus:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ring"
                  >
                    {project.title}
                  </button>
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-text-secondary">{project.overview}</p>

                <ul className="mt-6 flex flex-wrap gap-2 border-t border-border pt-4" aria-label="Tools">
                  {project.tags.map((tag) => (
                    <li key={tag} className={cn("rounded-md px-2.5 py-1 font-mono text-xs", chip)}>
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground" aria-hidden="true">
                    <Maximize2 className="h-4 w-4 text-primary" />
                    View case study
                  </span>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-text relative z-10 inline-flex min-h-11 items-center gap-1.5 px-1 font-mono text-xs md:min-h-0"
                    >
                      View Project
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="sr-only"> for {project.title} (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </div>

      <CaseStudyDialog project={selected} open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
};

export default PreviousWorks;
