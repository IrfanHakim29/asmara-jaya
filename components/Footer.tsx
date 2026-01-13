"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Flower2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigasi: [
      { label: "Beranda", href: "/" },
      { label: "Produk", href: "/produk" },
      { label: "Tentang Kami", href: "/tentang" },
      { label: "Kontak", href: "/kontak" },
    ],
    kategori: [
      { label: "Bunga Pot", href: "/produk?kategori=bunga" },
      { label: "Boneka Mainan", href: "/produk?kategori=boneka" },
      { label: "Aksesoris", href: "/produk?kategori=aksesoris" },
    ],
  };

  const contactInfo = [
    {
      icon: MapPin,
      text: "Jl. Sudirman No. 123, Pekanbaru, Riau",
    },
    {
      icon: Phone,
      text: "+62 812-3456-7890",
      href: "tel:+628123456789",
    },
    {
      icon: Mail,
      text: "info@asmarajaya.com",
      href: "mailto:info@asmarajaya.com",
    },
    {
      icon: Clock,
      text: "Senin - Sabtu: 09.00 - 21.00 WIB",
    },
  ];

  const socialMedia = [
    {
      icon: Facebook,
      href: "https://facebook.com/asmarajaya",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/asmarajaya",
      label: "Instagram",
      color: "hover:text-pink-600",
    },
    {
      icon: MessageCircle,
      href: "https://wa.me/628123456789",
      label: "WhatsApp",
      color: "hover:text-green-600",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Flower2 className="w-8 h-8 text-primary-400" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold">Toko Asmara Jaya</h3>
                <p className="text-sm text-gray-400">Pekanbaru</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Toko bunga pot, boneka mainan, dan aksesoris terlengkap di
              Pekanbaru. Kami menyediakan berbagai pilihan produk berkualitas
              dengan harga terjangkau.
            </p>

            {/* Social Media */}
            <div className="flex space-x-3 pt-2">
              {socialMedia.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 bg-gray-700 rounded-lg transition-colors ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2">
              {footerLinks.navigasi.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all mr-0 group-hover:mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Category Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Kategori Produk</h4>
            <ul className="space-y-2">
              {footerLinks.kategori.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all mr-0 group-hover:mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4">Hubungi Kami</h4>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                const content = (
                  <>
                    <Icon className="w-5 h-5 flex-shrink-0 text-primary-400" />
                    <span className="text-sm text-gray-300">{info.text}</span>
                  </>
                );

                return (
                  <li key={index} className="flex items-start space-x-3">
                    {info.href ? (
                      <a
                        href={info.href}
                        className="flex items-start space-x-3 hover:text-primary-400 transition-colors"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-start space-x-3">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} Toko Asmara Jaya. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link
                href="/kebijakan-privasi"
                className="hover:text-primary-400 transition-colors"
              >
                Kebijakan Privasi
              </Link>
              <Link
                href="/syarat-ketentuan"
                className="hover:text-primary-400 transition-colors"
              >
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />
    </footer>
  );
}
