// src/components/explore/FilterSidebar.tsx
"use client";

import { cn } from "@/utils/classNames";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

interface FilterSidebarProps {
  mood?: string;
  genres: string[];
  decade?: number;

  onToggleMood: (mood: string) => void;
  onToggleGenre: (genre: string) => void;
  onChangeDecade: (decade: number) => void;

  onReset: () => void;
  onApply?: () => void;
}

export default function FilterSidebar({
  mood,
  genres,
  decade,
  onToggleMood,
  onToggleGenre,
  onChangeDecade,
  onReset,
  onApply,
}: FilterSidebarProps) {
  const moods = [
    "Gritty",
    "Historical",
    "Intense",
    "Thought-Provoking",
    "Epic",
    "Feel-Good",
  ];
  const allGenres = [
    "Sci-Fi",
    "Action",
    "Drama",
    "Thriller",
    "Mystery",
    "Adventure",
  ];

  const [draftMood, setDraftMood] = useState(mood);
  const [draftGenres, setDraftGenres] = useState([...genres]);

  // Initialize the decade
  const [draftDecade, setDraftDecade] = useState(decade ?? 2020);
  const handleReset = () => {
    setDraftMood(undefined);
    setDraftGenres([]);
    setDraftDecade(2020); // Reset to a year that actually has many movies
    onReset?.();
  };

  return (
    <div className="space-y-8">
      {/* Mood */}
      <div>
        <h3 className="text-lg font-bebas mb-4">Mood</h3>
        <div className="flex flex-wrap gap-2">
          {moods.map((m) => (
            <button
              key={m}
              type="button"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                draftMood === m
                  ? "bg-netflix-red text-white shadow-sm"
                  : "bg-surface-grey/70 text-metadata-grey hover:text-white"
              )}
              onClick={() => setDraftMood(draftMood === m ? undefined : m)}>
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Genre */}
      <div>
        <h3 className="text-lg font-bebas mb-4">Genre</h3>
        <div className="flex flex-wrap gap-2">
          {allGenres.map((g) => (
            <button
              key={g}
              type="button"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                draftGenres.includes(g)
                  ? "bg-netflix-red text-white shadow-sm"
                  : "bg-surface-grey/70 text-metadata-grey hover:text-white"
              )}
              onClick={() =>
                setDraftGenres(
                  draftGenres.includes(g)
                    ? draftGenres.filter((x) => x !== g)
                    : [...draftGenres, g]
                )
              }>
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Decade - FIXED RANGE AND STEP */}

      <div>
        <h3 className="text-lg font-bebas mb-4">Release Decade</h3>

        <input
          type="range"
          min={1970}
          max={2025}
          step={5}
          value={draftDecade}
          onChange={(e) => setDraftDecade(Number(e.target.value))}
          className="w-full transition-all duration-300 ease-in-out"
        />

        <div className="flex justify-between text-sm text-metadata-grey mt-2">
          <span>1970</span>

          <span>{draftDecade}</span>

          <span>2025</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <Button variant="outline" className="flex-1" onClick={handleReset}>
          Reset
        </Button>
        <Button
          variant="primary"
          className="flex-1"
          onClick={() => {
            //  Mood
            if (draftMood !== mood) {
              onToggleMood(draftMood || "");
            }

            //  Genres (Toggle off what was removed, toggle on what was added)
            const added = draftGenres.filter((g) => !genres.includes(g));
            const removed = genres.filter((g) => !draftGenres.includes(g));

            added.forEach((g) => onToggleGenre(g));
            removed.forEach((g) => onToggleGenre(g));

            //  Decade
            onChangeDecade(draftDecade);

            onApply?.();
          }}>
          Apply
        </Button>
      </div>
    </div>
  );
}
