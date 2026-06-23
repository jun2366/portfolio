import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useState } from "react";
import zapierProjectImage from "@/assets/zapier-project1.png";
import zapierProjectImage2 from "@/assets/zapier-project2.png";
import bookingautomation from "@/assets/booking-automation.jpeg";
import SellerBuyerAutomation from "@/assets/Seller and Buyer Automation.jpeg";
import AIAgentforFacebookProject from "@/assets/AI Agent for Facebook Project.png";
import AILeadQualifier from "@/assets/AI Lead Qualifier.png";
import RetellAIIntegration from "@/assets/Retell AI n8n Integration.png";
import IPCR  from "@/assets/IPCR System.png";




interface Project {
  title: string;
  subtitle?: string;
  description?: string;
  problem?: string;
  solution?: string;
  outcome?: string;
  tags: string[];
  image?: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "Content Repurposing Workflow",
    subtitle: "Zapier Automation",
    description:
      "End-to-end workflow that transforms video/audio files into blog posts and social media content. Triggered by Google Drive upload, it generates AI transcripts, creates blog posts, splits into loops, uses conditional paths, auto-posts to Facebook, and logs everything to Google Sheets.",
    tags: ["Zapier", "AI", "Automation", "Google Sheets"],
    image: zapierProjectImage,
    link: "https://drive.google.com/drive/folders/1Ba-_CDkw2PVAjQ4cdkdH2jZGf5ql02h4?usp=sharing",
  },
  {
    title: "Asana CRM Lead Engagement Workflow",
    subtitle: "Zapier Automation",
    description:
      "5-in-1 workflow automation for Asana CRM that handles the entire lead lifecycle. Includes folder creation with subtasks, follow-up sequences for unresponsive leads, quote follow-ups, personalized welcome emails with PDF attachments, and service recommendation emails with 3 variations based on service type.",
    tags: ["Zapier", "asana", "crm", "Google-drive", "gmail"],
    image: zapierProjectImage2,
    link: "https://drive.google.com/drive/folders/1ECfmRqB27hrkZb3RRkG8qX7_pS0-xgpJ?usp=drive_link",
  },
  /*
  {
    title: "Automated Leads Enrichment",
    subtitle: "Zapier Automation",
    description:
      "Fully automated lead-handling system that captures leads via webhook, enriches data using Apollo API, scores and prioritizes leads by company size, then routes them accordingly — high-priority leads get saved to Google Sheets, notified via Slack, and receive AI-generated personalized emails. Low-priority leads get a simple email notification.",
    tags: ["Zapier", "Webhook", "Apollo", "Slack", "Google-Sheets", "AI"],
    image: zapierProjectImage,
    link: "https://drive.google.com/drive/folders/1Ba-_CDkw2PVAjQ4cdkdH2jZGf5ql02h4?usp=drive_link",
  },
  */
  {
    title: "AI Chatbot for Facebook Messenger",
    subtitle: "n8n Automation",
    description:
      "Self-hosted AI chatbot that automatically responds to Facebook Messenger inquiries using a custom company knowledge base. Built with Google Gemini as the chat model, includes conversation memory for context-aware responses, and uses webhooks to connect with Facebook's API in real-time.",
    tags: ["n8n", "Facebook", "Gemini", "Webhook", "Chatbot",],
    image: AIAgentforFacebookProject,
    link: "https://drive.google.com/drive/folders/1bkT_E733vG3HQXxNPczBZwZop0_Yiztm?usp=sharing",
  },
  {
    title: "AI Lead Qualifier Automation",
    subtitle: "n8n Automation",
    description:
      "Built an intelligent lead qualification system that automatically analyzes incoming inquiries using AI and routes them based on qualification status. The system scores leads, provides reasoning, and logs everything to Google Sheets for sales team follow-up.",
    tags: ["n8n", "Ai", "Automation", "Google-Sheets", "llama-3.2",],
    image: AILeadQualifier,
    link: "https://drive.google.com/drive/folders/1Ur8gI6gtJEb86WASY8Zrnv6XdSHZDpLY?usp=sharing",
  },
  {
    title: "Simple Retell Call Logger",
    subtitle: "n8n Automation",
    description:
      "Automates call logging from Retell AI. Captures call details, transcripts, recordings, and sentiment/status, logging them directly to Google Sheets for analysis.",
    tags: ["n8n", "Retell-AI", "Automation", "Google-Sheets", "Voice-AI",],
    image: RetellAIIntegration,
    link: "https://drive.google.com/drive/folders/1EEf71YGOHXqNIoLC_26LrM2DDjcbvIKV?usp=sharing",
  },
  {
    title: "Booking Appointment & Reminder System",
    subtitle: "GoHighLevel Automation",
    description:
      "Complete appointment management workflow handling 5,793+ contacts. Triggers on booking, removes lead from nurture, creates/updates opportunity, sends confirmation email, then delivers 24-hour and 1-hour reminder emails + SMS to reduce no-shows.",
    tags: ["GoHighLevel", "crm", "Automation", "sms", "email",],
    image: bookingautomation,
    link: "https://drive.google.com/drive/folders/1RnByj26vutw2PyaTSjpOxIsV7cHb-mZI?usp=sharing",
  }, 
  {
    title: "Smart Lead Routing for Real Estate",
    subtitle: "GoHighLevel Automation",
    description:
      "Intelligent lead qualification system for Single Tree Team real estate. Routes survey submissions by lead type (Buyer/Seller/Both), auto-tags contacts, creates pipeline opportunities, syncs to KvCore CRM via webhook, and triggers follow-up sequences for unresponsive leads.",
    tags: ["GoHighLevel", "crm", "real-estate", "automation", "webhook",],
    image: SellerBuyerAutomation,
    link: "https://drive.google.com/drive/folders/1rhZuHOrB8j5hXnqA6eESEd4d-_hNGViO?usp=sharing",
  },
  
  {
    title: "IPCR Management System",
    subtitle: "Streamlining Employee Performance Evaluation and Reporting",
    description:
      "A web-based performance evaluation platform that digitizes the Individual Performance Commitment and Review (IPCR) process. The system enables users to manage performance targets, automate rating calculations, generate narrative assessments, and produce printable reports, improving accuracy and efficiency in employee performance evaluation workflows. Built using Core PHP, HTML, CSS, JavaScript, and MySQL/JSON-based data storage.",
    tags: ["PHP", "MySQL", "HTML", "CSS", "html", "Data Management","Performance Management"],
    image: IPCR,
    link: "https://github.com/jun2366/IPCR.git",
  }, 
  /*
  {
    title: "Business Website with Elementor",
    subtitle: "WordPress Development",
    description:
      "Full business website built with WordPress and Elementor, featuring service pages, blog, contact forms, and basic SEO setup.",
    tags: ["WordPress",],
    image: zapierProjectImage,
    link: "https://drive.google.com/drive/folders/1Ba-_CDkw2PVAjQ4cdkdH2jZGf5ql02h4?usp=drive_link",
  },
   
  {
    title: "ASV Development – Construction Company Website",
    subtitle: "Business Website Development",
    description:
      "A clean and professional construction company website built on Hostinger, featuring service sections, recent projects, customer testimonials, and clear contact and quotation call-to-actions designed to build trust and generate leads.",
    tags: ["Hostinger", "construction", "web-development", "business", "medicare", "ui-design", "service-business"],
    image: zapierProjectImage,
    link: "https://drive.google.com/drive/folders/1Ba-_CDkw2PVAjQ4cdkdH2jZGf5ql02h4?usp=drive_link",
  }, 
  {
    title: "Weather API Application",
    subtitle: "API-Based Web Application",
    description:
      "A simple weather web application that allows users to search for any city and view real-time weather data using the OpenWeatherMap API, presented with a clean UI and responsive layout.",
    tags: ["Website", "api", "weather-app", "javascript", "openweathermap", "web-development", "portfolio-preject",],
    image: zapierProjectImage,
    link: "https://drive.google.com/drive/folders/1Ba-_CDkw2PVAjQ4cdkdH2jZGf5ql02h4?usp=drive_link",
  },
  */ 
];

