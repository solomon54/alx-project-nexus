"use client";

import React, { useState, useEffect } from "react";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import MovieCard from "@/components/ui/MovieCard";
import MovieCardSkeleton from "@/components/ui/MovieCardSkeleton";
import { Movie } from "@/types/movie";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black px-5 sm:px-12 pt-24 pb-32">
      {/* 1. Header & Search Bar */}
      <header className="mb-10">
        <h1 className="text-4xl font-bebas tracking-wider text-white mb-6">
          EXPLORE
        </h1>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <SearchIcon
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Search movies, actors, or directors..."
              className="w-full bg-zinc-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="bg-zinc-900 border border-white/10 p-4 rounded-2xl text-white hover:bg-zinc-800 transition-colors">
            <SlidersHorizontal size={24} />
          </button>
        </div>
      </header>

      {/* 2. Discovery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
        {isLoading ? (
          // Show 12 skeletons while loading
          Array.from({ length: 12 }).map((_, i) => (
            <MovieCardSkeleton key={i} variant="grid" />
          ))
        ) : (
          /* This is where your useMovies() hook will map data later */
          <div className="col-span-full text-center py-20">
            <p className="text-zinc-500 font-medium text-lg">
              Start typing to discover hidden gems...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
