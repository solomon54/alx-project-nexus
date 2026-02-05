// src/components/shared/SearchCombobox.tsx   ← new shared file
"use client";

import { useMovieSearch } from "@/features/movie-discovery/hooks/useMovieSearch";
import { cn } from "@/utils/classNames";
import { Search, X } from "lucide-react";
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
  placeholder = "Search movies, shows, genres...",
  className = "",
  inputClassName = "",
  showClearButton = true,
}: SearchComboboxProps) {
  const [inputValue, setInputValue] = useState(query);
  const { data } = useMovieSearch(inputValue);
  const results: Movie[] = Array.isArray(data)
    ? data
    : (data as any)?.results ?? [];

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto open/close dropdown
  useEffect(() => {
    if (inputValue.trim() && results.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    setHighlightedIndex(-1);
  }, [inputValue, results.length]);

  // Commit only on explicit action
  const commitSearch = (value: string) => {
    const trimmed = value.trim();
    setQuery(trimmed);
    setInputValue(trimmed);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
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

  const listboxId = "shared-search-suggestions";

  return (
    <div className={cn("relative flex-1", className)}>
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-metadata-grey pointer-events-none"
        size={20}
      />

      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "w-full bg-surface-grey/80 text-white placeholder:text-metadata-grey",
          "pl-11 pr-10 py-2.5 md:py-3 rounded-full border border-surface-grey/50",
          "focus:border-electric-cyan focus:ring-2 focus:ring-electric-cyan/30 focus:outline-none",
          "transition-all duration-200 shadow-sm text-sm md:text-base",
          inputClassName
        )}
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-activedescendant={
          highlightedIndex >= 0 ? `suggestion-${highlightedIndex}` : undefined
        }
        aria-label="Search movies, moods, or people"
      />

      {showClearButton && inputValue && (
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

      {/* Dropdown */}
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
  );
}
