// src/components/home/FilterSidebar.tsx

import { cn } from "@/utils/classNames";
import { Button } from "@/components/ui/Button";

interface FilterSidebarProps {
  activeFilters: string[];
  onFilterChange: (filters: string[]) => void;
  onClose?: () => void;
}

export default function FilterSidebar({
  activeFilters,
  onFilterChange,
  onClose,
}: FilterSidebarProps) {
  const moods = ["Gritty", "Epic", "Neon-Noir", "Feel-Good", "Nostalgic"];
  const genres = [
    "Sci-Fi",
    "Action",
    "Drama",
    "Thriller",
    "Mystery",
    "Adventure",
  ];
  const decades = ["1970", "1980", "1990", "2000", "2010", "2020"];

  const toggleFilter = (value: string) => {
    if (activeFilters.includes(value)) {
      onFilterChange(activeFilters.filter((f) => f !== value));
    } else {
      onFilterChange([...activeFilters, value]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Mood */}
      <div>
        <h3 className="text-lg font-bebas mb-4">Mood</h3>
        <div className="flex flex-wrap gap-2">
          {moods.map((mood) => (
            <button
              key={mood}
              type="button"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeFilters.includes(mood)
                  ? "bg-netflix-red/80 text-white border-netflix-red shadow-sm"
                  : "bg-surface-grey/70 text-metadata-grey border-surface-grey/50 hover:border-electric-cyan hover:text-white"
              )}
              onClick={() => toggleFilter(mood)}>
              {mood}
            </button>
          ))}
        </div>
      </div>

      {/* Genre */}
      <div>
        <h3 className="text-lg font-bebas mb-4">Genre</h3>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              type="button"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeFilters.includes(genre)
                  ? "bg-netflix-red/80 text-white border-netflix-red shadow-sm"
                  : "bg-surface-grey/70 text-metadata-grey border-surface-grey/50 hover:border-electric-cyan hover:text-white"
              )}
              onClick={() => toggleFilter(genre)}>
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Decade Range */}
      <div>
        <h3 className="text-lg font-bebas mb-4">Release Decade Range</h3>
        <div className="relative">
          <input
            type="range"
            min="1970"
            max="2024"
            step="10"
            defaultValue="1990"
            className="w-full h-2 bg-surface-grey rounded-full appearance-none cursor-pointer accent-electric-cyan"
          />
          <div className="flex justify-between text-sm text-metadata-grey mt-3">
            <span>1970</span>
            <span>2024</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onFilterChange([])}>
          Reset
        </Button>

        <Button
          variant="primary"
          className="flex-1"
          onClick={() => {
            onClose?.();
          }}>
          Apply Filters ({activeFilters.length})
        </Button>
      </div>
    </div>
  );
}
