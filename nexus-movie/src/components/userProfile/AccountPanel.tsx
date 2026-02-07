"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Lock,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useProfile } from "@/features/user/userProfile";
import { cn } from "@/utils/classNames";

export default function AccountPanel({ email = "user@example.com" }) {
  const { changePasswordInternal, loading, error } = useProfile();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInternalUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) return;

    const result = await changePasswordInternal(newPassword);
    if (result.success) {
      setIsSuccess(true);
      setNewPassword("");
      setTimeout(() => {
        setIsSuccess(false);
        setIsChanging(false);
      }, 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8">
      {/* 1. Account Identity */}
      <section className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
          Account Identity
        </label>
        <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">
              Email Address
            </p>
            <p className="text-white font-medium">{email}</p>
          </div>
          <div className="flex items-center gap-2 bg-electric-cyan/10 px-3 py-1 rounded-full text-electric-cyan text-[10px] font-black uppercase tracking-tighter">
            <ShieldCheck size={12} /> Verified
          </div>
        </div>
      </section>

      {/* 2. Security Section (Internal Change) */}
      <section className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
          Security
        </label>

        <div
          className={cn(
            "bg-zinc-900/40 border border-white/5 rounded-[2rem] transition-all duration-300",
            isChanging ? "p-6 ring-1 ring-white/10" : "p-2"
          )}>
          {!isChanging ? (
            <button
              onClick={() => setIsChanging(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-[1.5rem] transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-electric-cyan transition-colors">
                  <Lock size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white">
                    Change Password
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    Update your account security internally
                  </p>
                </div>
              </div>
              <ChevronRight size={18} className="text-zinc-600" />
            </button>
          ) : (
            <form onSubmit={handleInternalUpdate} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-white">New Password</h4>
                <button
                  type="button"
                  onClick={() => setIsChanging(false)}
                  className="text-[10px] font-black uppercase text-zinc-500 hover:text-white">
                  Cancel
                </button>
              </div>

              <input
                autoFocus
                type="password"
                placeholder="Minimum 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-electric-cyan/50 transition-all"
              />

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-[10px] font-bold uppercase tracking-wider">
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || newPassword.length < 6}
                className={cn(
                  "w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px]",
                  isSuccess ? "bg-green-500" : "bg-electric-cyan text-black"
                )}>
                {loading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : isSuccess ? (
                  <div className="flex items-center gap-2 justify-center">
                    <CheckCircle2 size={16} /> Password Updated
                  </div>
                ) : (
                  "Update Now"
                )}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* 3. Danger Zone */}
      <section className="pt-8 border-t border-white/5">
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="group flex items-center gap-3 text-zinc-600 hover:text-red-500 transition-colors p-2">
            <Trash2 size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Delete Account
            </span>
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/5 border border-red-500/20 rounded-[2rem] p-6">
            <div className="flex items-center gap-2 text-red-500 mb-3">
              <AlertCircle size={18} />
              <h4 className="text-xs font-black uppercase tracking-widest">
                Final Warning
              </h4>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed mb-6">
              Deleting your account is permanent. All of your lists, reviews,
              and progress will be lost forever.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-white/5 text-white hover:bg-white/10 rounded-xl py-3 text-[10px] font-black uppercase">
                Back Down
              </Button>
              <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 text-[10px] font-black uppercase">
                Wipe Account
              </Button>
            </div>
          </motion.div>
        )}
      </section>
    </motion.div>
  );
}
