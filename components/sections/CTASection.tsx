"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#faf8f3]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
              Kunjungi Toko Kami
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Datang langsung ke toko untuk melihat koleksi lengkap kami
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#d4a5a5]/20"
          >
            {/* Store Info */}
            <div className="p-6 bg-gradient-to-br from-[#faf8f3] to-[#f5e6e8]">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Informasi Toko</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#c48b8b] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Alamat</p>
                    <p className="text-gray-600 text-sm">
                      Jl. Contoh No. 123, Pekanbaru, Riau
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#c48b8b] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Kontak</p>
                    <p className="text-gray-600 text-sm">+62 812-3456-789</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#c48b8b] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Jam Buka</p>
                    <p className="text-gray-600 text-sm">Senin - Sabtu: 09:00 - 20:00</p>
                    <p className="text-gray-600 text-sm">Minggu: 10:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed - Ganti dengan koordinat toko sebenarnya */}
            <div className="w-full h-80 bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127643.44866384936!2d101.44858785!3d0.5071395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a942c0c6ca8b%3A0x30a0c34dd481e7!2sPekanbaru%2C%20Pekanbaru%20City%2C%20Riau!5e0!3m2!1sen!2sid!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Toko Asmara Jaya"
              />
            </div>
          </motion.div>

          {/* Gallery Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Foto Toko</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Placeholder untuk foto toko - nanti diganti user */}
              {[1, 2, 3, 4].map((index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="relative aspect-square bg-gradient-to-br from-[#f5e6e8] to-[#e8d4d7] rounded-2xl overflow-hidden shadow-lg border border-[#d4a5a5]/20 group cursor-pointer"
                >
                  {/* Placeholder content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <div className="text-4xl mb-2">
                      {index === 1 ? "🏪" : index === 2 ? "🌸" : index === 3 ? "🧸" : "✨"}
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      Foto {index}
                    </p>
                    <p className="text-xs text-gray-400 text-center mt-1">
                      (Ganti dengan foto toko)
                    </p>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>

            {/* Additional note */}
            <div className="bg-[#f5e6e8]/50 rounded-2xl p-4 border border-[#d4a5a5]/30">
              <p className="text-sm text-gray-600 text-center">
                📸 Upload foto toko Anda ke folder{" "}
                <code className="bg-white px-2 py-1 rounded text-xs">public/images/store/</code>
                <br />
                <span className="text-xs text-gray-500">
                  Gunakan nama: store-1.jpg, store-2.jpg, store-3.jpg, store-4.jpg
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
