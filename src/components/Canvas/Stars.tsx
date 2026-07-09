import { useState, useRef, useMemo } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Fibonacci sphere — even distribution on a full sphere
const generateSphere = (count: number, radius: number) => {
  const points = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const idx = i * 3;
    const y = 1 - (i / (count - 1)) * 2;
    const circumference = Math.sqrt(1 - y * y);
    const theta = Math.PI * (1 + 5 ** 0.5) * i;

    points[idx] = Math.cos(theta) * circumference * radius;
    points[idx + 1] = y * radius;
    points[idx + 2] = Math.sin(theta) * circumference * radius;
  }

  return points;
};

// Spherical shell — stars in the halo surrounding the globe
const generateShell = (count: number, innerRadius: number, outerRadius: number) => {
  const points = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const idx = i * 3;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = innerRadius + Math.random() * (outerRadius - innerRadius);

    points[idx] = r * Math.sin(phi) * Math.cos(theta);
    points[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
    points[idx + 2] = r * Math.cos(phi);
  }

  return points;
};

interface StarsProps {
  variant?: "background" | "halo";
  count?: number;
  innerRadius?: number;
  outerRadius?: number;
}

const Stars = ({
  variant = "background",
  count,
  innerRadius = 1.45,
  outerRadius = 2.6,
}: StarsProps) => {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    if (variant === "halo") {
      return generateShell(count ?? 900, innerRadius, outerRadius);
    }
    return generateSphere(count ?? 5000, 1.2);
  }, [variant, count, innerRadius, outerRadius]);

  const starColor = variant === "halo" ? "#e8d4f0" : "#f272c8";
  const starSize = variant === "halo" ? 0.006 : 0.008;
  const starOpacity = variant === "halo" ? 0.65 : 1;

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / (variant === "halo" ? 18 : 10);
      ref.current.rotation.y -= delta / (variant === "halo" ? 22 : 15);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={variant !== "halo"}>
        <PointMaterial
          transparent
          color={new THREE.Color(starColor)}
          size={starSize}
          sizeAttenuation
          depthWrite={false}
          opacity={starOpacity}
        />
      </Points>
    </group>
  );
};

export default Stars;
