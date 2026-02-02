import MovieCard from "@/components/ui/MovieCard";

interface MovieRowProps {
  title: string;
  movies: any[]; // → Movie[] later
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  return (
    <section className="px-4 py-6">
      <h2 className="text-2xl md:text-3xl font-bebas mb-4">{title}</h2>
      <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
