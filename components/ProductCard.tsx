"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Eye, MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

const categoryConfig = {
  bunga: {
    label: "Bunga Pot",
    gradient: "from-[#d4a5a5] via-[#c48b8b] to-[#b57373]",
    glow: "shadow-[#d4a5a5]/50",
    icon: "🌸"
  },
  boneka: {
    label: "Boneka",
    gradient: "from-[#c9d5b5] via-[#b5c49d] to-[#a1b385]",
    glow: "shadow-[#c9d5b5]/50",
    icon: "🧸"
  },
  aksesoris: {
    label: "Aksesoris",
    gradient: "from-[#d4af37] via-[#c49a1f] to-[#b58916]",
    glow: "shadow-[#d4af37]/50",
    icon: ""
  },
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const config = categoryConfig[product.category as keyof typeof categoryConfig];

  const whatsappMessage = `Halo, saya tertarik dengan produk *${product.name}*. Apakah masih tersedia?`;

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `https://wa.me/628123456789?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-[#d4a5a5]/20">
        {/* Image Container with Gradient Overlay */}
        <Link href={`/produk/${product.slug}`} className="relative block">
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#faf8f3] to-[#f5e6e8]">
            {product.images && product.images[0] && !imageError ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-center p-8">
                  <div className="text-6xl mb-2">{config.icon}</div>
                  <div className={`text-xs font-semibold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                    {config.label}
                  </div>
                </div>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Quick View Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <motion.div
                initial={{ scale: 0.8, y: 20 }}
                whileHover={{ scale: 1 }}
                className="bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-2xl"
              >
                <div className="flex items-center gap-2 text-gray-800 font-semibold">
                  <Eye className="w-5 h-5" />
                  <span>Lihat Detail</span>
                </div>
              </motion.div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-r ${config.gradient} text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg ${config.glow}`}
              >
                {config.label}
              </motion.div>
            </div>

            {/* Featured Badge */}
            {product.featured && (
              <div className="absolute top-4 right-4 z-10">
                <motion.div
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  Unggulan
                </motion.div>
              </div>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Product Name */}
          <Link href={`/produk/${product.slug}`}>
            <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#d4a5a5] group-hover:via-[#c48b8b] group-hover:to-[#b57373] group-hover:bg-clip-text transition-all duration-300">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
            {product.description}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto">
            <Link href={`/produk/${product.slug}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full border-2 border-[#d4a5a5]/40 hover:border-[#c48b8b] text-[#c48b8b] hover:bg-[#f5e6e8]/30 transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Detail
              </Button>
            </Link>

            <Button
              onClick={handleWhatsAppClick}
              className={`flex-1 bg-gradient-to-r ${config.gradient} hover:shadow-xl hover:${config.glow} transition-all duration-300 text-white border-0`}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Pesan
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
