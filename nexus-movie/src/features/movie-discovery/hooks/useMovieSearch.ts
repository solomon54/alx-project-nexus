"use client";

import { useQuery } from "@tanstack/react-query";
import { mockMovies } from "@/lib/mockdata";
import { searchMovies } from "../logic/search.logic";

export const useMovieSearch = (query: string) => {
  return useQuery({
    queryKey: ["movie-search", query],

    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));

      return searchMovies(mockMovies, query);
    },

    enabled: query.length > 0, // ⛔ don’t fire on empty input
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
};
