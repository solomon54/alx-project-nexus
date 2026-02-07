//src/features/user/userProfile.ts
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export const useProfile = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Updates Profile metadata (Username, Bio, Avatar)
   */
  const updateProfile = async (
    data: { username: string; bio: string },
    imageFile: File | null
  ) => {
    if (!user) return { success: false, error: "No authenticated user" };

    setLoading(true);
    setError(null);

    try {
      let avatarUrl = user.user_metadata?.avatar_url;

      if (imageFile) {
        // Use user.id as the folder and 'avatar' as filename for automatic overwriting
        // This prevents storage bloat from old profile pictures
        const fileExt = imageFile.name.split(".").pop();
        const path = `${user.id}/avatar-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(path, imageFile, {
            upsert: true,
            cacheControl: "3600",
          });

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(path);
        avatarUrl = publicUrl;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          display_name: data.username,
          bio: data.bio,
          avatar_url: avatarUrl,
        },
      });

      if (updateError) throw updateError;

      router.refresh();
      return { success: true };
    } catch (err: any) {
      const msg = err.message || "Failed to update profile";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * INTERNAL Password Change (No email link required)
   */
  const changePasswordInternal = async (newPassword: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      const msg = err.message || "Failed to update password";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * LEGACY: Sends a password reset email if preferred
   */
  const sendPasswordReset = async () => {
    if (!user?.email) return;
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      setError(err.message);
      return { success: false };
    }
  };

  return {
    updateProfile,
    changePasswordInternal,
    sendPasswordReset,
    loading,
    error,
  };
};
