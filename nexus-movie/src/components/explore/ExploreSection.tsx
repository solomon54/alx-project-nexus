// src/components/home/ExploreSection.tsx
"use client";

import { useState } from "react";
import { Movie } from "@/types/movie";
import SearchHeader from "./SearchHeader";
import FilterSidebar from "./FilterSidebare";
import ResultsGrid from "./ResultsGrid";
import FloatingFilterButton from "./FloatingFilterButton";
import Modal from "@/components/ui/Modal";

// Temporary mock data
const mockResults: Movie[] = [
  {
    id: 1,
    title: "Neo-Noir Chronicles",
    poster_path: "/6tpAPeuuqbVnYWWPoOLEDLSBU7a.jpg",
    vote_average: 9.2,
    release_date: "2023-01-15",
    moods: ["Gritty", "Neo-Noir"],
    genres: [{ id: 878, name: "Sci-Fi" }],
    overview: "",
    backdrop_path: null,
    vote_count: 0,
    popularity: 0,
    adult: false,
  },
  {
    id: 2,
    title: "Dust & Bone",
    poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    vote_average: 8.9,
    release_date: "2019-06-20",
    moods: ["Post-Apoc", "Gritty"],
    genres: [{ id: 18, name: "Drama" }],
    overview: "",
    backdrop_path: null,
    vote_count: 0,
    popularity: 0,
    adult: false,
  },
  {
    id: 3,
    title: "Galactic Odyssey",
    poster_path: "/7K8w6mdrJp0oaSoKWGyjSZ4Zv2z.jpg",
    vote_average: 8.5,
    release_date: "2021-11-05",
    moods: ["Epic", "Gritty"],
    genres: [
      { id: 878, name: "Sci-Fi" },
      { id: 12, name: "Adventure" },
    ],
    overview: "",
    backdrop_path: null,
    vote_count: 0,
    popularity: 0,
    adult: false,
  },
];

export default function ExploreSection() {
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "Gritty",
    "Sci-Fi",
    "1990-2024",
  ]);
  const [sortBy, setSortBy] = useState("Match Score");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const totalMatches = 142;

  return (
    <main className="min-h-screen bg-cinema-black text-white pb-24 md:pb-0 relative">
      <SearchHeader
        activeFilters={activeFilters}
        onRemoveFilter={(f) =>
          setActiveFilters((prev) => prev.filter((x) => x !== f))
        }
      />

      <div className="flex flex-col md:flex-row">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-80 lg:w-96 border-r border-surface-grey/50 p-6 sticky top-16 self-start">
          <FilterSidebar
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
          />
        </aside>

        {/* Main content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <p className="text-metadata-grey text-sm md:text-base">
              {totalMatches} movies match your current vibe
            </p>

            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm text-metadata-grey">
                Sort by
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface-grey border border-surface-grey/50 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-electric-cyan">
                <option>Match Score</option>
                <option>Release Date</option>
                <option>Popularity</option>
              </select>
            </div>
          </div>

          <ResultsGrid movies={mockResults} />
        </div>
      </div>

      {/* Mobile floating filter button */}
      <FloatingFilterButton
        onClick={() => setIsFilterModalOpen(true)}
        activeCount={activeFilters.length}
      />

      {/* Mobile filter modal */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filters">
        <FilterSidebar
          activeFilters={activeFilters}
          onFilterChange={setActiveFilters}
          onClose={() => setIsFilterModalOpen(false)} // ← passes close handler
        />
      </Modal>
    </main>
  );
}
