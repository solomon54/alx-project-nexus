// src/components/ui/MovieCard.tsx
"use client"; // Required for Framer Motion (gestures/hover)

import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react"; // Lucide icon for play overlay
import { Movie, MoviePlaceholder } from "@/types/movie";
import { cn } from "@/utils/classNames"; // Assume you have this for class merging

interface MovieCardProps {
  movie: Movie | MoviePlaceholder;
  variant?: "grid" | "row" | "hero"; // For different layouts/sizes
  className?: string;
}

export default function MovieCard({
  movie,
  variant = "grid",
  className,
}: MovieCardProps) {
  const isPlaceholder = "isPlaceholder" in movie && movie.isPlaceholder;

  // Extract year safely
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  // Rating display (0-10 → e.g. 8.4)
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "—";

  // Size variants
  const sizes = {
    grid: "w-40 sm:w-44 md:w-52 flex-shrink-0",
    row: "w-36 sm:w-44 md:w-56 flex-shrink-0",
    hero: "w-full aspect-[2/3] md:aspect-video max-w-md mx-auto",
  };

  const sizeClass = sizes[variant] || sizes.grid;

  // Fallback poster if missing or placeholder
  const posterSrc = isPlaceholder
    ? "/fallback-poster.png" // ← your root-level file
    : movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/fallback-poster.png";
  // And blurDataURL="/low-res-poster-placeholder.jpg" if you have it
  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-surface-grey shadow-lg transition-shadow",
        sizeClass,
        className
      )}
      whileHover={{
        scale: 1.08,
        y: -8,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={posterSrc}
          alt={isPlaceholder ? "Loading..." : movie.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 160px, (max-width: 768px) 176px, 208px"
          priority={variant === "hero"} // Priority for hero/important cards
          placeholder="blur"
          blurDataURL="/low-res-poster-placeholder.jpg" // Optional low-res for blur effect
        />

        {/* Play Overlay on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Play className="h-12 w-12 text-white drop-shadow-lg" />
        </div>

        {/* Rating Badge (top-right) */}
        {!isPlaceholder && (
          <div className="absolute top-2 right-2 bg-netflix-red/90 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
            {rating}
          </div>
        )}
      </div>

      {/* Info Footer */}
      <div className="p-3">
        <h3 className="font-medium text-white text-sm md:text-base truncate">
          {isPlaceholder ? "Loading Title..." : movie.title}
        </h3>
        <div className="mt-1 flex items-center justify-between text-xs text-metadata-grey">
          <span>{year}</span>
          {!isPlaceholder && movie.adult && (
            <span className="text-red-400 font-bold">18+</span>
          )}
        </div>

        {/* Mood Chips (if present) - small tags */}
        {!isPlaceholder && movie.moods && movie.moods.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {movie.moods.slice(0, 2).map((mood) => (
              <span
                key={mood}
                className="text-xs px-2 py-0.5 bg-electric-cyan/20 text-electric-cyan rounded-full border border-electric-cyan/30">
                {mood}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Skeleton/Placeholder overlay if loading */}
      {isPlaceholder && (
        <div className="absolute inset-0 bg-surface-grey/80 animate-pulse" />
      )}
    </motion.div>
  );
}
