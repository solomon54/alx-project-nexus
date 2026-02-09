"use client";

import { useState, useMemo } from "react";
import { Movie, Provider } from "@/types/movie";
import { MovieHero } from "./MovieHero";
import { MovieActions } from "./MovieActions";
import { MovieMeta } from "./MovieMeta";
import { MovieExtras } from "./MovieExtras";
import { cn } from "@/utils/classNames";
import { Star } from "lucide-react";

import { memoryStore } from "@/features/memory/memory.store";
import { useAuth } from "@/contexts/AuthContext";

export const MovieDetailsSection = ({
  movie,
  providers,
}: {
  movie: Movie;
  providers: Provider[];
}) => {
  const { user } = useAuth();
  const [playing, setPlaying] = useState(false);
  const [, forceUpdate] = useState(0);

  const refresh = () => forceUpdate((v) => v + 1);

  const uniqueMoods = useMemo(() => {
    return Array.from(new Set(movie.moods || []));
  }, [movie.moods]);

  const PROVIDER_FALLBACKS: Record<string, string> = {
    Netflix: "https://www.netflix.com",
    "Amazon Prime Video": "https://www.primevideo.com",
    "Disney Plus": "https://www.disneyplus.com",
    "Apple TV Plus": "https://tv.apple.com",
  };

  const handleWatchNow = () => {
    const primary =
      providers.find((p) => p.monetization_type === "flatrate") ?? providers[0];
    if (!primary) return;

    const url = primary.deep_link || PROVIDER_FALLBACKS[primary.provider_name];
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleAddToWatchlist = () => {
    // Pass user?.id to trigger cloud sync only when logged in
    memoryStore.addToWatchlist(movie.id, user?.id);
    refresh();
  };

  const handleDismiss = () => {
    memoryStore.removeFromWatchlist(movie.id, user?.id);
    refresh();
  };

  const handleRateVibe = () => console.log("Rate vibe (coming next)");

  return (
    <div className="bg-cinema-black text-white min-h-screen">
      <div
        className={cn(
          "relative w-full transition-all duration-500",
          playing ? "h-[55vh] sm:h-[65vh] md:h-[75vh]" : "h-[70vh] md:h-[85vh]"
        )}>
        <MovieHero
          movie={movie}
          playing={playing}
          onPlay={() => setPlaying(true)}
          onClose={() => setPlaying(false)}
        />
      </div>

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

            <MovieActions
              providers={providers}
              onWatchNow={handleWatchNow}
              onAddToWatchlist={handleAddToWatchlist}
              onRateVibe={handleRateVibe}
              onDismiss={handleDismiss}
              isWatchlisted={memoryStore.isWatchlisted(movie.id)}
              isDismissed={memoryStore.isDismissed(movie.id)}
            />

            <p className="mt-6 text-base md:text-lg leading-relaxed text-zinc-300 max-w-3xl">
              {movie.overview}
            </p>

            <div className="flex flex-wrap gap-2.5 mt-5">
              {uniqueMoods.map((tag, idx) => (
                <span
                  key={`${tag}-${idx}`}
                  className="px-3.5 py-1.5 bg-zinc-800/70 text-zinc-200 text-sm rounded-full border border-zinc-700/50">
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

        <div className="px-5 sm:px-8 md:px-12 lg:px-16 pb-24 pt-8 md:pt-12 max-w-7xl mx-auto border-t border-zinc-800/50">
          <MovieExtras
            movie={movie}
            providers={providers}
            providerFallbacks={PROVIDER_FALLBACKS}
          />
        </div>
      </div>
    </div>
  );
};
