// src/features/memory/memory.persistence.ts
import { MemoryState, MovieId } from "./memory.types";

const STORAGE_KEY = "nexus_movie_memory";

const defaultState: MemoryState = {
  watchlist: new Set<MovieId>(),
  dismissed: new Set<MovieId>(),
  genres: [],
};

export function loadMemory(): MemoryState {
  if (typeof window === "undefined") return defaultState;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;

    const parsed = JSON.parse(raw);

    return {
      watchlist: new Set(parsed.watchlist ?? []),
      dismissed: new Set(parsed.dismissed ?? []),
      mood: parsed.mood,
      genres: parsed.genres ?? [],
    };
  } catch (err) {
    console.error("Failed to load memory from localStorage", err);
    return defaultState;
  }
}

export function saveMemory(state: MemoryState) {
  if (typeof window === "undefined") return;

  try {
    const dataToSave = {
      watchlist: Array.from(state.watchlist),
      dismissed: Array.from(state.dismissed),
      mood: state.mood,
      genres: state.genres,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (err) {
    console.error("Failed to save memory to localStorage", err);
  }
}
