# 🌸 Toko Asmara Jaya Website

Website modern untuk Toko Asmara Jaya - toko bunga pot, boneka mainan, dan aksesoris di Pekanbaru. Dibangun dengan Next.js 14, TypeScript, Tailwind CSS, dan berbagai teknologi modern lainnya.

## ✨ Fitur Utama

- 🎨 **Desain Modern & Playful** - UI yang menarik dengan tema ceria dan lembut
- 🎭 **Animasi 3D** - Bunga pot floating, boneka bouncing, dan pot rotating dengan React Three Fiber
- 📱 **Fully Responsive** - Dioptimalkan untuk mobile, tablet, dan desktop
- 🎬 **Smooth Scrolling** - Pengalaman scroll yang mulus dengan Lenis
- 🔍 **Search & Filter** - Pencarian produk dengan filter kategori dan sort options
- 💬 **WhatsApp Integration** - Floating button dan direct order via WhatsApp
- ⚡ **Performance Optimized** - Lazy loading, code splitting, dan optimasi 3D
- 🔐 **SEO Friendly** - Metadata lengkap, semantic HTML, dan accessibility
- 🌐 **Bahasa Indonesia** - Semua konten dalam Bahasa Indonesia

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **3D Graphics:** React Three Fiber, Three.js, @react-three/drei
- **Smooth Scroll:** Lenis
- **Icons:** Lucide React
- **UI Components:** Shadcn/ui
- **Package Manager:** npm

## 📁 Struktur Folder

```
asmara-web/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout dengan navbar, footer, smooth scroll
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles & custom CSS
│   ├── produk/                  # Halaman produk
│   │   ├── page.tsx            # Listing semua produk
│   │   └── [slug]/
│   │       └── page.tsx        # Detail produk
│   ├── tentang/
│   │   └── page.tsx            # Halaman Tentang Kami
│   └── kontak/
│       └── page.tsx            # Halaman Kontak
├── components/
│   ├── Navbar.tsx              # Navigation bar (sticky with blur)
│   ├── Footer.tsx              # Footer dengan links dan contact info
│   ├── FloatingWhatsApp.tsx    # Floating WhatsApp button
│   ├── ProductCard.tsx         # Kartu produk dengan hover effects
│   ├── SmoothScrollProvider.tsx # Lenis smooth scroll wrapper
│   ├── 3d/
│   │   ├── Scene3D.tsx         # 3D Scene container
│   │   └── FloatingElements.tsx # 3D models (flower, teddy, pot)
│   ├── sections/
│   │   ├── HeroSection.tsx     # Hero dengan 3D elements
│   │   ├── FeaturesSection.tsx # Fitur toko
│   │   ├── CategoriesSection.tsx # Kategori produk
│   │   ├── FeaturedProductsSection.tsx # Produk unggulan
│   │   └── CTASection.tsx      # Call-to-action
│   └── ui/                     # Shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       └── input.tsx
├── public/
│   └── data/
│       └── products.json       # Data produk (dapat diganti dengan API)
├── lib/
│   └── utils.ts               # Utility functions
├── tailwind.config.ts         # Tailwind configuration dengan custom theme
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies

```

## 🚀 Instalasi & Setup

### Prerequisites

- Node.js 18.x atau lebih baru
- npm atau yarn

### Langkah-langkah

1. **Clone atau Extract Project**
   ```bash
   cd C:\Users\user\Downloads\asmara-web
   ```

2. **Install Dependencies** (Sudah dilakukan)
   ```bash
   npm install
   ```

3. **Copy Template Files**
   
   Copy semua file dari folder `templates` di `Asmara_Web` ke folder `asmara-web`:
   
   - Copy `templates/tailwind.config.ts` → `asmara-web/tailwind.config.ts`
   - Copy `templates/globals.css` → `asmara-web/app/globals.css`
   - Copy `templates/products.json` → `asmara-web/public/data/products.json`
   - Copy semua file dari `templates/components/` → `asmara-web/components/`
   - Copy semua file dari `templates/app/` → `asmara-web/app/`

4. **Konfigurasi WhatsApp Number**
   
   Ganti nomor WhatsApp di file berikut dengan nomor toko Anda:
   - `components/FloatingWhatsApp.tsx` (line 11)
   - `components/Navbar.tsx` (untuk button CTA)
   - `components/sections/HeroSection.tsx`
   - `components/ProductCard.tsx`
   - `app/produk/[slug]/page.tsx`

   Ganti `628123456789` dengan nomor WhatsApp toko (format: 62xxxxx).

