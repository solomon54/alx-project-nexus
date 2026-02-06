import MovieCard from "@/components/ui/MovieCard";
import { memoryStore } from "@/features/memory/memory.store";
import { Movie } from "@/types/movie";

interface ResultsGridProps {
  movies: Movie[];
  onWatchlistToggle?: (id: number) => void;
  onDismiss?: (id: number) => void;
}

export default function ResultsGrid({
  movies,
  onDismiss,
  onWatchlistToggle,
}: ResultsGridProps) {
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
            onWatchlistToggle={onWatchlistToggle}
            onDismiss={onDismiss}
            isSaved={memoryStore.isWatchlisted(movie.id)}
          />
        ))
      )}
    </div>
  );
}
