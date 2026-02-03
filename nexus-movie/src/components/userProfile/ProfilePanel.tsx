"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { User, Camera, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/classNames";

interface ProfileFormData {
  username: string;
  bio: string;
}

interface ProfilePanelProps {
  initialData?: Partial<ProfileFormData>;
  onSubmit?: (data: ProfileFormData, imageFile: File | null) => void;
  isSubmitting?: boolean;
  error?: string | null;
}

export default function ProfilePanel({
  initialData = { username: "", bio: "" },
  onSubmit,
  isSubmitting = false,
  error = null,
}: ProfilePanelProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
    username: initialData.username || "",
    bio: initialData.bio || "",
  });

  // Image Preview Logic
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create local URL for immediate UI feedback
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData, selectedFile);
  };

  const getInputClasses = (field: keyof ProfileFormData) =>
    cn(
      "w-full bg-zinc-800/40 border border-white/20 rounded-xl px-4 py-3 text-white text-sm md:text-base",
      "placeholder:text-zinc-500 transition-all duration-200",
      "focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/20",
      "disabled:opacity-60",
      touched[field] && !formData[field] && "border-red-500/50"
    );

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-6 md:space-y-8"
      noValidate>
      {/* Avatar Section  */}
      <section className="flex flex-col items-center gap-4 py-4 md:pb-8 border-b border-white/10">
        <div className="relative group">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            title="Upload profile picture"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-zinc-800 border-2 border-electric-cyan/50 relative shadow-xl",
              "hover:border-electric-cyan transition-all active:scale-95"
            )}>
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User size={40} className="text-zinc-500" />
              </div>
            )}

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
              <Camera size={20} className="text-white" />
            </div>
          </button>
        </div>

        <div className="text-center">
          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
            Profile Picture
          </h3>
          <p className="text-xs text-zinc-400 mt-1">Tap to change avatar</p>
        </div>
      </section>

      {/* Form Fields  */}
      <div className="space-y-5 md:space-y-6">
        <div className="space-y-1.5">
          <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-300 ml-1">
            Username
          </label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={() => setTouched({ ...touched, username: true })}
            placeholder="MovieBuff99"
            className={getInputClasses("username")}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-300 ml-1">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="I love hidden gems and 70s thrillers..."
            rows={3}
            className={cn(getInputClasses("bio"), "resize-none")}
          />
          <div className="flex justify-end text-[10px] text-zinc-500 pr-1">
            {formData.bio.length}/280
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl py-4 font-bold text-sm uppercase tracking-widest bg-white text-black hover:bg-electric-cyan hover:text-black transition-colors">
          {isSubmitting ? (
            <Loader2 className="animate-spin mx-auto" size={20} />
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </motion.form>
  );
}
