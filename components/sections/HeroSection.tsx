"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Phone, ArrowRight, Sparkles, Star, MapPin } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content
      const elements = contentRef.current?.querySelectorAll('.animate-item');
      if (elements) {
        gsap.fromTo(elements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }

      // Floating cards
      const cards = cardsContainerRef.current?.querySelectorAll('.floating-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.5)",
            delay: 0.3,
          }
        );

        // Continuous float
        cards.forEach((card, index) => {
          gsap.to(card, {
            y: isMobile ? 8 : 15,
            duration: 2 + index * 0.3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
      }

      // Desktop only effects
      if (!isMobile) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            if (cardsContainerRef.current) {
              gsap.to(cardsContainerRef.current, { y: self.progress * 100, duration: 0.1 });
            }
          },
        });

        const moveCursor = (e: MouseEvent) => {
          if (cursorRef.current && cursorDotRef.current) {
            gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.4 });
            gsap.to(cursorDotRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
          }
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <>
      {/* Custom Cursor - Desktop only */}
      {!isMobile && (
        <>
          <div ref={cursorRef} className="hidden lg:block fixed w-8 h-8 border-2 border-[#c48b8b] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference" style={{ top: 0, left: 0 }} />
          <div ref={cursorDotRef} className="hidden lg:block fixed w-1.5 h-1.5 bg-[#c48b8b] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2" style={{ top: 0, left: 0 }} />
        </>
      )}

      <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#fef8f8] via-[#fff5f5] to-[#faf8f3]">
        
        {/* ===== MOBILE LAYOUT ===== */}
        <div className="md:hidden relative min-h-screen">
          {/* Background Decorations - Mobile */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-[#f5d0d0]/60 to-[#fce4ec]/40 rounded-full blur-3xl" />
            <div className="absolute top-1/3 -left-16 w-48 h-48 bg-gradient-to-br from-[#e8f4f8]/50 to-[#d0e8f5]/30 rounded-full blur-2xl" />
            <div className="absolute bottom-20 -right-10 w-40 h-40 bg-gradient-to-br from-[#fff8e8]/60 to-[#ffefd5]/40 rounded-full blur-2xl" />
            
            {/* Decorative dots */}
            <div className="absolute top-32 right-8 w-2 h-2 bg-[#c48b8b]/30 rounded-full" />
            <div className="absolute top-48 left-6 w-3 h-3 bg-[#5ba4d4]/20 rounded-full" />
            <div className="absolute bottom-40 right-12 w-2 h-2 bg-[#d4a54a]/30 rounded-full" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="relative z-10 px-5 pt-20 pb-8">
            
            {/* Badge */}
            <div className="animate-item flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-[#f5e6e8]">
                <div className="flex -space-x-1">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#c48b8b] to-[#d4a5a5] flex items-center justify-center">
                    <Star className="w-3 h-3 text-white fill-white" />
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#c48b8b]">Toko Terpercaya</span>
                <div className="flex items-center gap-0.5 text-[10px] text-gray-500">
                  <MapPin className="w-3 h-3" />
                  Pekanbaru
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="animate-item text-center mb-3">
              <h1 className="text-4xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-[#c48b8b] via-[#b57373] to-[#c48b8b] bg-clip-text text-transparent">
                  Toko Asmara
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#d4a5a5] bg-clip-text text-transparent">
                  Jaya
                </span>
              </h1>
            </div>

            {/* Floating Product Cards - Mobile Grid */}
            <div ref={cardsContainerRef} className="animate-item relative h-52 mb-4">
              {/* Main Card - Center */}
              <div className="floating-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-32 h-32 bg-white rounded-3xl shadow-xl p-2 border border-[#f5e6e8]">
                  <div className="w-full h-full bg-gradient-to-br from-[#fef6f6] to-[#fce4ec] rounded-2xl flex flex-col items-center justify-center">
                    <span className="text-5xl mb-1">🌸</span>
                    <span className="text-[10px] font-semibold text-[#c48b8b]">Bunga Pot</span>
                    <span className="text-[8px] text-[#d4a5a5]">50+ Koleksi</span>
                  </div>
                </div>
              </div>

              {/* Card - Top Right */}
              <div className="floating-card absolute top-2 right-4 z-10">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg p-1.5 border border-[#e8f4f8]">
                  <div className="w-full h-full bg-gradient-to-br from-[#e8f4f8] to-[#d0e8f5] rounded-xl flex flex-col items-center justify-center">
                    <span className="text-3xl">🧸</span>
                    <span className="text-[8px] font-medium text-gray-600">Boneka</span>
                  </div>
                </div>
              </div>

              {/* Card - Bottom Left */}
              <div className="floating-card absolute bottom-2 left-4 z-10">
                <div className="w-18 h-18 bg-white rounded-2xl shadow-lg p-1.5 border border-[#fff8e8]">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#fff8e8] to-[#ffefd5] rounded-xl flex flex-col items-center justify-center">
                    <span className="text-2xl">✨</span>
                    <span className="text-[8px] font-medium text-gray-600">Aksesoris</span>
                  </div>
                </div>
              </div>

              {/* Small decorative cards */}
              <div className="floating-card absolute top-8 left-8">
                <div className="w-10 h-10 bg-white/80 rounded-full shadow-md flex items-center justify-center">
                  <span className="text-lg">💝</span>
                </div>
              </div>
              <div className="floating-card absolute bottom-8 right-8">
                <div className="w-9 h-9 bg-white/80 rounded-full shadow-md flex items-center justify-center">
                  <span className="text-sm">🎀</span>
                </div>
              </div>
              <div className="floating-card absolute top-1/2 right-2 -translate-y-1/2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#f5e6e8] to-[#fce4ec] rounded-full shadow-sm" />
              </div>
              <div className="floating-card absolute top-1/2 left-2 -translate-y-1/2">
                <div className="w-6 h-6 bg-gradient-to-br from-[#e8f0e4] to-[#d4e5d0] rounded-full shadow-sm" />
              </div>
            </div>

            {/* Categories Pills */}
            <div className="animate-item flex justify-center gap-2 mb-4">
              {[
                { emoji: "🌸", label: "Bunga", color: "bg-[#fef6f6] text-[#c48b8b] border-[#f5e6e8]" },
                { emoji: "🧸", label: "Boneka", color: "bg-[#f0f8ff] text-[#5ba4d4] border-[#d0e8f5]" },
                { emoji: "✨", label: "Aksesoris", color: "bg-[#fffbf0] text-[#d4a54a] border-[#ffefd5]" },
              ].map((cat, i) => (
                <div key={i} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${cat.color} shadow-sm`}>
                  <span className="text-sm">{cat.emoji}</span>
                  <span className="text-xs font-medium">{cat.label}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="animate-item text-center text-gray-600 text-sm leading-relaxed mb-5 px-2">
              Temukan koleksi terlengkap bunga pot, boneka mainan, dan aksesoris unik dengan 
              <span className="text-[#c48b8b] font-medium"> harga terjangkau</span> di Pekanbaru!
            </p>

            {/* CTA Buttons */}
            <div className="animate-item space-y-3 mb-6">
              <Link href="/produk" className="block">
                <Button className="w-full bg-gradient-to-r from-[#c48b8b] via-[#d4a5a5] to-[#c48b8b] text-white py-6 rounded-2xl shadow-lg shadow-[#c48b8b]/25 text-base font-semibold active:scale-[0.98] transition-transform">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Lihat Semua Produk
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="animate-item">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-[#f5e6e8]">
                <div className="grid grid-cols-3 divide-x divide-[#f5e6e8]">
                  {[
                    { value: "100+", label: "Produk", icon: "📦" },
                    { value: "1000+", label: "Pelanggan", icon: "👥" },
                    { value: "4.9★", label: "Rating", icon: "⭐" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center px-2">
                      <div className="text-lg mb-0.5">{stat.icon}</div>
                      <div className="text-xl font-bold text-[#c48b8b]">{stat.value}</div>
                      <div className="text-[10px] text-gray-500 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Swipe indicator */}
            <div className="animate-item flex justify-center mt-6">
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <span>Scroll untuk lihat lebih</span>
                <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center pt-1">
                  <div className="w-1 h-2 bg-[#c48b8b] rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== DESKTOP LAYOUT ===== */}
        <div className="hidden md:flex relative min-h-screen items-center justify-center">
          {/* Background - Desktop */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-[#f5d0d0]/50 to-transparent rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-gradient-to-tl from-[#d4e5d0]/40 to-transparent rounded-full blur-[120px]" />
            <div className="absolute top-[30%] right-[15%] w-[400px] h-[400px] bg-gradient-to-bl from-[#f0e6ff]/30 to-transparent rounded-full blur-[80px]" />
            
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `linear-gradient(#c48b8b 1px, transparent 1px), linear-gradient(90deg, #c48b8b 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }} />
          </div>

          {/* Floating Cards - Desktop */}
          <div ref={cardsContainerRef} className="absolute inset-0 pointer-events-none">
            <div className="relative w-full h-full">
              {/* Main Card */}
              <div className="floating-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-[280px] h-[280px] lg:w-[320px] lg:h-[320px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-5 border border-white/60">
                  <div className="w-full h-full bg-gradient-to-br from-[#fef6f6] to-[#fdf0f0] rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-7xl lg:text-8xl block mb-3">🌸</span>
                      <p className="text-[#c48b8b] font-semibold text-base">Bunga Pot</p>
                      <p className="text-[#d4a5a5] text-xs mt-1">Premium Collection</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Cards */}
              <div className="floating-card absolute top-20 right-20 lg:right-32">
                <div className="w-32 lg:w-36 h-32 lg:h-36 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-3 border border-white/60">
                  <div className="w-full h-full bg-gradient-to-br from-[#e8f4f8] to-[#f0f8ff] rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl lg:text-5xl block">🧸</span>
                      <p className="text-gray-600 font-medium text-xs mt-1">Boneka</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="floating-card absolute bottom-24 left-20 lg:left-32">
                <div className="w-28 lg:w-32 h-28 lg:h-32 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-3 border border-white/60">
                  <div className="w-full h-full bg-gradient-to-br from-[#fff8e8] to-[#ffefd5] rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-3xl lg:text-4xl block">✨</span>
                      <p className="text-gray-600 font-medium text-xs mt-1">Aksesoris</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Small decoratives */}
              <div className="floating-card absolute top-32 left-32 lg:left-44">
                <div className="w-14 h-14 bg-white/80 rounded-full shadow-lg flex items-center justify-center">
                  <span className="text-2xl">💝</span>
                </div>
              </div>
              <div className="floating-card absolute bottom-32 right-32 lg:right-44">
                <div className="w-12 h-12 bg-white/80 rounded-full shadow-lg flex items-center justify-center">
                  <span className="text-xl">🎀</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content - Desktop */}
          <div className="relative z-20 container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="animate-item inline-block mb-8">
                <div className="bg-white/95 backdrop-blur-sm rounded-full px-6 py-2.5 shadow-lg border border-[#e8d4d7]/50">
                  <span className="text-sm font-medium text-[#c48b8b] flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Toko Terpercaya di Pekanbaru
                    <Sparkles className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="animate-item text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.1]">
                <span className="bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
                  Toko Asmara
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#b57373] via-[#c48b8b] to-[#d4a5a5] bg-clip-text text-transparent">
                  Jaya
                </span>
              </h1>

              {/* Subtitle */}
              <p className="animate-item text-xl lg:text-2xl text-gray-700 mb-4 font-medium">
                Bunga Pot <span className="text-[#d4a5a5]">•</span> Boneka Mainan <span className="text-[#d4a5a5]">•</span> Aksesoris
              </p>

              {/* Description */}
              <p className="animate-item text-base lg:text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                Temukan koleksi terlengkap bunga pot cantik, boneka mainan menggemaskan,
                dan aksesoris unik dengan harga terjangkau di Pekanbaru.
              </p>

              {/* CTA */}
              <div className="animate-item flex flex-row gap-4 justify-center">
                <Link href="/produk">
                  <Button size="lg" className="bg-gradient-to-r from-[#c48b8b] to-[#d4a5a5] text-white text-lg px-10 py-7 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Lihat Produk
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="text-lg px-10 py-7 rounded-full border-2 border-[#d4a5a5] text-[#c48b8b] bg-white/80 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                    <Phone className="w-5 h-5 mr-2" />
                    Hubungi Kami
                  </Button>
                </a>
              </div>

              {/* Stats */}
              <div className="animate-item grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
                {[
                  { value: "100+", label: "Produk" },
                  { value: "1000+", label: "Pelanggan Puas" },
                  { value: "4.9★", label: "Rating" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#e8d4d7]/30">
                    <div className="text-3xl lg:text-4xl font-bold text-[#c48b8b] mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400 animate-bounce">
            <span className="text-xs mb-2 tracking-widest uppercase">Scroll</span>
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-[#c48b8b] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (min-width: 1024px) {
          section { cursor: none; }
          section a, section button { cursor: none; }
        }
      `}</style>
    </>
  );
}