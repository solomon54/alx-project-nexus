//src/lib/tmdb.ts
import { Movie, Provider, Genre, ProductionCompany } from "@/types/movie";

/** * 1. RAW TMDB API RESPONSE TYPES
 * These represent the shape of the data as it arrives from TMDB.
 */
interface TMDBCast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface TMDBCrew {
  id: number;
  name: string;
  job: string;
}

interface TMDBVideo {
  key: string;
  site: string;
  type: string;
}

interface TMDBWatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string | null;
}

interface TMDBMovieResponse {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genres: Genre[];
  adult: boolean;
  original_language: string;
  production_countries: { iso_3166_1: string; name: string }[];
  production_companies: ProductionCompany[];
  videos?: { results: TMDBVideo[] };
  credits?: { cast: TMDBCast[]; crew: TMDBCrew[] };
  "watch/providers"?: {
    results: {
      US?: {
        flatrate?: TMDBWatchProvider[];
        rent?: TMDBWatchProvider[];
      };
    };
  };
}

/**
 * 2. SERVICE CONFIGURATION
 */
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/";

const genreToMoodMap: Record<number, string> = {
  18: "Intense",
  36: "Historical",
  878: "Sci-Fi",
  12: "Epic",
  28: "Action-Packed",
  35: "Quirky",
  16: "Vibrant",
  10751: "Family-Friendly",
};

/**
 * 3. HELPERS & MAPPER
 */
export const getTMDBImage = (path: string | null, size: string = "w500") =>
  path ? `${IMAGE_BASE_URL}${size}${path}` : "/placeholder-poster.jpg";

export function mapTMDBMovie(tmdbMovie: TMDBMovieResponse): Movie {
  const trailer = tmdbMovie.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  const watchProviders = tmdbMovie["watch/providers"]?.results?.US;

  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    overview: tmdbMovie.overview,
    poster_path: getTMDBImage(tmdbMovie.poster_path, "w500"),
    backdrop_path: getTMDBImage(tmdbMovie.backdrop_path, "original"),
    release_date: tmdbMovie.release_date,
    runtime: tmdbMovie.runtime,
    vote_average: tmdbMovie.vote_average,
    vote_count: tmdbMovie.vote_count,
    popularity: tmdbMovie.popularity,
    genres: tmdbMovie.genres || [],
    adult: tmdbMovie.adult,
    original_language: tmdbMovie.original_language,
    production_countries: tmdbMovie.production_countries || [],
    production_companies: tmdbMovie.production_companies || [],

    // Mapping Trailer
    trailer_key: trailer?.key || "",

    // Mapping Credits
    credits: {
      cast: (tmdbMovie.credits?.cast || []).slice(0, 10).map((c) => ({
        id: c.id,
        name: c.name,
        character: c.character,
        profile_path: getTMDBImage(c.profile_path, "w185"),
      })),
      crew: (tmdbMovie.credits?.crew || [])
        .filter((c) => c.job === "Director")
        .map((c) => ({ id: c.id, name: c.name, job: c.job })),
    },

    // Mapping Moods (Derived from genres)
    moods:
      tmdbMovie.genres
        ?.map((g) => genreToMoodMap[g.id] || "Atmospheric")
        .slice(0, 3) || [],

    // Mapping Providers (Flatrate streaming)
    providers: (watchProviders?.flatrate || []).map((p) => ({
      provider_id: p.provider_id,
      provider_name: p.provider_name,
      logo_path: getTMDBImage(p.logo_path, "w185"),
      deep_link: `https://www.themoviedb.org/movie/${tmdbMovie.id}/watch`,
      monetization_type: "flatrate",
    })),

    // Initial user states
    is_watchlisted: false,
    is_dismissed: false,
    hidden_gem_score: 0,
    isHiddenGem: undefined,
  };
}
/**
 * 4. FETCHERS
 */
export async function fetchMovieDetails(
  movieId: number
): Promise<Movie | null> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
  };

  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?append_to_response=credits,videos,watch/providers`,
      options
    );
    if (!res.ok) throw new Error("Failed to fetch movie details");

    const data: TMDBMovieResponse = await res.json();
    return mapTMDBMovie(data);
  } catch (err) {
    console.error("Error fetching TMDB details:", err);
    return null;
  }
}

/**
 * 5. LIST FETCHERS (Trending / Discovery)
 */
export async function fetchTrendingMovies(): Promise<Movie[]> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
  };

  try {
    // 1. Get the trending list
    // Inside fetchTrendingMovies in src/lib/tmdb.ts
    const res = await fetch(
      `${TMDB_BASE_URL}/trending/movie/day?language=en-US`,
      options
    );

    if (!res.ok) {
      // Add this log to see the real error code
      console.error("TMDB Error Status:", res.status);
      const errorText = await res.text();
      console.error("TMDB Error Message:", errorText);
      throw new Error(`Failed to fetch trending list: ${res.status}`);
    }
    const listData = await res.json();

    // 2. Map the IDs to full movie details
    const detailedMovies = await Promise.all(
      listData.results
        .slice(0, 20)
        .map((m: { id: number }) => fetchMovieDetails(m.id))
    );

    return detailedMovies.filter((m): m is Movie => m !== null);
  } catch (err) {
    console.error("Error in fetchTrendingMovies:", err);
    return [];
  }
}
