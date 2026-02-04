// src/components/home/HomeHeader.tsx
"use client";

import { useMovieSearch } from "@/features/movie-discovery/hooks/useMovieSearch";
import { cn } from "@/utils/classNames";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Movie } from "@/types/movie";

interface HomeHeaderProps {
  query: string;
  setQuery: (q: string) => void;
}

export default function HomeHeader({ query, setQuery }: HomeHeaderProps) {
  // Local controlled input (decouples typing preview from committed search)
  const [inputValue, setInputValue] = useState(query);

  const { data } = useMovieSearch(inputValue);
  // Safely handle both possible shapes: array or { results: Movie[] }
  const results: Movie[] = Array.isArray(data)
    ? data
    : (data as { results?: Movie[] } | undefined)?.results ?? [];

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Avatar (hardcoded now – later from AuthContext)
  const userInitial = "S";
  const userAvatarSrc = null;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dropdown visibility: only show when typing and there are results
  useEffect(() => {
    if (inputValue.trim() && results.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    setHighlightedIndex(-1);
  }, [inputValue, results.length]);

  // Commit search (only here does the main content change)
  const commitSearch = (value: string) => {
    setQuery(value.trim());
    setInputValue(value.trim());
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur(); // remove cursor
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      e.preventDefault();
      setIsOpen(true);
      setHighlightedIndex(e.key === "ArrowDown" ? 0 : results.length - 1);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev <= 0 ? results.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && isOpen) {
        commitSearch(results[highlightedIndex].title);
      } else {
        commitSearch(inputValue);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      setHighlightedIndex(-1);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (movie: Movie) => {
    commitSearch(movie.title);
  };

  const listboxId = "search-suggestions-listbox";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-cinema-black/80 backdrop-blur-md border-b border-surface-grey/50",
        "px-4 py-3 md:px-6 lg:px-0"
      )}>
      <div className="mx-auto lg:ml-2 lg:mr-6 flex items-center justify-center gap-3 md:gap-4 lg:gap-5 max-w-full">
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

        {/* Search combobox */}
        <div className="flex-1 max-w-xl lg:max-w-2xl mx-auto relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-metadata-grey pointer-events-none"
            size={20}
          />

          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search movies, shows, genres..."
            className={cn(
              "w-full bg-surface-grey/80 text-white placeholder:text-metadata-grey",
              "pl-11 pr-10 py-2.5 md:py-3 rounded-full border border-surface-grey/50",
              "focus:border-electric-cyan focus:ring-2 focus:ring-electric-cyan/30 focus:outline-none",
              "transition-all duration-200 shadow-sm text-sm md:text-base"
            )}
            role="combobox"
            aria-expanded={isOpen}
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-activedescendant={
              highlightedIndex >= 0
                ? `suggestion-${highlightedIndex}`
                : undefined
            }
            aria-label="Search movies"
          />

          {inputValue && (
            <button
              type="button"
              onClick={() => {
                setInputValue("");
                inputRef.current?.focus();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Clear search input">
              <X size={18} />
            </button>
          )}

          {/* Dropdown suggestions */}
          {isOpen && results.length > 0 && (
            <div
              ref={dropdownRef}
              id={listboxId}
              role="listbox"
              aria-label="Search suggestions"
              className="absolute mt-2 w-full bg-zinc-900 rounded-xl shadow-2xl border border-white/10 max-h-80 overflow-y-auto z-50">
              {results.slice(0, 8).map((movie, index) => (
                <div
                  key={movie.id}
                  id={`suggestion-${index}`}
                  role="option"
                  aria-selected={highlightedIndex === index}
                  className={cn(
                    "px-4 py-3 cursor-pointer text-sm transition-colors duration-150",
                    highlightedIndex === index
                      ? "bg-zinc-700 text-white"
                      : "hover:bg-zinc-800 text-zinc-200"
                  )}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => handleSuggestionClick(movie)}>
                  <span className="font-medium">{movie.title}</span>
                  {movie.release_date && (
                    <span className="ml-2 text-xs text-zinc-500">
                      ({new Date(movie.release_date).getFullYear()})
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

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
