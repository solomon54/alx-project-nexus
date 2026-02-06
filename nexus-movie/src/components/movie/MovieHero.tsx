"use client";

import { Play, X } from "lucide-react";
import { Movie } from "@/types/movie";
import { Button } from "@/components/ui/Button";

interface MovieHeroProps {
  movie: Movie;
  playing: boolean;
  onPlay: () => void;
  onClose: () => void;
}

export const MovieHero = ({
  movie,
  playing,
  onPlay,
  onClose,
}: MovieHeroProps) => {
  const backdrop = movie.backdrop_path?.startsWith("http")
    ? movie.backdrop_path
    : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const trailerUrl = movie.trailer_key
    ? `https://www.youtube.com/embed/${movie.trailer_key}?autoplay=1&unmute=1&rel=0`
    : null;

  return (
    <div className="relative h-[55vh] md:h-[70vh] bg-black overflow-hidden">
      {playing && trailerUrl ? (
        <>
          <iframe
            className="w-full h-full"
            src={trailerUrl}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
          <Button
            onClick={onClose}
            className="absolute top-6 right-6 rounded-full bg-cinema-black/60 hover:bg-cinema-black p-2">
            <X />
          </Button>
        </>
      ) : (
        <>
          <img
            src={backdrop || "/assets/fallback-backdrop.jpg"}
            alt={movie.title}
            className="w-full h-full object-cover scale-105 opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-black/70 to-transparent" />
          <button
            onClick={onPlay}
            className="absolute inset-0 flex items-center justify-center group">
            <span className="relative flex items-center justify-center w-20 h-20 rounded-full bg-netflix-red shadow-2xl group-hover:scale-110 transition-transform">
              <Play size={32} fill="white" />
              <span className="absolute inset-0 rounded-full bg-netflix-red/40 animate-ping" />
            </span>
          </button>
        </>
      )}
    </div>
  );
};
