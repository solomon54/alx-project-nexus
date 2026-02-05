// src/features/memory/memory.persistence.ts
import { MemoryState, MovieId } from "./memory.types";

const STORAGE_KEY = "memoryStore";

// default empty memory
const defaultState: MemoryState = {
  watchlist: new Set<MovieId>(),
  dismissed: new Set<MovieId>(),
};

export function loadMemory(): MemoryState {
  if (typeof window === "undefined") return defaultState; // SSR safety

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;

    const parsed = JSON.parse(raw);
    return {
      watchlist: new Set(parsed.watchlist ?? []),
      dismissed: new Set(parsed.dismissed ?? []),
    };
  } catch (err) {
    console.error("Failed to load memory from localStorage", err);
    return defaultState;
  }
}

export function saveMemory(state: MemoryState) {
  if (typeof window === "undefined") return; // SSR safety

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        watchlist: Array.from(state.watchlist),
        dismissed: Array.from(state.dismissed),
      })
    );
  } catch (err) {
    console.error("Failed to save memory to localStorage", err);
  }
}
