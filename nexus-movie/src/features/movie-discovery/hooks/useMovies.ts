// src/features/movie-discovery/hooks/useMovies.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { mockMovies } from "@/lib/mockdata";
import { calculateMoodMatch } from "../logic/moodFilter.logic";
import { calculateHiddenGemScore } from "../logic/hiddenGems.logic";
import { DiscoveryMood } from "../movie-discovery.types";

export const useDiscoverMovies = (mood?: DiscoveryMood) => {
  return useQuery({
    queryKey: ["discover", mood],

    queryFn: async () => {
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 800));

      let results = mockMovies;

      if (mood) {
        results = results
          .map((movie) => ({
            ...movie,
            moodScore: calculateMoodMatch(movie, mood).score,
          }))
          .filter((m) => (m as any).moodScore >= 40)
          .sort((a, b) => (b as any).moodScore - (a as any).moodScore);
      }

      // Add hidden gem flag
      results = results.map((movie) => ({
        ...movie,
        isHiddenGem: calculateHiddenGemScore(movie).isHiddenGem,
      }));

      return {
        results,
        page: 1,
        total_pages: 1,
        total_results: results.length,
      };
    },

    // ────────────────────────────────────────
    //  v5 replacement for keepPreviousData: true
    // ────────────────────────────────────────
    placeholderData: (previousData) => previousData,

    // Good defaults for your use-case
    staleTime: 1000 * 60 * 10, // 10 minutes – data stays fresh
    gcTime: 1000 * 60 * 30, // 30 minutes before garbage collection
    refetchOnWindowFocus: false, // usually better UX in movie apps
  });
};
