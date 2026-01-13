"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect, useMemo } from "react";
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
  const { isMobile, isHydrated } = useDeviceDetect();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Wait for hydration to complete before showing Canvas
    if (isHydrated) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => setIsLoaded(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isHydrated]);
  
  // Memoize GL config to prevent re-render flickering
  const glConfig = useMemo(() => ({
    antialias: !isMobile,
    powerPreference: isMobile ? "low-power" as const : "high-performance" as const,
    alpha: true,
    stencil: false,
    depth: true,
    preserveDrawingBuffer: false,
  }), [isMobile]);

  const dprConfig = useMemo(() => 
    isMobile ? [1, 1.5] as [number, number] : [1, 2] as [number, number], 
    [isMobile]
  );

  const canvasStyle = useMemo(() => ({
    touchAction: 'auto' as const,
    WebkitTapHighlightColor: 'transparent',
  }), []);
  
  // Show loading placeholder to prevent flicker
  if (!isHydrated || !isLoaded) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <div className="animate-pulse">
          <div className="w-32 h-32 bg-linear-to-br from-pink-200/50 to-purple-200/50 rounded-full" />
        </div>
      </div>
    );
  }
  
  return (
    <div className={`w-full h-full ${className} animate-in fade-in duration-500`}>
      <Canvas 
        shadows={!isMobile}
        frameloop="always"
        gl={glConfig}
        dpr={dprConfig}
        performance={{ min: 0.5 }}
        style={canvasStyle}
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
        <Suspense fallback={
          <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial color="#ff69b4" wireframe />
          </mesh>
        }>
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
