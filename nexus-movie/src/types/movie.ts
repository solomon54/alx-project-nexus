// src/types/movie.ts

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path: string | null;
  deep_link?: string;
  monetization_type?: "flatrate" | "rent" | "buy" | "free" | "ads";
}

// Core TMDB
export interface Movie {
  isHiddenGem: unknown;
  id: number;
  title: string;
  original_title?: string;
  original_language?: string;
  overview: string;
  tagline?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime?: number;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genres: Genre[];
  genre_ids?: number[];
  adult: boolean;

  // Trailer / video
  video?: boolean;
  trailer_key?: string;
  credits: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string;
    }[];

    crew: { id: number; name: string; job: string }[];
  };

  // App-derived
  moods?: string[];
  providers?: Provider[];
  hidden_gem_score?: number;

  // User state
  is_watchlisted?: boolean;
  is_dismissed?: boolean;

  // Optional extras
  budget?: number;
  revenue?: number;
  homepage?: string;
  imdb_id?: string;
  production_companies?: ProductionCompany[];
  production_countries: { iso_3166_1: string; name: string }[];
}

// Paginated list response (discover/trending/search)
export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// For loading / skeletons
export type MoviePlaceholder = Partial<Movie> & {
  id: string | number;
  isPlaceholder: true;
};
