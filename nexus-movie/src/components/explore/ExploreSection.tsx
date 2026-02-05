// src/components/explore/ExploreSection.tsx
"use client";

import { useState } from "react";
import { useFilteredMovies } from "@/features/movie-discovery/hooks/useFilteredMovies";
import SearchHeader from "./SearchHeader";
import FilterSidebar from "./FilterSidebar";
import ResultsGrid from "./ResultsGrid";
import FloatingFilterButton from "./FloatingFilterButton";
import Modal from "@/components/ui/Modal";
import MovieCardSkeleton from "@/components/ui/MovieCardSkeleton";
import { useExploreFilters } from "@/features/movie-discovery/hooks/useExploreFilter";

export default function ExploreSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"match" | "release" | "popularity">(
    "match"
  );
  const { filters, setMood, toggleGenre, setDecade, reset } =
    useExploreFilters();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const { data, isLoading } = useFilteredMovies({
    searchQuery: searchQuery.trim() || undefined,
    mood: filters.mood,
    genres: filters.genres,
    decade: filters.decade,
    sortBy,
  });

  const movies = data?.results ?? [];
  const totalMatches = data?.total ?? 0;

  const handleRemoveFilter = (filter: string) => {
    if (filter === filters.mood) {
      setMood(undefined);
    } else if (filters.genres.includes(filter)) {
      toggleGenre(filter);
    } else if (filters.decade?.toString() === filter) {
      setDecade(undefined);
    }
  };

  return (
    <main className="min-h-screen bg-cinema-black text-white pb-24 md:pb-0 relative">
      <SearchHeader
        activeFilters={
          [filters.mood, ...filters.genres, filters.decade?.toString()].filter(
            Boolean
          ) as string[]
        }
        onRemoveFilter={handleRemoveFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-80 lg:w-96 border-r border-surface-grey/50 p-6 sticky top-16 self-start">
          <FilterSidebar
            mood={filters.mood}
            genres={filters.genres}
            decade={filters.decade}
            onToggleMood={(m) =>
              setMood(filters.mood === m ? undefined : (m as any))
            }
            onToggleGenre={toggleGenre}
            onChangeDecade={setDecade}
            onReset={reset}
          />
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
            aria-live="polite">
            <p className="text-metadata-grey text-sm md:text-base">
              {isLoading
                ? "Discovering movies..."
                : `${totalMatches} ${
                    totalMatches === 1 ? "movie" : "movies"
                  } match your vibe`}
            </p>

            <div className="flex items-center gap-3">
              <label
                htmlFor="sort-explore"
                className="text-sm text-metadata-grey">
                Sort by
              </label>
              <select
                id="sort-explore"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "match" | "release" | "popularity"
                  )
                }
                className="bg-surface-grey border border-surface-grey/50 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-electric-cyan">
                <option value="match">Match Score</option>
                <option value="release">Release Date</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <MovieCardSkeleton key={i} variant="grid" />
              ))}
            </div>
          ) : movies.length === 0 ? (
            <div className="text-center py-20 text-zinc-400">
              <p className="text-xl font-medium mb-3">No matches found</p>
              <p className="text-sm max-w-md mx-auto">
                Try adjusting your mood filter, search term, or clear some
                selections.
              </p>
            </div>
          ) : (
            <ResultsGrid movies={movies} />
          )}
        </div>
      </div>

      {/* Mobile filter trigger */}
      <FloatingFilterButton
        activeCount={
          (filters.mood ? 1 : 0) +
          filters.genres.length +
          (filters.decade ? 1 : 0)
        }
        onClick={() => setIsFilterModalOpen(true)}
      />

      {/* Mobile filter modal */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filters">
        <FilterSidebar
          mood={filters.mood}
          genres={filters.genres}
          decade={filters.decade}
          onToggleMood={(m) =>
            setMood(filters.mood === m ? undefined : (m as any))
          }
          onToggleGenre={toggleGenre}
          onChangeDecade={setDecade}
          onReset={reset}
          onApply={() => setIsFilterModalOpen(false)}
        />
      </Modal>
    </main>
  );
}
