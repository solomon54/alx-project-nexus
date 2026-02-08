// src/features/movie-discovery/hooks/useMovieSearch.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { Movie } from "@/types/movie";
import { useDebounce } from "@/utils/debounce";

export const useMovieSearch = (query: string) => {
  const debouncedQuery = useDebounce(query, 500);

  return useQuery<Movie[]>({
    queryKey: ["movie-search", debouncedQuery],
    queryFn: async (): Promise<Movie[]> => {
      if (!debouncedQuery) return [];

      const res = await fetch(
        `/api/movies/search?query=${encodeURIComponent(debouncedQuery)}`
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    enabled: debouncedQuery.length > 2,
    staleTime: 1000 * 60 * 10,
  });
};
