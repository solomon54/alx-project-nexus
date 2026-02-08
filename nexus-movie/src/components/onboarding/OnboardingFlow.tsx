// src/components/onboarding/OnboardingFlow.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { DiscoveryMood } from "@/features/memory/memory.types";
import { Button } from "@/components/ui/Button";
import { ChevronRight, ChevronLeft, Sparkles, X } from "lucide-react";
import { memoryStore } from "@/features/memory/memory.store";

const ONBOARDING_KEY = "hasCompletedOnboarding";

interface OnboardingFlowProps {
  onComplete?: () => void;
}

const MOODS: Array<{ label: string; value: DiscoveryMood; icon: string }> = [
  { label: "Chill & Relaxed", value: "chill", icon: "☕" },
  { label: "Heart-Pumping", value: "intense", icon: "🔥" },
  { label: "Mind-Bending", value: "mind_bending", icon: "🌀" },
  { label: "Deeply Emotional", value: "emotional", icon: "🎭" },
  { label: "Dark & Gritty", value: "gritty", icon: "💀" },
];

const GENRES = ["Sci-Fi", "Noir", "Indie", "Action", "Horror", "Documentary"];

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [hasMounted, setHasMounted] = useState(false);
  const [selections, setSelections] = useState<{
    mood?: DiscoveryMood;
    genres: string[];
  }>({ genres: [] });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const finish = useCallback(() => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    if (onComplete) {
      onComplete();
    } else {
      router.replace("/search");
    }
  }, [onComplete, router]);

  const handleComplete = useCallback(async () => {
    try {
      if (selections.mood) await memoryStore.setMood(selections.mood);
      if (selections.genres.length > 0)
        await memoryStore.setGenres?.(selections.genres);
      finish();
    } catch (err) {
      console.error("Onboarding Save Failed:", err);
      finish(); // Finish anyway so the user isn't stuck
    }
  }, [selections, finish]);

  const toggleGenre = (genre: string) => {
    setSelections((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  if (!hasMounted) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-zinc-950/95 backdrop-blur-md text-white flex flex-col items-center justify-center p-6">
      {/* Skip Button */}
      <button
        onClick={finish}
        className="absolute top-8 right-8 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium">
        Skip <X size={16} />
      </button>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-md w-full text-center">
            <Sparkles className="mx-auto mb-6 text-cyan-400" size={40} />
            <h1 className="text-4xl font-bold mb-2 font-bebas tracking-wider italic">
              PICK A VIBE
            </h1>
            <p className="text-zinc-400 mb-8 text-sm">
              We&apos;ll tune the Nexus to your current energy.
            </p>

            <div className="grid grid-cols-1 gap-3">
              {MOODS.map((m) => (
                <button
                  key={m.value}
                  onClick={() => {
                    setSelections((prev) => ({ ...prev, mood: m.value }));
                    setStep(2);
                  }}
                  className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all shadow-xl">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {m.icon}
                    </span>
                    <span className="font-semibold text-zinc-200">
                      {m.label}
                    </span>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-zinc-600 group-hover:text-cyan-400 transition-colors"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl w-full text-center">
            <h1 className="text-4xl font-bold mb-8 font-bebas tracking-wider italic">
              FAVORITE GENRES
            </h1>
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {GENRES.map((genre) => {
                const isSelected = selections.genres.includes(genre);
                return (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`px-6 py-2.5 rounded-xl border transition-all duration-300 text-sm font-bold ${
                      isSelected
                        ? "bg-cyan-500 text-black border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                        : "border-white/10 text-zinc-400 hover:border-white/30 bg-white/5"
                    }`}>
                    {genre}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-center items-center gap-4 max-w-sm mx-auto">
              <Button
                variant="outline"
                className="flex-1 border-white/10 text-zinc-400 hover:bg-white/5"
                onClick={() => setStep(1)}>
                <ChevronLeft size={18} />
              </Button>

              <Button
                onClick={handleComplete}
                className="flex-[3] bg-cyan-500 text-black font-bold hover:bg-cyan-400 shadow-lg shadow-cyan-500/20">
                Enter the Nexus
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
