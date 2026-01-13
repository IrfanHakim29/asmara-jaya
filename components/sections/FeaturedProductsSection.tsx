"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";

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

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data: Product[] = await response.json();

        // Store all products
        setProducts(data);
        
        // Show only featured by default
        const featured = data.filter((p) => p.featured);
        setFilteredProducts(featured);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback to empty array if fetch fails
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch categories for filters
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

  // Filter products based on search, category, and featured toggle
  useEffect(() => {
    let filtered = products;

    // Filter by featured status
    if (showOnlyFeatured) {
      filtered = filtered.filter((p) => p.featured);
    }

    // Filter by category
    if (selectedCategory !== "semua") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
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

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#faf8f3] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#d4a5a5] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Decorative line */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4a5a5]" />
            <span className="mx-4 text-[#c48b8b] text-sm font-medium tracking-wider">KOLEKSI TERBAIK</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4a5a5]" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
              Produk Unggulan
            </span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-4">
            Pilihan terbaik dari koleksi kami yang paling populer
          </p>
          
          {/* Info dan Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <div className="text-sm text-gray-500">
              Menampilkan {filteredProducts.length} dari {products.length} produk
              {showOnlyFeatured && ` (${products.filter(p => p.featured).length} unggulan)`}
            </div>
            <Button
              onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
              variant="outline"
              size="sm"
              className="rounded-full border-2 border-[#d4a5a5] text-[#c48b8b] hover:bg-[#f5e6e8]/50"
            >
              {showOnlyFeatured ? "Tampilkan Semua Produk" : "Hanya Produk Unggulan"}
            </Button>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-primary-500 transition-colors"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              key="semua"
              onClick={() => setSelectedCategory("semua")}
              variant={selectedCategory === "semua" ? "default" : "outline"}
              className={`rounded-full px-6 py-2 transition-all ${
                selectedCategory === "semua"
                  ? "gradient-primary text-white shadow-lg"
                  : "border-2 border-gray-300 hover:border-primary-500"
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Semua Produk
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                variant={selectedCategory === category.slug ? "default" : "outline"}
                className={`rounded-full px-6 py-2 transition-all ${
                  selectedCategory === category.slug
                    ? "gradient-primary text-white shadow-lg"
                    : "border-2 border-gray-300 hover:border-primary-500"
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          // Loading Skeleton
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-8 bg-gray-200 rounded w-1/2" />
                  <div className="flex gap-2">
                    <div className="h-10 bg-gray-200 rounded flex-1" />
                    <div className="h-10 bg-gray-200 rounded flex-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          // Empty State
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Produk Tidak Ditemukan
            </h3>
            <p className="text-gray-600 mb-6">
              Coba ubah kata kunci pencarian atau filter kategori
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("semua");
              }}
              className="gradient-primary text-white"
            >
              Reset Filter
            </Button>
          </motion.div>
        )}

        {/* View All Button */}
        {!isLoading && filteredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <a href="/produk">
              <Button
                size="lg"
                className="gradient-primary text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Lihat Semua Produk
              </Button>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
