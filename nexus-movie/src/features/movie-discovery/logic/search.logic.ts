import { Movie } from "@/types/movie";

export function searchMovies(movies: Movie[], query: string): Movie[] {
  const q = query.trim().toLowerCase();
  if (!q) return movies;

  return movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(q) ||
      movie.overview?.toLowerCase().includes(q) ||
      movie.genres?.some((g) => g.name.toLowerCase().includes(q))
    );
  });
}
