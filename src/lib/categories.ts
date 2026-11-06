/**
 * The four chip colors used for project categories and tags (own choices, not brand colors).
 * Tags are colored by their project's platform, because generic tags such as "Automation",
 * "Google-Sheets" or "Webhook" appear in projects of different platforms.
 */
export type CategoryKey = "web" | "n8n" | "zapier" | "ghl";

export const CHIP_CLASS: Record<CategoryKey, string> = {
  web: "chip-web",
  n8n: "chip-n8n",
  zapier: "chip-zapier",
  ghl: "chip-ghl",
};

/** Platform tag that decides the category; anything else (IPCR, ADU) is Web Dev. */
export function projectCategory(tags: readonly string[]): CategoryKey {
  if (tags.includes("Zapier")) return "zapier";
  if (tags.includes("n8n")) return "n8n";
  if (tags.includes("GoHighLevel")) return "ghl";
  return "web";
}
