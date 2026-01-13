"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  const whatsappNumber = "628123456789";
  const defaultMessage = "Halo, saya tertarik dengan produk di Toko Asmara Jaya!";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      defaultMessage
    )}`;
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* WhatsApp Button - Simple & Elegant */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsAppClick}
            className="group relative overflow-hidden"
          >
            {/* Subtle pulse effect */}
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-green-400"
            />
            
            {/* Button with Asmara theme */}
            <div className="relative bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center">
              <MessageCircle className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
