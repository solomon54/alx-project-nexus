// src/features/movie-discovery/logic/moodFilter.logic.ts
// src/features/movie-discovery/logic/moodFilter.logic.ts

import { Movie } from "@/types/movie";
import { DiscoveryMood } from "../movie-discovery.types";

/**
 * Mood → genre affinity mapping
 * Using Type Assertion to allow the "dark" alias while satisfying DiscoveryMood
 */
const MOOD_GENRE_MAP: Record<string, number[]> = {
  chill: [35, 10751],
  emotional: [18, 10749],
  fun: [12, 35, 16],
  intense: [28, 53, 10752],
  romantic: [10749, 35],
  mind_bending: [878, 9648],
  gritty: [18, 80, 53],
  epic: [12, 28, 36, 10752],
  spooky: [27, 9648],
  // Keep "dark" as an alias for internal mapping logic
  dark: [27, 53, 80],
};

/**
 * Maps incoming string filters to valid DiscoveryMood keys
 */
const FILTER_MOOD_TO_DISCOVERY_MOOD: Record<string, string> = {
  gritty: "gritty",
  historical: "epic",
  intense: "intense",
  "thought-provoking": "mind_bending",
  epic: "epic",
  "feel-good": "chill",
  "neon-noir": "gritty",
  romantic: "romantic",
  spooky: "spooky",
};

export function calculateMoodMatch(
  movie: Movie,
  mood: DiscoveryMood
): {
  score: number;
  matched: boolean;
  matchedGenres: number[];
} {
  //  Normalize the mood string
  const moodKey = FILTER_MOOD_TO_DISCOVERY_MOOD[mood.toLowerCase()] ?? mood;

  const targetGenres = MOOD_GENRE_MAP[moodKey];

  if (!targetGenres) {
    return { score: 0, matched: false, matchedGenres: [] };
  }

  const movieGenreIds = movie.genre_ids?.length
    ? movie.genre_ids
    : movie.genres?.map((g: any) => g.id) ?? [];

  if (!movieGenreIds.length) {
    return { score: 0, matched: false, matchedGenres: [] };
  }

  const matchedGenres = movieGenreIds.filter((id) => targetGenres.includes(id));

  const genreScore =
    (matchedGenres.length / Math.max(targetGenres.length, 1)) * 70;

  const ratingBonus =
    movie.vote_average >= 7.5 ? 30 : movie.vote_average >= 6.5 ? 15 : 0;

  const finalScore = Math.min(100, Math.max(0, genreScore + ratingBonus));

  return {
    score: Math.round(finalScore),
    matched: finalScore >= 45,
    matchedGenres,
  };
}
