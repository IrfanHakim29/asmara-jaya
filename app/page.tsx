import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import FeaturedProductsSection from "@/components/sections/FeaturedProductsSection";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "Toko Asmara Jaya - Bunga Pot, Boneka, dan Aksesoris Pekanbaru",
  description:
    "Toko bunga pot, boneka mainan, dan aksesoris terlengkap di Pekanbaru. Produk berkualitas dengan harga terjangkau. Pengiriman cepat ke seluruh Pekanbaru.",
  keywords:
    "toko bunga pekanbaru, bunga pot, boneka mainan, aksesoris pekanbaru, hadiah pekanbaru, toko online pekanbaru",
  openGraph: {
    title: "Toko Asmara Jaya - Bunga Pot, Boneka, dan Aksesoris Pekanbaru",
    description:
      "Toko bunga pot, boneka mainan, dan aksesoris terlengkap di Pekanbaru.",
    type: "website",
    locale: "id_ID",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <CTASection />
    </main>
  );
}
