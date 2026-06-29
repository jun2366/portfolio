import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ToolsMarquee from "@/components/ToolsMarquee";
import TechStack from "@/components/TechStack";
import Services from "@/components/Services";
import PreviousWorks from "@/components/PreviousWorks";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ToolsMarquee />
      <TechStack />
      <Services />
      <PreviousWorks />
      <Certificates />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
