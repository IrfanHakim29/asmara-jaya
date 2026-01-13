"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { FloatingFlower, FloatingTeddy, RotatingPot } from "./FloatingElements";

interface Scene3DProps {
  type?: "flower" | "teddy" | "pot" | "all";
  enableControls?: boolean;
  className?: string;
}

export default function Scene3D({ 
  type = "flower", 
  enableControls = false,
  className = "" 
}: Scene3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        {/* Environment */}
        <Environment preset="sunset" />

        {/* 3D Elements */}
        <Suspense fallback={null}>
          {(type === "flower" || type === "all") && (
            <FloatingFlower position={[0, 0, 0]} />
          )}
          
          {(type === "teddy" || type === "all") && (
            <FloatingTeddy position={type === "all" ? [-2, 0, 0] : [0, 0, 0]} />
          )}
          
          {(type === "pot" || type === "all") && (
            <RotatingPot position={type === "all" ? [2, 0, 0] : [0, 0, 0]} />
          )}

          {type === "all" && (
            <>
              <FloatingFlower position={[-3, 1, -2]} />
              <FloatingFlower position={[3, -1, -2]} />
            </>
          )}
        </Suspense>

        {/* Controls (optional) */}
        {enableControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        )}

        {/* Ground (shadow receiver) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.2} />
        </mesh>
      </Canvas>
    </div>
  );
}
