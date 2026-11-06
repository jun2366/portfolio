import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { CHIP_CLASS, projectCategory } from "@/lib/categories";
import { cn } from "@/lib/utils";

interface CaseStudyDialogProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Accessible case-study modal built on Radix Dialog (already a dependency):
 * focus is trapped inside, Escape and the overlay close it, focus returns to the
 * card that opened it, and role/aria-modal/aria-labelledby/aria-describedby are set.
 * Sections with no data are not rendered, so nothing is padded with invented content.
 */
const CaseStudyDialog = ({ project, open, onOpenChange }: CaseStudyDialogProps) => {
  if (!project) return null;

  const hasChallenge = Boolean(project.challenge);
  const hasSolution = Boolean(project.solution);
  const results = project.results ?? [];
  const chip = CHIP_CLASS[projectCategory(project.tags)];

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="case-study-motion fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content className="case-study-motion fixed left-1/2 top-1/2 z-[60] flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl duration-200 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95">
          <DialogPrimitive.Close
            className="btn btn-icon absolute right-3 top-3 z-10 h-11 w-11 rounded-full border border-border shadow-md md:h-11 md:w-11"
            aria-label="Close case study"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </DialogPrimitive.Close>

          <div className="overflow-y-auto overscroll-contain">
            {project.image && (
              <div className="aspect-[16/9] w-full overflow-hidden border-b border-border bg-muted">
                <img
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  className="h-full w-full object-cover object-top"
                />
              </div>
            )}

            <div className="space-y-8 p-5 sm:p-8">
              <header className="space-y-3">
                <span className={cn("inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide", chip)}>
                  {project.category}
                </span>
                <DialogPrimitive.Title className="pr-10 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                  {project.title}
                </DialogPrimitive.Title>
                {project.tagline && <p className="text-sm font-medium text-text-secondary">{project.tagline}</p>}
              </header>

              <section aria-labelledby="case-overview" className="space-y-2">
                <h3 id="case-overview" className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Overview
                </h3>
                <DialogPrimitive.Description className="text-base leading-relaxed text-foreground">
                  {project.overview}
                </DialogPrimitive.Description>
              </section>

              {(hasChallenge || hasSolution) && (
                <div className={hasChallenge && hasSolution ? "grid gap-4 md:grid-cols-2" : "grid gap-4"}>
                  {hasChallenge && (
                    <section aria-labelledby="case-challenge" className="rounded-xl border border-border bg-background/60 p-5">
                      <h3 id="case-challenge" className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                        Challenge
                      </h3>
                      <p className="text-[15px] leading-[1.6] text-foreground">{project.challenge}</p>
                    </section>
                  )}
                  {hasSolution && (
                    <section aria-labelledby="case-solution" className="rounded-xl border border-primary/25 bg-primary/5 p-5">
                      <h3 id="case-solution" className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
                        Solution
                      </h3>
                      <p className="text-[15px] leading-[1.6] text-foreground">{project.solution}</p>
                    </section>
                  )}
                </div>
              )}

              <section aria-labelledby="case-tools" className="space-y-3">
                <h3 id="case-tools" className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Tools
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag} className="rounded-md border border-border bg-secondary px-2.5 py-1 text-[13px] font-medium text-secondary-foreground">
                      {tag}
                    </li>
                  ))}
                </ul>
              </section>

              {results.length > 0 && (
                <section aria-labelledby="case-results" className="space-y-3">
                  <h3 id="case-results" className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                    Results
                  </h3>
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {results.map((result) => (
                      <li key={result.label} className="rounded-xl border border-border bg-background/60 p-4">
                        <p className="text-2xl font-bold tracking-tight text-gradient">{result.value}</p>
                        <p className="mt-1 text-sm text-text-secondary">{result.label}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {project.link && (
                <div className="border-t border-border pt-6">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-solid min-h-11 px-4 py-2.5 text-sm"
                  >
                    View Project
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default CaseStudyDialog;
