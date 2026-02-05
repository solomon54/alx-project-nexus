//src/features/movie-discovery/hooks/useMovieSearch.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { mockMovies } from "@/lib/mockdata";
import { searchMovies } from "../logic/search.logic";
import { Movie } from "@/types/movie";

export const useMovieSearch = (query: string) => {
  return useQuery<Movie[]>({
    queryKey: ["movie-search", query],

    queryFn: async (): Promise<Movie[]> => {
      await new Promise((r) => setTimeout(r, 300));
      return searchMovies(mockMovies, query);
    },

    enabled: query.length > 0,
    placeholderData: () => mockMovies,
    staleTime: 1000 * 60 * 5,
  });
};
