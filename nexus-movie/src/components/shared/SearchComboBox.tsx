//src/components/shared/SearchComboBox.tsx
"use client";

import { useMovieSearch } from "@/features/movie-discovery/hooks/useMovieSearch";
import { cn } from "@/utils/classNames";
import { Search, X, Loader2 } from "lucide-react";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Movie } from "@/types/movie";

interface SearchComboboxProps {
  query: string;
  setQuery: (q: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  showClearButton?: boolean;
}

export default function SearchCombobox({
  query,
  setQuery,
  placeholder = "Search movies, moods, or people...",
  className = "",
  inputClassName = "",
  showClearButton = true,
}: SearchComboboxProps) {
  const [inputValue, setInputValue] = useState(query);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // useMovieSearch now handles debouncing internally
  const { data: results = [], isLoading } = useMovieSearch(inputValue);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync internal state if query prop changes externally
  useEffect(() => {
    setInputValue(query);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Control dropdown visibility
  useEffect(() => {
    if (inputValue.trim().length > 1 && (results.length > 0 || isLoading)) {
      setIsOpen(true);
    } else if (inputValue.trim().length <= 1) {
      setIsOpen(false);
    }
    setHighlightedIndex(-1);
  }, [inputValue, results.length, isLoading]);

  const commitSearch = (value: string) => {
    const trimmed = value.trim();
    setQuery(trimmed);
    setInputValue(trimmed);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % results.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev <= 0 ? results.length - 1 : prev - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && results[highlightedIndex]) {
          commitSearch(results[highlightedIndex].title);
        } else {
          commitSearch(inputValue);
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  return (
    <div className={cn("relative flex-1 group", className)}>
      {/* Search/Loading Icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-metadata-grey z-10">
        {isLoading ? (
          <Loader2 className="animate-spin text-electric-cyan" size={18} />
        ) : (
          <Search
            size={18}
            className="group-focus-within:text-electric-cyan transition-colors"
          />
        )}
      </div>

      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "w-full bg-zinc-900/50 text-white placeholder:text-zinc-500",
          "pl-11 pr-10 py-2.5 rounded-full border border-white/10",
          "focus:border-electric-cyan/50 focus:ring-4 focus:ring-electric-cyan/10 focus:outline-none",
          "transition-all duration-200 text-sm md:text-base",
          inputClassName
        )}
      />

      {showClearButton && inputValue && (
        <button
          type="button"
          onClick={() => {
            setInputValue("");
            setQuery("");
            inputRef.current?.focus();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
          <X size={16} />
        </button>
      )}

      {/* Dropdown Results */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute mt-2 w-full bg-zinc-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 max-h-80 overflow-y-auto z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
          {results.length > 0 ? (
            results.slice(0, 8).map((movie, index) => (
              <div
                key={movie.id}
                className={cn(
                  "px-4 py-3 cursor-pointer flex items-center justify-between transition-colors",
                  highlightedIndex === index
                    ? "bg-white/10 text-white"
                    : "text-zinc-300 hover:bg-white/5"
                )}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => commitSearch(movie.title)}>
                <div className="flex flex-col">
                  <span className="font-medium line-clamp-1">
                    {movie.title}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "N/A"}
                  </span>
                </div>
                {movie.vote_average > 0 && (
                  <span className="text-[10px] font-bold bg-zinc-800 px-1.5 py-0.5 rounded text-electric-cyan">
                    {movie.vote_average.toFixed(1)}
                  </span>
                )}
              </div>
            ))
          ) : !isLoading && inputValue.length > 2 ? (
            <div className="px-4 py-6 text-center text-zinc-500 text-sm">
              No movies found for &quot;{inputValue}&quot;
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
