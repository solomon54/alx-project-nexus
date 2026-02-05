//src/features/movie-discovery/logic/movieDecision.logic.ts
import { Movie } from "@/types/movie";

export type MovieDecision = "neutral" | "watchlist" | "dismissed";

export type DecidedMovie = Movie & {
  is_watchlisted?: boolean;
  is_dismissed?: boolean;
  decision: MovieDecision;
};

export function decideMovie<
  T extends Movie & { is_watchlisted?: boolean; is_dismissed?: boolean }
>(movie: T): DecidedMovie {
  if (movie.is_dismissed) {
    return { ...movie, decision: "dismissed" };
  }

  if (movie.is_watchlisted) {
    return { ...movie, decision: "watchlist" };
  }

  return { ...movie, decision: "neutral" };
}
