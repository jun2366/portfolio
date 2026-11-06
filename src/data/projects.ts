import zapierProjectImage from "@/assets/zapier-project1.png";
import zapierProjectImage2 from "@/assets/zapier-project2.png";
import bookingautomation from "@/assets/booking-automation.jpeg";
import SellerBuyerAutomation from "@/assets/Seller and Buyer Automation.jpeg";
import AIAgentforFacebookProject from "@/assets/AI Agent for Facebook Project.png";
import AILeadQualifier from "@/assets/AI Lead Qualifier.png";
import RetellAIIntegration from "@/assets/Retell AI n8n Integration.png";
import IPCR from "@/assets/ipcr-system.png";
import ADU from "@/assets/ADU.png";
import PierreMiller from "@/assets/pierre-miller.webp";

export interface ProjectResult {
  /** The figure or short outcome, e.g. "5,793+". Only use real, verifiable numbers. */
  value: string;
  label: string;
}

export interface Project {
  title: string;
  /** Short category shown as the pill (card and modal). */
  category: string;
  /** Optional longer subtitle shown under the title in the modal. */
  tagline?: string;
  /** First part of the original description. Shown on the card and as the modal overview. */
  overview: string;
  /** What problem the client had. Leave undefined until you have the real answer; the column is hidden. */
  challenge?: string;
  /** How it was built. Taken verbatim from the original description. */
  solution?: string;
  /** Real outcomes only. Leave empty until you have them; the tiles are hidden. */
  results?: ProjectResult[];
  /** Tags also drive the Work filter (exact match), so keep the filter names (Zapier, n8n, GoHighLevel, Web Development) intact. */
  tags: string[];
  image?: string;
  link?: string;
}

