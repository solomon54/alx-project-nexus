// src/features/movie-discovery/logic/moodFilter.logic.ts

import { Movie } from "@/types/movie";
import { DiscoveryMood } from "../movie-discovery.types";

/**
 * Mood → genre affinity mapping
 * (Domain knowledge, not UI)
 * Updated to include moods from FloatingMoodButton
 */
const MOOD_GENRE_MAP: Record<DiscoveryMood, number[]> = {
  chill: [35, 10751], // Comedy, Family (Feel-Good)
  dark: [27, 53, 80], // Horror, Thriller, Crime
  emotional: [18, 10749], // Drama, Romance
  fun: [12, 35, 16], // Adventure, Comedy, Animation
  intense: [28, 53, 10752], // Action, Thriller, War
  romantic: [10749, 35], // Romance, Comedy
  mind_bending: [878, 9648], // Sci-Fi, Mystery
  // Add mappings for button moods (adjust based on your domain logic)
  gritty: [18, 80, 53], // Drama, Crime, Thriller (e.g., intense stories)
  epic: [12, 28, 36, 10752], // Adventure, Action, History, War (e.g., grand scale)
  spooky: [27, 9648], // Horror, Mystery
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
  const targetGenres = MOOD_GENRE_MAP[mood];
  if (!targetGenres) {
    return { score: 0, matched: false, matchedGenres: [] };
  }

  // Handle both genre_ids (discover API) and genres (details API/mock)
  const movieGenreIds = movie.genre_ids?.length
    ? movie.genre_ids
    : movie.genres?.map((g) => g.id) ?? [];

  if (!movieGenreIds.length) {
    return { score: 0, matched: false, matchedGenres: [] };
  }

  const matchedGenres = movieGenreIds.filter((id) => targetGenres.includes(id));

  // Base score from genre overlap
  const genreScore = (matchedGenres.length / targetGenres.length) * 60;

  // Bonus for high rating
  const ratingBonus =
    movie.vote_average >= 7.5 ? 20 : movie.vote_average >= 6.5 ? 10 : 0;

  // Bonus for popularity control (avoid only mainstream)
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
