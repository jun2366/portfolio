import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, User, MessageSquare, Linkedin, ExternalLink, Phone, MapPin, FileText } from "lucide-react";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import locationImg from "@/assets/location.png";
import resume from "../assets/jun_resume.pdf";

console.log("Resume path:", resume);

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const headerRef = useScrollReveal();
  const formRef = useScrollReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* decorative blurred circle */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-[#112E2D]/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/3 w-96 h-96 rounded-full bg-[#2BD4BD]/20 blur-3xl animate-pulse" />
      </div>
      <div className="container px-6 relative z-10">
        <div ref={headerRef} className="max-w-2xl mx-auto text-center mb-12 reveal">
          <p className="text-[#2BD4BD] font-mono text-sm mb-3 tracking-wider uppercase">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to Automate Your Business?
          </h2>
          <p className="text-text-secondary text-lg">
            Schedule a free discovery call. We'll map out your workflows and show you exactly what can be automated.
          </p>
        </div>

        <div ref={formRef} className="max-w-4xl mx-auto reveal">
          {submitted ? (
            <div className="flex flex-col md:flex-row gap-8 bg-gradient-to-br from-[#2BD4BD]/5 to-[#112E2D]/5 shadow-lg rounded-2xl p-6">
              <div className="surface-card p-8 text-center flex-1 bg-white/80 backdrop-blur rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-text-secondary text-sm">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 gap-6">
                {/* contact detail cards stacked */}
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-start gap-3 p-4 bg-[#112E2D] rounded-lg">
                    <Mail className="w-6 h-6 text-[#2BD4BD] mt-1" />
                    <div>
                      <p className="text-xs font-mono text-text-tertiary uppercase">EMAIL</p>
                      <p className="text-white text-sm">junrielpajal8@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-[#112E2D] rounded-lg">
                    <Phone className="w-6 h-6 text-[#2BD4BD] mt-1" />
                    <div>
                      <p className="text-xs font-mono text-text-tertiary uppercase">PHONE</p>
                      <p className="text-white text-sm">09945084712</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-[#112E2D] rounded-lg">
                    <MapPin className="w-6 h-6 text-[#2BD4BD] mt-1" />
                    <div>
                      <p className="text-xs font-mono text-text-tertiary uppercase">LOCATION</p>
                      <p className="text-white text-sm">Emenville Subdivision, Ambago, Butuan City, Agusan Del Norte</p>
                    </div>
                  </div>
                </div>
                {/* social buttons */}
                <div className="flex flex-wrap gap-4 mt-4">
                  <a
                    href="https://www.linkedin.com/in/junriel-pajal-0b4a10378"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#112E2D] border border-[#2BD4BD] text-white text-sm font-medium hover:bg-[#0f2a29] transition-colors duration-200"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a
                    href="https://v2.onlinejobs.ph/jobseekers/info/4787502"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#112E2D] border border-[#2BD4BD] text-white text-sm font-medium hover:bg-[#0f2a29] transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    OnlineJobs.ph
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="surface-card p-8 flex flex-col md:flex-row gap-8 bg-gradient-to-br from-[#2BD4BD]/5 to-[#112E2D]/5 shadow-lg rounded-2xl">
              <form onSubmit={handleSubmit} className="flex-1 space-y-5 bg-white/80 backdrop-blur rounded-xl p-6">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#2BD4BD]/10 border border-border text-sm text-[#112E2D] placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-[#112E2D]/50 focus:border-[#112E2D]/50 transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                    <input
                      required
                      type="email"
                      placeholder="you@company.com"
                      className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#2BD4BD]/10 border border-border text-sm text-[#112E2D] placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-[#112E2D]/50 focus:border-[#112E2D]/50 transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-text-tertiary" />
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your business and what you'd like to automate..."
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2BD4BD]/10 border border-border text-sm text-[#112E2D] placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-[#112E2D]/50 focus:border-[#112E2D]/50 transition-all duration-200 resize-none"
                    />
                  </div>
                </div>
                <Button variant="hero" size="lg" className="w-full group">
                  Send Message
                  <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
              <div className="flex flex-col items-center justify-center flex-1 gap-6">
                {/* contact detail cards stacked */}
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-start gap-3 p-4 bg-[#112E2D] rounded-lg">
                    <Mail className="w-6 h-6 text-[#2BD4BD] mt-1" />
                    <div>
                      <p className="text-xs font-mono text-text-tertiary uppercase">EMAIL</p>
                      <p className="text-white text-sm">junrielpajal8@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-[#112E2D] rounded-lg">
                    <Phone className="w-6 h-6 text-[#2BD4BD] mt-1" />
                    <div>
                      <p className="text-xs font-mono text-text-tertiary uppercase">PHONE</p>
                      <p className="text-white text-sm">09945084712</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-[#112E2D] rounded-lg">
                    <MapPin className="w-6 h-6 text-[#2BD4BD] mt-1" />
                    <div>
                      <p className="text-xs font-mono text-text-tertiary uppercase">LOCATION</p>
                      <p className="text-white text-sm">Emenville Subdivision, Ambago, Butuan City, Agusan Del Norte</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <a
                    href="https://www.linkedin.com/in/junriel-pajal-0b4a10378"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#112E2D] border border-[#2BD4BD] text-white text-sm font-medium hover:bg-[#0f2a29] transition-colors duration-200"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a
                    href="https://v2.onlinejobs.ph/jobseekers/info/4787502"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#112E2D] border border-[#2BD4BD] text-white text-sm font-medium hover:bg-[#0f2a29] transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    OnlineJobs.ph
                  </a>
                  <a
                    href="/jun_resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2BD4BD] text-[#112E2D] text-sm font-medium hover:bg-[#25b7a3] transition-colors duration-200"
                  >
                    <FileText className="w-4 h-4" />
                    View Resume
                  </a>

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
