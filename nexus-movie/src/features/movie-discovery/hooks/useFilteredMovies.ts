// src/features/movie-discovery/hooks/useFilteredMovies.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { mockMovies } from "@/lib/mockdata";
import { Movie } from "@/types/movie";
import { calculateMoodMatch } from "../logic/moodFilter.logic";
import { calculateHiddenGemScore } from "../logic/hiddenGems.logic";
import { searchMovies } from "../logic/search.logic";
import { DiscoveryMood } from "../movie-discovery.types";

type FilterOptions = {
  mood?: DiscoveryMood;
  searchQuery?: string;
  genres?: string[];
  decade?: number;
  sortBy?: "match" | "release" | "popularity";
};

export const useFilteredMovies = (options: FilterOptions = {}) => {
  const { mood, searchQuery, genres = [], decade, sortBy = "match" } = options;

  return useQuery({
    queryKey: ["filteredMovies", mood, searchQuery, genres, decade, sortBy],

    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 700));

      let results = [...mockMovies];

      // 1. Mood
      if (mood) {
        results = results
          .map((movie) => ({
            ...movie,
            moodScore: calculateMoodMatch(movie, mood).score,
          }))
          .filter((m) => m.moodScore > 0)
          .sort((a, b) => b.moodScore - a.moodScore);
      }

      // 2. Search
      if (searchQuery?.trim()) {
        results = searchMovies(results, searchQuery);
      }

      // 3. Genres
      if (genres.length) {
        results = results.filter((movie) =>
          movie.genres?.some((genre) => genres.includes(genre.name))
        );
      }

      // 4. Decade
      if (typeof decade === "number") {
        results = results.filter((movie) => {
          const year = Number(movie.release_date?.slice(0, 4));
          return !isNaN(year) && year >= decade && year < decade + 10;
        });
      }

      // 5. Sorting
      if (sortBy === "release") {
        results.sort(
          (a, b) =>
            Number(b.release_date?.slice(0, 4)) -
            Number(a.release_date?.slice(0, 4))
        );
      }

      if (sortBy === "popularity") {
        results.sort((a, b) => b.popularity - a.popularity);
      }

      // 6. Hidden gem flag
      results = results.map((movie) => ({
        ...movie,
        isHiddenGem: calculateHiddenGemScore(movie).isHiddenGem,
      }));

      return {
        results,
        total: results.length,
      };
    },

    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