// Overview + solution are the original card description split at a sentence boundary, unchanged.
// Where a challenge or result is unknown it is left out and hidden in the UI. Fill in the
// "[add ... here]" notes below with real facts only.
export const projects: Project[] = [
  {
    title: "Content Repurposing Workflow",
    category: "Zapier Automation",
    overview: "End-to-end workflow that transforms video/audio files into blog posts and social media content.",
    // challenge: "[add challenge here]",
    solution:
      "Triggered by Google Drive upload, it generates AI transcripts, creates blog posts, splits into loops, uses conditional paths, auto-posts to Facebook, and logs everything to Google Sheets.",
    // results: [{ value: "[add result here]", label: "[add result here]" }],
    tags: ["Zapier", "AI", "Automation", "Google Sheets"],
    image: zapierProjectImage,
    link: "https://drive.google.com/drive/folders/1Ba-_CDkw2PVAjQ4cdkdH2jZGf5ql02h4?usp=sharing",
  },
  {
    title: "Asana CRM Lead Engagement Workflow",
    category: "Zapier Automation",
    overview: "5-in-1 workflow automation for Asana CRM that handles the entire lead lifecycle.",
    // challenge: "[add challenge here]",
    solution:
      "Includes folder creation with subtasks, follow-up sequences for unresponsive leads, quote follow-ups, personalized welcome emails with PDF attachments, and service recommendation emails with 3 variations based on service type.",
    // results: [{ value: "[add result here]", label: "[add result here]" }],
    tags: ["Zapier", "asana", "crm", "Google-drive", "gmail"],
    image: zapierProjectImage2,
    link: "https://drive.google.com/drive/folders/1ECfmRqB27hrkZb3RRkG8qX7_pS0-xgpJ?usp=drive_link",
  },
  /*
  {
    title: "Automated Leads Enrichment",
    category: "Zapier Automation",
    overview:
      "Fully automated lead-handling system that captures leads via webhook, enriches data using Apollo API, scores and prioritizes leads by company size, then routes them accordingly. High-priority leads get saved to Google Sheets, notified via Slack, and receive AI-generated personalized emails. Low-priority leads get a simple email notification.",
    tags: ["Zapier", "Webhook", "Apollo", "Slack", "Google-Sheets", "AI"],
    image: zapierProjectImage,
    link: "https://drive.google.com/drive/folders/1Ba-_CDkw2PVAjQ4cdkdH2jZGf5ql02h4?usp=drive_link",
  },
  */
  {
    title: "AI Chatbot for Facebook Messenger",
    category: "n8n Automation",
    overview:
      "Self-hosted AI chatbot that automatically responds to Facebook Messenger inquiries using a custom company knowledge base.",
    // challenge: "[add challenge here]",
    solution:
      "Built with Google Gemini as the chat model, includes conversation memory for context-aware responses, and uses webhooks to connect with Facebook's API in real-time.",
    // results: [{ value: "[add result here]", label: "[add result here]" }],
    tags: ["n8n", "Facebook", "Gemini", "Webhook", "Chatbot"],
    image: AIAgentforFacebookProject,
    link: "https://drive.google.com/drive/folders/1sWgYUY4hSmUtt11N_RwxacrvEuvsdfz2?usp=sharing",
  },
  {
    title: "AI Lead Qualifier Automation",
    category: "n8n Automation",
    overview:
      "Built an intelligent lead qualification system that automatically analyzes incoming inquiries using AI and routes them based on qualification status.",
    // challenge: "[add challenge here]",
    solution: "The system scores leads, provides reasoning, and logs everything to Google Sheets for sales team follow-up.",
    // results: [{ value: "[add result here]", label: "[add result here]" }],
    tags: ["n8n", "Ai", "Automation", "Google-Sheets", "llama-3.2"],
    image: AILeadQualifier,
    link: "https://drive.google.com/drive/folders/1Ur8gI6gtJEb86WASY8Zrnv6XdSHZDpLY?usp=sharing",
  },
  {
    title: "Simple Retell Call Logger",
    category: "n8n Automation",
    overview: "Automates call logging from Retell AI.",
    // challenge: "[add challenge here]",
    solution:
      "Captures call details, transcripts, recordings, and sentiment/status, logging them directly to Google Sheets for analysis.",
    // results: [{ value: "[add result here]", label: "[add result here]" }],
    tags: ["n8n", "Retell-AI", "Automation", "Google-Sheets", "Voice-AI"],
    image: RetellAIIntegration,
    link: "https://drive.google.com/drive/folders/1EEf71YGOHXqNIoLC_26LrM2DDjcbvIKV?usp=sharing",
  },
  {
    title: "Booking Appointment & Reminder System",
    category: "GoHighLevel Automation",
    overview: "Complete appointment management workflow handling 5,793+ contacts.",
    // Stated in the original description ("...reminder emails + SMS to reduce no-shows").
    challenge: "Reduce no-shows.",
    solution:
      "Triggers on booking, removes lead from nurture, creates/updates opportunity, sends confirmation email, then delivers 24-hour and 1-hour reminder emails + SMS to reduce no-shows.",
    // 5,793+ comes from the original description. Add more only if real, e.g. no-show rate before/after: "[add result here]"
    results: [{ value: "5,793+", label: "contacts handled by the workflow" }],
    tags: ["GoHighLevel", "crm", "Automation", "sms", "email"],
    image: bookingautomation,
    link: "https://drive.google.com/drive/folders/1RnByj26vutw2PyaTSjpOxIsV7cHb-mZI?usp=sharing",
  },
  {
    title: "Smart Lead Routing for Real Estate",
    category: "GoHighLevel Automation",
    overview: "Intelligent lead qualification system for Single Tree Team real estate.",
    // challenge: "[add challenge here]",
    solution:
      "Routes survey submissions by lead type (Buyer/Seller/Both), auto-tags contacts, creates pipeline opportunities, syncs to KvCore CRM via webhook, and triggers follow-up sequences for unresponsive leads.",
    // results: [{ value: "[add result here]", label: "[add result here]" }],
    tags: ["GoHighLevel", "crm", "real-estate", "automation", "webhook"],
    image: SellerBuyerAutomation,
    link: "https://drive.google.com/drive/folders/1rhZuHOrB8j5hXnqA6eESEd4d-_hNGViO?usp=sharing",
  },
  {
    title: "IPCR Management System",
    category: "Web Development",
    tagline: "Streamlining Employee Performance Evaluation and Reporting",
    overview:
      "A web-based performance evaluation platform that digitizes the Individual Performance Commitment and Review (IPCR) process.",
    // challenge: "[add challenge here]",
    solution:
      "The system enables users to manage performance targets, automate rating calculations, generate narrative assessments, and produce printable reports, improving accuracy and efficiency in employee performance evaluation workflows. Built using Core PHP, HTML, CSS, JavaScript, and MySQL/JSON-based data storage.",
    // results: [{ value: "[add result here]", label: "[add result here]" }],
    tags: ["PHP", "MySQL", "HTML", "CSS", "html", "Data Management", "Performance Management", "Web Development"],
    image: IPCR,
    link: "https://github.com/jun2366/IPCR.git",
  },
  {
    title: "ADU Exchange (United States)",
    category: "Frontend Development",
    overview:
      "Developed a responsive lead-generation website for a U.S.-based ADU (Accessory Dwelling Unit) consulting and development company.",
    // challenge: "[add challenge here]",
    solution:
      "The platform was designed to educate homeowners on ADU opportunities, showcase services, and convert visitors into qualified leads through strategic call-to-actions and conversion-focused user experience. Built using a custom frontend stack consisting of HTML5, Tailwind CSS, and JavaScript, with integrated marketing analytics and tracking tools to support campaign performance measurement and customer acquisition efforts.",
    // results: [{ value: "[add result here]", label: "[add result here]" }],
    tags: ["JavaScript", "Tailwind CSS", "HTML 5", "UI/UX", "Marketing Website", "Web Development", "Lead Generation", "Responsive Design"],
    image: ADU,
    link: "https://www.theaduexchange.com/",
  },
  {
    title: "Pierre Miller Design Studio Website",
    category: "Web Development",
    tagline: "Freelance web developer, AI-assisted development with Base44",
    overview:
      "Portfolio website for an architecture and interior design studio, with projects grouped by category and a page for each project. Built with Base44.",
    // challenge: "[add challenge here]",
    // solution: "[add solution here]",
    // results: [{ value: "[add result here]", label: "[add result here]" }],
    tags: ["Base44", "Web Development", "Portfolio Website", "AI-Assisted"],
    image: PierreMiller,
    link: "https://pierremillerdesign.com/projects",
  },
  /*
  {
    title: "ASV Development: Construction Company Website",
    category: "Business Website Development",
    overview:
      "A clean and professional construction company website built on Hostinger, featuring service sections, recent projects, customer testimonials, and clear contact and quotation call-to-actions designed to build trust and generate leads.",
    tags: ["Hostinger", "construction", "web-development", "business", "medicare", "ui-design", "service-business"],
    image: zapierProjectImage,
    link: "https://drive.google.com/drive/folders/1Ba-_CDkw2PVAjQ4cdkdH2jZGf5ql02h4?usp=drive_link",
  },
  {
    title: "Weather API Application",
    category: "API-Based Web Application",
    overview:
      "A simple weather web application that allows users to search for any city and view real-time weather data using the OpenWeatherMap API, presented with a clean UI and responsive layout.",
    tags: ["Website", "api", "weather-app", "javascript", "openweathermap", "web-development", "portfolio-preject"],
    image: zapierProjectImage,
    link: "https://drive.google.com/drive/folders/1Ba-_CDkw2PVAjQ4cdkdH2jZGf5ql02h4?usp=drive_link",
  },
  */
];
