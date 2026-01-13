"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Alamat Toko",
      content: "Jl. Sudirman No. 123, Pekanbaru, Riau 28156",
      link: "https://maps.google.com/?q=Pekanbaru",
    },
    {
      icon: Phone,
      title: "Telepon",
      content: "+62 812-3456-7890",
      link: "tel:+628123456789",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@asmarajaya.com",
      link: "mailto:info@asmarajaya.com",
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      content: "Senin - Sabtu: 09.00 - 21.00 WIB\nMinggu: Libur",
    },
  ];

  const handleWhatsApp = () => {
    const message = "Halo, saya ingin bertanya tentang produk di Toko Asmara Jaya.";
    const url = `https://wa.me/628123456789?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#faf8f3] via-white to-[#f5e6e8] py-24 overflow-hidden">
        {/* Decorative backgrounds */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-1/4 w-96 h-96 bg-[#d4a5a5] rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-1/4 w-96 h-96 bg-[#c9d5b5] rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Decorative line */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4a5a5]" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="mx-4"
              >
                <MessageCircle className="w-8 h-8 text-[#c48b8b]" />
              </motion.div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4a5a5]" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gray-700">Hubungi</span>
              <br />
              <span className="bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
                Kami
              </span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Kami siap membantu Anda. Jangan ragu untuk menghubungi kami
              kapan saja!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Decorative line */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4a5a5]" />
              <span className="mx-4 text-[#c48b8b] text-sm font-medium tracking-wider">INFORMASI KONTAK</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4a5a5]" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
                Informasi Kontak
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  {info.link ? (
                    <a
                      href={info.link}
                      target={info.link.startsWith("http") ? "_blank" : undefined}
                      rel={
                        info.link.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="block h-full"
                    >
                      <div className="bg-gradient-to-br from-[#faf8f3] to-[#f5e6e8] rounded-3xl p-8 shadow-lg border border-[#d4a5a5]/20 hover:shadow-2xl transition-all h-full">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4a5a5] to-[#c48b8b] flex items-center justify-center mb-6 shadow-lg"
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#d4a5a5] group-hover:to-[#c48b8b] transition-all duration-300">
                          {info.title}
                        </h3>
                        <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                          {info.content}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="bg-gradient-to-br from-[#faf8f3] to-[#f5e6e8] rounded-3xl p-8 shadow-lg border border-[#d4a5a5]/20 h-full">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4a5a5] to-[#c48b8b] flex items-center justify-center mb-6 shadow-lg"
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">
                        {info.title}
                      </h3>
                      <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                        {info.content}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Google Maps */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
                  Lokasi Toko
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Kunjungi toko kami untuk melihat langsung koleksi produk dan
                  mendapatkan layanan terbaik dari tim kami.
                </p>
              </motion.div>

              {/* Google Maps Embed */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className="aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-[#d4a5a5]/20"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15958.234567890123!2d101.4477!3d0.5071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMzAnMjUuNiJOIDEwMcKwMjYnNTEuNyJF!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Toko Asmara Jaya"
                />
              </motion.div>

              {/* Quick Contact Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleWhatsApp}
                  size="lg"
                  className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#075E54] text-white text-lg py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat via WhatsApp
                </Button>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#faf8f3] to-[#f5e6e8] rounded-3xl p-10 shadow-2xl border-2 border-[#d4a5a5]/20"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
                  Kirim Pesan
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Isi form di bawah atau hubungi kami langsung via WhatsApp
                </p>
              </motion.div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Nama Lengkap
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Masukkan nama Anda"
                    className="w-full border-[#d4a5a5]/30 focus:border-[#c48b8b] focus:ring-[#c48b8b]/20"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    className="w-full border-[#d4a5a5]/30 focus:border-[#c48b8b] focus:ring-[#c48b8b]/20"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Nomor Telepon
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08xx-xxxx-xxxx"
                    className="w-full border-[#d4a5a5]/30 focus:border-[#c48b8b] focus:ring-[#c48b8b]/20"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Pertanyaan tentang produk"
                    className="w-full border-[#d4a5a5]/30 focus:border-[#c48b8b] focus:ring-[#c48b8b]/20"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tulis pesan Anda di sini..."
                    className="w-full px-4 py-3 border-2 border-[#d4a5a5]/30 rounded-xl focus:border-[#c48b8b] focus:ring-2 focus:ring-[#c48b8b]/20 focus:outline-none transition-all resize-none"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] hover:from-[#c48b8b] hover:via-[#b57373] hover:to-[#a56464] text-white text-lg py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    Kirim Pesan
                  </Button>
                </motion.div>
              </form>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mt-6 p-5 bg-gradient-to-r from-[#c9d5b5]/20 to-[#d4af37]/10 rounded-2xl border border-[#c9d5b5]/30"
              >
                <p className="text-sm text-gray-700 text-center leading-relaxed">
                  💡 <strong className="text-[#c48b8b]">Tips:</strong> Untuk respons lebih cepat, hubungi
                  kami langsung via WhatsApp!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Temukan jawaban untuk pertanyaan umum seputar toko kami
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                q: "Apakah bisa pesan custom untuk bouquet bunga?",
                a: "Ya, kami menerima pesanan custom bouquet sesuai dengan keinginan Anda. Hubungi kami untuk konsultasi lebih lanjut.",
              },
              {
                q: "Berapa lama waktu pengiriman?",
                a: "Untuk area Pekanbaru, pengiriman biasanya memakan waktu 1-2 hari kerja setelah konfirmasi pembayaran.",
              },
              {
                q: "Apakah ada garansi untuk produk?",
                a: "Semua produk kami bergaransi. Jika ada kerusakan saat pengiriman, kami akan menggantinya.",
              },
              {
                q: "Bagaimana cara pembayarannya?",
                a: "Kami menerima pembayaran via transfer bank, e-wallet, dan COD untuk area tertentu di Pekanbaru.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
