import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { TOOL_ICON_PATHS, type ToolIconSlug } from "@/lib/tool-icons";

interface Tool {
  name: string;
  /** Local brand mark (simple-icons, CC0). Omitted when no accurate open icon exists. */
  icon?: ToolIconSlug;
  /** Short neutral monogram shown when there is no icon. */
  monogram?: string;
}

const tools: Tool[] = [
  { name: "Monday.com", monogram: "M" },
  { name: "Notion", icon: "notion" },
  { name: "Airtable", icon: "airtable" },
  { name: "ClickUp", icon: "clickup" },
  { name: "Zoom", icon: "zoom" },
  { name: "Webhooks", monogram: "WH" },
  { name: "HTTP Request", monogram: "HTTP" },
  { name: "GoHighLevel", monogram: "GHL" },
  { name: "Zapier", icon: "zapier" },
  { name: "n8n", icon: "n8n" },
  { name: "ChatGPT", monogram: "GPT" },
  { name: "Claude", icon: "anthropic" },
  { name: "Google Workspace", icon: "google" },
  { name: "Google Drive", icon: "googledrive" },
  { name: "Google Sheets", icon: "googlesheets" },
  { name: "Calendly", icon: "calendly" },
  { name: "Dropbox", icon: "dropbox" },
  { name: "Slack", monogram: "S" },
  { name: "Trello", icon: "trello" },
];

/** One full set of tools. Rendered twice for the seamless loop; the copy is hidden from screen readers. */
const ToolList = ({ hidden = false }: { hidden?: boolean }) => (
  <ul className="flex shrink-0" aria-hidden={hidden || undefined} aria-label={hidden ? undefined : "Tools I work with"}>
    {tools.map((tool) => (
      <li key={tool.name} className="group/tool mx-6 flex w-20 shrink-0 flex-col items-center md:mx-8 md:w-24">
        {/* Same tile for icons and monograms: identical size, color and baseline across the row. */}
        <div
          aria-hidden="true"
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card text-icon transition-colors duration-200 ease-out group-hover/tool:border-primary/50 md:h-14 md:w-14"
        >
          {tool.icon ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7" fill="currentColor" focusable="false">
              <path d={TOOL_ICON_PATHS[tool.icon]} />
            </svg>
          ) : (
            <span className="text-[11px] font-bold leading-none tracking-tight md:text-xs">{tool.monogram}</span>
          )}
        </div>
        <span className="mt-2 whitespace-nowrap text-center text-xs font-medium leading-tight text-text-secondary transition-colors duration-200 ease-out group-hover/tool:text-foreground">
          {tool.name}
        </span>
      </li>
    ))}
  </ul>
);

const ToolsMarquee = () => {
  const revealRef = useScrollReveal();

  return (
    <section ref={revealRef} className="relative py-20 overflow-hidden reveal">
      <div className="container px-6 mb-10 text-center">
        <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-3">
          Trusted Stack
        </p>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Automation & Productivity Tools I Work With
        </h2>
      </div>

      {/* Edge fade via a mask on the row itself, so it blends into the page gradient in both themes. */}
      <div className="marquee-fade relative group">

        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          <ToolList />
          <ToolList hidden />
        </div>
      </div>
    </section>
  );
};

export default ToolsMarquee;
