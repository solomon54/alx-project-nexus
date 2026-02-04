// src/features/movie-discovery/logic/hiddenGems.logic.ts

import { Movie } from "@/types/movie";

export interface HiddenGemResult {
  isHiddenGem: boolean;
  score: number; // 0 – 100
  reasons: string[];
}

export function calculateHiddenGemScore(movie: Movie): HiddenGemResult {
  const reasons: string[] = [];
  let score = 0;

  // 1. Quality check
  if (movie.vote_average >= 7.5) {
    score += 35;
    reasons.push("high_rating");
  } else if (movie.vote_average >= 7.0) {
    score += 20;
    reasons.push("decent_rating");
  }

  // 2. Low popularity (key signal)
  if (movie.popularity < 80) {
    score += 30;
    reasons.push("low_popularity");
  } else if (movie.popularity < 150) {
    score += 15;
  }

  // 3. Vote count
  if (movie.vote_count < 2000) {
    score += 20;
    reasons.push("low_vote_count");
  } else if (movie.vote_count < 5000) {
    score += 10;
  }

  // 4. Age bonus
  const releaseYear = new Date(movie.release_date).getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - releaseYear;

  if (age >= 8) {
    score += 10;
    reasons.push("time_tested");
  }

  // Clamp score
  score = Math.min(100, Math.max(0, score));

  return {
    isHiddenGem: score >= 60,
    score,
    reasons,
  };
}
