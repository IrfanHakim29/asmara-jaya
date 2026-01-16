"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Flower2, Heart, Sparkles, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = [
  {
    id: 1,
    name: "Bunga Pot",
    slug: "bunga",
    description: "Koleksi bunga pot cantik untuk mempercantik rumah Anda",
    icon: Flower2,
    gradient: "from-[#f5d0d0] via-[#f8e0e0] to-[#fef6f6]",
    iconGradient: "from-[#e57373] to-[#c48b8b]",
    accentColor: "#c48b8b",
    count: "50+",
    emoji: "🌸",
  },
  {
    id: 2,
    name: "Boneka Mainan",
    slug: "boneka",
    description: "Boneka lucu dan menggemaskan untuk semua usia",
    icon: Heart,
    gradient: "from-[#d0e8f5] via-[#e0f0f8] to-[#f6fbfe]",
    iconGradient: "from-[#5ba4d4] to-[#7bb8e0]",
    accentColor: "#5ba4d4",
    count: "30+",
    emoji: "🧸",
  },
  {
    id: 3,
    name: "Aksesoris",
    slug: "aksesoris",
    description: "Aksesoris unik dan menarik untuk dekorasi",
    icon: Sparkles,
    gradient: "from-[#f5ead0] via-[#f8f0e0] to-[#fefbf6]",
    iconGradient: "from-[#d4a54a] to-[#c9b896]",
    accentColor: "#d4a54a",
    count: "20+",
    emoji: "✨",
  },
];

export default function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      const headerElements = headerRef.current?.children;
      if (headerElements) {
        gsap.fromTo(
          headerElements,
          { opacity: 0, y: isMobile ? 20 : 40 },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.5 : 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.category-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: isMobile ? 30 : 60, scale: isMobile ? 1 : 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: isMobile ? 0.5 : 0.8,
              delay: index * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                toggleActions: "play none none none",
              },
            }
          );

          // Emoji animation - simpler on mobile
          const emoji = card.querySelector('.category-emoji');
          if (emoji) {
            gsap.fromTo(
              emoji,
              { scale: isMobile ? 0.9 : 0, rotation: isMobile ? 0 : -20 },
              {
                scale: 1,
                rotation: 0,
                duration: isMobile ? 0.4 : 0.8,
                delay: index * 0.1 + 0.2,
                ease: isMobile ? "power2.out" : "elastic.out(1, 0.5)",
                scrollTrigger: {
                  trigger: card,
                  start: "top 90%",
                  toggleActions: "play none none none",
                },
              }
            );

            // Continuous float - desktop only
            if (!isMobile) {
              gsap.to(emoji, {
                y: -10,
                duration: 2.5 + index * 0.3,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              });
            }
          }
        });
      }

      // Floating elements - desktop only
      if (!isMobile) {
        const floatingElements = sectionRef.current?.querySelectorAll('.floating-decor');
        floatingElements?.forEach((el, index) => {
          gsap.to(el, {
            y: "+=20",
            duration: 4 + index * 0.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#faf8f3] via-white to-[#fdfcfa] relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-decor absolute top-[10%] left-[5%] w-40 md:w-72 h-40 md:h-72 bg-gradient-to-br from-[#f5e6e8]/30 to-transparent rounded-full blur-2xl md:blur-3xl" />
        <div className="floating-decor absolute bottom-[15%] right-[5%] w-48 md:w-80 h-48 md:h-80 bg-gradient-to-tl from-[#e8f0e4]/30 to-transparent rounded-full blur-2xl md:blur-3xl" />
        
        {/* Dot pattern - hidden on mobile */}
        <div className="hidden md:block absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #c48b8b 1px, transparent 0)`,
          backgroundSize: '48px 48px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 md:mb-16 lg:mb-24">
          {/* Badge */}
          <div className="inline-flex items-center justify-center mb-4 md:mb-8">
            <div className="flex items-center gap-2 md:gap-3 bg-white/90 rounded-full px-4 md:px-6 py-2 shadow-md border border-[#e8d4d7]/50">
              <div className="h-px w-4 md:w-8 bg-gradient-to-r from-transparent to-[#d4a5a5]" />
              <span className="text-[#c48b8b] text-xs md:text-sm font-semibold tracking-wider uppercase">
                Jelajahi
              </span>
              <div className="h-px w-4 md:w-8 bg-gradient-to-l from-transparent to-[#d4a5a5]" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-6">
            <span className="bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
              Kategori Produk
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-sm md:text-lg lg:text-xl max-w-2xl mx-auto px-4">
            Jelajahi berbagai kategori produk pilihan kami
          </p>
        </div>

        {/* Categories Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link 
                key={category.id} 
                href={`/produk?kategori=${category.slug}`}
                className="block"
              >
                <div className="category-card relative group cursor-pointer h-full active:scale-[0.98] transition-transform">
                  {/* Main Card */}
                  <div className={`relative bg-gradient-to-br ${category.gradient} rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 border border-white/60 shadow-lg md:hover:shadow-xl transition-shadow duration-300 h-full flex flex-col overflow-hidden`}>
                    
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-24 md:w-40 h-24 md:h-40 bg-white/30 rounded-full -mr-12 md:-mr-20 -mt-12 md:-mt-20 blur-xl md:blur-2xl" />

                    {/* Emoji Container */}
                    <div className="relative w-full h-32 sm:h-36 md:h-44 lg:h-52 mb-4 md:mb-6 flex items-center justify-center">
                      <span className="category-emoji text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] filter drop-shadow-lg">
                        {category.emoji}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      {/* Icon & Badge Row */}
                      <div className="flex items-center justify-between mb-3 md:mb-5">
                        {/* Icon */}
                        <div className={`w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${category.iconGradient} flex items-center justify-center shadow-md`}>
                          <Icon className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                        </div>

                        {/* Count Badge */}
                        <div className="bg-white/90 px-3 md:px-5 py-1.5 md:py-2.5 rounded-full shadow-md">
                          <span className="text-xs md:text-sm font-bold" style={{ color: category.accentColor }}>
                            {category.count} Produk
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2 md:mb-3">
                        {category.name}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-xs md:text-sm lg:text-base mb-4 md:mb-6 flex-1 leading-relaxed">
                        {category.description}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center font-semibold text-sm md:text-base" style={{ color: category.accentColor }}>
                        <span>Lihat Produk</span>
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-active:translate-x-1 md:group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Decoration */}
        <div className="hidden md:flex justify-center mt-12 lg:mt-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-[#d4a5a5]/50 rounded-full" />
            <div className="w-2 h-2 rounded-full bg-[#c48b8b]/40" />
            <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-[#d4a5a5]/50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}