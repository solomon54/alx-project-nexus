"use client";

import React, { useState } from "react";
import { Sparkles, X, Flame, Coffee, Ghost, Zap, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/classNames";

const moods = [
  { id: "gritty", label: "Gritty", icon: Zap, color: "hover:bg-orange-500" },
  { id: "epic", label: "Epic", icon: Flame, color: "hover:bg-red-500" },
  {
    id: "chill",
    label: "Feel-Good",
    icon: Coffee,
    color: "hover:bg-green-500",
  },
  { id: "spooky", label: "Horror", icon: Ghost, color: "hover:bg-purple-500" },
  { id: "romance", label: "Romantic", icon: Heart, color: "hover:bg-pink-500" },
];

const FloatingMoodButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-6 z-50 sm:bottom-10 sm:right-10 flex flex-col items-end">
      {/* Mood Selection Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 flex flex-col items-end gap-3">
            {moods.map((mood, index) => (
              <motion.button
                key={mood.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-900 border border-white/10 text-white shadow-xl transition-all",
                  mood.color,
                  "hover:text-black group"
                )}
                onClick={() => {
                  console.log(`Filtering by: ${mood.id}`);
                  setIsOpen(false);
                }}>
                <span className="text-sm font-medium">{mood.label}</span>
                <mood.icon
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open mood picker"
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 ease-in-out hover:scale-110 active:scale-95",
          isOpen ? "bg-zinc-800 text-white" : "bg-electric-cyan text-black"
        )}>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}>
          {isOpen ? <X size={24} /> : <Sparkles size={24} />}
        </motion.div>
      </button>
    </div>
  );
};

export default FloatingMoodButton;
