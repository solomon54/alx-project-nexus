import { Movie } from "@/types/movie";
import { Badge } from "../ui/Badge";
import { Star } from "lucide-react";

function formatRuntime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

export const MovieMeta = ({ movie }: { movie: Movie }) => (
  <>
    <h1 className="font-bebas text-xl sm:text-2xl md:text-4xl lg:text-5xl uppercase tracking-tight mb-4 md:mb-6 leading-none">
      {movie.title}
    </h1>
    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-lg text-zinc-300 mb-6 md:mb-8">
      <span>{new Date(movie.release_date).getFullYear()}</span>
      <span>{movie.runtime ? formatRuntime(movie.runtime) : "—"}</span>
      <span className="hidden sm:inline">•</span>
      <span>{movie.genres?.map((g) => g.name).join(" • ") || "—"}</span>
      <span className="flex items-center gap-1.5 text-yellow-400 font-medium">
        <Star size={20} fill="currentColor" /> {movie.vote_average.toFixed(1)}
      </span>
    </div>
    <p className="text-sm md:text-base leading-relaxed text-zinc-200 max-w-3xl mb-8 md:mb-10">
      {movie.overview}
    </p>
    <div className="flex flex-wrap gap-2.5 mb-6 md:mb-8">
      {movie.moods?.map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          className="bg-zinc-800/80 text-zinc-200 px-4 py-1.5 text-sm rounded-full border border-zinc-700/50 backdrop-blur-sm">
          {tag}
        </Badge>
      ))}
    </div>
  </>
);
