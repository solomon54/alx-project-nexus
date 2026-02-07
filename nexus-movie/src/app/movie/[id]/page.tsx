// src/app/movie/[id]/page.tsx
import { notFound } from "next/navigation";
import { MovieDetailsSection } from "@/components/movie/MovieDetailsSection";
import { fetchMovieDetails } from "@/lib/tmdb";
export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId)) {
    notFound();
  }

  const movie = await fetchMovieDetails(movieId);

  if (!movie) {
    notFound();
  }

  return (
    <MovieDetailsSection movie={movie} providers={movie.providers ?? []} />
  );
}
