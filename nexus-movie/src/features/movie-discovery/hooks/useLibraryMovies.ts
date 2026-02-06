// src/features/movie-discovery/hooks/useLibraryMovies.ts
"use client";

import { useMemo } from "react";
import { mockMovies } from "@/lib/mockdata";
import { memoryStore } from "@/features/memory/memory.store";
import { Movie } from "@/types/movie";

export function useLibraryMovies(
  activeTab: "watchlist" | "hidden",
  version: number
): Movie[] {
  return useMemo(() => {
    const { watchlist, dismissed } = memoryStore.getState();
    const targetIds =
      activeTab === "watchlist" ? Array.from(watchlist) : Array.from(dismissed);

    return targetIds
      .map((id) => mockMovies.find((m) => m.id === id))
      .filter((m): m is Movie => !!m);
  }, [activeTab, version]);
}
