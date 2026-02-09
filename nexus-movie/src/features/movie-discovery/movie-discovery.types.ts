// src/features/movie-discovery/movie-discovery.types.ts

import { Movie, Provider } from "@/types/movie";

/**
 * Supported discovery moods.
 * These MUST stay abstract (not UI labels).
 */
export type DiscoveryMood =
  | "gritty"
  | "epic"
  | "chill"
  | "spooky"
  | "romantic"
  | "intense"
  | "mind_bending";

// Optional: UI-friendly labels & icons (can be imported anywhere)
export const MOOD_CONFIG = {
  gritty: { label: "Gritty", icon: "Zap" },
  epic: { label: "Epic", icon: "Flame" },
  chill: { label: "Chill", icon: "Coffee" },
  spooky: { label: "Spooky", icon: "Ghost" },
  romantic: { label: "Romantic", icon: "Heart" },
  intense: { label: "Intense", icon: "Zap" },
  mind_bending: { label: "Mind-Bending", icon: "Sparkles" },
} as const;

/**
 * Why this movie was shown to the user.
 * Useful for badges, tooltips, and ML later.
 */
export type DiscoveryReason =
  | "mood_match"
  | "trending"
  | "hidden_gem"
  | "high_rating"
  | "similar_to_watchlist";

/**
 * App-level metadata added during discovery.
 */
export interface DiscoveryMeta {
  /** 0–100 how well this matches current context */
  matchScore: number;

  /** Why this movie appeared */
  reason: DiscoveryReason;

  /** True if popularity is low but rating is high */
  isHiddenGem: boolean;

  /** Mood(s) matched during discovery */
  matchedMoods?: DiscoveryMood[];

  /** Preferred provider for user region */
  primaryProvider?: Provider;
}

/**
 * Final movie shape used by discovery features.
 * This is what hooks return to the UI.
 */
export interface DiscoverableMovie extends Movie {
  discovery: DiscoveryMeta;
}

/**
 * Options passed into discovery engines.
 * Keeps hooks clean and future-proof.
 */
export interface DiscoveryOptions {
  mood?: DiscoveryMood;
  minRating?: number;
  excludeAdult?: boolean;
  preferredProviders?: number[]; // provider_id[]
}
