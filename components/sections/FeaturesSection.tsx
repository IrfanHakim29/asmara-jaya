"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, MapPin, Gift, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: Heart,
    title: "Koleksi Lengkap",
    description: "Bunga pot, boneka, dan aksesoris dengan berbagai pilihan menarik untuk setiap momen spesial",
    color: "from-[#d4a5a5] to-[#c48b8b]",
    shadowColor: "rgba(196, 139, 139, 0.3)",
    bgAccent: "bg-[#fef6f6]",

  },
  {
    icon: MapPin,
    title: "Lokasi Strategis",
    description: "Mudah dijangkau di Pekanbaru, bisa langsung datang ke toko kami kapan saja",
    color: "from-[#b5c49d] to-[#9ab082]",
    shadowColor: "rgba(155, 176, 130, 0.3)",
    bgAccent: "bg-[#f6f9f3]",
  },
  {
    icon: Gift,
    title: "Cocok untuk Hadiah",
    description: "Produk pilihan yang sempurna untuk hadiah spesial orang-orang tersayang",
    color: "from-[#d4b896] to-[#c4a67a]",
    shadowColor: "rgba(196, 166, 122, 0.3)",
    bgAccent: "bg-[#fdfbf7]",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      const headerElements = headerRef.current?.children;
      if (headerElements) {
        gsap.fromTo(
          headerElements,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Cards animation with stagger
      const cards = cardsRef.current?.querySelectorAll('.feature-card');
      if (cards) {
        cards.forEach((card, index) => {
          const direction = index % 2 === 0 ? -1 : 1;
          
          gsap.fromTo(
            card,
            { 
              opacity: 0, 
              y: 80,
              rotateY: direction * 15,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              rotateY: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Icon animation
          const icon = card.querySelector('.feature-icon');
          if (icon) {
            gsap.fromTo(
              icon,
              { scale: 0, rotation: -180 },
              {
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: "back.out(1.7)",
                scrollTrigger: {
                  trigger: card,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          // Number animation
          const number = card.querySelector('.feature-number');
          if (number) {
            gsap.fromTo(
              number,
              { opacity: 0, x: -30 },
              {
                opacity: 0.1,
                x: 0,
                duration: 0.8,
                delay: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });
      }

      // Floating decorative elements
      const floatingElements = sectionRef.current?.querySelectorAll('.floating-decor');
      floatingElements?.forEach((el, index) => {
        gsap.to(el, {
          y: "+=20",
          rotation: index % 2 === 0 ? 5 : -5,
          duration: 3 + index * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic effect for cards
  useEffect(() => {
    const cards = document.querySelectorAll('.feature-card');
    
    const handleMouseMove = (e: MouseEvent, card: Element) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(card, {
        rotateY: x * 0.02,
        rotateX: -y * 0.02,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = (card: Element) => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    };

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => handleMouseMove(e as MouseEvent, card));
      card.addEventListener('mouseleave', () => handleMouseLeave(card));
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', (e) => handleMouseMove(e as MouseEvent, card));
        card.removeEventListener('mouseleave', () => handleMouseLeave(card));
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-b from-white via-[#fdfcfa] to-[#faf8f3] relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="floating-decor absolute top-20 left-[10%] w-64 h-64 bg-gradient-to-br from-[#f5e6e8]/40 to-transparent rounded-full blur-3xl" />
        <div className="floating-decor absolute bottom-20 right-[10%] w-80 h-80 bg-gradient-to-tl from-[#e8f0e4]/40 to-transparent rounded-full blur-3xl" />
        <div className="floating-decor absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#f0e6ff]/20 to-transparent rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #c48b8b 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Decorative Shapes */}
        <div className="floating-decor absolute top-32 right-[20%] w-4 h-4 bg-[#d4a5a5]/20 rounded-full" />
        <div className="floating-decor absolute bottom-40 left-[15%] w-6 h-6 bg-[#c9d5b5]/20 rounded-full" />
        <div className="floating-decor absolute top-1/2 right-[8%] w-3 h-3 bg-[#d4b896]/30 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20 md:mb-24">
          {/* Decorative Badge */}
          <div className="inline-flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#c48b8b] to-[#d4a5a5] rounded-full blur-lg opacity-30" />
              <div className="relative flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-full px-6 py-2.5 shadow-lg border border-[#e8d4d7]/50">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4a5a5]" />
                <span className="text-[#c48b8b] text-sm font-semibold tracking-widest uppercase">
                  Mengapa Kami
                </span>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4a5a5]" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-gray-800 block mb-2">Mengapa Memilih</span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
                Asmara Jaya
              </span>
              {/* Sparkle decoration */}
              <Sparkles className="absolute -top-2 -right-6 w-5 h-5 text-[#c48b8b] animate-pulse" />
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Kami berkomitmen memberikan pelayanan terbaik untuk kepuasan pelanggan
          </p>
        </div>

        {/* Features Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto perspective-1000"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="feature-card relative group"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Card Glow Effect */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                  style={{ 
                    background: `linear-gradient(135deg, ${feature.shadowColor}, transparent)`,
                    transform: 'translateY(10px)',
                  }}
                />
                
                {/* Main Card */}
                <div className={`relative ${feature.bgAccent} rounded-3xl p-8 lg:p-10 border border-gray-100/80 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 h-full overflow-hidden group-hover:border-[#e8d4d7]/50`}>
                  
                  {/* Background Number */}
                  <span className="feature-number absolute -top-4 -right-2 text-[120px] font-bold text-gray-900 opacity-[0.03] select-none pointer-events-none leading-none">
                    {feature.number}
                  </span>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Icon Container */}
                  <div className="feature-icon relative mb-8">
                    {/* Icon Glow */}
                    <div 
                      className="absolute inset-0 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${feature.shadowColor}, transparent)` }}
                    />
                    
                    <div className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-white drop-shadow-md" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-2xl lg:text-[1.7rem] font-bold mb-4 text-gray-800 group-hover:text-gray-900 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom Decoration */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                    style={{ 
                      background: `linear-gradient(90deg, transparent, ${feature.shadowColor}, transparent)` 
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Decoration */}
        <div className="flex justify-center mt-16 md:mt-20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#d4a5a5]/40" />
            <div className="w-3 h-3 rounded-full bg-[#c48b8b]/60" />
            <div className="w-2 h-2 rounded-full bg-[#d4a5a5]/40" />
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: none;
          pointer-events: none;
          z-index: 10;
          border-radius: 1.5rem;
        }

        .feature-card:hover::before {
          animation: shimmer 0.8s ease-in-out;
        }
      `}</style>
    </section>
  );
}