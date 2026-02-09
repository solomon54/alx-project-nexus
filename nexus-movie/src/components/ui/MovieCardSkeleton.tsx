import React from "react";
import { cn } from "@/utils/classNames";

interface MovieCardSkeletonProps {
  variant?: "grid" | "row";
}

const MovieCardSkeleton: React.FC<MovieCardSkeletonProps> = ({
  variant = "row",
}) => {
  return (
    <div
      className={cn(
        "shrink-0 animate-pulse",
        variant === "row" ? "w-[140px] sm:w-[200px]" : "w-full"
      )}>
      {/* 1. Poster Aspect Ratio (matches MovieCard 2/3) */}
      <div className="relative aspect-[2/3] w-full bg-zinc-800 rounded-xl shadow-lg overflow-hidden">
        {/* Shimmer Effect overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-zinc-700/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      </div>

      {/* 2. Info Section (Matches MovieCard text placeholders) */}
      <div className="mt-3 px-1 space-y-2">
        {/* Title Placeholder */}
        <div className="h-4 w-3/4 bg-zinc-800 rounded" />

        {/* Metadata Placeholder (Rating & Year) */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-8 bg-zinc-800 rounded" />
          <div className="h-3 w-1 bg-zinc-800 rounded-full" />
          <div className="h-3 w-10 bg-zinc-800 rounded" />
        </div>

        {/* 3. Mood Tags Placeholder (Visible on Tablet/Desktop) */}
        <div className="hidden sm:flex gap-1 pt-1">
          <div className="h-4 w-12 bg-zinc-800 rounded-md" />
          <div className="h-4 w-12 bg-zinc-800 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
