//src/features/memory/memory.types.ts
export type MovieId = number;

export interface MemoryState {
  watchlist: Set<MovieId>;
  dismissed: Set<MovieId>;
}
