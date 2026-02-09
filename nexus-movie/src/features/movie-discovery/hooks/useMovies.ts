// src/features/movie-discovery/hooks/useMovies.ts
"use client";

import { useQuery } from "@tanstack/react-query";
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
      // 1. Fetch from our OWN internal API route
      const res = await fetch("/api");
      if (!res.ok) throw new Error("Network response was not ok");

      const rawMovies: Movie[] = await res.json();

      let results: DiscoverMovie[] = rawMovies.map((movie) => ({
        ...movie,
      }));

      // 2. Apply  existing Mood logic
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

      // 3. Apply Hidden Gem logic
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
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
