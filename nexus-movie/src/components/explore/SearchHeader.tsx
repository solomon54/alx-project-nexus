// src/components/explore/SearchHeader.tsx
"use client";

import { X } from "lucide-react";
import SearchCombobox from "../shared/SearchComboBox";
import { cn } from "@/utils/classNames";

interface SearchHeaderProps {
  activeFilters: string[];
  onRemoveFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function SearchHeader({
  activeFilters,
  onRemoveFilter,
  searchQuery,
  setSearchQuery,
}: SearchHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-cinema-black/80 backdrop-blur-xl border-b border-surface-grey/30 px-4 py-3 md:px-6 md:py-4">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-5">
        <div className="relative flex items-center gap-3 md:gap-4">
          {/* Search – now using shared combobox */}
          <SearchCombobox
            query={searchQuery}
            setQuery={setSearchQuery}
            placeholder="Search for titles, moods, people..."
            className="flex-1"
            inputClassName="pl-12 pr-4 md:pr-40 py-3.5 md:py-4"
            showClearButton={true}
          />

          {/* Right-side pill + avatar (your original style) */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-electric-cyan/20 to-cyan-900/20 rounded-full border border-electric-cyan/30 backdrop-blur-md shadow-sm">
              <span className="text-electric-cyan text-xs md:text-sm font-medium">
                Evening Vibe
              </span>
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 animate-pulse" />
            </div>

            <div className="sm:hidden w-8 h-8 rounded-full bg-gradient-to-br from-electric-cyan to-pink-500 shadow-lg flex items-center justify-center">
              <span className="text-[10px] text-white font-bold">V</span>
            </div>

            <button
              className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-electric-cyan/30 shadow-md transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-electric-cyan"
              aria-label="Open profile">
              <div className="w-full h-full bg-gradient-to-br from-electric-cyan/40 to-surface-grey flex items-center justify-center text-white font-medium text-sm md:text-base">
                S
              </div>
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div
            className="flex flex-wrap gap-2"
            role="list"
            aria-label="Active filters">
            {activeFilters.map((filter) => (
              <div
                key={filter}
                role="listitem"
                className="flex items-center gap-2 bg-surface-grey/70 px-4 py-2 rounded-full text-sm text-white border border-surface-grey/40 backdrop-blur-sm">
                {filter}
                <button
                  onClick={() => onRemoveFilter(filter)}
                  className="p-1 rounded-full hover:bg-surface-grey/80 transition"
                  aria-label={`Remove filter: ${filter}`}>
                  <X
                    size={14}
                    className="text-metadata-grey hover:text-white"
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
