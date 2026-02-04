// src/app/movie/[id]/page.tsx
import { notFound } from "next/navigation";
import { MovieDetailsSection } from "@/components/movie/MovieDetailsSection";
import { mockMovieMap } from "@/lib/mockdata";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const movieId = Number(id);

  // Optional: guard against invalid IDs
  if (isNaN(movieId)) {
    notFound();
  }

  const movie = mockMovieMap.get(movieId);

  if (!movie) {
    notFound();
  }

  return (
    <MovieDetailsSection movie={movie} providers={movie.providers ?? []} />
  );
}
