# 🚀 Setup Supabase untuk Toko Asmara Jaya

## ✅ Checklist Setup (Follow urutan ini!)

### 1️⃣ Create Supabase Project (5 menit)

1. Buka: https://supabase.com
2. Sign up dengan GitHub atau Email
3. Klik "New Project"
4. Isi form:
   - **Name:** asmara-jaya
   - **Database Password:** [BUAT PASSWORD KUAT - CATAT!]
   - **Region:** Southeast Asia (Singapore)
   - **Pricing Plan:** Free
5. Klik "Create new project"
6. **Tunggu 2-3 menit** sampai status "Active"

---

### 2️⃣ Get API Keys (2 menit)

1. Di Supabase Dashboard, klik **Settings** (icon gear) di sidebar kiri
2. Klik **API**
3. Copy 2 values ini:
   - **Project URL** (contoh: https://xxxxx.supabase.co)
   - **anon public key** (string panjang yang start dengan "eyJ...")

4. Buka file `.env.local` di project ini
5. Replace dengan values Anda:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...xxxxx
   ```

---

### 3️⃣ Create Database Tables (3 menit)

1. Di Supabase Dashboard, klik **SQL Editor** di sidebar
2. Klik **New Query**
3. Copy SEMUA isi file `supabase-schema.sql` (ada di root project ini)
4. Paste ke SQL Editor
5. Klik **RUN** atau tekan Ctrl+Enter
6. Tunggu sampai muncul "Success. No rows returned"

---

### 4️⃣ Create Storage Bucket (2 menit)

1. Di Supabase Dashboard, klik **Storage** di sidebar
2. Klik **Create a new bucket**
3. Isi:
   - **Name:** product-images
   - **Public bucket:** ✅ CENTANG (PENTING!)
   - **File size limit:** 50MB
4. Klik **Create bucket**

---

### 5️⃣ Test Connection (1 menit)

1. Restart dev server:
   ```bash
   npm run dev
   ```

2. Buka browser: http://localhost:3000/api/products
3. Kalau muncul `[]` (array kosong) = **SUKSES!** ✅
4. Kalau error = cek .env.local lagi

---

## 🎯 Next Steps (Tunggu konfirmasi dari dev)

Setelah semua di atas selesai, developer akan:
- Update admin panel untuk pakai Supabase API
- Update product catalog untuk load dari database
- Setup image upload ke Supabase Storage
- Test full CRUD operations

---

## 📞 Troubleshooting

**Q: "Failed to fetch products" error**
A: Cek .env.local keys sudah benar belum

**Q: Upload image error**
A: Pastikan bucket "product-images" sudah PUBLIC

**Q: Database connection error**
A: Pastikan SQL schema sudah di-run

---

## 🔐 Security Notes

- Jangan share ANON KEY di public (tapi OK untuk frontend)
- Database Password jangan lupa!
- Policies sudah di-set untuk public read, auth write

---

## 💰 Free Tier Limits

- Database: 500MB
- Storage: 1GB
- Bandwidth: 2GB/month
- API Requests: Unlimited

**Cukup untuk toko dengan 100-200 produk dengan gambar!**

---

Setelah selesai setup, **KONFIRMASI** di chat:
✅ "Supabase sudah ready"

Baru developer akan lanjut update code.
