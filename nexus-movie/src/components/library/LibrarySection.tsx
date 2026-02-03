"use client";

import React, { useState } from "react";
import { Bookmark, EyeOff, Cloud, LogIn, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MovieCard from "@/components/ui/MovieCard";
import { cn } from "@/utils/classNames";
import { Movie } from "@/types/movie";
import SyncBanner from "./SyncBanner";

// --- Mock Data ---
const mockWatchlist: Movie[] = [
  {
    id: 1,
    title: "Fast X",
    poster_path: "/KVyfJoW4nO1CATxHrD7oR8rRJH.jpg",
    vote_average: 7.2,
    release_date: "2023-05-19",
    overview: "",
    backdrop_path: null,
    vote_count: 0,
    popularity: 0,
    genres: [{ id: 1, name: "Action" }],
    adult: false,
  },
  {
    id: 2,
    title: "Guardians Vol. 3",
    poster_path: "/1mF4othta76CEXcL1YFInYudQ7K.jpg",
    vote_average: 8.0,
    release_date: "2023-05-05",
    overview: "",
    backdrop_path: null,
    vote_count: 0,
    popularity: 0,
    genres: [{ id: 2, name: "Sci-Fi" }],
    adult: false,
  },
  {
    id: 5,
    title: "Across the Spider-Verse",
    poster_path: "/3OFRe0uxRSe6qJxRQAAKbeB7JWv.jpg",
    vote_average: 8.6,
    release_date: "2023-06-02",
    overview: "",
    backdrop_path: null,
    vote_count: 0,
    popularity: 0,
    genres: [{ id: 3, name: "Animation" }],
    adult: false,
  },
];

const mockHidden: Movie[] = [
  {
    id: 7,
    title: "Quantum Shift",
    poster_path: "/rBCMU5hk4B5OFUWZfe6hQKcprYS.jpg",
    vote_average: 6.8,
    release_date: "2024-01-01",
    overview: "",
    backdrop_path: null,
    vote_count: 0,
    popularity: 0,
    genres: [],
    adult: false,
  },
];

export default function LibrarySection() {
  const [activeTab, setActiveTab] = useState<"watchlist" | "hidden">(
    "watchlist"
  );
  const isGuest = true;

  const currentList = activeTab === "watchlist" ? mockWatchlist : mockHidden;

  return (
    <main className="min-h-screen bg-black text-white pb-32">
      {/* 1. Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5 px-4 py-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h1 className="text-4xl font-bebas tracking-wider uppercase text-center md:text-left">
            My Library
          </h1>

          <nav className="flex bg-zinc-900/50 p-1 rounded-full border border-white/10 w-fit mx-auto md:mx-0">
            {[
              { id: "watchlist", label: "Watchlist", icon: Bookmark },
              { id: "hidden", label: "Hidden", icon: EyeOff },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "relative flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all z-10",
                  activeTab === tab.id
                    ? "text-black"
                    : "text-zinc-500 hover:text-white"
                )}>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-electric-cyan rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-10 space-y-12">
        {/* 2. Guest Banner */}
        <SyncBanner />

        {/* 3. The Grid - Using MovieCard internally */}
        <section>
          <AnimatePresence mode="wait">
            {currentList.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-24 text-center">
                <Heart className="mx-auto text-zinc-800 mb-4" size={48} />
                <p className="text-zinc-500">Nothing here yet.</p>
              </motion.div>
            ) : (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
                {currentList.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    variant="grid"
                    isSaved={activeTab === "watchlist"}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
