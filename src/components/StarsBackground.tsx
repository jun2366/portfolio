import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Stars from "@/components/Canvas/Stars";

const StarsBackground = () => {
  useEffect(() => {
    console.log("StarsBackground mounted");
  }, []);

  return (
    <div 
      className="fixed inset-0 -z-50 pointer-events-none" 
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Stars canvas - behind all content */}
      <Canvas
        camera={{ 
          position: [0, 0, 1],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          alpha: false,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        style={{ 
          width: "100%", 
          height: "100%",
          display: "block",
        }}
        onCreated={(state) => {
          console.log("Canvas created", state.gl);
          state.gl.setClearColor(0x000000, 0.1);
        }}
      >
        <color attach="background" args={["#000000"]} />
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarsBackground;
