"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Filter, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
  featured?: boolean;
  tags?: string[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
}

export default function FeaturedProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data: Product[] = await response.json();
        setProducts(data);
        const featured = data.filter((p) => p.featured);
        setFilteredProducts(featured);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = products;
    if (showOnlyFeatured) {
      filtered = filtered.filter((p) => p.featured);
    }
    if (selectedCategory !== "semua") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags?.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, showOnlyFeatured, products]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      const headerElements = headerRef.current?.children;
      if (headerElements) {
        gsap.fromTo(
          headerElements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Filters animation
      if (filtersRef.current) {
        gsap.fromTo(
          filtersRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: filtersRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Floating decorative elements
      const floatingElements = sectionRef.current?.querySelectorAll('.floating-decor');
      floatingElements?.forEach((el, index) => {
        gsap.to(el, {
          y: "+=20",
          rotation: index % 2 === 0 ? 8 : -8,
          duration: 3.5 + index * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate products when filtered
  useEffect(() => {
    if (!isLoading && gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.product-card-wrapper');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
    }
  }, [filteredProducts, isLoading]);

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-b from-white via-[#fdfcfa] to-[#faf8f3] relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-decor absolute top-[10%] right-[8%] w-72 h-72 bg-gradient-to-br from-[#f5e6e8]/35 to-transparent rounded-full blur-3xl" />
        <div className="floating-decor absolute bottom-[15%] left-[5%] w-80 h-80 bg-gradient-to-tl from-[#e8f0e4]/30 to-transparent rounded-full blur-3xl" />
        <div className="floating-decor absolute top-[45%] left-[30%] w-64 h-64 bg-gradient-to-br from-[#f5ead0]/20 to-transparent rounded-full blur-3xl" />
        
        {/* Dot pattern */}
        <div 
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #c48b8b 1px, transparent 0)`,
            backgroundSize: '45px 45px',
          }}
        />

        {/* Small decorative shapes */}
        <div className="floating-decor absolute top-28 left-[18%] w-3 h-3 bg-[#c48b8b]/15 rounded-full" />
        <div className="floating-decor absolute bottom-36 right-[15%] w-4 h-4 bg-[#d4a54a]/10 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-14 md:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#c48b8b] to-[#d4a5a5] rounded-full blur-lg opacity-25" />
              <div className="relative flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full px-6 py-2.5 shadow-lg border border-[#e8d4d7]/50">
                <Sparkles className="w-4 h-4 text-[#c48b8b]" />
                <span className="text-[#c48b8b] text-sm font-semibold tracking-widest uppercase">
                  Koleksi Terbaik
                </span>
                <Sparkles className="w-4 h-4 text-[#c48b8b]" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
                Produk Unggulan
              </span>
              {/* Decorative underline */}
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                <path 
                  d="M2 10C40 2 80 2 100 6C120 10 160 10 198 2" 
                  stroke="url(#product-underline)" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  className="animate-draw-line"
                />
                <defs>
                  <linearGradient id="product-underline" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d4a5a5" />
                    <stop offset="50%" stopColor="#c48b8b" />
                    <stop offset="100%" stopColor="#b57373" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-6">
            Pilihan terbaik dari koleksi kami yang paling populer
          </p>
          
          {/* Info & Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-100">
              <span className="text-sm text-gray-500">
                Menampilkan <span className="font-semibold text-[#c48b8b]">{filteredProducts.length}</span> dari {products.length} produk
                {showOnlyFeatured && (
                  <span className="text-gray-400"> ({products.filter(p => p.featured).length} unggulan)</span>
                )}
              </span>
            </div>
            
            <button
              onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
              className={`group relative px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                showOnlyFeatured 
                  ? 'bg-gradient-to-r from-[#c48b8b] to-[#d4a5a5] text-white shadow-lg hover:shadow-xl' 
                  : 'bg-white border-2 border-[#d4a5a5] text-[#c48b8b] hover:bg-[#fef6f6]'
              }`}
            >
              <span className="relative z-10">
                {showOnlyFeatured ? "✨ Tampilkan Semua" : "⭐ Hanya Unggulan"}
              </span>
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div ref={filtersRef} className="mb-12">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#c48b8b]/20 to-[#d4a5a5]/20 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#c48b8b] transition-colors" />
                <Input
                  type="text"
                  placeholder="Cari produk favorit kamu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 pr-12 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-[#d4a5a5] bg-white/90 backdrop-blur-sm shadow-lg focus:shadow-xl transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-100 hover:bg-[#f5e6e8] rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory("semua")}
              className={`category-btn group relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                selectedCategory === "semua"
                  ? 'bg-gradient-to-r from-[#c48b8b] to-[#d4a5a5] text-white shadow-lg scale-105'
                  : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-[#d4a5a5] hover:text-[#c48b8b]'
              }`}
            >
              <span className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Semua Produk
              </span>
            </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`category-btn group relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedCategory === category.slug
                    ? 'bg-gradient-to-r from-[#c48b8b] to-[#d4a5a5] text-white shadow-lg scale-105'
                    : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-[#d4a5a5] hover:text-[#c48b8b]'
                }`}
              >
                <span className="flex items-center gap-2">
                  {category.slug === 'bunga' && '🌸'}
                  {category.slug === 'boneka' && '🧸'}
                  {category.slug === 'aksesoris' && '✨'}
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          // Loading Skeleton
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-lg overflow-hidden"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded-full w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded-full w-full animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded-full w-1/2 animate-pulse" />
                  <div className="flex gap-2 pt-2">
                    <div className="h-11 bg-gray-200 rounded-xl flex-1 animate-pulse" />
                    <div className="h-11 bg-gray-200 rounded-xl flex-1 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="product-card-wrapper">
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-[#f5e6e8] rounded-full blur-2xl scale-150 opacity-50" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-[#fef6f6] to-[#f5e6e8] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-5xl">🔍</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Produk Tidak Ditemukan
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Coba ubah kata kunci pencarian atau filter kategori untuk menemukan produk yang kamu cari
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("semua");
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c48b8b] to-[#d4a5a5] text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <X className="w-4 h-4" />
              Reset Filter
            </button>
          </div>
        )}

        {/* View All Button */}
        {!isLoading && filteredProducts.length > 0 && (
          <div className="text-center mt-14">
            <a href="/produk" className="inline-block group">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#c48b8b] to-[#d4a5a5] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                
                <button className="relative px-10 py-5 bg-gradient-to-r from-[#c48b8b] to-[#d4a5a5] text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3">
                  <SlidersHorizontal className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Lihat Semua Produk
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>
            </a>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes draw-line {
          from {
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        .animate-draw-line {
          animation: draw-line 1.2s ease-out forwards;
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
        }

        .category-btn {
          position: relative;
          overflow: hidden;
        }

        .category-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: none;
          pointer-events: none;
        }

        .category-btn:hover::before {
          animation: btn-shimmer 0.6s ease-in-out;
        }

        @keyframes btn-shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </section>
  );
}