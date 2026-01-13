"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Heart, MapPin, Gift } from "lucide-react";
import { useDeviceDetect } from "@/lib/useDeviceDetect";

const features = [
  {
    icon: Heart,
    title: "Koleksi Lengkap",
    description: "Bunga pot, boneka, dan aksesoris dengan berbagai pilihan menarik",
    color: "from-[#d4a5a5] to-[#c48b8b]",
  },
  {
    icon: MapPin,
    title: "Lokasi Strategis",
    description: "Mudah dijangkau di Pekanbaru, bisa langsung datang ke toko",
    color: "from-[#c9d5b5] to-[#b5c49d]",
  },
  {
    icon: Gift,
    title: "Cocok untuk Hadiah",
    description: "Produk pilihan yang sempurna untuk hadiah spesial Anda",
    color: "from-[#d4af37] to-[#c49a1f]",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#faf8f3] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#d4a5a5] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#c9d5b5] rounded-full blur-3xl" />
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
            <span className="mx-4 text-[#c48b8b] text-sm font-medium tracking-wider">MENGAPA KAMI</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4a5a5]" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-gray-800">Mengapa Memilih</span>
            <br />
            <span className="bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
              Asmara Jaya
            </span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Kami berkomitmen memberikan pelayanan terbaik untuk kepuasan pelanggan
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Separate component for better hover handling
function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  const Icon = feature.icon;
  const { isMobile, isTablet, isHydrated } = useDeviceDetect();
  const isLowPerformance = isHydrated && (isMobile || isTablet);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

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
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={isLowPerformance ? { willChange: 'auto' } : {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={isLowPerformance ? {} : { scale: 1.02, y: -5 }}
      className="relative group"
    >
      <div className="bg-white rounded-2xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 h-full">
        {/* Icon */}
        <motion.div
          whileHover={isLowPerformance ? {} : { scale: 1.1, rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}
          style={isLowPerformance ? {} : { transformStyle: "preserve-3d", transform: "translateZ(30px)" }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-bold mb-3 text-gray-800">
          {feature.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {feature.description}
        </p>

        {/* Decorative Elements */}
        {!isLowPerformance && (
          <>
            <motion.div 
              className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-100/50 to-transparent rounded-bl-full"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Shine effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%", opacity: 0 }}
              whileHover={{ x: "100%", opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          </>
        )}
      </div>
    </motion.div>
  );
}
