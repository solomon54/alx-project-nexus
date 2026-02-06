// src/components/movie/MovieDetailsSection.tsx
"use client";

import { useState } from "react";
import { Movie, Provider } from "@/types/movie";
import { MovieHero } from "./MovieHero";
import { MovieActions } from "./MovieActions";
import { MovieMeta } from "./MovieMeta";
import { MovieExtras } from "./MovieExtras";
import { cn } from "@/utils/classNames";
import { Star } from "lucide-react";

import { memoryStore } from "@/features/memory/memory.store";

export const MovieDetailsSection = ({
  movie,
  providers,
}: {
  movie: Movie;
  providers: Provider[];
}) => {
  const [playing, setPlaying] = useState(false);
  const [, forceUpdate] = useState(0);
  const refresh = () => forceUpdate((v) => v + 1);

  const handleWatchNow = () => {
    const primary =
      providers.find((p) => p.monetization_type === "flatrate") ?? providers[0];
    if (primary?.deep_link) {
      window.open(primary.deep_link, "_blank", "noopener,noreferrer");
    }
  };

  const handleAddToWatchlist = () => {
    memoryStore.addToWatchlist(movie.id);
    refresh();
  };

  const handleDismiss = () => {
    memoryStore.dismissMovie(movie.id);
    refresh();
  };

  const handleRateVibe = () => {
    console.log("Rate vibe (coming next)");
  };

  return (
    <div className="bg-cinema-black text-white min-h-screen">
      {/* Hero / Player Area */}
      <div
        className={cn(
          "relative w-full",
          playing ? "h-[55vh] sm:h-[65vh] md:h-[75vh]" : "h-[70vh] md:h-[85vh]"
        )}>
        <MovieHero
          movie={movie}
          playing={playing}
          onPlay={() => setPlaying(true)}
          onClose={() => setPlaying(false)}
        />
      </div>

      {/* Content  */}
      <div className="relative z-10">
        {playing ? (
          <div className="px-5 sm:px-8 md:px-12 lg:px-16 pt-6 pb-16 max-w-6xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm md:text-base text-zinc-400">
                <span>{new Date(movie.release_date).getFullYear()}</span>
                {movie.runtime && (
                  <span>
                    • {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                )}
                <span>
                  • {movie.genres?.map((g) => g.name).join(" • ") || "—"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Star size={18} fill="#facc15" className="text-yellow-400" />
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Actions row */}
            <MovieActions
              providers={providers}
              onWatchNow={handleWatchNow}
              onAddToWatchlist={handleAddToWatchlist}
              onRateVibe={handleRateVibe}
              onDismiss={handleDismiss}
              isWatchlisted={memoryStore.isWatchlisted(movie.id)}
              isDismissed={memoryStore.isDismissed(movie.id)}
            />

            {/* Overview + moods */}
            <p className="mt-6 text-base md:text-lg leading-relaxed text-zinc-300 max-w-3xl">
              {movie.overview}
            </p>

            <div className="flex flex-wrap gap-2.5 mt-5">
              {movie.moods?.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3.5 py-1.5 bg-zinc-800/70 text-zinc-200 text-sm rounded-full border border-zinc-700/50">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="px-5 sm:px-8 md:px-12 lg:px-16 -mt-40 md:-mt-64 pb-16 max-w-6xl mx-auto">
            <div className="bg-linear-to-t from-cinema-black via-cinema-black/80 to-transparent rounded-t-2xl p-6 md:p-10 pt-16 md:pt-24 backdrop-blur-md border-t border-white/5">
              <MovieMeta movie={movie} />

              <div className="mt-8 md:mt-10">
                <MovieActions
                  providers={providers}
                  onWatchNow={handleWatchNow}
                  onAddToWatchlist={handleAddToWatchlist}
                  onRateVibe={handleRateVibe}
                  onDismiss={handleDismiss}
                  isWatchlisted={memoryStore.isWatchlisted(movie.id)}
                  isDismissed={memoryStore.isDismissed(movie.id)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Extras */}
        <div className="px-5 sm:px-8 md:px-12 lg:px-16 pb-24 pt-8 md:pt-12 max-w-7xl mx-auto border-t border-zinc-800/50">
          <MovieExtras movie={movie} providers={providers} />
        </div>
      </div>
    </div>
  );
};
