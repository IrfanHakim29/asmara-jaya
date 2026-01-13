"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Flower2, Heart, Sparkles, ArrowRight } from "lucide-react";
import { useDeviceDetect } from "@/lib/useDeviceDetect";

const categories = [
  {
    id: 1,
    name: "Bunga Pot",
    slug: "bunga",
    description: "Koleksi bunga pot cantik untuk mempercantik rumah Anda",
    icon: Flower2,
    color: "from-pink-500 to-rose-500",
    bgColor: "from-pink-50 to-rose-50",
    count: "50+",
    emoji: "🌸",
  },
  {
    id: 2,
    name: "Boneka Mainan",
    slug: "boneka",
    description: "Boneka lucu dan menggemaskan untuk semua usia",
    icon: Heart,
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50",
    count: "30+",
    emoji: "🧸",
  },
  {
    id: 3,
    name: "Aksesoris",
    slug: "aksesoris",
    description: "Aksesoris unik dan menarik untuk dekorasi",
    icon: Sparkles,
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-50 to-orange-50",
    count: "20+",
    emoji: "✨",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#faf8f3] to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#d4af37] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          {/* Decorative line */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4a5a5]" />
            <span className="mx-4 text-[#c48b8b] text-sm font-medium tracking-wider">JELAJAHI</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4a5a5]" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
              Kategori Produk
            </span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Jelajahi berbagai kategori produk pilihan kami
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <CategoryCard key={category.id} category={category} index={index} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Separate component for better hover handling
function CategoryCard({ category, index }: { category: typeof categories[0], index: number }) {
  const Icon = category.icon;
  const { isMobile, isTablet } = useDeviceDetect();
  const isLowPerformance = isMobile || isTablet;
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLowPerformance) return; // Skip on mobile
    
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = (mouseXPos / width - 0.5);
    const yPct = (mouseYPos / height - 0.5);
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    if (isLowPerformance) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <Link href={`/produk?kategori=${category.slug}`}>
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={isLowPerformance ? { willChange: 'auto' } : {
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          whileHover={isLowPerformance ? {} : { scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative group cursor-pointer h-full"
        >
          {/* Card */}
          <div className={`relative bg-gradient-to-br ${category.bgColor} rounded-3xl p-8 shadow-xl group-hover:shadow-2xl transition-all overflow-hidden h-full flex flex-col`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12" />
            </div>

            {/* Emoji Illustration */}
            <div className="relative w-full h-48 mb-6 flex items-center justify-center">
              <motion.div
                animate={isLowPerformance ? {} : {
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
                whileHover={isLowPerformance ? {} : {
                  scale: 1.2,
                  rotate: 0,
                }}
                className="text-9xl filter drop-shadow-2xl"
                style={isLowPerformance ? {} : { transformStyle: "preserve-3d", transform: "translateZ(50px)" }}
              >
                {category.emoji}
              </motion.div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col">
              {/* Icon & Count Badge */}
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  whileHover={isLowPerformance ? {} : { rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>

                <motion.div
                  whileHover={isLowPerformance ? {} : { scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md"
                >
                  <span className="text-sm font-bold text-gray-700">
                    {category.count} Produk
                  </span>
                </motion.div>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                {category.name}
              </h3>
              <p className="text-gray-600 mb-6 flex-1">
                {category.description}
              </p>

              {/* CTA Button */}
              <Button
                variant="ghost"
                className="group-hover:bg-white/50 w-full justify-between"
              >
                <span>Lihat Koleksi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            {/* Hover Glow Effect */}
            {!isLowPerformance && (
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-3xl`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
