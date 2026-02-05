// src/features/movie-discovery/hooks/useMovieDetails.ts
"use client";

import { useMemo } from "react";
import { Movie } from "@/types/movie";
import { decideMovie } from "../logic/movieDecision.logic";
import { memoryStore } from "@/features/memory/memory.store";

export function useMovieDetails(movie: Movie) {
  const enrichedMovie = useMemo(() => {
    return {
      ...movie,
      is_watchlisted: memoryStore.isWatchlisted(movie.id),
      is_dismissed: memoryStore.isDismissed(movie.id),
    };
  }, [movie]);

  const decision = useMemo(() => decideMovie(enrichedMovie), [enrichedMovie]);

  return {
    movie: enrichedMovie,
    decision,
  };
}
