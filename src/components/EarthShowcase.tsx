import React from "react";
import { EarthCanvas } from "@/components/Canvas";

const EarthShowcase = () => {
  return (
    <section 
      id="earth-showcase" 
      className="relative w-full h-[700px] md:h-[800px] bg-background overflow-hidden transition-colors duration-300"
    >
      {/* Canvas Container - Full height, positioned above stars background */}
      <div className="w-full h-full relative z-10">
        <EarthCanvas />
      </div>

      {/* Subtle top and bottom gradient overlays for depth */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-20" />
    </section>
  );
};

export default EarthShowcase;
