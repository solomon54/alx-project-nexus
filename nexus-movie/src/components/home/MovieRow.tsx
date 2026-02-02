"use client";

import MovieCard from "@/components/ui/MovieCard";
import { Movie } from "@/types/movie";
import { ChevronRight } from "lucide-react";
import { cn } from "@/utils/classNames";

interface MovieRowProps {
  title: string;
  movies: Movie[];
  variant?: "default" | "trending";
}

export default function MovieRow({
  title,
  movies,
  variant = "default",
}: MovieRowProps) {
  return (
    <section className="py-6 sm:py-8">
      <div className="flex items-center justify-between px-5 sm:px-12 mb-4">
        <h2 className="text-xl sm:text-2xl font-bebas tracking-wide text-white uppercase">
          {title}
        </h2>
        <button className="flex items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-electric-cyan transition-colors group">
          VIEW ALL
          <ChevronRight
            size={14}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </button>
      </div>
      {/* Horizontal Scroll Container       */}
      <div className="flex overflow-x-auto gap-3 sm:gap-5 px-5 sm:px-12 pb-4 snap-x snap-mandatory scrollbar-hide">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={cn(
              "snap-start shrink-0",
              variant === "trending"
                ? "w-[240px] sm:w-[320px]"
                : "w-[180px] sm:w-[260px]"
            )}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
