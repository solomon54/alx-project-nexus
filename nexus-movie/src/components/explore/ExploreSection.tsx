//src/components/explore/ExploreSection.tsx
"use client";

import { useState } from "react";
import { useFilteredMovies } from "@/features/movie-discovery/hooks/useFilteredMovies";
import AppHeader from "@/components/navigation/AppHeader";
import FilterSidebar from "./FilterSidebar";
import ResultsGrid from "./ResultsGrid";
import FloatingFilterButton from "./FloatingFilterButton";
import Modal from "@/components/ui/Modal";
import MovieCardSkeleton from "@/components/ui/MovieCardSkeleton";
import { useExploreFilters } from "@/features/movie-discovery/hooks/useExploreFilter";
import { memoryStore } from "@/features/memory/memory.store";
import { Movie } from "@/types/movie";
import { X } from "lucide-react";

export default function ExploreSection() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"match" | "release" | "popularity">(
    "match"
  );
  const { filters, setMood, toggleGenre, setDecade, reset } =
    useExploreFilters();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [version, setVersion] = useState<number>(0);

  const { data, isLoading } = useFilteredMovies({
    searchQuery: searchQuery.trim() || undefined,
    mood: filters.mood,
    genres: filters.genres,
    decade: filters.decade,
    sortBy,
  });

  const rawMovies: Movie[] = data?.results ?? [];
  const visibleMovies = rawMovies
    .map((movie) => ({
      ...movie,
      is_dismissed: memoryStore.isDismissed(movie.id),
      is_watchlisted: memoryStore.isWatchlisted(movie.id),
    }))
    .filter((m) => !m.is_dismissed);

  const activeFilterList = [
    filters.mood,
    ...filters.genres,
    filters.decade?.toString(),
  ].filter(Boolean) as string[];

  const handleRemoveFilter = (filter: string) => {
    if (filter === filters.mood) setMood(undefined);
    else if (filters.genres.includes(filter)) toggleGenre(filter);
    else if (filters.decade?.toString() === filter) setDecade(undefined);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-24 relative">
      <AppHeader
        query={searchQuery}
        setQuery={setSearchQuery}
        variant="explore"
        searchPlaceholder="Filter by title, actor, or vibe...">
        {activeFilterList.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mr-2">
              Active Filters:
            </span>
            {activeFilterList.map((filter) => (
              <button
                key={filter}
                onClick={() => handleRemoveFilter(filter)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan text-[10px] font-bold uppercase transition-all hover:bg-electric-cyan/20">
                {filter}
                <X size={10} />
              </button>
            ))}
            <button
              onClick={reset}
              className="text-[10px] font-bold text-zinc-400 hover:text-white underline underline-offset-4 ml-2">
              Clear All
            </button>
          </div>
        )}
      </AppHeader>

      <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-72 lg:w-80 border-r border-white/5 p-6 sticky top-[120px] self-start h-[calc(100vh-120px)] overflow-y-auto">
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
        <div className="flex-1 p-4 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tighter mb-1">
                Explore
              </h1>
              <p className="text-zinc-500 text-xs font-medium">
                {isLoading
                  ? "Curating selection..."
                  : `${visibleMovies.length} matches found`}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-zinc-900/50 p-1 pl-4 rounded-xl border border-white/5">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                Sort By
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white text-[10px] font-black uppercase tracking-widest focus:outline-none cursor-pointer p-2">
                <option value="match" className="bg-zinc-900">
                  Match
                </option>
                <option value="release" className="bg-zinc-900">
                  Newest
                </option>
                <option value="popularity" className="bg-zinc-900">
                  Popular
                </option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <MovieCardSkeleton key={i} variant="grid" />
              ))}
            </div>
          ) : visibleMovies.length === 0 ? (
            <div className="text-center py-32 border-2 border-dashed border-white/5 rounded-3xl">
              <p className="text-zinc-500 font-black uppercase tracking-[0.2em] text-sm">
                No Results Found
              </p>
            </div>
          ) : (
            <ResultsGrid
              movies={visibleMovies}
              onDismiss={(id) => {
                memoryStore.dismissMovie(id);
                setVersion((v) => v + 1);
              }}
              onWatchlistToggle={(id) => {
                memoryStore.isWatchlisted(id)
                  ? memoryStore.removeFromWatchlist(id)
                  : memoryStore.addToWatchlist(id);
                setVersion((v) => v + 1);
              }}
            />
          )}
        </div>
      </div>

      <FloatingFilterButton
        activeCount={activeFilterList.length}
        onClick={() => setIsFilterModalOpen(true)}
      />

      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Refine Search">
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
