// src/features/movie-discovery/hooks/useMovies.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { mockMovies } from "@/lib/mockdata";
import { Movie } from "@/types/movie";
import { calculateMoodMatch } from "../logic/moodFilter.logic";
import { calculateHiddenGemScore } from "../logic/hiddenGems.logic";
import { DiscoveryMood } from "../movie-discovery.types";

type DiscoverMovie = Movie & {
  moodScore?: number;
};

export const useDiscoverMovies = (mood?: DiscoveryMood) => {
  return useQuery({
    queryKey: ["discover", mood],

    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 800));

      let results: DiscoverMovie[] = mockMovies.map((movie) => ({
        ...movie,
      }));

      if (mood) {
        results = results
          .map((movie) => {
            const { score } = calculateMoodMatch(movie, mood);
            return { ...movie, moodScore: score };
          })
          .filter(
            (movie) => movie.moodScore !== undefined && movie.moodScore >= 40
          )
          .sort((a, b) => (b.moodScore ?? 0) - (a.moodScore ?? 0));
      }

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

    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
