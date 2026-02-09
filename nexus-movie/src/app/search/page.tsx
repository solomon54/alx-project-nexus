//src/app/search/page.tsx
"use client";

import { useState, useEffect } from "react";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import { useMounted } from "@/features/movie-discovery/hooks/useMounted";
import ExploreSection from "@/components/explore/ExploreSection";

export default function SearchPage() {
  const mounted = useMounted();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (mounted) {
      const isOnboarded =
        localStorage.getItem("hasCompletedOnboarding") === "true";
      if (!isOnboarded) {
        setShowOnboarding(true);
      }
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen">
      <ExploreSection />
      {showOnboarding && (
        <OnboardingFlow onComplete={() => setShowOnboarding(false)} />
      )}

      <div
        className={
          showOnboarding
            ? "blur-md pointer-events-none transition-all duration-500"
            : "transition-all duration-500"
        }>
        <h1 className="p-8 text-3xl font-bebas tracking-tighter text-cyan-500">
          EXPLORE THE NEXUS
        </h1>
      </div>
    </div>
  );
}
