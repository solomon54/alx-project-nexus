//src/components/home/HomeSection.tsx
"use client";

import { useState, useMemo } from "react";
import AppHeader from "@/components/navigation/AppHeader";
import HeroSection from "./HeroSection";
import MovieRow from "./MovieRow";
import FloatingMoodButton from "./FloatingMoodButton";

import { useDiscoverMovies } from "@/features/movie-discovery/hooks/useMovies";
import { useMovieSearch } from "@/features/movie-discovery/hooks/useMovieSearch";

import { DiscoveryMood } from "@/features/memory/memory.types";
import { decideMovie } from "@/features/movie-discovery/logic/movieDecision.logic";
import { memoryStore } from "@/features/memory/memory.store";
import { useAuth } from "@/contexts/AuthContext";

const FEATURED_HERO_BACKDROPS = [
  "/zGoZB4CboMzY1z4G3nU6BWnMDB2.jpg",
  "/oD3Eey4e4Z259XLm3eD3WGcoJAh.jpg",
  "/klvZs66SG19qmacdwxSRkdFQhQS.jpg",
  "/cWsBscZzwu5brg9YjNkGewRUvJX.jpg",
];

export default function HomeSection() {
  const { user, isGuest } = useAuth();
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
  } = useDiscoverMovies(activeMood as any);

  const { data: searchResults } = useMovieSearch(query);

  const processedMovies = useMemo(() => {
    const rawRowMovies = (query ? searchResults : discoverData?.results) ?? [];

    return rawRowMovies.map((movie) =>
      decideMovie({
        ...movie,
        is_watchlisted: memoryStore.isWatchlisted(movie.id),
        is_dismissed: memoryStore.isDismissed(movie.id),
      })
    );
  }, [query, searchResults, discoverData, version]);

  const visibleRowMovies = processedMovies.filter(
    (m) => m.decision !== "dismissed"
  );
  const heroMovies = useMemo(() => {
    const allMovies = defaultDiscoverData?.results ?? [];

    const matched = allMovies.filter((m) => {
      const path = m.backdrop_path || m.poster_path;
      return path ? FEATURED_HERO_BACKDROPS.includes(path) : false;
    });

    if (matched.length > 0) return matched;
    return allMovies.filter((m) => !memoryStore.isDismissed(m.id)).slice(0, 4);
  }, [defaultDiscoverData]);

  // Expanded content for the rows
  const hiddenGems = useMemo(() => {
    return visibleRowMovies.filter(
      (m) => m.isHiddenGem || m.vote_average > 7.2
    );
  }, [visibleRowMovies]);

  const continueWatching = visibleRowMovies;
  const vibeMovies = visibleRowMovies;

  const handleDismiss = async (id: number) => {
    await memoryStore.dismissMovie(id, user?.id);
    setVersion((v) => v + 1);
  };

  const handleWatchlistToggle = async (id: number) => {
    if (memoryStore.isWatchlisted(id)) {
      await memoryStore.removeFromWatchlist(id, user?.id);
    } else {
      await memoryStore.addToWatchlist(id, user?.id);
    }
    setVersion((v) => v + 1);
  };

  const handleMoodChange = async (mood: any) => {
    const selectedMood = mood as DiscoveryMood;
    setActiveMood(selectedMood);
    await memoryStore.setMood(selectedMood, user?.id);
  };

  return (
    <main className="min-h-screen bg-cinema-black text-white relative">
      <AppHeader
        query={query}
        setQuery={setQuery}
        user={user}
        isGuest={isGuest}
        variant="home"
      />

      <HeroSection
        movies={heroMovies}
        isLoading={isHeroLoading || isHeroFetching}
      />

      <div className="pb-24">
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
      </div>

      <FloatingMoodButton onMoodSelect={handleMoodChange} />
    </main>
  );
}
