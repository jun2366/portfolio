import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, User, MessageSquare, Linkedin, ExternalLink, Phone, MapPin, FileText, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "@/components/SectionHeader";
import resume from "../assets/jun_resume.pdf";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useScrollReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactDetails = [
    {
      icon: Mail,
      label: "Email",
      value: "junrielpajal8@gmail.com",
      href: "mailto:junrielpajal8@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "09945084712",
      href: "tel:09945084712",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Emenville Subdivision, Ambago, Butuan City, Agusan Del Norte",
      href: null,
    },
  ];

  const socialLinks = [
    {
      label: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/junriel-pajal-0b4a10378",
    },
    {
      label: "OnlineJobs.ph",
      icon: ExternalLink,
      url: "https://v2.onlinejobs.ph/jobseekers/info/4787502",
    },
  ];

  const resumeLink = {
    label: "Resume",
    icon: FileText,
    url: resume,
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-16 py-20 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-pulse opacity-40 dark:opacity-10" />
        <div className="absolute bottom-10 right-1/3 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse opacity-20 dark:opacity-5" />
      </div>

      <div className="container px-6 relative z-10">
        {/* Header */}
        <SectionHeader
          id="contact-heading"
          label="Let's Connect"
          title="Ready to Automate Your Business?"
          highlight="Automate"
          subtitle="Schedule a free discovery call and let's explore how automation can transform your workflows and boost your productivity."
        />

        {/* Main Content Card Wrapper */}
        <div ref={formRef} className="max-w-5xl mx-auto reveal relative">
          {/* Premium Get in Touch Card */}
          <div className="relative bg-surface/40 dark:bg-card/40 backdrop-blur-xl border border-border/80 dark:border-border/70 rounded-2xl p-6 sm:p-10 md:p-12 shadow-2xl overflow-visible z-10">
            {submitted ? (
              /* Success State */
              <div className="animate-fade-in py-8">
                <div className="flex flex-col items-center text-center gap-6 max-w-md mx-auto">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg animate-pulse" />
                    <div className="relative w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-text-secondary text-base md:text-lg">
                      Thanks for reaching out. I'll get back to you within 24 hours with a personalized response.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Contact Form & Details */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 lg:items-stretch">
                {/* Form Column */}
                <div className="lg:col-span-2 flex flex-col">
                  <form onSubmit={handleSubmit} className="space-y-4 flex flex-col h-full justify-between">
                    <div className="space-y-4">
                      {/* Name Input */}
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground block">Name</label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-icon group-focus-within:text-primary transition-colors" />
                          <input
                            required
                            type="text"
                            placeholder="Your name"
                            className="w-full h-12 pl-12 pr-4 rounded-lg bg-surface border border-input text-foreground placeholder:text-text-tertiary transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                          />
                        </div>
                      </div>

                      {/* Email Input */}
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground block">Email</label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-icon group-focus-within:text-primary transition-colors" />
                          <input
                            required
                            type="email"
                            placeholder="you@company.com"
                            className="w-full h-12 pl-12 pr-4 rounded-lg bg-surface border border-input text-foreground placeholder:text-text-tertiary transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                          />
                        </div>
                      </div>

                      {/* Message Input */}
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground block">Message</label>
                        <div className="relative group">
                          <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-icon group-focus-within:text-primary transition-colors" />
                          <textarea
                            required
                            rows={4}
                            placeholder="Tell me about your business and what you'd like to automate..."
                            className="w-full pl-12 pr-4 py-3 rounded-lg bg-surface border border-input text-foreground placeholder:text-text-tertiary transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-4">
                      <Button type="submit" variant="default" size="lg" className="w-full sm:w-auto px-8 group">
                        Send Message
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Contact Information Column */}
                <div className="lg:col-span-1 flex flex-col lg:pl-8 pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-l border-border/40 dark:border-border/20 justify-between gap-6">
                  <div className="space-y-3">
                    {contactDetails.map((detail, idx) => {
                      const Icon = detail.icon;
                      return (
                        <a
                          key={idx}
                          href={detail.href || "#"}
                          className={`tap group block p-3.5 rounded-lg bg-surface dark:bg-surface/40 border border-border/60 dark:border-border/40 transition-all duration-200 hover:border-primary/40 hover:bg-surface-hover dark:hover:bg-surface/60 ${
                            !detail.href ? "cursor-default hover:border-border/60 dark:hover:border-border/40" : ""
                          }`}
                          onClick={(e) => !detail.href && e.preventDefault()}
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors mt-0.5">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] font-mono text-text-tertiary uppercase tracking-wider">
                                {detail.label}
                              </p>
                              <p className="text-sm font-medium text-foreground mt-0.5 break-words">
                                {detail.value}
                              </p>
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border/40 dark:border-border/25">
                    <p className="text-[10px] font-mono text-text-tertiary uppercase tracking-wider">Connect</p>
                    <div className="flex flex-col gap-2">
                      {socialLinks.map((link, idx) => {
                        const Icon = link.icon;
                        return (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary min-h-11 justify-start px-3 py-2.5 text-sm font-medium"
                          >
                            <Icon className="w-4 h-4 text-icon" aria-hidden="true" />
                            <span>{link.label}</span>
                          </a>
                        );
                      })}
                      <a
                        href={resumeLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-solid min-h-11 justify-start px-3 py-2.5 text-sm font-medium"
                      >
                        <FileText className="w-4 h-4" aria-hidden="true" />
                        <span>{resumeLink.label}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
