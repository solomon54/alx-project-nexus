"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, EyeOff, Film } from "lucide-react";

import ResultsGrid from "@/components/explore/ResultsGrid";
import SyncBanner from "./SyncBanner";
import { memoryStore } from "@/features/memory/memory.store";
import { useLibraryMovies } from "@/features/movie-discovery/hooks/useLibraryMovies";

export default function LibrarySection() {
  const [activeTab, setActiveTab] = useState<"watchlist" | "hidden">(
    "watchlist"
  );
  const [version, setVersion] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const isGuest = true;

  // 1️ Mount & subscribe to store changes
  useEffect(() => {
    setHasMounted(true);

    const unsubscribe = memoryStore.subscribe(() => setVersion((v) => v + 1));
    return unsubscribe;
  }, []);

  const libraryMovies = useLibraryMovies(activeTab, version);

  // 2️ Handlers with error safety
  const handleWatchlistToggle = (movieId: number) => {
    try {
      if (memoryStore.isWatchlisted(movieId)) {
        memoryStore.removeFromWatchlist(movieId);
        memoryStore.dismissMovie(movieId);
      } else {
        memoryStore.addToWatchlist(movieId);
      }
    } catch (err) {
      console.error("Error toggling watchlist:", err);
    }
  };

  const handleDismiss = (movieId: number) => {
    try {
      if (activeTab === "hidden") {
        // restore to watchlist
        memoryStore.addToWatchlist(movieId);
      } else {
        memoryStore.dismissMovie(movieId);
      }
    } catch (err) {
      console.error("Error dismissing movie:", err);
    }
  };

  if (!hasMounted) return null;

  return (
    <main className="min-h-screen bg-black text-white pb-32">
      {/* Header & tabs */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5 px-4 py-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h1 className="text-4xl font-bebas tracking-wider uppercase">
            My Library
          </h1>

          <nav className="flex bg-zinc-900/50 p-1 rounded-full border border-white/10 w-fit">
            {[
              { id: "watchlist", label: "Watchlist", icon: Bookmark },
              { id: "hidden", label: "Hidden", icon: EyeOff },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all z-10 ${
                  activeTab === tab.id
                    ? "text-black"
                    : "text-zinc-500 hover:text-white"
                }`}>
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
        {isGuest && <SyncBanner />}

        <section>
          <AnimatePresence mode="wait">
            {libraryMovies.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-32 text-center border border-white/5 rounded-3xl bg-zinc-900/20">
                <Film className="mx-auto text-zinc-800 mb-4" size={48} />
                <p className="text-zinc-500 font-medium mb-2">
                  Your {activeTab} is currently empty.
                </p>
                {activeTab === "watchlist" && (
                  <p className="text-zinc-400 text-sm">
                    Explore movies and add them to your watchlist!
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layout>
                <ResultsGrid
                  movies={libraryMovies}
                  onWatchlistToggle={handleWatchlistToggle}
                  onDismiss={handleDismiss}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
