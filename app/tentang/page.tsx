"use client";

import { motion } from "framer-motion";
import { Flower2, Heart, Users, Award, Target, Lightbulb } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Kualitas Terjamin",
      description:
        "Kami hanya menyediakan produk berkualitas tinggi yang sudah terseleksi dengan baik.",
    },
    {
      icon: Users,
      title: "Pelayanan Ramah",
      description:
        "Tim kami siap melayani dengan ramah dan membantu Anda menemukan produk yang tepat.",
    },
    {
      icon: Award,
      title: "Harga Terjangkau",
      description:
        "Kami menawarkan harga yang kompetitif tanpa mengorbankan kualitas produk.",
    },
    {
      icon: Target,
      title: "Pengiriman Cepat",
      description:
        "Produk Anda akan dikirim dengan cepat dan aman ke alamat tujuan.",
    },
  ];

  const team = [
    { name: "Budi Santoso", role: "Pemilik Toko", emoji: "👨‍💼" },
    { name: "Siti Rahayu", role: "Manajer Produk", emoji: "👩‍💼" },
    { name: "Ahmad Fauzi", role: "Customer Service", emoji: "🧑‍💼" },
  ];

  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#faf8f3] via-[#f5e6e8] to-[#e8d4d7] py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#d4a5a5] rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#c9d5b5] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Icon */}
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-8"
            >
              <Flower2 className="w-20 h-20 text-[#c48b8b]" />
            </motion.div>

            {/* Decorative line */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4a5a5]" />
              <span className="mx-4 text-[#c48b8b] text-sm font-medium tracking-wider">TENTANG KAMI</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4a5a5]" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-gray-800">Toko</span>
              <br />
              <span className="bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
                Asmara Jaya
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
            >
              Toko terpercaya di Pekanbaru yang menyediakan bunga pot, boneka
              mainan, dan aksesoris berkualitas sejak 2015
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#d4af37] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
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
                <span className="mx-4 text-[#c48b8b] text-sm font-medium tracking-wider">PERJALANAN KAMI</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4a5a5]" />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
                  Cerita Kami
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                className="bg-gradient-to-br from-[#faf8f3] to-[#f5e6e8] rounded-3xl p-8 border-l-4 border-[#c48b8b] shadow-lg"
              >
                <p className="text-gray-700 text-lg leading-relaxed">
                  Toko Asmara Jaya didirikan pada tahun 2015 dengan visi untuk
                  menjadi toko pilihan utama masyarakat Pekanbaru dalam memenuhi
                  kebutuhan bunga pot, boneka mainan, dan aksesoris dekorasi.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                className="bg-gradient-to-br from-[#f5e6e8] to-[#faf8f3] rounded-3xl p-8 border-l-4 border-[#c9d5b5] shadow-lg"
              >
                <p className="text-gray-700 text-lg leading-relaxed">
                  Berawal dari sebuah toko kecil dengan koleksi terbatas, kami
                  terus berkembang dan kini melayani ribuan pelanggan setia di
                  seluruh Pekanbaru. Kepercayaan pelanggan adalah aset terbesar
                  kami, dan kami berkomitmen untuk terus memberikan produk
                  berkualitas dengan pelayanan terbaik.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                className="bg-gradient-to-br from-[#faf8f3] to-[#e8d4d7] rounded-3xl p-8 border-l-4 border-[#d4af37] shadow-lg"
              >
                <p className="text-gray-700 text-lg leading-relaxed">
                  Setiap produk yang kami jual telah melewati proses seleksi ketat
                  untuk memastikan kualitas dan kepuasan pelanggan. Tim kami yang
                  berpengalaman siap membantu Anda memilih produk yang sesuai
                  dengan kebutuhan dan budget Anda.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-br from-[#faf8f3] via-white to-[#f5e6e8] relative overflow-hidden">
        {/* Decorative backgrounds */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-96 h-96 bg-[#d4a5a5] rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#c9d5b5] rounded-full blur-3xl"
        />

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
              <span className="mx-4 text-[#c48b8b] text-sm font-medium tracking-wider">NILAI KAMI</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4a5a5]" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
                Nilai-Nilai Kami
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Prinsip yang kami pegang dalam melayani setiap pelanggan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
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
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-[#d4a5a5]/20 hover:shadow-2xl transition-all text-center h-full">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4a5a5] to-[#c48b8b] flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#d4a5a5] group-hover:to-[#c48b8b] transition-all duration-300">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-[#c9d5b5] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02, x: 10 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-[#faf8f3] to-[#f5e6e8] rounded-3xl p-10 border-2 border-[#d4a5a5]/30 shadow-lg group-hover:shadow-2xl transition-all h-full">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d4a5a5] to-[#c48b8b] flex items-center justify-center mb-6 shadow-lg"
                >
                  <Target className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#d4a5a5] via-[#c48b8b] to-[#b57373] bg-clip-text text-transparent">
                  Visi Kami
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Menjadi toko pilihan utama di Pekanbaru untuk produk bunga pot,
                  boneka mainan, dan aksesoris dengan standar kualitas terbaik dan
                  pelayanan yang memuaskan.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02, x: -10 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-[#f5e6e8] to-[#faf8f3] rounded-3xl p-10 border-2 border-[#c9d5b5]/30 shadow-lg group-hover:shadow-2xl transition-all h-full">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#c9d5b5] to-[#b8c9a4] flex items-center justify-center mb-6 shadow-lg"
                >
                  <Lightbulb className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#c9d5b5] via-[#b8c9a4] to-[#a8b895] bg-clip-text text-transparent">
                  Misi Kami
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Menyediakan produk berkualitas tinggi dengan harga terjangkau,
                  memberikan pelayanan terbaik, dan terus berinovasi untuk
                  memenuhi kebutuhan pelanggan.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Tim Kami</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Orang-orang hebat di balik Toko Asmara Jaya
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all text-center"
              >
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { value: "9+", label: "Tahun Pengalaman" },
              { value: "100+", label: "Produk Tersedia" },
              { value: "1000+", label: "Pelanggan Puas" },
              { value: "4.9★", label: "Rating Pelanggan" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
