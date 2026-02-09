// src/components/explore/FloatingFilterButton.tsx
"use client";

import { SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

interface FloatingFilterButtonProps {
  onClick: () => void;
  activeCount: number;
}

export default function FloatingFilterButton({
  onClick,
  activeCount,
}: FloatingFilterButtonProps) {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-20 right-6 z-50 md:hidden"
      aria-label="Open filters">
      <div className="relative">
        <div className="bg-netflix-red text-white p-4 rounded-full shadow-2xl flex items-center justify-center">
          <SlidersHorizontal size={24} />
        </div>

        {activeCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-electric-cyan text-cinema-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
            {activeCount}
          </span>
        )}
      </div>
    </motion.button>
  );
}
