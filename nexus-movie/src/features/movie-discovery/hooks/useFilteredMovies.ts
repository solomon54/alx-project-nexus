//src/features/movie-discovery/hooks/useFilteredMovies.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { Movie } from "@/types/movie";
import { calculateMoodMatch } from "../logic/moodFilter.logic";
import { calculateHiddenGemScore } from "../logic/hiddenGems.logic";
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
      const endpoint = searchQuery?.trim()
        ? `/api/movies/search?query=${encodeURIComponent(searchQuery)}`
        : `/api`;

      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      let results: Movie[] = Array.isArray(data) ? data : data.results || [];

      //  Apply Custom Mood Logic
      if (mood) {
        results = results
          .map((movie) => ({
            ...movie,
            moodScore: calculateMoodMatch(movie, mood).score,
          }))
          .filter((m) => m.moodScore > 0)
          .sort((a, b) => b.moodScore - a.moodScore);
      }

      //  Apply Genre Filtering
      if (genres.length) {
        results = results.filter(
          (movie) =>
            movie.genres?.some((genre) => genres.includes(genre.name)) ||
            movie.genre_ids?.some((id) => genres.includes(id.toString()))
        );
      }

      // 4. Decade / Year Range
      if (typeof decade === "number") {
        results = results.filter((movie) => {
          const year = Number(movie.release_date?.slice(0, 4));
          if (isNaN(year)) return false;
          return year >= decade && year <= decade + 9;
        });
      }

      //  Apply Hidden Gem Logic
      results = results.map((movie) => ({
        ...movie,
        isHiddenGem: calculateHiddenGemScore(movie).isHiddenGem,
      }));

      //  Final Sorting (if not already sorted by mood)
      if (!mood) {
        if (sortBy === "release") {
          results.sort((a, b) =>
            (b.release_date || "").localeCompare(a.release_date || "")
          );
        } else if (sortBy === "popularity") {
          results.sort((a, b) => b.popularity - a.popularity);
        }
      }

      return { results, total: results.length };
    },
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });
};
