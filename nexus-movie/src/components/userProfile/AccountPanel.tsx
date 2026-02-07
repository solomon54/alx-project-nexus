//src/components/userProfile/AccountPanel.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Lock,
  Trash2,
  ShieldCheck,
  Loader2,
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useProfile } from "@/features/user/userProfile";
import { cn } from "@/utils/classNames";

interface AccountPanelProps {
  email?: string;

  onPasswordReset?: () => Promise<{ success: boolean } | undefined | void>;
  isProcessing?: boolean;
}

export default function AccountPanel({
  email = "user@example.com",
  onPasswordReset,
  isProcessing,
}: AccountPanelProps) {
  const { changePasswordInternal, loading, error } = useProfile();

  // UI States
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInternalUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) return;

    const result = await changePasswordInternal(newPassword);
    if (result?.success) {
      setIsSuccess(true);
      setNewPassword("");
      setShowPassword(false);
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

      {/* 2. Security Section */}
      <section className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
          Security
        </label>

        <div
          className={cn(
            "bg-zinc-900/40 border border-white/5 rounded-[2rem] transition-all duration-500 overflow-hidden",
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
                    Directly update your security
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
                  onClick={() => {
                    setIsChanging(false);
                    setNewPassword("");
                  }}
                  className="text-[10px] font-black uppercase text-zinc-500 hover:text-white transition-colors">
                  Cancel
                </button>
              </div>

              <div className="relative group">
                <input
                  autoFocus
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white outline-none focus:border-electric-cyan/50 focus:ring-1 focus:ring-electric-cyan/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Password Strength */}
              <div className="flex gap-1 px-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-all duration-500",
                      newPassword.length >= i * 2
                        ? "bg-electric-cyan"
                        : "bg-zinc-800"
                    )}
                  />
                ))}
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-[10px] font-bold uppercase tracking-wider">
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || newPassword.length < 6}
                className={cn(
                  "w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all",
                  isSuccess
                    ? "bg-green-500 text-white"
                    : "bg-electric-cyan text-black"
                )}>
                {loading ? (
                  <Loader2 className="animate-spin mx-auto" size={16} />
                ) : isSuccess ? (
                  "Password Updated"
                ) : (
                  "Update Now"
                )}
              </Button>

              <button
                type="button"
                onClick={onPasswordReset}
                disabled={isProcessing}
                className="w-full text-center text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:text-zinc-400 pt-2 transition-colors disabled:opacity-50">
                {isProcessing
                  ? "Sending..."
                  : "Lost access? Send reset email instead"}
              </button>
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
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Deleting your account is permanent. All lists and progress will be{" "}
              <span className="text-red-500 font-bold italic">
                permanently purged
              </span>
              .
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-white/5 text-white hover:bg-white/10 rounded-xl py-3 text-[10px] font-black uppercase transition-colors">
                Cancel
              </button>
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 text-[10px] font-black uppercase">
                Wipe Account
              </button>
            </div>
          </motion.div>
        )}
      </section>
    </motion.div>
  );
}
