// src/app/movie/[id]/page.tsx
import { notFound } from "next/navigation";
import { MovieDetailsSection } from "@/components/movie/MovieDetailsSection";
import { fetchMovieDetails } from "@/lib/tmdb"; // Import the real fetcher

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Await the params (Required in newer Next.js versions)
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId)) {
    notFound();
  }

  // 2. Fetch real data from TMDB (Server-side)
  // This uses your secret token securely
  const movie = await fetchMovieDetails(movieId);

  // 3. If TMDB doesn't return a movie, show 404
  if (!movie) {
    notFound();
  }

  // 4. Render the section with real data
  return (
    <MovieDetailsSection movie={movie} providers={movie.providers ?? []} />
  );
}
