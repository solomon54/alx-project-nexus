// src/features/memory/memory.types.ts
export type MovieId = number;

export type DiscoveryMood =
  | "chill"
  | "intense"
  | "mind_bending"
  | "emotional"
  | "gritty"
  | "epic"
  | "uplifting";

export interface MemoryState {
  watchlist: Set<MovieId>;
  dismissed: Set<MovieId>;
  mood?: DiscoveryMood;
  genres: string[];
}
