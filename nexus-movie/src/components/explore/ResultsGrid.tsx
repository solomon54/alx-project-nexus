// src/components/explore/ResultsGrid.tsx
import MovieCard from "@/components/ui/MovieCard";
import { Movie } from "@/types/movie";

interface ResultsGridProps {
  movies: Movie[];
}

export default function ResultsGrid({ movies }: ResultsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.length === 0 ? (
        <p className="col-span-full text-center text-metadata-grey py-12">
          No movies match your filters yet.
        </p>
      ) : (
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            variant="grid"
            className="transition-transform hover:scale-[1.02]"
          />
        ))
      )}
    </div>
  );
}
