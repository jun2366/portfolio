import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, User, MessageSquare, Linkedin, ExternalLink, Phone, MapPin, FileText, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { EarthCanvas } from "@/components/Canvas";
import resume from "../assets/jun_resume.pdf";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const headerRef = useScrollReveal();
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
    <section id="contact" className="py-20 bg-background relative overflow-hidden transition-colors duration-300">
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-pulse opacity-40 dark:opacity-10" />
        <div className="absolute bottom-10 right-1/3 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse opacity-20 dark:opacity-5" />
      </div>

      <div className="container px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-12 reveal">
          <div className="inline-block mb-3">
            <span className="text-primary font-mono text-sm tracking-widest uppercase font-semibold px-3 py-1 bg-primary/10 rounded-full">
              Let's Connect
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 transition-colors duration-300">
            Ready to Automate Your Business?
          </h2>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Schedule a free discovery call and let's explore how automation can transform your workflows and boost your productivity.
          </p>
        </div>

        {/* Main Content Card Wrapper */}
        <div ref={formRef} className="max-w-5xl mx-auto reveal relative">
          
          {/* Subtle cyan/blue radial glow behind the Earth */}
          <div className="absolute bottom-0 left-0 -translate-x-[35%] translate-y-[35%] w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-[radial-gradient(circle,_rgba(6,182,212,0.25)_0%,_rgba(59,130,246,0.1)_45%,_transparent_70%)] blur-xl pointer-events-none z-10" />

          {/* Floating 3D Earth */}
          <div className="absolute bottom-0 left-0 -translate-x-[35%] translate-y-[35%] w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 z-20 pointer-events-auto">
            <EarthCanvas variant="inline" className="w-full h-full" />
          </div>

          {/* Premium Get in Touch Card */}
          <div className="relative bg-surface/40 dark:bg-zinc-900/30 backdrop-blur-xl border border-border/80 dark:border-white/10 rounded-2xl p-6 sm:p-10 md:p-12 shadow-2xl overflow-visible z-10">
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
                <div className="lg:col-span-2 flex flex-col pl-0 lg:pl-20">
                  <form onSubmit={handleSubmit} className="space-y-4 flex flex-col h-full justify-between">
                    <div className="space-y-4">
                      {/* Name Input */}
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground block">Name</label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50 group-focus-within:text-primary transition-colors" />
                          <input
                            required
                            type="text"
                            placeholder="Your name"
                            className="w-full h-12 pl-12 pr-4 rounded-lg bg-surface dark:bg-surface border border-border dark:border-border/60 text-foreground placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all duration-200"
                          />
                        </div>
                      </div>

                      {/* Email Input */}
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground block">Email</label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50 group-focus-within:text-primary transition-colors" />
                          <input
                            required
                            type="email"
                            placeholder="you@company.com"
                            className="w-full h-12 pl-12 pr-4 rounded-lg bg-surface dark:bg-surface border border-border dark:border-border/60 text-foreground placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all duration-200"
                          />
                        </div>
                      </div>

                      {/* Message Input */}
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground block">Message</label>
                        <div className="relative group">
                          <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-primary/50 group-focus-within:text-primary transition-colors" />
                          <textarea
                            required
                            rows={4}
                            placeholder="Tell me about your business and what you'd like to automate..."
                            className="w-full pl-12 pr-4 py-3 rounded-lg bg-surface dark:bg-surface border border-border dark:border-border/60 text-foreground placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all duration-200 resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-4">
                      <Button 
                        variant="hero" 
                        size="lg" 
                        className="w-full sm:w-auto px-8 py-3 group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/10 transition-all duration-200"
                      >
                        Send Message
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Contact Information Column */}
                <div className="lg:col-span-1 flex flex-col pl-16 sm:pl-20 lg:pl-8 pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-l border-border/40 dark:border-border/20 justify-between gap-6">
                  <div className="space-y-3">
                    {contactDetails.map((detail, idx) => {
                      const Icon = detail.icon;
                      return (
                        <a
                          key={idx}
                          href={detail.href || "#"}
                          className={`group block p-3.5 rounded-lg bg-surface dark:bg-surface/40 border border-border/60 dark:border-border/40 transition-all duration-200 hover:border-primary/40 hover:bg-surface-hover dark:hover:bg-surface/60 ${
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
                            className="inline-flex items-center gap-2 px-3 py-2.5 rounded-lg bg-surface dark:bg-surface/40 border border-primary/20 text-primary font-medium text-sm hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200 group hover:border-primary/40"
                          >
                            <Icon className="w-4 h-4" />
                            <span>{link.label}</span>
                          </a>
                        );
                      })}
                      <a
                        href={resumeLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/95 transition-all duration-200 group shadow-md shadow-primary/10"
                      >
                        <FileText className="w-4 h-4" />
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
