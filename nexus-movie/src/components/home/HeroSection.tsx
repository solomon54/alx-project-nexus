// src/components/home/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import MovieCard from "@/components/ui/MovieCard";
import { Movie } from "@/types/movie";

interface HeroSectionProps {
  movies: Movie[];
}

export default function HeroSection({ movies }: HeroSectionProps) {
  if (movies.length === 0) {
    return (
      <div className="h-[50vh] bg-surface-grey flex items-center justify-center">
        Loading hero...
      </div>
    );
  }

  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <motion.div
        className="flex h-full"
        animate={{ x: [0, -100 * (movies.length - 1)] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          repeatType: "reverse",
        }}>
        {movies.map((movie) => (
          <motion.div key={movie.id} className="w-full flex-shrink-0 relative">
            <MovieCard movie={movie} variant="hero" />

            {/* Overlay text */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 bg-gradient-to-t from-cinema-black to-transparent">
              <h1 className="text-4xl md:text-6xl font-bebas tracking-wide">
                {movie.title}
              </h1>
              <p className="mt-3 text-lg md:text-xl text-metadata-grey max-w-2xl line-clamp-3">
                {movie.overview}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
