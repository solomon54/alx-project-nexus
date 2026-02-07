// src/components/ui/AuthInput.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const AuthInput = ({ label, error, ...props }: AuthInputProps) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold ml-1">
      {label}
    </label>
    <input
      {...props}
      className={`bg-zinc-900/50 border ${
        error ? "border-red-500/50" : "border-white/10"
      } rounded-lg p-3.5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-netflix-red focus:ring-1 focus:ring-netflix-red transition-all`}
    />
    <div className="h-5 ml-1">
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-500 text-[11px] font-medium block">
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  </div>
);
