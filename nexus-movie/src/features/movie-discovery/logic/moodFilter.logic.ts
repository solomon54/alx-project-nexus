// src/features/movie-discovery/logic/moodFilter.logic.ts

import { Movie } from "@/types/movie";
import { DiscoveryMood } from "../movie-discovery.types";

/**
 * Mood → genre affinity mapping
 */
const MOOD_GENRE_MAP: Record<DiscoveryMood, number[]> = {
  chill: [35, 10751],
  dark: [27, 53, 80],
  emotional: [18, 10749],
  fun: [12, 35, 16],
  intense: [28, 53, 10752],
  romantic: [10749, 35],
  mind_bending: [878, 9648],

  gritty: [18, 80, 53],
  epic: [12, 28, 36, 10752],
  spooky: [27, 9648],
};

const FILTER_MOOD_TO_DISCOVERY_MOOD: Record<string, DiscoveryMood> = {
  gritty: "gritty",
  historical: "epic",
  intense: "intense",
  "thought-provoking": "mind_bending",
  epic: "epic",
  "feel-good": "chill",
  "neon-noir": "dark",
  romantic: "romantic",
  spooky: "spooky",
};

/**
 * Calculates how well a movie matches a given mood.
 */
export function calculateMoodMatch(
  movie: Movie,
  mood: DiscoveryMood
): {
  score: number;
  matched: boolean;
  matchedGenres: number[];
} {
  const moodKey = FILTER_MOOD_TO_DISCOVERY_MOOD[mood.toLowerCase()] ?? mood;

  const targetGenres = MOOD_GENRE_MAP[moodKey];
  if (!targetGenres) {
    return { score: 0, matched: false, matchedGenres: [] };
  }

  const movieGenreIds = movie.genre_ids?.length
    ? movie.genre_ids
    : movie.genres?.map((g) => g.id) ?? [];

  if (!movieGenreIds.length) {
    return { score: 0, matched: false, matchedGenres: [] };
  }

  const matchedGenres = movieGenreIds.filter((id) => targetGenres.includes(id));

  const genreScore = (matchedGenres.length / targetGenres.length) * 60;

  const ratingBonus =
    movie.vote_average >= 7.5 ? 20 : movie.vote_average >= 6.5 ? 10 : 0;

  const popularityPenalty = movie.popularity > 500 ? -10 : 0;

  const finalScore = Math.min(
    100,
    Math.max(0, genreScore + ratingBonus + popularityPenalty)
  );

  return {
    score: Math.round(finalScore),
    matched: finalScore >= 40,
    matchedGenres,
  };
}
