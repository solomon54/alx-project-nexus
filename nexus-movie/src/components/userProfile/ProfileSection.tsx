"use client";

import { useState } from "react"; // Removed useEffect/supabase import since useAuth handles it
import { motion, AnimatePresence } from "framer-motion";
import ProfileTabs from "./ProfileTabs";
import ProfilePanel from "./ProfilePanel";
import AccountPanel from "./AccountPanel";
import PreferencesPanel from "./PreferencesPanel";
import { useProfile } from "@/features/user/userProfile";
import { useAuth } from "@/contexts/AuthContext"; // Import this!
import { cn } from "@/utils/classNames";

type SettingsTab = "profile" | "account" | "preferences";

export default function ProfileSection() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  // 1. Use your AuthContext to get the user (cleaner than local state)
  const { user } = useAuth();

  // 2. Call hook without passing 'user' (it gets it from context internally)
  // 3. Destructure 'sendPasswordReset' (matching your hook's name)
  const { updateProfile, sendPasswordReset, loading, error } = useProfile();

  // Prepare initial data
  const profileInitialData = {
    username: user?.user_metadata?.display_name || "",
    bio: user?.user_metadata?.bio || "",
    avatar_url: user?.user_metadata?.avatar_url || "",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 md:pt-16 pb-24">
      <header className="mb-8 md:mb-12 md:text-center">
        <h1 className="text-3xl md:text-6xl font-bebas tracking-wider uppercase text-white">
          Settings
        </h1>
        <p className="text-xs md:text-base text-zinc-500 mt-2">
          Manage your cinematic identity and preferences.
        </p>
      </header>

      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md md:static md:bg-transparent mb-8 md:mb-12">
        <div className="max-w-2xl mx-auto">
          <ProfileTabs active={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      <main className="max-w-2xl mx-auto w-full">
        <div
          className={cn(
            "transition-all duration-300",
            "bg-transparent md:bg-zinc-900/30 md:border md:border-white/10 md:rounded-[2.5rem] md:p-10 md:backdrop-blur-md"
          )}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}>
              {activeTab === "profile" && (
                <ProfilePanel
                  initialData={profileInitialData}
                  onSubmit={updateProfile}
                  isSubmitting={loading}
                  error={error}
                />
              )}

              {activeTab === "account" && (
                <AccountPanel
                  email={user?.email}
                  isProcessing={loading}
                  // 4. Corrected the prop name here
                  onPasswordReset={sendPasswordReset}
                />
              )}

              {activeTab === "preferences" && <PreferencesPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
