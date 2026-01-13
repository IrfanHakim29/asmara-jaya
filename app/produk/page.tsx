"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, SortAsc, Loader2 } from "lucide-react";
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [sortBy, setSortBy] = useState("terbaru");
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: "semua", label: "Semua Produk" },
    { id: "bunga", label: "Bunga Pot" },
    { id: "boneka", label: "Boneka" },
    { id: "aksesoris", label: "Aksesoris" },
  ];

  const sortOptions = [
    { id: "terbaru", label: "Terbaru" },
    { id: "nama-asc", label: "Nama A-Z" },
    { id: "nama-desc", label: "Nama Z-A" },
  ];

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
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

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

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

    // Sort products
    switch (sortBy) {
      case "nama-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nama-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "terbaru":
      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, sortBy, products]);

  return (
    <main className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-[#faf8f3] to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#d4a5a5] rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-[#c9d5b5] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Decorative line */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4a5a5]" />
            <span className="mx-4 text-[#c48b8b] text-sm font-medium tracking-wider">KATALOG LENGKAP</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4a5a5]" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
              Semua Produk
            </span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Jelajahi koleksi lengkap bunga pot, boneka mainan, dan aksesoris kami
          </p>
        </motion.div>

        {/* Search, Filter, and Sort Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c48b8b]" />
              <Input
                type="text"
                placeholder="Cari produk berdasarkan nama, deskripsi, atau tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-6 py-7 text-lg rounded-full border-2 border-[#d4a5a5]/30 focus:border-[#c48b8b] transition-all bg-white shadow-lg hover:shadow-xl"
              />
            </motion.div>
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-white rounded-3xl p-6 shadow-lg border border-[#d4a5a5]/20">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <span className="flex items-center text-sm font-semibold text-[#c48b8b] mr-2">
                <Filter className="w-4 h-4 mr-2" />
                Kategori
              </span>
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => setSelectedCategory(category.id)}
                    variant={
                      selectedCategory === category.id ? "default" : "outline"
                    }
                    size="sm"
                    className={`rounded-full transition-all ${
                      selectedCategory === category.id
                        ? "gradient-primary text-white shadow-lg"
                        : "border-2 border-[#d4a5a5]/40 hover:border-[#c48b8b] text-gray-700"
                    }`}
                  >
                    {category.label}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-3">
              <span className="flex items-center text-sm font-semibold text-[#c48b8b]">
                <SortAsc className="w-4 h-4 mr-2" />
                Urutkan
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-5 py-2.5 rounded-full border-2 border-[#d4a5a5]/40 focus:border-[#c48b8b] focus:outline-none text-sm font-medium transition-all bg-white cursor-pointer hover:shadow-md"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center text-gray-600">
            Menampilkan{" "}
            <span className="font-bold text-primary-600">
              {filteredProducts.length}
            </span>{" "}
            dari{" "}
            <span className="font-bold">{products.length}</span> produk
          </div>
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          // Loading Skeleton
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
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
              Coba ubah kata kunci pencarian atau filter kategori Anda
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("semua");
                setSortBy("terbaru");
              }}
              className="gradient-primary text-white"
            >
              Reset Semua Filter
            </Button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
