"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { FloatingFlower, FloatingTeddy, RotatingPot } from "./FloatingElements";
import { useDeviceDetect } from "@/lib/useDeviceDetect";

// FPS Limiter untuk mobile - mencegah flickering dengan membatasi render rate
function FPSLimiter({ fps = 30 }: { fps?: number }) {
  const lastFrameTime = useRef(0);
  const frameInterval = 1000 / fps;

  useFrame((state) => {
    const now = performance.now();
    const elapsed = now - lastFrameTime.current;

    if (elapsed < frameInterval) {
      // Skip frame untuk mencapai target FPS
      return;
    }

    lastFrameTime.current = now - (elapsed % frameInterval);
  });

  return null;
}

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
  const { isMobile } = useDeviceDetect();
  
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas 
        shadows={!isMobile}
        frameloop="always"
        gl={{ 
          antialias: !isMobile,
          powerPreference: isMobile ? "low-power" : "high-performance",
          alpha: true,
          stencil: false,
          depth: true,
          preserveDrawingBuffer: false,
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        performance={{ min: 0.5 }}
        style={{ 
          touchAction: 'auto',
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        {/* FPS Limiter untuk mobile - batasi ke 30 FPS untuk mencegah flickering */}
        {isMobile && <FPSLimiter fps={30} />}
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        {/* Lighting - simplified for mobile */}
        <ambientLight intensity={isMobile ? 0.7 : 0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={isMobile ? 0.7 : 1}
          castShadow={!isMobile}
          shadow-mapSize-width={isMobile ? 256 : 1024}
          shadow-mapSize-height={isMobile ? 256 : 1024}
        />
        {!isMobile && <pointLight position={[-10, -10, -5]} intensity={0.5} />}
        {!isMobile && (
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            castShadow
          />
        )}

        {/* Environment - disable on mobile for better performance */}
        {!isMobile && <Environment preset="sunset" />}

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

          {/* Disable extra elements on mobile */}
          {type === "all" && !isMobile && (
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

        {/* Ground (shadow receiver) - only on desktop */}
        {!isMobile && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <shadowMaterial opacity={0.2} />
          </mesh>
        )}
      </Canvas>
    </div>
  );
}
