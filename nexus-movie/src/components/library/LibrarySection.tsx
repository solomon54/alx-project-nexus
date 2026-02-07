//src/components/library/LibrarySection.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, EyeOff, Film, Sparkles, Plus } from "lucide-react";

import ResultsGrid from "@/components/explore/ResultsGrid";
import UserProfileNav from "@/components/navigation/UserProfileNav";
import { memoryStore } from "@/features/memory/memory.store";
import { useLibraryMovies } from "@/features/movie-discovery/hooks/useLibraryMovies";
import { useMounted } from "@/features/movie-discovery/hooks/useMounted";

export default function LibrarySection() {
  const [activeTab, setActiveTab] = useState<"watchlist" | "hidden">(
    "watchlist"
  );
  const [version, setVersion] = useState(0);
  const isMounted = useMounted();

  // 1. Subscribe to store changes
  useEffect(() => {
    if (!isMounted) return;

    const unsubscribe = memoryStore.subscribe(() => {
      setVersion((v) => v + 1);
    });
    return () => {
      unsubscribe();
    };
  }, [isMounted]);

  const libraryMovies = useLibraryMovies(activeTab, version);

  // 2. Count Logic
  const counts = useMemo(
    () => ({
      watchlist: memoryStore.getWatchlist().length,
      hidden: memoryStore.getDismissed().length,
    }),
    [version]
  );

  // 3. Handlers
  const handleWatchlistToggle = (movieId: number) => {
    if (memoryStore.isWatchlisted(movieId)) {
      memoryStore.removeFromWatchlist(movieId);
      memoryStore.dismissMovie(movieId);
    } else {
      memoryStore.addToWatchlist(movieId);
    }
  };

  const handleDismiss = (movieId: number) => {
    activeTab === "hidden"
      ? memoryStore.addToWatchlist(movieId)
      : memoryStore.dismissMovie(movieId);
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-black text-white pb-32 relative">
      <div className="absolute top-6 left-4 md:left-12 z-50">
        <Link href="/" className="group block">
          <div className="relative">
            <div className="absolute -inset-1 bg-red-600/30 rounded-md blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative bg-red-600 text-white font-black text-xl sm:text-2xl px-3 py-1 rounded-md tracking-tighter shadow-xl active:scale-90 transition-transform">
              N
            </div>
          </div>
        </Link>
      </div>

      <div className="absolute top-6 right-4 md:right-12 z-50">
        <UserProfileNav />
      </div>

      {/* HERO SECTION*/}
      <div className="max-w-7xl mx-auto px-4 md:px-12 pt-22 pb-10">
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl md:text-5xl font-bebas tracking-tighter uppercase leading-none">
          My <span className="text-electric-cyan">Library</span>
        </motion.h1>
        <p className="text-zinc-400 text-[9px] font-black uppercase tracking-[0.4em] mt-4 ">
          Personal Collection & Saved Moods
        </p>
      </div>

      {/* STICKY TABS */}
      <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-xl border-y border-white/5 px-4 py-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <nav className="flex bg-zinc-900/50 p-1 rounded-full border border-white/10 w-fit">
            {[
              {
                id: "watchlist",
                label: "Watchlist",
                icon: Bookmark,
                count: counts.watchlist,
              },
              {
                id: "hidden",
                label: "Hidden",
                icon: EyeOff,
                count: counts.hidden,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all z-10 ${
                  activeTab === tab.id
                    ? "text-black"
                    : "text-zinc-400 hover:text-white"
                }`}>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-electric-cyan rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon size={14} strokeWidth={2.5} />
                <span className=" sm:inline">{tab.label}</span>

                {/* Count Badge */}
                <span
                  className={`ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors ${
                    activeTab === tab.id
                      ? "bg-red-500 text-white"
                      : "bg-white/10 text-zinc-400"
                  }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-12">
        <AnimatePresence mode="wait">
          {libraryMovies.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-40 flex flex-col items-center justify-center text-center border border-white/5 rounded-[3rem] bg-zinc-900/10 px-6">
              <div className="relative mb-6">
                <Film className="text-zinc-800" size={80} strokeWidth={1} />
                <Sparkles
                  className="absolute -top-2 -right-2 text-electric-cyan/50 animate-pulse"
                  size={24}
                />
              </div>

              <p className="text-zinc-500 font-black uppercase tracking-[0.2em] text-xs mb-8">
                Your {activeTab} is currently empty
              </p>

              <Link href="/search">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-electric-cyan/85 text-black px-8 py-4 rounded-2xl font-black uppercase tracking-tighter text-sm shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:bg-electric-cyan transition-colors">
                  <Plus size={18} strokeWidth={3} />
                  Discover Movies
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}>
              <ResultsGrid
                movies={libraryMovies}
                onWatchlistToggle={handleWatchlistToggle}
                onDismiss={handleDismiss}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
