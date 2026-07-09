import React from "react";

const CanvasLoader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-text-secondary text-sm font-mono">Loading Earth...</p>
      </div>
    </div>
  );
};

export default CanvasLoader;
