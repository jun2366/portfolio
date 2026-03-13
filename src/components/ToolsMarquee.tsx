import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const tools = [
  { name: "Monday.com", icon: "https://cdn.simpleicons.org/monday" },
  { name: "Notion", icon: "https://cdn.simpleicons.org/notion/ffffff" },
  { name: "Airtable", icon: "https://cdn.simpleicons.org/airtable" },
  { name: "ClickUp", icon: "https://cdn.simpleicons.org/clickup" },
  { name: "Zoom", icon: "https://cdn.simpleicons.org/zoom" },
  { name: "Webhooks", icon: "https://cdn.simpleicons.org/webhook" },
  { name: "HTTP Request", icon: "https://cdn.simpleicons.org/httpie" },
  { name: "GoHighLevel", icon: "https://cdn.simpleicons.org/g" },
  { name: "Zapier", icon: "https://cdn.simpleicons.org/zapier" },
  { name: "n8n", icon: "https://cdn.simpleicons.org/n8n" },
  { name: "ChatGPT", icon: "https://cdn.simpleicons.org/openai" },
  { name: "Claude", icon: "https://cdn.simpleicons.org/anthropic" },
  { name: "Google Workspace", icon: "https://cdn.simpleicons.org/google" },
  { name: "Google Drive", icon: "https://cdn.simpleicons.org/googledrive" },
  { name: "Google Sheets", icon: "https://cdn.simpleicons.org/googlesheets" },
  { name: "Calendly", icon: "https://cdn.simpleicons.org/calendly" },
  { name: "Dropbox", icon: "https://cdn.simpleicons.org/dropbox" },
  { name: "Slack", icon: "https://cdn.simpleicons.org/slack" },
  { name: "Trello", icon: "https://cdn.simpleicons.org/trello" },
];

const marqueeTools = [...tools, ...tools];

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

      <div className="relative group">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {marqueeTools.map((tool, i) => (
            <div
              key={`${tool.name}-${i}`}
              className="flex flex-col items-center justify-center mx-6 md:mx-8 w-20 md:w-24 shrink-0 transition-all duration-300 ease-in-out hover:scale-105 cursor-default group/tool"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-secondary/50 border border-border transition-all duration-300 ease-in-out group-hover/tool:border-primary/40 group-hover/tool:shadow-[0_0_20px_-5px_hsl(var(--glow)/0.25)]">
                <img
                  src={tool.icon}
                  alt={tool.name}
                  className="w-6 h-6 md:w-7 md:h-7 opacity-[0.85] transition-all duration-300 ease-in-out group-hover/tool:opacity-100 group-hover/tool:drop-shadow-[0_0_6px_hsl(var(--glow)/0.4)]"
                  loading="lazy"
                />
              </div>
              <span className="mt-2 text-[10px] md:text-xs font-mono text-text-tertiary transition-colors duration-300 group-hover/tool:text-foreground text-center leading-tight">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsMarquee;
