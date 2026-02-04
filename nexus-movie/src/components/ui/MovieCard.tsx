"use client";

import { useState, useEffect } from "react"; // Added hooks for simulation
import { useRouter } from "next/navigation"; // For redirection
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
  isSaved: initialIsSaved = false,
  className,
}: MovieCardProps) {
  const router = useRouter();

  // --- SIMULATED BACKEND STATE ---
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [isHidden, setIsHidden] = useState(false);

  // Handle Redirect to Detail Page
  const handleNavigate = () => {
    router.push(`/movie/${movie.id}`);
  };

  // Handle Watchlist Toggle (Simulated)
  const toggleWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating to detail page
    setIsSaved(!isSaved);

    // Peer-tip: You can log this to see it "working"
    console.log(
      `${!isSaved ? "Added to" : "Removed from"} watchlist: ${movie.title}`
    );
  };

  // Handle Remove/Hide (Simulated)
  const handleHide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHidden(true);
    console.log(`Hidden: ${movie.title}`);
  };

  // If user clicked "X", we hide the card from view
  if (isHidden) return null;

  return (
    <motion.div
      onClick={handleNavigate} // REDIRECT TRIGGER
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
              : "/fallback-poster.png"
          }
          alt={movie.title || "Movie Poster"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-50"
          sizes="(max-width: 640px) 140px, 200px"
        />

        {/* --- ACTION OVERLAYS --- */}

        {/* 1. Watchlist (Bookmark) - Top Right */}
        <button
          onClick={toggleWatchlist} // SIMULATED ACTION
          className={cn(
            "absolute top-2 right-2 z-10 p-1.5 rounded-full backdrop-blur-md border transition-all",
            isSaved
              ? "bg-electric-cyan text-black border-electric-cyan"
              : "bg-black/40 text-white border-white/10 hover:bg-electric-cyan/20 hover:border-electric-cyan/50"
          )}>
          <Bookmark size={16} className={cn(isSaved && "fill-black")} />
        </button>

        {/* 2. Blacklist (Hide) */}
        <button
          onClick={handleHide} // SIMULATED ACTION
          className="absolute top-2 left-2 z-10 p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:border-red-500/50 transition-all"
          title="Hide this movie">
          <X size={16} className="text-white hover:text-red-500" />
        </button>

        {/* 3. Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/40">
            <Play size={24} fill="white" className="text-white ml-0.5" />
          </div>
        </div>

        {/* 4. Match Badge */}
        <div className="absolute bottom-2 right-2">
          <span className="bg-zinc-900/80 backdrop-blur-md text-electric-cyan text-[10px] font-bold px-2 py-1 rounded-md border border-electric-cyan/30">
            {Math.round(Number(movie.vote_average || 0) * 10)}% Match
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
            {movie.vote_average?.toFixed(1) || "N/A"}
          </span>
          <span>•</span>
          <span>
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
