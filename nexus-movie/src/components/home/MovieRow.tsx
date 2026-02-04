// src/components/home/MovieRow.tsx

"use client";

import MovieCard from "@/components/ui/MovieCard";
import { Movie } from "@/types/movie";
import { ChevronRight } from "lucide-react";
import { cn } from "@/utils/classNames";

interface MovieRowProps {
  title: string;
  movies: Movie[];
  variant?: "default" | "trending";
  isLoading?: boolean;
}

export default function MovieRow({
  title,
  movies,
  variant = "default",
  isLoading = false, // ← Default to false
}: MovieRowProps) {
  const titleId = `movie-row-title-${title.replace(/\s+/g, "-").toLowerCase()}`;

  // Optional: Show skeleton / loading state when isLoading is true
  if (isLoading) {
    return (
      <section className="py-6 sm:py-8" aria-labelledby={titleId}>
        <div className="flex items-center justify-between px-5 sm:px-12 mb-4">
          <div className="h-8 w-48 bg-zinc-800/50 rounded animate-pulse" />
          <div className="h-5 w-20 bg-zinc-800/50 rounded animate-pulse" />
        </div>
        <div className="flex overflow-x-auto gap-3 sm:gap-5 px-5 sm:px-12 pb-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "snap-start shrink-0",
                variant === "trending"
                  ? "w-[240px] sm:w-[320px]"
                  : "w-[180px] sm:w-[260px]"
              )}>
              <div className="aspect-[2/3] bg-zinc-800/50 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 sm:py-8" aria-labelledby={titleId} role="region">
      <div className="flex items-center justify-between px-5 sm:px-12 mb-4">
        <h2
          id={titleId}
          className="text-base font-semibold sm:text-2xl font-bebas tracking-wide text-white uppercase">
          {title}
        </h2>

        <button
          type="button"
          className="flex items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-electric-cyan transition-colors group focus:outline-none focus:ring-2 focus:ring-electric-cyan focus:ring-offset-2 focus:ring-offset-cinema-black"
          aria-label={`View all ${title}`}>
          VIEW ALL
          <ChevronRight
            size={14}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </button>
      </div>

      <div
        className="flex overflow-x-auto gap-3 sm:gap-5 px-5 sm:px-12 pb-4 snap-x snap-mandatory scrollbar-hide"
        role="list"
        aria-label={`${title} movies horizontal list – swipe or use arrow keys to navigate`}
        tabIndex={0}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={cn(
              "snap-start shrink-0",
              variant === "trending"
                ? "w-[240px] sm:w-[320px]"
                : "w-[180px] sm:w-[260px]"
            )}
            role="listitem">
            <MovieCard movie={movie} />
          </div>
        ))}

        {movies.length === 0 && !isLoading && (
          <div className="text-zinc-500 text-sm italic py-4">
            No movies available in this row
          </div>
        )}
      </div>
    </section>
  );
}
