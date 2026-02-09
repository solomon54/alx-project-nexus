// src/components/ui/Modal.tsx (basic version)
"use client";

import { X } from "lucide-react";
import { motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-lg bg-cinema-black rounded-t-3xl md:rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-surface-grey/50">
          {title && <h2 className="text-xl font-bebas">{title}</h2>}
          <button onClick={onClose} aria-label="Close modal">
            <X
              size={24}
              className="text-metadata-grey hover:text-white transition"
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6">{children}</div>
      </motion.div>
    </div>
  );
}
