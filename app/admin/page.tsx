"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Pencil, Trash2, Plus, Save, X, Package, 
  TrendingUp, Settings, Upload, Image as ImageIcon,
  BarChart3, Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editCategoryForm, setEditCategoryForm] = useState<Partial<Category>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "categories" | "settings">("products");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    slug: "",
    category: "bunga",
    description: "",
    images: [],
    featured: false,
    tags: []
  });
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: "",
    slug: "",
    description: "",
    icon: "📦",
    color: "#d4a5a5"
  });
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);

  const ADMIN_PASSWORD = "asmara2026";

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchCategories();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Password salah!");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...editForm })
      });
      
      if (response.ok) {
        await fetchProducts();
        setEditingId(null);
        setEditForm({});
        alert("✅ Produk berhasil diupdate!");
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert("❌ Gagal update produk");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      try {
        const response = await fetch(`/api/products?id=${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          await fetchProducts();
          alert("✅ Produk berhasil dihapus!");
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert("❌ Gagal hapus produk");
      }
    }
  };

  // Toggle Featured Status
  const handleToggleFeatured = async (product: Product) => {
    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product.id,
          featured: !product.featured
        })
      });

      if (response.ok) {
        await fetchProducts();
        // Silent update - no alert
      }
    } catch (error) {
      console.error('Error toggling featured:', error);
      alert("❌ Gagal mengubah status unggulan");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleAddProduct = async () => {
    // Validasi
    if (!newProduct.name) {
      alert("❌ Nama produk harus diisi!");
      return;
    }

    if (!imagePreview || imagePreview.length === 0) {
      alert("❌ Minimal 1 gambar produk harus diupload!");
      return;
    }

    try {
      const slug = newProduct.name?.toLowerCase().replace(/\s+/g, '-') || '';
      
      const productToAdd = {
        name: newProduct.name || "",
        slug: slug,
        category: newProduct.category || "bunga",
        description: newProduct.description || "",
        images: imagePreview,
        featured: newProduct.featured || false,
        tags: newProduct.tags || []
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productToAdd)
      });

      if (response.ok) {
        await fetchProducts();
        setShowAddProduct(false);
        setNewProduct({
          name: "",
          slug: "",
          category: "bunga",
          description: "",
          images: [],
          featured: false,
          tags: []
        });
        setImagePreview([]);
        alert("✅ Produk berhasil ditambahkan!");
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert("❌ Gagal menambahkan produk");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    
    try {
      const uploadedUrls: string[] = [];
      
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          const data = await response.json();
          uploadedUrls.push(data.url);
        }
      }
      
      const allImages = [...imagePreview, ...uploadedUrls];
      setImagePreview(allImages);
      setNewProduct({ ...newProduct, images: allImages });
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('❌ Gagal upload gambar');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.name) {
      alert("Nama kategori harus diisi!");
      return;
    }

    try {
      const categoryToAdd = {
        name: newCategory.name!,
        slug: newCategory.slug || newCategory.name.toLowerCase().replace(/\s+/g, "-"),
        description: newCategory.description || "",
        icon: newCategory.icon || "📦",
        color: newCategory.color || "#d4a5a5"
      };

      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryToAdd)
      });

      if (response.ok) {
        await fetchCategories();
        setShowAddCategory(false);
        setNewCategory({
          name: "",
          slug: "",
          description: "",
          icon: "📦",
          color: "#d4a5a5"
        });
        alert("✅ Kategori berhasil ditambahkan!");
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert("❌ Gagal menambahkan kategori");
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategoryId) return;

    try {
      const response = await fetch('/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingCategoryId, ...editCategoryForm })
      });

      if (response.ok) {
        await fetchCategories();
        setEditingCategoryId(null);
        setEditCategoryForm({});
        alert('✅ Kategori berhasil diupdate!');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      alert('❌ Gagal update kategori');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (confirm('Hapus kategori ini?')) {
      try {
        const response = await fetch(`/api/categories?id=${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          await fetchCategories();
          alert('✅ Kategori berhasil dihapus!');
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('❌ Gagal menghapus kategori');
      }
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] via-[#f5e6e8] to-[#e8d4d7] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border border-[#d4a5a5]/20"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-gray-600">Toko Asmara Jaya</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full border-[#d4a5a5]/40 focus:border-[#c48b8b]"
              />
            </div>

            <Button
              type="submit"
              className="w-full gradient-primary text-white py-6 text-lg rounded-full"
            >
              Login
            </Button>
          </form>

          <p className="text-xs text-gray-500 mt-6 text-center">
            Password demo: asmara2026
          </p>
        </motion.div>
      </div>
    );
  }

  // Helper Functions
  function renderTabContent() {
    switch (activeTab) {
      case "products":
        return renderProductsTab();
      case "categories":
        return renderCategoriesTab();
      case "settings":
        return renderSettingsTab();
      default:
        return null;
    }
  }

  function renderProductsTab() {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Manajemen Produk</h2>
            <p className="text-gray-600">Kelola semua produk toko Anda</p>
          </div>
          <Button
            onClick={() => setShowAddProduct(true)}
            className="bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            Tambah Produk
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#d4a5a5]/20">
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">ID</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Produk</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Kategori</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-gray-700">Unggulan</th>
                    <th className="text-right py-4 px-4 text-sm font-semibold text-gray-700">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-100 hover:bg-[#faf8f3]/50 transition-colors"
                    >
                      {editingId === product.id ? (
                        <>
                          <td className="py-4 px-4 text-sm text-gray-600">{product.id}</td>
                          <td className="py-4 px-4">
                            <Input
                              value={editForm.name || ""}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="text-sm border-[#d4a5a5]/40 mb-2"
                            />
                            <textarea
                              value={editForm.description || ""}
                              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                              rows={2}
                              className="w-full px-3 py-2 text-sm border border-[#d4a5a5]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c48b8b]"
                              placeholder="Deskripsi produk..."
                            />
                          </td>
                          <td className="py-4 px-4">
                            <select
                              value={editForm.category || ""}
                              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                              className="w-full px-3 py-2 border border-[#d4a5a5]/40 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c48b8b]"
                            >
                              {categories.map((cat) => (
                                <option key={cat.id} value={cat.slug}>
                                  {cat.icon} {cat.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center">
                              <input
                                type="checkbox"
                                checked={editForm.featured || false}
                                onChange={(e) => setEditForm({ ...editForm, featured: e.target.checked })}
                                className="w-5 h-5 rounded border-gray-300 text-[#c48b8b] focus:ring-[#c48b8b]"
                              />
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" onClick={handleSave} className="bg-gradient-to-r from-[#c9d5b5] to-[#b5c49d] text-white">
                                <Save className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={handleCancel} className="border-gray-300">
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-4 px-4 text-sm text-gray-600">{product.id}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              {product.images[0] && (
                                <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                              )}
                              <div>
                                <div className="font-medium text-gray-800">{product.name}</div>
                                <div className="text-xs text-gray-500 line-clamp-1">{product.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#f5e6e8] text-[#c48b8b] capitalize">
                              {product.category}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() => handleToggleFeatured(product)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#c48b8b] focus:ring-offset-2 ${
                                  product.featured ? 'bg-[#c48b8b]' : 'bg-gray-300'
                                }`}
                                title={product.featured ? "Klik untuk nonaktifkan unggulan" : "Klik untuk jadikan unggulan"}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    product.featured ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(product)}
                                className="border-[#d4a5a5]/40 text-[#c48b8b]"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(product.id)}
                                className="border-red-300 text-red-500 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-[#f5e6e8] to-[#faf8f3] rounded-2xl p-6 border border-[#d4a5a5]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-[#c48b8b]">{products.length}</div>
                    <div className="text-sm text-gray-600">Total Produk</div>
                  </div>
                  <Package className="w-12 h-12 text-[#d4a5a5] opacity-50" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#f5e6e8] to-[#faf8f3] rounded-2xl p-6 border border-[#d4a5a5]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-[#c48b8b]">{products.filter((p) => p.featured).length}</div>
                    <div className="text-sm text-gray-600">Featured Products</div>
                  </div>
                  <TrendingUp className="w-12 h-12 text-[#d4a5a5] opacity-50" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  function renderCategoriesTab() {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Manajemen Kategori</h2>
            <p className="text-gray-600">Kelola kategori produk toko Anda</p>
          </div>
          <Button
            onClick={() => setShowAddCategory(true)}
            className="bg-gradient-to-r from-[#c9d5b5] via-[#b5c49d] to-[#a0b584] text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            Tambah Kategori
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-[#c9d5b5] transition-all group"
            >
              {editingCategoryId === category.id ? (
                <div className="space-y-4">
                  <Input
                    value={editCategoryForm.name || ""}
                    onChange={(e) => setEditCategoryForm({ ...editCategoryForm, name: e.target.value })}
                    placeholder="Nama kategori"
                    className="border-[#c9d5b5]/40"
                  />
                  <Input
                    value={editCategoryForm.icon || ""}
                    onChange={(e) => setEditCategoryForm({ ...editCategoryForm, icon: e.target.value })}
                    placeholder="Emoji icon (misal: 🌸)"
                    className="border-[#c9d5b5]/40"
                  />
                  <Input
                    value={editCategoryForm.color || ""}
                    onChange={(e) => setEditCategoryForm({ ...editCategoryForm, color: e.target.value })}
                    placeholder="Warna hex (misal: #d4a5a5)"
                    className="border-[#c9d5b5]/40"
                  />
                  <textarea
                    value={editCategoryForm.description || ""}
                    onChange={(e) => setEditCategoryForm({ ...editCategoryForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-[#c9d5b5]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b5c49d]"
                    placeholder="Deskripsi kategori..."
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleUpdateCategory}
                      className="bg-gradient-to-r from-[#c9d5b5] to-[#b5c49d] text-white"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Simpan
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingCategoryId(null);
                        setEditCategoryForm({});
                      }}
                      className="border-gray-300"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Batal
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                      style={{ backgroundColor: category.color + '20' }}
                    >
                      {category.icon}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingCategoryId(category.id);
                          setEditCategoryForm(category);
                        }}
                        className="border-[#c9d5b5]/40 text-[#b5c49d]"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="border-red-300 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500">
                      {products.filter(p => p.category === category.slug).length} produk
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span 
                      className="text-xs font-mono text-gray-500"
                    >
                      {category.color}
                    </span>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-[#f5e6e8] to-[#faf8f3] rounded-2xl p-6 border border-[#c9d5b5]/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#b5c49d]">{categories.length}</div>
                <div className="text-sm text-gray-600">Total Kategori</div>
              </div>
              <Package className="w-12 h-12 text-[#c9d5b5] opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#f5e6e8] to-[#faf8f3] rounded-2xl p-6 border border-[#d4a5a5]/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#c48b8b]">{products.length}</div>
                <div className="text-sm text-gray-600">Total Produk</div>
              </div>
              <BarChart3 className="w-12 h-12 text-[#d4a5a5] opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#f5e6e8] to-[#faf8f3] rounded-2xl p-6 border border-[#d4af37]/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#c9a942]">
                  {categories.length > 0 ? Math.round(products.length / categories.length) : 0}
                </div>
                <div className="text-sm text-gray-600">Rata-rata per Kategori</div>
              </div>
              <TrendingUp className="w-12 h-12 text-[#d4af37] opacity-50" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderSettingsTab() {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Pengaturan</h2>
          <p className="text-gray-600">Kelola pengaturan toko Anda</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#c48b8b]" />
              Informasi Toko
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Toko</label>
                <Input defaultValue="Toko Asmara Jaya" className="border-[#d4a5a5]/40" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat</label>
                <Input defaultValue="Jl. Sudirman No. 123, Pekanbaru" className="border-[#d4a5a5]/40" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telepon</label>
                  <Input defaultValue="+62 812-3456-7890" className="border-[#d4a5a5]/40" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <Input defaultValue="info@asmarajaya.com" className="border-[#d4a5a5]/40" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#c48b8b]" />
              Jam Operasional
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Senin - Jumat</span>
                <Input defaultValue="09:00 - 21:00" className="w-48 border-[#d4a5a5]/40" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Sabtu</span>
                <Input defaultValue="09:00 - 21:00" className="w-48 border-[#d4a5a5]/40" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Minggu</span>
                <Input defaultValue="Libur" className="w-48 border-[#d4a5a5]/40" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#c48b8b]" />
              Pengaturan Website
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-800">Tampilkan Harga</p>
                  <p className="text-sm text-gray-600">Tampilkan harga produk di website</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-800">Tampilkan Stok</p>
                  <p className="text-sm text-gray-600">Tampilkan jumlah stok tersedia</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-gray-800">Featured Products</p>
                  <p className="text-sm text-gray-600">Tampilkan produk unggulan di homepage</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] text-white">
              <Save className="w-5 h-5 mr-2" />
              Simpan Pengaturan
            </Button>
            <Button variant="outline" className="border-gray-300">
              Batal
            </Button>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-2">Demo Mode - Website Katalog</h4>
                <p className="text-sm text-blue-700 leading-relaxed mb-3">
                  Website ini adalah katalog produk untuk menampilkan produk toko. Pelanggan akan datang langsung ke toko setelah melihat katalog online.
                </p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Admin panel untuk mengelola produk dan kategori</li>
                  <li>• Upload gambar produk ke cloud storage</li>
                  <li>• Database untuk menyimpan produk dan kategori</li>
                  <li>• Backend API dengan Node.js/Laravel/Django</li>
                  <li>• Sistem autentikasi yang aman untuk admin</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard - Main Return
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] via-[#f5e6e8] to-[#e8d4d7] pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#d4a5a5]/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] p-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-white/90">Toko Asmara Jaya Management System</p>
              </div>
              <Button
                onClick={() => setIsAuthenticated(false)}
                variant="outline"
                className="bg-white/20 border-white/40 text-white hover:bg-white/30"
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-[#d4a5a5]/20 bg-[#faf8f3]">
            <div className="flex overflow-x-auto">
              {[
                { id: "products", label: "Produk", icon: Package },
                { id: "categories", label: "Kategori", icon: BarChart3 },
                { id: "settings", label: "Pengaturan", icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                      activeTab === tab.id
                        ? "border-b-2 border-[#c48b8b] text-[#c48b8b] bg-white"
                        : "text-gray-600 hover:text-[#c48b8b] hover:bg-white/50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8">{renderTabContent()}</div>
        </div>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddProduct(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
                Tambah Produk Baru
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Produk *
                  </label>
                  <Input
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Contoh: Bunga Mawar Merah"
                    className="border-[#d4a5a5]/40"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kategori *
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-4 py-2 border border-[#d4a5a5]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c48b8b]"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Deskripsi *
                  </label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Deskripsi lengkap produk..."
                    rows={4}
                    className="w-full px-4 py-3 border border-[#d4a5a5]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c48b8b] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload Gambar * (Bisa lebih dari 1)
                  </label>
                  
                  {/* Image Gallery Preview */}
                  {imagePreview.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {imagePreview.map((img, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={img} 
                            alt={`Preview ${index + 1}`} 
                            className="w-full h-32 object-cover rounded-lg border-2 border-[#d4a5a5]/40" 
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const newImages = imagePreview.filter((_, i) => i !== index);
                              setImagePreview(newImages);
                              setNewProduct({ ...newProduct, images: newImages });
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                          {index === 0 && (
                            <span className="absolute bottom-1 left-1 bg-[#c48b8b] text-white text-xs px-2 py-1 rounded">
                              Utama
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-[#d4a5a5]/40 rounded-lg p-6 text-center hover:border-[#c48b8b] transition-colors cursor-pointer"
                    onClick={() => document.getElementById('imageUpload')?.click()}
                  >
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      {imagePreview.length > 0 ? 'Klik untuk tambah gambar lagi' : 'Klik untuk upload gambar'}
                    </p>
                    <p className="text-xs text-gray-500">
                      JPG, PNG, GIF (Max 5MB per file)
                    </p>
                    <p className="text-xs text-[#c48b8b] mt-2">
                      💡 Upload beberapa foto untuk tampilkan variasi warna/angle
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="imageUpload"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={newProduct.featured}
                    onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="featured" className="text-sm text-gray-700">
                    Tampilkan di Featured Products
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Button
                  onClick={handleAddProduct}
                  className="flex-1 bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] text-white py-6"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Tambah Produk
                </Button>
                <Button
                  onClick={() => setShowAddProduct(false)}
                  variant="outline"
                  className="flex-1 border-gray-300 py-6"
                >
                  Batal
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Category Modal */}
      <AnimatePresence>
        {showAddCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddCategory(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#c9d5b5] via-[#b5c49d] to-[#a0b584] bg-clip-text text-transparent">
                Tambah Kategori Baru
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Kategori *
                  </label>
                  <Input
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="Contoh: Bunga"
                    className="border-[#c9d5b5]/40"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Slug (URL)
                  </label>
                  <Input
                    value={newCategory.slug}
                    onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                    placeholder="bunga (otomatis dari nama)"
                    className="border-[#c9d5b5]/40"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Icon Emoji
                  </label>
                  <Input
                    value={newCategory.icon}
                    onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                    placeholder="🌸 (emoji icon untuk kategori)"
                    className="border-[#c9d5b5]/40"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Pilih emoji yang sesuai: 🌸 🧸 ✨ 🎁 💐 🎀 etc
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pilih Warna Tema
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={newCategory.color || "#d4a5a5"}
                      onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                      className="w-16 h-12 rounded-lg border-2 border-[#c9d5b5]/40 cursor-pointer"
                    />
                    <Input
                      value={newCategory.color}
                      onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                      placeholder="#d4a5a5"
                      className="flex-1 border-[#c9d5b5]/40"
                    />
                    <div 
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 flex-shrink-0"
                      style={{ backgroundColor: newCategory.color || "#d4a5a5" }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Klik kotak warna untuk memilih dari palette RGB
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    placeholder="Deskripsi singkat kategori..."
                    rows={3}
                    className="w-full px-4 py-3 border border-[#c9d5b5]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b5c49d] resize-none"
                  />
                </div>

                <div className="flex gap-3 mt-8">
                  <Button
                    onClick={handleAddCategory}
                    className="flex-1 bg-gradient-to-r from-[#c9d5b5] via-[#b5c49d] to-[#a0b584] text-white py-6"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Tambah Kategori
                  </Button>
                  <Button
                    onClick={() => setShowAddCategory(false)}
                    variant="outline"
                    className="flex-1 border-gray-300 py-6"
                  >
                    Batal
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
