import { Movie, Provider } from "@/types/movie";

export interface MovieDecision {
  primaryProvider?: Provider;
  canWatchNow: boolean;
  canAddToWatchlist: boolean;
  canDismiss: boolean;
  isHiddenGem: boolean;
}

export function decideMovie(movie: Movie): MovieDecision {
  const primaryProvider =
    movie.providers?.find((p) => p.monetization_type === "flatrate") ??
    movie.providers?.[0];

  const isHiddenGem = movie.hidden_gem_score > 0.75 && movie.vote_count > 500;

  return {
    primaryProvider,
    canWatchNow: Boolean(primaryProvider?.deep_link),
    canAddToWatchlist: !movie.is_watchlisted,
    canDismiss: !movie.is_dismissed,
    isHiddenGem,
  };
}
