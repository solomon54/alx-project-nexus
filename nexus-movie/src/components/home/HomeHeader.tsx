// src/components/home/HomeHeader.tsx
"use client";

import { Search, User } from "lucide-react";
import Image from "next/image";
import { cn } from "@/utils/classNames";

export default function HomeHeader() {
  const userInitial = "S";
  const userAvatarSrc = null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-cinema-black/80 backdrop-blur-md border-b border-surface-grey/50",
        "px-4 py-3 md:px-6 lg:px-8"
      )}>
      <div className="mx-auto flex items-center justify-between gap-4 md:gap-6 lg:gap-0">
        {/* Left: Logo – always pinned left */}
        <div className="flex items-center shrink-0">
          <div
            className={cn(
              "bg-netflix-red text-white font-bebas font-bold",
              "text-2xl sm:text-3xl px-3 py-1 rounded-md tracking-tight shadow-sm"
            )}>
            N
          </div>
        </div>

        {/* Center: Search bar – grows on larger screens */}
        <div className="flex-1 max-w-xl lg:max-w-2xl mx-auto relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-metadata-grey pointer-events-none"
            size={20}
          />
          <input
            type="text"
            placeholder="Search movies, shows, genres..."
            aria-label="Search movies, shows, or genres"
            className={cn(
              "w-full bg-surface-grey/80 text-white placeholder:text-metadata-grey",
              "pl-11 pr-4 py-2.5 md:py-3 rounded-full border border-surface-grey/50",
              "focus:border-electric-cyan focus:ring-2 focus:ring-electric-cyan/30 focus:outline-none",
              "transition-all duration-200 shadow-sm text-sm md:text-base"
            )}
          />
        </div>

        {/* Right: Profile Avatar – always pinned right */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden bg-surface-grey border-2 border-electric-cyan/30 shadow-md transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-electric-cyan"
            aria-label="Open profile menu">
            {userAvatarSrc ? (
              <Image
                src={userAvatarSrc}
                alt="User profile avatar"
                width={40}
                height={40}
                className="object-cover w-full h-full"
                priority
              />
            ) : (
              // Fallback: Initials or icon
              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-electric-cyan/20 to-surface-grey text-electric-cyan font-medium text-base md:text-lg">
                {userInitial}
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
