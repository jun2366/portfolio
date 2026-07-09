import React, { Suspense, useEffect, useState, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import Stars from "./Stars";
import * as THREE from "three";

// Memoized Earth component using procedural sphere with textures
const Earth = memo(() => {
  const [textures, setTextures] = useState(null);
  const meshRef = React.useRef(null);

  useEffect(() => {
    const loadTextures = async () => {
      try {
        const textureLoader = new THREE.TextureLoader();
        const planetMap = await textureLoader.loadAsync(
          "./planet/textures/Planet_baseColor.png"
        );
        const cloudsMap = await textureLoader.loadAsync(
          "./planet/textures/Clouds_baseColor.png"
        );
        setTextures({ planetMap, cloudsMap });
      } catch (error) {
        console.error("Error loading textures:", error);
      }
    };
    loadTextures();
  }, []);

  // Auto-rotate the Earth
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
    }
  });

  if (!textures) return null;

  return (
    <group ref={meshRef}>
      {/* Main planet sphere */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={textures.planetMap}
          shininess={5}
          emissive={0x111111}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh scale={1.01}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={textures.cloudsMap}
          transparent
          opacity={0.4}
          emissive={0x222222}
        />
      </mesh>
    </group>
  );
});

Earth.displayName = "Earth";

// Scene setup component with lighting
const SceneSetup = () => {
  const { scene } = useThree();

  useEffect(() => {
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Add directional light for better depth perception
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Add point light for glow effect
    const pointLight = new THREE.PointLight(0xffffff, 0.3);
    pointLight.position.set(-5, 0, 5);
    scene.add(pointLight);

    // Set background to transparent
    scene.background = null;

    return () => {
      scene.remove(ambientLight);
      scene.remove(dirLight);
      scene.remove(pointLight);
    };
  }, [scene]);

  return null;
};

interface EarthCanvasProps {
  className?: string;
  variant?: "showcase" | "inline";
}

const EarthCanvas = ({ className, variant = "showcase" }: EarthCanvasProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const isInline = variant === "inline";

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    setIsMobile(media.matches);

    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas
        frameloop="auto"
        dpr={[1, isMobile ? 1 : isInline ? 1.5 : 2]}
        gl={{
          preserveDrawingBuffer: true,
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{
          fov: isInline ? 42 : 45,
          near: 0.1,
          far: 200,
          position: isInline ? [-3.2, 2.2, 5.2] : [-4, 3, 6],
        }}
      >
        <SceneSetup />

        <OrbitControls
          autoRotate
          autoRotateSpeed={isInline ? 0.35 : 0.5}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enablePan={false}
          rotateSpeed={isMobile ? 0.4 : 1}
        />

        <Suspense fallback={null}>
          {isInline && <Stars variant="halo" count={isMobile ? 600 : 900} />}
          <Earth />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EarthCanvas;