5. **Update Informasi Toko**
   
   Edit file berikut untuk update informasi toko:
   - `components/Footer.tsx` - Alamat, telepon, email
   - `app/tentang/page.tsx` - Cerita dan info toko
   - `app/kontak/page.tsx` - Contact details dan Google Maps embed
   - `app/layout.tsx` - SEO metadata

6. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

   Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📦 Data Produk

Data produk disimpan di `public/data/products.json`. Struktur data:

```json
{
  "id": 1,
  "name": "Nama Produk",
  "slug": "nama-produk",
  "category": "bunga|boneka|aksesoris",
  "price": 85000,
  "description": "Deskripsi produk",
  "images": ["/images/products/..."],
  "video": null,
  "featured": true,
  "stock": 15,
  "tags": ["tag1", "tag2"]
}
```

### Upload Gambar Produk

1. Buat folder `public/images/products/`
2. Upload gambar produk ke folder tersebut
3. Update path di `products.json`

### Alternatif: Gunakan Cloud Storage

Untuk production, upload `products.json` dan gambar ke:
- **Vercel Blob Storage**
- **AWS S3**
- **Cloudinary**
- **Google Cloud Storage**

Update path di `products.json` dengan URL cloud storage.

## 🎨 Kustomisasi Warna

Edit `tailwind.config.ts` untuk mengubah warna tema:

```typescript
colors: {
  primary: {
    50: "#fef1f7",   // Warna pink untuk bunga
    500: "#ff66aa",
    // ...
  },
  secondary: {
    50: "#f0f9ff",   // Warna biru
    500: "#0ea5e9",
    // ...
  },
  accent: {
    50: "#fff7ed",   // Warna orange
    500: "#f97316",
    // ...
  }
}
```

## 🌐 Deployment

### Deploy ke Vercel (Recommended)

1. Push project ke GitHub
2. Login ke [Vercel](https://vercel.com)
3. Import GitHub repository
4. Deploy!

### Deploy ke Netlify

1. Build project: `npm run build`
2. Upload folder `out` ke Netlify
3. Configure custom domain

### Environment Variables

Jika menggunakan API external, tambahkan di `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-api.com
NEXT_PUBLIC_WA_NUMBER=628123456789
```

## ⚡ Performance Optimization

Website sudah dioptimasi dengan:

- ✅ **Lazy Loading** - Komponen 3D dan gambar
- ✅ **Code Splitting** - Dynamic imports untuk komponen berat
- ✅ **Image Optimization** - Next.js Image component
- ✅ **CSS Purging** - Tailwind CSS purge unused styles
- ✅ **Bundle Analysis** - Minimize bundle size
- ✅ **Mobile First** - Responsive dan touch-friendly

### Lighthouse Score Target

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## 🔧 Scripts Available

```bash
npm run dev          # Jalankan development server
npm run build        # Build untuk production
npm start            # Jalankan production build
npm run lint         # Check linting errors
```

## 📱 Testing

Test di berbagai device:

- **Mobile:** iPhone, Samsung, Xiaomi
- **Tablet:** iPad, Android tablets
- **Desktop:** Chrome, Firefox, Safari, Edge

## 🐛 Troubleshooting

### Error: Module not found

```bash
npm install
npm run dev
```

### 3D Elements tidak muncul

Check browser support untuk WebGL. Gunakan Chrome/Firefox terbaru.

### Smooth scroll tidak bekerja

Pastikan `SmoothScrollProvider` wrapper di `layout.tsx` aktif.

## 📝 Customization Guide

### Menambah Halaman Baru

1. Buat folder di `app/nama-halaman/`
2. Buat `page.tsx` di dalamnya
3. Import komponen yang diperlukan
4. Update Navbar links

### Menambah Section di Homepage

1. Buat component baru di `components/sections/`
2. Import dan tambahkan di `app/page.tsx`

### Mengubah Animasi

Edit durasi, delay, dan transition di Framer Motion:

```typescript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
```

## 🤝 Support & Contact

Untuk bantuan lebih lanjut:

- **Email:** support@asmarajaya.com
- **WhatsApp:** +62 812-3456-7890
- **Website:** https://asmarajaya.com

## 📄 License

© 2024 Toko Asmara Jaya. All rights reserved.

---

**Built with ❤️ in Pekanbaru**

