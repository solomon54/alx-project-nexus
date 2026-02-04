// src/components/home/HomeSection.tsx
"use client";

import { useState } from "react";
import HomeHeader from "./HomeHeader";
import HeroSection from "./HeroSection";
import MovieRow from "./MovieRow";
import FloatingMoodButton from "./FloatingMoodButton";

import { useDiscoverMovies } from "@/features/movie-discovery/hooks/useMovies";
import { useMovieSearch } from "@/features/movie-discovery/hooks/useMovieSearch";
import { DiscoveryMood } from "@/features/movie-discovery/movie-discovery.types";

export default function HomeSection() {
  const [activeMood, setActiveMood] = useState<DiscoveryMood | undefined>();
  const [query, setQuery] = useState("");

  const dismissedIds: number[] = [];
  const isGuest = true;

  const {
    data: defaultDiscoverData,
    isLoading: isHeroLoading,
    isFetching: isHeroFetching,
  } = useDiscoverMovies();

  // Filtered discovery
  const {
    data: discoverData,
    isLoading: isRowsLoading,
    isFetching: isRowsFetching,
  } = useDiscoverMovies(activeMood);
  const { data: searchResults } = useMovieSearch(query);

  const rowMovies = (query ? searchResults : discoverData?.results) ?? [];
  const filteredRowMovies = rowMovies.filter(
    (m) => !dismissedIds.includes(m.id)
  );

  const heroMovies = (defaultDiscoverData?.results ?? []).slice(0, 3);

  // Row data derived from filtered row movies
  const hiddenGems = filteredRowMovies.filter((m) => m.isHiddenGem);
  const continueWatching = filteredRowMovies.slice(0, 5);
  const vibeMovies = filteredRowMovies.slice(2, 8);

  return (
    <main className="min-h-screen bg-cinema-black text-white relative">
      <HomeHeader query={query} setQuery={setQuery} />

      <HeroSection
        movies={heroMovies}
        isLoading={isHeroLoading || isHeroFetching}
      />

      <MovieRow
        title="Hidden Gems"
        movies={hiddenGems}
        isLoading={isRowsLoading || isRowsFetching}
      />

      <MovieRow
        title="Continue Watching"
        movies={continueWatching}
        isLoading={isRowsLoading || isRowsFetching}
      />

      <MovieRow
        title={activeMood ? `Vibe: ${activeMood}` : "Based on your Vibe"}
        movies={vibeMovies}
        isLoading={isRowsLoading || isRowsFetching}
      />

      <FloatingMoodButton onMoodSelect={setActiveMood} />
    </main>
  );
}
