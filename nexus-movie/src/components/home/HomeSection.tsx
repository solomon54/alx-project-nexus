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
import { decideMovie } from "@/features/movie-discovery/logic/movieDecision.logic";
import { memoryStore } from "@/features/memory/memory.store";

export default function HomeSection() {
  const [activeMood, setActiveMood] = useState<DiscoveryMood | undefined>();
  const [query, setQuery] = useState("");

  const [version, setVersion] = useState(0);

  const {
    data: defaultDiscoverData,
    isLoading: isHeroLoading,
    isFetching: isHeroFetching,
  } = useDiscoverMovies();

  const {
    data: discoverData,
    isLoading: isRowsLoading,
    isFetching: isRowsFetching,
  } = useDiscoverMovies(activeMood);

  const { data: searchResults } = useMovieSearch(query);

  const rawRowMovies = (query ? searchResults : discoverData?.results) ?? [];

  const decidedRowMovies = rawRowMovies.map((movie) =>
    decideMovie({
      ...movie,
      is_watchlisted: memoryStore.isWatchlisted(movie.id),
      is_dismissed: memoryStore.isDismissed(movie.id),
    })
  );

  const visibleRowMovies = decidedRowMovies.filter(
    (m) => m.decision !== "dismissed"
  );

  const heroMovies = (defaultDiscoverData?.results ?? []).slice(0, 3);
  const hiddenGems = visibleRowMovies.filter((m) => m.isHiddenGem);
  const continueWatching = visibleRowMovies.slice(0, 5);
  const vibeMovies = visibleRowMovies.slice(2, 8);

  // Handlers
  const handleDismiss = (id: number) => {
    memoryStore.dismissMovie(id);
    setVersion((v) => v + 1);
  };

  const handleWatchlistToggle = (id: number) => {
    if (memoryStore.isWatchlisted(id)) {
      memoryStore.removeFromWatchlist(id);
    } else {
      memoryStore.addToWatchlist(id);
    }
    setVersion((v) => v + 1);
  };

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
        onDismiss={handleDismiss}
        onWatchlistToggle={handleWatchlistToggle}
      />

      <MovieRow
        title="Continue Watching"
        movies={continueWatching}
        isLoading={isRowsLoading || isRowsFetching}
        onDismiss={handleDismiss}
        onWatchlistToggle={handleWatchlistToggle}
      />

      <MovieRow
        title={activeMood ? `Vibe: ${activeMood}` : "Based on your Vibe"}
        movies={vibeMovies}
        isLoading={isRowsLoading || isRowsFetching}
        onDismiss={handleDismiss}
        onWatchlistToggle={handleWatchlistToggle}
      />

      <FloatingMoodButton onMoodSelect={setActiveMood} />
    </main>
  );
}
