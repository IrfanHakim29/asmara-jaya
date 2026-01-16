import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Toko Asmara Jaya - Bunga Pot, Boneka & Aksesoris Pekanbaru",
  description:
    "Toko bunga pot, boneka mainan, dan aksesoris terlengkap di Pekanbaru dengan harga terjangkau. Pengiriman cepat dan aman.",
  keywords: [
    "toko bunga pekanbaru",
    "bunga pot pekanbaru",
    "boneka mainan pekanbaru",
    "aksesoris pekanbaru",
    "toko asmara jaya",
    "hadiah pekanbaru",
  ],
  authors: [{ name: "Toko Asmara Jaya" }],
  creator: "Toko Asmara Jaya",
  publisher: "Toko Asmara Jaya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://asmarajaya.com"), // Ganti dengan domain aktual
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://asmarajaya.com",
    title: "Toko Asmara Jaya - Bunga Pot, Boneka & Aksesoris Pekanbaru",
    description:
      "Toko bunga pot, boneka mainan, dan aksesoris terlengkap di Pekanbaru dengan harga terjangkau.",
    siteName: "Toko Asmara Jaya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toko Asmara Jaya - Bunga Pot, Boneka & Aksesoris Pekanbaru",
    description:
      "Toko bunga pot, boneka mainan, dan aksesoris terlengkap di Pekanbaru dengan harga terjangkau.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <Footer />
          <FloatingWhatsApp />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
