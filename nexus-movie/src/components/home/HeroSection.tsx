// src/components/home/HeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Movie } from "@/types/movie";
import { cn } from "@/utils/classNames";

interface HeroSectionProps {
  movies: Movie[];
}

export default function HeroSection({ movies }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featured = movies[currentIndex] ?? movies[0];

  useEffect(() => {
    if (movies.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [movies.length]);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % movies.length);

  if (movies.length === 0)
    return <div className="h-[60vh] bg-black animate-pulse" />;

  return (
    <section className="relative h-[75vh] sm:h-[80vh] lg:h-[90vh] w-full overflow-hidden bg-cinema-black">
      {/* Background Image with optimized Mobile Scale */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0">
          <Image
            src={`https://image.tmdb.org/t/p/original${featured.backdrop_path}`}
            alt={featured.title}
            fill
            className="object-cover brightness-[0.6] scale-110 sm:scale-100"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Modern Gradient: Bottom-up for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/40 to-transparent z-10" />

      {/* Content Container */}
      <div className="relative z-20 h-full flex flex-col justify-end px-5 pb-14 sm:px-12 sm:pb-20 lg:px-16">
        {/* Vibe Badge - Mobile: Smaller text/padding */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3">
          <span className="bg-electric-cyan/20 text-electric-cyan text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-md border border-electric-cyan/30 backdrop-blur-md">
            9 PM: EVENING RELAXATION
          </span>
        </motion.div>

        <motion.h1
          key={`title-${currentIndex}`}
          className="text-4xl sm:text-6xl lg:text-7xl font-bebas leading-[0.9] mb-3 max-w-[90%] sm:max-w-2xl">
          {featured.title.toUpperCase()}
        </motion.h1>

        {/* Metadata Row - Reduced sizes for mobile */}
        <div className="flex items-center gap-3 text-[12px] sm:text-sm text-zinc-400 mb-6 font-medium">
          <span className="text-green-400">98% Match</span>
          <span>{new Date(featured.release_date).getFullYear()}</span>
          <span className="border border-zinc-700 px-1 rounded-sm text-[10px]">
            4K
          </span>
          <span>{featured.runtime || "2h 14m"}</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button className="flex-1 sm:flex-none bg-[#E50914] hover:bg-red-700 text-white text-sm sm:text-base font-bold px-6 py-3 sm:px-8 sm:py-3.5 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg">
            <Play size={18} fill="currentColor" />
            Play Now
          </button>

          <button className="flex-1 sm:flex-none bg-zinc-800/80 hover:bg-zinc-700 text-white text-sm sm:text-base font-bold px-6 py-3 sm:px-8 sm:py-3.5 rounded-lg flex items-center justify-center gap-2 backdrop-blur-sm transition-colors border border-zinc-600/50">
            <Info size={18} />
            More Info
          </button>
        </div>
      </div>

      {/* Navigation : Progress Bars for Mobile, Arrows for Desktop */}
      <div className="absolute bottom-6 left-0 w-full px-5 sm:px-12 lg:px-16 z-30 flex items-center justify-between">
        {/* Slide Indicators (Progress Bars) */}
        <div className="flex gap-2 w-full max-w-[120px]">
          {movies.map((_, idx) => (
            <div
              key={idx}
              className="h-1 flex-1 bg-zinc-600 rounded-full overflow-hidden"
              onClick={() => setCurrentIndex(idx)}>
              {currentIndex === idx && (
                <motion.div
                  layoutId="progress"
                  className="h-full bg-electric-cyan"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 8, ease: "linear" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Desktop-Only Arrows to prevent mobile clutter */}
        <div className="hidden sm:flex gap-3">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full border border-zinc-500/50 text-white hover:bg-white hover:text-black transition-all">
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full border border-zinc-500/50 text-white hover:bg-white hover:text-black transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
