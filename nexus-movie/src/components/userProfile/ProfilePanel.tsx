//src/components/userProfile/ProfilePanel.tsx
"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { User, Camera, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/classNames";

interface ProfileFormData {
  username: string;
  bio: string;
}

interface ProfilePanelProps {
  initialData?: Partial<ProfileFormData> & { avatar_url?: string };
  onSubmit?: (data: ProfileFormData, imageFile: File | null) => Promise<any>;
  isSubmitting?: boolean;
  error?: string | null;
}

export default function ProfilePanel({
  initialData,
  onSubmit,
  isSubmitting = false,
  error = null,
}: ProfilePanelProps) {
  // --- STATE INITIALIZATION ---
  const [formData, setFormData] = useState<ProfileFormData>({
    username: initialData?.username || "",
    bio: initialData?.bio || "",
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.avatar_url || null
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        username: initialData.username || "",
        bio: initialData.bio || "",
      });
      if (initialData.avatar_url) setPreviewUrl(initialData.avatar_url);
    }
  }, [initialData?.username, initialData?.bio, initialData?.avatar_url]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) return alert("File too large. Max 2MB.");
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      const result = await onSubmit(formData, selectedFile);
      if (result === true || result?.success) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      }
    }
  };

  const inputClasses = cn(
    "w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-4 py-4 text-white text-sm transition-all outline-none",
    "focus:border-electric-cyan focus:ring-4 focus:ring-electric-cyan/10",
    "placeholder:text-zinc-600"
  );

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-8">
      {/* Avatar Section */}
      <div className="flex flex-col items-center space-y-4">
        <button
          type="button"
          aria-label="Upload profile picture"
          className="relative group w-32 h-32"
          onClick={() => fileInputRef.current?.click()}>
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10 group-hover:border-electric-cyan transition-all duration-300 bg-zinc-800 flex items-center justify-center relative">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Profile Preview"
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <User size={48} className="text-zinc-600" />
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <Camera size={28} className="text-white" />
            </div>
          </div>

          <div className="absolute -bottom-1 -right-1 bg-zinc-900 border border-white/30 p-2 rounded-full shadow-xl text-zinc-300 group-hover:text-electric-cyan transition-colors">
            <Camera size={14} />
          </div>
        </button>

        <input
          id="avatar-upload"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          aria-hidden="true"
        />
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
          Upload Identity
        </span>
      </div>

      <div className="space-y-6">
        {/* Display Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1 block">
            Display Name
          </label>
          <input
            id="username"
            type="text"
            required
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            placeholder="Username"
            className={inputClasses}
          />
        </div>

        {/* Bio Field */}
        <div className="space-y-2">
          <label
            htmlFor="bio"
            className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1 block">
            Bio
          </label>
          <div className="relative">
            <textarea
              id="bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value.slice(0, 160) })
              }
              placeholder="Tell us about your movie taste..."
              rows={4}
              className={cn(inputClasses, "resize-none")}
            />
            <div
              className={cn(
                "absolute bottom-4 right-4 text-[10px] font-mono font-bold",
                formData.bio.length >= 150 ? "text-orange-500" : "text-zinc-600"
              )}
              aria-live="polite">
              {formData.bio.length}/160
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-3 text-red-400 text-xs bg-red-400/5 p-4 rounded-2xl border border-red-400/10"
            role="alert">
            <AlertCircle size={16} />
            <span className="font-medium">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500",
          isSuccess
            ? "bg-green-500 text-white"
            : "bg-electric-cyan text-black hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_30px_rgba(0,255,242,0.2)]"
        )}>
        {isSubmitting ? (
          <Loader2 className="animate-spin" size={20} />
        ) : isSuccess ? (
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2">
            <CheckCircle2 size={18} /> Sync Complete
          </motion.div>
        ) : (
          "Update Profile"
        )}
      </Button>
    </motion.form>
  );
}
