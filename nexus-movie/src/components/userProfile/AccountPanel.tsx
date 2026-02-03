//src/components/userProfile/AccountPanel.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Lock,
  Trash2,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/classNames";

interface AccountPanelProps {
  email?: string;
  isProcessing?: boolean;
}

export default function AccountPanel({
  email = "user@example.com",
  isProcessing = false,
}: AccountPanelProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10">
      {/* 1. Account Identity */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Account Identity
          </h3>
          <div className="flex items-center gap-1 text-electric-cyan text-[10px] font-bold uppercase tracking-wider">
            <ShieldCheck size={12} />
            Verified
          </div>
        </div>

        <div className="group relative bg-zinc-800/40 border border-white/10 rounded-2xl p-4 transition-all hover:border-white/20">
          <p className="text-xs text-zinc-500 mb-1">Registered Email</p>
          <p className="text-white font-medium truncate">{email}</p>
        </div>
      </section>

      {/* 2. Security (Action-Oriented) */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-1">
          Security & Access
        </h3>
        <button
          className="w-full flex items-center justify-between bg-zinc-800/40 border border-white/10 rounded-2xl p-4 transition-all active:scale-[0.98] hover:bg-zinc-800/60"
          onClick={() => console.log("Open Password Reset Modal")}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-electric-cyan/10 flex items-center justify-center">
              <Lock size={18} className="text-electric-cyan" />
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-bold">Change Password</p>
              <p className="text-[11px] text-zinc-500">
                Update your login credentials
              </p>
            </div>
          </div>
          <AlertCircle size={16} className="text-zinc-600" />
        </button>
      </section>

      {/* 3. Danger Zone (High Visibility / Low Friction until tapped) */}
      <section className="pt-6 border-t border-white/5">
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full group flex items-center gap-3 text-red-500/80 hover:text-red-500 p-2 transition-colors">
            <Trash2 size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Delete Account
            </span>
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-red-500 mb-2">
              <AlertCircle size={18} />
              <h4 className="text-sm font-bold uppercase">Confirm Deletion</h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              This will wipe your library, watch history, and account settings.
              This action is **permanent**.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-xl py-3 border-white/10 text-xs text-white">
                Cancel
              </Button>
              <Button className="rounded-xl py-3 bg-red-600 hover:bg-red-700 text-xs font-bold uppercase">
                {isProcessing ? "Wiping..." : "Delete Me"}
              </Button>
            </div>
          </motion.div>
        )}
      </section>
    </motion.div>
  );
}
