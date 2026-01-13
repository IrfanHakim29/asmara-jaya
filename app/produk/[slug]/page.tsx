"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Tag,
} from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
  video?: string | null;
  featured?: boolean;
  tags?: string[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products');
        const allProducts: Product[] = await response.json();

        const foundProduct = allProducts.find((p: Product) => p.slug === slug);
        setProduct(foundProduct || null);

        if (foundProduct) {
          const related = allProducts
            .filter(
              (p: Product) =>
                p.category === foundProduct.category && p.id !== foundProduct.id
            )
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);



  const handleWhatsAppOrder = () => {
    if (!product) return;

    const message = `Halo, saya tertarik dengan produk:\n\n*${product.name}*\n\nApakah produk ini masih tersedia?`;

    const url = `https://wa.me/628123456789?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-12 bg-gray-200 rounded w-1/3" />
              <div className="h-24 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-bold mb-4">Produk Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-6">
            Maaf, produk yang Anda cari tidak tersedia.
          </p>
          <Link href="/produk">
            <Button className="gradient-primary text-white">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Kembali ke Produk
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const categoryLabels: Record<string, string> = {
    bunga: "Bunga Pot",
    boneka: "Boneka",
    aksesoris: "Aksesoris",
  };

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-gray-600 mb-8"
        >
          <Link href="/" className="hover:text-primary-600 transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <Link
            href="/produk"
            className="hover:text-primary-600 transition-colors"
          >
            Produk
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </motion.div>

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-3xl overflow-hidden group">
              {/* Display uploaded image or emoji placeholder */}
              {product.images && product.images.length > 0 && product.images[currentImageIndex] ? (
                <img 
                  src={product.images[currentImageIndex]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-9xl mb-4">
                      {product.category === "bunga"
                        ? "🌸"
                        : product.category === "boneka"
                        ? "🧸"
                        : "✨"}
                    </div>
                    <p className="text-lg text-gray-600">{product.name}</p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-white w-8"
                          : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-primary-500 ring-2 ring-primary-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {image ? (
                      <img 
                        src={image} 
                        alt={`${product.name} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-2xl">
                          {product.category === "bunga"
                            ? "🌸"
                            : product.category === "boneka"
                            ? "🧸"
                            : "✨"}
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Category Badge */}
            <div className="flex items-center justify-between">
              <span className="bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full">
                {categoryLabels[product.category]}
              </span>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="rounded-full"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorite ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleShare}
                  className="rounded-full"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Deskripsi Produk</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                size="lg"
                onClick={handleWhatsAppOrder}
                className="w-full gradient-primary text-white text-lg py-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Pesan via WhatsApp
              </Button>

              <Link href="/produk" className="block">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-gray-300 text-lg py-6 rounded-full"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Lihat Produk Lainnya
                </Button>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 rounded-2xl p-4 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-blue-800">
                ✓ Produk Original & Berkualitas
              </div>
              <div className="flex items-center gap-2 text-blue-800">
                ✓ Pengiriman Cepat ke Seluruh Pekanbaru
              </div>
              <div className="flex items-center gap-2 text-blue-800">
                ✓ Garansi Kepuasan Pelanggan
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Produk Terkait</h2>
              <p className="text-gray-600">
                Produk lain dalam kategori yang sama
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
