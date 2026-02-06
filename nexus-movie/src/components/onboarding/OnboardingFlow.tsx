// src/components/onboarding/OnboardingFlow.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { DiscoveryMood } from "@/features/movie-discovery/movie-discovery.types";
import { Button } from "@/components/ui/Button";
import { ChevronRight, ChevronLeft, Sparkles, Film } from "lucide-react";
import { memoryStore } from "@/features/memory/memory.store";

const ONBOARDING_KEY = "hasCompletedOnboarding";

const MOODS: { label: string; value: DiscoveryMood; icon: string }[] = [
  { label: "Chill & Relaxed", value: "chill", icon: "☕" },
  { label: "Heart-Pumping", value: "intense", icon: "🔥" },
  { label: "Mind-Bending", value: "mind_bending", icon: "🌀" },
  { label: "Deeply Emotional", value: "emotional", icon: "🎭" },
  { label: "Dark & Gritty", value: "gritty", icon: "🌃" },
];

const GENRES = ["Sci-Fi", "Noir", "Indie", "Action", "Horror", "Documentary"];

export default function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<{
    mood?: DiscoveryMood;
    genres: string[];
  }>({ genres: [] });
  const [hasMounted, setHasMounted] = useState(false);

  // Guest / onboarding redirect logic
  useEffect(() => {
    setHasMounted(true);

    const isOnboarded =
      typeof window !== "undefined"
        ? localStorage.getItem(ONBOARDING_KEY) === "true"
        : false;

    const isGuest = true;
    if (!isGuest || isOnboarded) {
      router.replace("/");
    }
  }, [router]);

  const handleComplete = () => {
    try {
      if (!selections.mood) {
        alert("Please select a mood first!");
        return;
      }

      // Save to memoryStore
      memoryStore.setMood?.(selections.mood);
      memoryStore.setGenres?.(selections.genres);

      localStorage.setItem(ONBOARDING_KEY, "true");

      router.push("/");
    } catch (err) {
      console.error("Failed to save onboarding data", err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!hasMounted) return null;

  return (
    <div className="min-h-screen bg-cinema-black text-white flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md w-full text-center">
            <Sparkles className="mx-auto mb-6 text-electric-cyan" size={48} />
            <h1 className="text-3xl font-bold mb-2">
              What&apos;s the vibe today?
            </h1>
            <p className="text-zinc-400 mb-8">
              We'll tailor your feed based on your current mood.
            </p>

            <div className="grid grid-cols-1 gap-3">
              {MOODS.map((m) => (
                <button
                  key={m.value}
                  onClick={() => {
                    setSelections({ ...selections, mood: m.value });
                    setStep(2);
                  }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-electric-cyan hover:bg-zinc-800 transition-all text-left">
                  <span className="text-2xl">{m.icon}</span>
                  <span className="font-medium">{m.label}</span>
                </button>
              ))}
            </div>

            <Button
              variant="ghost"
              className="mt-6"
              onClick={() => router.replace("/")}>
              Skip Onboarding
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-2xl w-full text-center">
            <h1 className="text-3xl font-bold mb-8">Favorite Genres?</h1>
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {GENRES.map((genre) => (
                <button
                  key={genre}
                  onClick={() => {
                    const next = selections.genres.includes(genre)
                      ? selections.genres.filter((g) => g !== genre)
                      : [...selections.genres, genre];
                    setSelections({ ...selections, genres: next });
                  }}
                  className={`px-6 py-3 rounded-full border transition-all ${
                    selections.genres.includes(genre)
                      ? "bg-electric-cyan text-black border-electric-cyan"
                      : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
                  }`}>
                  {genre}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center max-w-md mx-auto">
              <Button
                variant="secondary"
                className="flex items-center gap-2 px-6 py-2"
                onClick={() => setStep(1)}>
                <ChevronLeft size={20} /> Back
              </Button>

              <Button
                variant="primary"
                className="flex items-center gap-2 px-6 py-2"
                onClick={handleComplete}>
                Finish Setup <ChevronRight size={20} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
