// src/components/home/HomeHeader.tsx
"use client";

import SearchCombobox from "@/components/shared/SearchComboBox";
import Image from "next/image";
import { cn } from "@/utils/classNames";

interface HomeHeaderProps {
  query: string;
  setQuery: (q: string) => void;
}

export default function HomeHeader({ query, setQuery }: HomeHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-cinema-black/80 backdrop-blur-md border-b border-surface-grey/50",
        "px-4 py-3 md:px-6 lg:px-8"
      )}>
      <div className="mx-auto flex items-center justify-between gap-4 md:gap-6 lg:gap-8 max-w-7xl">
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <div
            className={cn(
              "bg-netflix-red text-white font-bebas font-bold",
              "text-2xl sm:text-3xl px-3 py-1 rounded-md tracking-tight shadow-sm"
            )}>
            N
          </div>
        </div>

        {/* Search */}
        <SearchCombobox
          query={query}
          setQuery={setQuery}
          className="flex-1 max-w-xl lg:max-w-2xl mx-auto"
          inputClassName="md:py-3"
        />

        {/* Profile Avatar */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            className={cn(
              "w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden",
              "bg-surface-grey border-2 border-electric-cyan/30 shadow-md",
              "transition-transform hover:scale-105 active:scale-95",
              "focus:outline-none focus:ring-2 focus:ring-electric-cyan focus:ring-offset-2 focus:ring-offset-cinema-black"
            )}
            aria-label="Open profile menu">
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-electric-cyan/20 to-surface-grey text-electric-cyan font-medium text-base md:text-lg">
              S
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
