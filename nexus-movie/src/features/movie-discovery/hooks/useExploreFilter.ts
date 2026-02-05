// src/features/movie-discovery/hooks/useExploreFilters.ts
"use client";

import { useState } from "react";
import { DiscoveryMood } from "../movie-discovery.types";

export type ExploreFilters = {
  mood?: DiscoveryMood;
  genres: string[];
  decade?: number;
};

export function useExploreFilters() {
  const [filters, setFilters] = useState<ExploreFilters>({
    genres: [],
  });

  const toggleGenre = (genre: string) => {
    setFilters((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const setMood = (mood?: DiscoveryMood) => {
    setFilters((prev) => ({ ...prev, mood }));
  };

  const setDecade = (decade?: number) => {
    setFilters((prev) => ({ ...prev, decade }));
  };

  const reset = () => {
    setFilters({ genres: [] });
  };

  return {
    filters,
    setMood,
    toggleGenre,
    setDecade,
    reset,
  };
}
