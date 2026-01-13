"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Phone, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { useDeviceDetect } from "@/lib/useDeviceDetect";

export default function HeroSection() {
  const { isMobile, isTablet } = useDeviceDetect();
  const isLowPerformance = isMobile || isTablet;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Disable parallax effects on mobile for better performance
  const y = useTransform(scrollYProgress, [0, 1], isLowPerformance ? ["0%", "0%"] : ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], isLowPerformance ? [1, 1] : [1, 0.8]);

  // Mouse tracking for parallax effect - disabled on mobile
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y2 = useSpring(mouseY, springConfig);

  // Pre-create all transforms (hooks must be called unconditionally)
  const xTransform1 = useTransform(x, (v) => v * 1.5);
  const y2Transform1 = useTransform(y2, (v) => v * 1.2);
  const xTransform2 = useTransform(x, (v) => v * -1.3);
  const y2Transform2 = useTransform(y2, (v) => v * -1.5);
  const xTransform3 = useTransform(x, (v) => v * -0.8);
  const y2Transform3 = useTransform(y2, (v) => v * 1.8);
  const xTransform4 = useTransform(x, (v) => v * 1.2);
  const y2Transform4 = useTransform(y2, (v) => v * -1.2);

  useEffect(() => {
    // Skip mouse tracking on mobile devices for performance
    if (isLowPerformance) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 40);
      mouseY.set((clientY / innerHeight - 0.5) * 40);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isLowPerformance]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#faf8f3] via-[#f5e6e8] to-[#e8d4d7]"
      style={isLowPerformance ? { willChange: 'auto' } : undefined}
    >
      {/* Animated Background Gradients - Tema Asmara Soft */}
      {/* Disable heavy animations on mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {!isLowPerformance ? (
          <>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 45, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-[#d4a5a5]/30 to-transparent rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -45, 0],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-[#c9d5b5]/30 to-transparent rounded-full blur-3xl"
            />
          </>
        ) : (
          <>
            {/* Static background for mobile - no animation, no blur */}
            <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-[#d4a5a5]/15 to-transparent rounded-full" />
            <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-[#c9d5b5]/15 to-transparent rounded-full" />
          </>
        )}
      </div>

      {/* Floating Product Images with Parallax */}
      {/* Simplified on mobile for better performance */}
      {!isLowPerformance ? (
        <motion.div
          style={{ y, scale }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="relative w-full h-full">
            {/* Main center image */}
            <motion.div
              style={{ x, y: y2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200/40 to-purple-200/40 rounded-full blur-3xl" />
                <div className="relative w-full h-full flex items-center justify-center">
                  <Sparkles className="w-32 h-32 md:w-48 md:h-48 text-pink-400/60" />
                </div>
              </motion.div>
            </motion.div>

          {/* Floating image - top right - Hide on mobile */}
          {!isLowPerformance && (
            <motion.div
              style={{ x: xTransform1, y: y2Transform1 }}
              className="hidden lg:block absolute top-20 right-20"
            >
              <motion.div
                animate={{
                  y: [0, 30, 0],
                  rotate: [5, -5, 5],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.1, rotate: 0 }}
                className="w-40 h-40 bg-white rounded-2xl shadow-2xl p-4 backdrop-blur-sm"
              >
                <div className="w-full h-full bg-gradient-to-br from-[#f5e6e8] to-[#e8d4d7] rounded-xl flex items-center justify-center">
                  <span className="text-4xl">🌸</span>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Floating image - bottom left - Hide on mobile */}
          {!isLowPerformance && (
            <motion.div
              style={{ x: xTransform2, y: y2Transform2 }}
              className="hidden lg:block absolute bottom-20 left-20"
            >
              <motion.div
                animate={{
                  y: [0, -25, 0],
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.1, rotate: 0 }}
                className="w-40 h-40 bg-white rounded-2xl shadow-2xl p-4 backdrop-blur-sm"
              >
                <div className="w-full h-full bg-gradient-to-br from-[#c9d5b5] to-[#b5c49d] rounded-xl flex items-center justify-center">
                  <span className="text-4xl">🧸</span>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Additional floating elements - Hide on mobile */}
          {!isLowPerformance && (
            <>
              <motion.div
                style={{ x: xTransform3, y: y2Transform3 }}
                className="hidden md:block absolute top-32 left-32"
              >
                <motion.div
                  animate={{
                    y: [0, 20, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.2 }}
                  className="w-24 h-24 bg-white/80 rounded-full shadow-xl p-3 backdrop-blur-sm"
                >
                  <div className="w-full h-full bg-gradient-to-br from-[#d4af37]/40 to-[#c49a1f]/40 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                style={{ x: xTransform4, y: y2Transform4 }}
                className="hidden md:block absolute bottom-32 right-32"
              >
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.2 }}
                  className="w-24 h-24 bg-white/80 rounded-full shadow-xl p-3 backdrop-blur-sm"
                >
                  <div className="w-full h-full bg-gradient-to-br from-[#d4a5a5]/60 to-[#c48b8b]/60 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💝</span>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
      ) : (
        // Simple static version for mobile - no animations
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-[300px] h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full" />
              <div className="relative w-full h-full flex items-center justify-center">
                <Sparkles className="w-32 h-32 text-pink-400/50" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <motion.div
        style={isLowPerformance ? undefined : { opacity }}
        className="relative z-10 container mx-auto px-4 py-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={isLowPerformance ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isLowPerformance ? 0.2 : 0.6 }}
            className="inline-block mb-6"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg border border-[#d4a5a5]/30">
              <span className="text-sm font-medium text-[#c48b8b]">
                ✨ Toko Terpercaya di Pekanbaru
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={isLowPerformance ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isLowPerformance ? 0.2 : 0.6, delay: isLowPerformance ? 0 : 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
              Toko Asmara Jaya
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={isLowPerformance ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isLowPerformance ? 0.2 : 0.6, delay: isLowPerformance ? 0 : 0.4 }}
            className="text-xl md:text-2xl text-gray-700 mb-4 font-medium"
          >
            Bunga Pot, Boneka Mainan & Aksesoris
          </motion.p>

          {/* Description */}
          <motion.p
            initial={isLowPerformance ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isLowPerformance ? 0.2 : 0.6, delay: isLowPerformance ? 0 : 0.5 }}
            className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            Temukan koleksi terlengkap bunga pot cantik, boneka mainan menggemaskan,
            dan aksesoris unik dengan harga terjangkau di Pekanbaru.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={isLowPerformance ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isLowPerformance ? 0.2 : 0.6, delay: isLowPerformance ? 0 : 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/produk">
              <Button
                size="lg"
                className={`gradient-primary text-white text-lg px-8 py-6 rounded-full shadow-lg ${!isLowPerformance && 'hover:shadow-xl transform hover:scale-105'} transition-all border border-[#c48b8b]/20`}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Lihat Produk
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <a
              href="https://wa.me/628123456789?text=Halo,%20saya%20tertarik%20dengan%20produk%20di%20Toko%20Asmara%20Jaya!"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className={`text-lg px-8 py-6 rounded-full border-2 border-[#d4a5a5] text-[#c48b8b] hover:bg-[#f5e6e8]/50 shadow-lg ${!isLowPerformance && 'hover:shadow-xl transform hover:scale-105'} transition-all`}
              >
                <Phone className="w-5 h-5 mr-2" />
                Hubungi Kami
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={isLowPerformance ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isLowPerformance ? 0.2 : 0.6, delay: isLowPerformance ? 0 : 0.8 }}
            className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
          >
            {[
              { label: "Produk", value: "100+" },
              { label: "Pelanggan", value: "1000+" },
              { label: "Rating", value: "4.9★" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-[#d4a5a5]/20"
              >
                <div className="text-3xl font-bold text-[#c48b8b] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center text-gray-400"
        >
          <span className="text-sm mb-2">Scroll</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
