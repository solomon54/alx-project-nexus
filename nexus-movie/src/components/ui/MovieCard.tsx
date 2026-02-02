"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Star, Bookmark, X } from "lucide-react";
import { Movie, MoviePlaceholder } from "@/types/movie";
import { cn } from "@/utils/classNames";

interface MovieCardProps {
  movie: Movie | MoviePlaceholder;
  variant?: "grid" | "row";
  isSaved?: boolean;
  className?: string;
}

export default function MovieCard({
  movie,
  variant = "row",
  isSaved = false,
  className,
}: MovieCardProps) {
  const isPlaceholder = "isPlaceholder" in movie && movie.isPlaceholder;

  // Extract metadata safely
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <motion.div
      className={cn(
        "group relative flex-shrink-0 cursor-pointer bg-zinc-900 rounded-xl overflow-hidden",
        variant === "row" ? "w-[180px] sm:w-[260px]" : "w-full",
        className
      )}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}>
      {/* Poster Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl shadow-lg">
        <Image
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/Screen/PWAHomeDashboard-desk.png"
          }
          alt={movie.title || "Movie Poster"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-50"
          sizes="(max-width: 640px) 140px, 200px"
        />

        {/* --- ACTION OVERLAYS --- */}

        {/* 1. Watchlist (Bookmark) - Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-electric-cyan/20 hover:border-electric-cyan/50 transition-all">
          <Bookmark
            size={16}
            className={cn(
              "text-white",
              isSaved && "fill-electric-cyan text-electric-cyan"
            )}
          />
        </button>

        {/* 2. Blacklist (Hide)  */}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-2 left-2 z-10 p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:border-red-500/50 transition-all"
          title="Hide this movie">
          <X size={16} className="text-white hover:text-red-500" />
        </button>

        {/* 3. Play Button - Center (Hover only) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/40">
            <Play size={24} fill="white" className="text-white ml-0.5" />
          </div>
        </div>

        {/* 4. Match Badge - Bottom Right */}
        <div className="absolute bottom-2 right-2">
          <span className="bg-zinc-900/80 backdrop-blur-md text-electric-cyan text-[10px] font-bold px-2 py-1 rounded-md border border-electric-cyan/30">
            {Math.round(Number(rating) * 10)}% Match
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-3 px-1">
        <h3 className="text-sm sm:text-base font-semibold text-white truncate group-hover:text-electric-cyan transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 mt-1 text-[11px] sm:text-xs text-zinc-400 font-medium">
          <span className="flex items-center gap-1">
            <Star size={10} className="fill-yellow-500 text-yellow-500" />
            {rating}
          </span>
          <span>•</span>
          <span>{year}</span>
        </div>
      </div>

      {/* Mood Tags */}
      {movie.genres && (
        <div className="sm:flex flex-wrap gap-1 mt-2">
          {movie.genres.slice(0, 2).map((genre: any) => (
            <span
              key={genre.id}
              className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">
              {genre.name}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
