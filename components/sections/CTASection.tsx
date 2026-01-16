"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Clock, Navigation, ExternalLink, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const storeImages = [
  { emoji: "🏪", label: "Tampak Depan" },
  { emoji: "🌸", label: "Koleksi Bunga" },
  { emoji: "🧸", label: "Area Boneka" },
  { emoji: "✨", label: "Aksesoris" },
];

const contactInfo = [
  {
    icon: MapPin,
    title: "Alamat",
    content: ["Jl. Contoh No. 123, Pekanbaru, Riau"],
    color: "#c48b8b",
  },
  {
    icon: Phone,
    title: "Kontak",
    content: ["+62 812-3456-789"],
    color: "#5ba4d4",
  },
  {
    icon: Clock,
    title: "Jam Buka",
    content: ["Senin - Sabtu: 09:00 - 20:00", "Minggu: 10:00 - 18:00"],
    color: "#d4a54a",
  },
];

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mapCardRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
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

      // Map card animation
      if (mapCardRef.current) {
        gsap.fromTo(
          mapCardRef.current,
          { opacity: 0, y: isMobile ? 30 : 50 },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.5 : 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mapCardRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );

        // Contact items
        const contactItems = mapCardRef.current.querySelectorAll('.contact-item');
        gsap.fromTo(
          contactItems,
          { opacity: 0, x: isMobile ? 0 : -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mapCardRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Gallery animation
      if (galleryRef.current) {
        gsap.fromTo(
          galleryRef.current,
          { opacity: 0, y: isMobile ? 30 : 50 },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.5 : 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );

        // Gallery items
        const galleryItems = galleryRef.current.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: index * 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: galleryRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }

      // Floating elements - desktop only
      if (!isMobile) {
        const floatingElements = sectionRef.current?.querySelectorAll('.floating-decor');
        floatingElements?.forEach((el, index) => {
          gsap.to(el, {
            y: "+=15",
            duration: 3.5 + index * 0.5,
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
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white via-[#fdfcfa] to-[#faf8f3] relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-decor absolute top-[15%] left-[5%] w-40 md:w-64 h-40 md:h-64 bg-gradient-to-br from-[#f5e6e8]/30 to-transparent rounded-full blur-2xl md:blur-3xl" />
        <div className="floating-decor absolute bottom-[20%] right-[5%] w-48 md:w-72 h-48 md:h-72 bg-gradient-to-tl from-[#e8f0e4]/25 to-transparent rounded-full blur-2xl md:blur-3xl" />
        
        {/* Dot pattern - hidden on mobile */}
        <div className="hidden md:block absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #c48b8b 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 md:mb-16 lg:mb-20">
          {/* Badge */}
          <div className="inline-flex items-center justify-center mb-4 md:mb-8">
            <div className="flex items-center gap-2 md:gap-3 bg-white/90 rounded-full px-4 md:px-6 py-2 shadow-md border border-[#e8d4d7]/50">
              <Navigation className="w-3 h-3 md:w-4 md:h-4 text-[#c48b8b]" />
              <span className="text-[#c48b8b] text-xs md:text-sm font-semibold tracking-wider uppercase">
                Lokasi
              </span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-6">
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
                Kunjungi Toko Kami
              </span>
              <Sparkles className="absolute -top-1 -right-4 md:-top-2 md:-right-6 w-3 h-3 md:w-5 md:h-5 text-[#c48b8b]" />
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-sm md:text-lg lg:text-xl max-w-2xl mx-auto px-4">
            Datang langsung ke toko untuk melihat koleksi lengkap kami
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 max-w-7xl mx-auto">
          {/* Map Section */}
          <div ref={mapCardRef} className="relative">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-lg overflow-hidden border border-[#e8d4d7]/50">
              {/* Store Info */}
              <div className="p-4 md:p-6 lg:p-8 bg-gradient-to-br from-[#fdfcfa] to-[#f8f0f0]">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                  <span className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#c48b8b] to-[#d4a5a5] rounded-lg md:rounded-xl flex items-center justify-center shadow-md">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </span>
                  Informasi Toko
                </h3>
                
                <div className="space-y-3 md:space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <div 
                        key={index}
                        className="contact-item flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white/80 rounded-xl md:rounded-2xl border border-gray-100"
                      >
                        <div 
                          className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center shadow-sm flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${info.color}20, ${info.color}10)` }}
                        >
                          <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: info.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 text-sm md:text-base mb-0.5">{info.title}</p>
                          {info.content.map((line, i) => (
                            <p key={i} className="text-gray-600 text-xs md:text-sm truncate">{line}</p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Directions Button */}
                <a
                  href="https://maps.google.com/?q=Pekanbaru,Riau"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 md:mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#c48b8b] to-[#d4a5a5] text-white py-3 md:py-4 px-4 md:px-6 rounded-xl md:rounded-2xl font-semibold shadow-md active:scale-[0.98] transition-transform text-sm md:text-base"
                >
                  <Navigation className="w-4 h-4 md:w-5 md:h-5" />
                  Buka di Google Maps
                  <ExternalLink className="w-3 h-3 md:w-4 md:h-4 opacity-70" />
                </a>
              </div>

              {/* Google Maps */}
              <div className="relative w-full h-48 md:h-64 lg:h-72 bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127643.44866384936!2d101.44858785!3d0.5071395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a942c0c6ca8b%3A0x30a0c34dd481e7!2sPekanbaru%2C%20Pekanbaru%20City%2C%20Riau!5e0!3m2!1sen!2sid!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Toko Asmara Jaya"
                />
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div ref={galleryRef} className="space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 flex items-center gap-2 md:gap-3">
              <span className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#d4a54a] to-[#c9b896] rounded-lg md:rounded-xl flex items-center justify-center shadow-md">
                <span className="text-base md:text-lg">📸</span>
              </span>
              Foto Toko
            </h3>
            
            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-5">
              {storeImages.map((image, index) => (
                <div
                  key={index}
                  className="gallery-item relative aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-[#f5e6e8] to-[#e8d4d7] active:scale-[0.98] transition-transform"
                >
                  {/* Decorative */}
                  <div className="absolute top-0 right-0 w-16 md:w-24 h-16 md:h-24 bg-white/30 rounded-full -mr-8 md:-mr-12 -mt-8 md:-mt-12 blur-lg md:blur-xl" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3 md:p-4">
                    <span className="text-4xl md:text-5xl lg:text-6xl mb-2 md:mb-3">
                      {image.emoji}
                    </span>
                    <p className="text-xs md:text-sm font-medium text-gray-700">{image.label}</p>
                    <p className="text-[10px] md:text-xs text-gray-500 mt-0.5">(Ganti dengan foto)</p>
                  </div>

                  {/* Border */}
                  <div className="absolute inset-0 rounded-xl md:rounded-2xl border border-white/50 pointer-events-none" />
                </div>
              ))}
            </div>

        

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/628123456789?text=Halo,%20saya%20ingin%20bertanya%20tentang%20produk%20di%20Toko%20Asmara%20Jaya!"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-xl md:rounded-2xl p-4 md:p-5 shadow-md active:scale-[0.98] transition-transform">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg md:rounded-xl flex items-center justify-center">
                      <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm md:text-base">Chat via WhatsApp</p>
                      <p className="text-white/80 text-xs md:text-sm">Respon cepat & ramah</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}