const PreviousWorks = () => {
  const headerRef = useScrollReveal();
  const cardsRef = useScrollReveal();

  const categories = [
    "All",
    "Zapier",
    "n8n",
    "GoHighLevel",
    /*
    "Webflow",
    "WordPress",
    "Website (Code)",
    "Hostinger",
    "Social Media Graphics"
    */
    ,
  ];

  const [activeCategory, setActiveCategory] = useState<string>("All");

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

  return (
    <section id="work" className="py-24">
      <div className="container px-6">
        <div ref={headerRef} className="max-w-2xl mb-16 reveal text-center mx-auto">
          <p className="text-primary font-mono text-sm mb-3 tracking-wider uppercase">Previous Work</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Project Sample
          </h2>
          <p className="text-text-secondary text-lg uppercase">
            Sample builds showcasing how automation transforms operations.
          </p>
        </div>

        {/* filter buttons */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeCategory === cat
                  ? "bg-purple-600 text-white"
                  : "bg-secondary/20 text-text-primary hover:bg-secondary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={cardsRef} className="grid lg:grid-cols-2 gap-6 reveal-stagger">
          {filteredProjects.map((project, i) => (
            <div
              key={i}
              className="surface-card flex flex-col hover:border-primary/30 group click-scale cursor-default overflow-hidden"
            >
              {project.image && (
                <div className="w-full h-52 overflow-hidden border-b border-border">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Project
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {!project.link && (
                    <ArrowUpRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors duration-200" />
                  )}
                </div>
                <div className="space-y-4 flex-1">
                  {project.subtitle && (
                    <p className="text-xs font-mono text-primary uppercase tracking-wider mb-1">
                      {project.subtitle}
                    </p>
                  )}
                  {project.description && (
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {project.description}
                    </p>
                  )}
                </div>                
                <div className="space-y-4 flex-1">
                  {project.description && (
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {project.description}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-md bg-primary/10 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreviousWorks;