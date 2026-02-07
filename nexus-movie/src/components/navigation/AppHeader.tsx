//src/components/navigation/AppHeader.tsx;
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/utils/classNames";
import SearchCombobox from "@/components/shared/SearchComboBox";
import UserProfileNav from "./UserProfileNav";
import { User } from "@/types/user";

interface AppHeaderProps {
  query: string;
  setQuery: (q: string) => void;
  searchPlaceholder?: string;
  user?: User | null;
  isGuest?: boolean;
  children?: React.ReactNode;
  variant?: "home" | "explore" | "profile";
}

export default function AppHeader({
  query,
  setQuery,
  searchPlaceholder = "Search movies, moods...",
  user,
  isGuest,
  children,
  variant = "home",
}: AppHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 ease-in-out border-b",
        "px-4 py-3 md:px-8",
        isScrolled
          ? "bg-zinc-950/95 backdrop-blur-xl border-white/10 shadow-2xl"
          : "bg-black/20 backdrop-blur-md border-transparent"
      )}>
      <div className="max-w-7xl mx-auto space-y-3 md:space-y-0">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-red-600/20 rounded-md blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-red-600 text-white font-bold text-xl sm:text-2xl  px-3 py-1 rounded-md tracking-tight shadow-lg active:scale-95 transition-transform">
                N
              </div>
            </div>
          </Link>

          {/* Desktop Search (Hidden on Mobile) */}
          <div className="hidden md:block flex-1 max-w-xl mx-auto">
            <SearchCombobox
              query={query}
              setQuery={setQuery}
              placeholder={searchPlaceholder}
              inputClassName="bg-white/5 border-white/10 focus:border-electric-cyan/50"
            />
          </div>

          <div className="shrink-0">
            <UserProfileNav />
          </div>
        </div>

        {/* BOTTOM ROW: Mobile Search */}
        <div className="md:hidden w-full animate-in fade-in slide-in-from-top-1 duration-300">
          <SearchCombobox
            query={query}
            setQuery={setQuery}
            placeholder={searchPlaceholder}
            inputClassName="bg-white/5 border-white/10 h-10 text-sm"
          />
        </div>

        {/* EXTRA SLOT */}
        {children && (
          <div className="mt-2 pt-2 border-t border-white/5">{children}</div>
        )}
      </div>
    </header>
  );
}
