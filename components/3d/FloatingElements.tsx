"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";

export function FloatingFlower({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);
  const { scrollYProgress } = useScroll();

  useFrame((state) => {
    if (!meshRef.current) return;

    // Floating animation
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time) * 0.3;

    // Rotation based on scroll
    meshRef.current.rotation.y = scrollYProgress.get() * Math.PI * 2;
    meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Pot */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.3, 0.6, 32]} />
        <meshStandardMaterial color="#ff66aa" roughness={0.3} />
      </mesh>

      {/* Soil */}
      <mesh position={[0, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.38, 0.1, 32]} />
        <meshStandardMaterial color="#654321" roughness={0.8} />
      </mesh>

      {/* Stem */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial color="#22c55e" roughness={0.5} />
      </mesh>

      {/* Flower petals */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        const x = Math.cos(angle) * 0.25;
        const z = Math.sin(angle) * 0.25;
        return (
          <mesh
            key={i}
            position={[x, 0.8, z]}
            rotation={[0, angle, Math.PI / 4]}
            castShadow
          >
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#ff1493" roughness={0.3} />
          </mesh>
        );
      })}

      {/* Flower center */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffd700" roughness={0.3} />
      </mesh>

      {/* Leaves */}
      {[0, 1].map((i) => {
        const angle = (i / 2) * Math.PI * 2;
        const x = Math.cos(angle) * 0.15;
        const z = Math.sin(angle) * 0.15;
        return (
          <mesh
            key={`leaf-${i}`}
            position={[x, 0.2, z]}
            rotation={[0, angle, Math.PI / 3]}
            castShadow
          >
            <boxGeometry args={[0.3, 0.02, 0.15]} />
            <meshStandardMaterial color="#10b981" roughness={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}

export function FloatingTeddy({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Bouncing animation
    meshRef.current.position.y = position[1] + Math.abs(Math.sin(time * 2)) * 0.4;
    
    // Slight rotation
    meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.3;
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#8b4513" roughness={0.8} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#8b4513" roughness={0.8} />
      </mesh>

      {/* Ears */}
      {[-0.2, 0.2].map((x, i) => (
        <mesh key={i} position={[x, 0.8, 0]} castShadow>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#654321" roughness={0.8} />
        </mesh>
      ))}

      {/* Eyes */}
      {[-0.1, 0.1].map((x, i) => (
        <mesh key={`eye-${i}`} position={[x, 0.65, 0.25]} castShadow>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      ))}

      {/* Nose */}
      <mesh position={[0, 0.55, 0.28]} castShadow>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Arms */}
      {[-0.35, 0.35].map((x, i) => (
        <mesh key={`arm-${i}`} position={[x, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
          <meshStandardMaterial color="#8b4513" roughness={0.8} />
        </mesh>
      ))}

      {/* Legs */}
      {[-0.15, 0.15].map((x, i) => (
        <mesh key={`leg-${i}`} position={[x, -0.5, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.4, 16]} />
          <meshStandardMaterial color="#8b4513" roughness={0.8} />
        </mesh>
      ))}

      {/* Belly */}
      <mesh position={[0, 0, 0.35]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#d2691e" roughness={0.7} />
      </mesh>
    </group>
  );
}

export function RotatingPot({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Grow animation
    const scale = 0.5 + Math.sin(time * 0.5) * 0.2;
    meshRef.current.scale.set(scale, scale, scale);
    
    // Rotation
    meshRef.current.rotation.y = time * 0.5;
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Modern geometric pot */}
      <mesh castShadow>
        <cylinderGeometry args={[0.5, 0.3, 0.8, 6]} />
        <meshStandardMaterial 
          color="#38bdf8" 
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>

      {/* Rim */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <torusGeometry args={[0.5, 0.05, 16, 32]} />
        <meshStandardMaterial color="#0ea5e9" roughness={0.3} />
      </mesh>

      {/* Decorative bands */}
      {[0.2, 0, -0.2].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <torusGeometry args={[0.4, 0.02, 16, 32]} />
          <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.5} />
        </mesh>
      ))}
    </group>
  );
}
