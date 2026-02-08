// src/features/movie-discovery/hooks/useLibraryMovies.ts
"use client";

import { useState, useEffect } from "react";
import { memoryStore } from "@/features/memory/memory.store";
import { Movie } from "@/types/movie";

// Helper function to fetch movie details by ID
const fetchMovieDetail = async (id: number): Promise<Movie | null> => {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    );

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error(`Error fetching movie ${id}:`, error);
    return null;
  }
};

export function useLibraryMovies(
  activeTab: "watchlist" | "hidden",
  version: number
): Movie[] {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function loadRealData() {
      const { watchlist, dismissed } = memoryStore.getState();
      const targetIds =
        activeTab === "watchlist"
          ? Array.from(watchlist)
          : Array.from(dismissed);

      if (targetIds.length === 0) {
        setMovies([]);
        return;
      }

      // Fetch all movies in parallel
      const movieResults = await Promise.all(
        targetIds.map((id) => fetchMovieDetail(id))
      );
      setMovies(movieResults.filter((m): m is Movie => !!m));
    }

    loadRealData();
  }, [activeTab, version]);

  return movies;
}
