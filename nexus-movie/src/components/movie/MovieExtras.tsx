// src/components/movie/MovieExtras.tsx
import { Movie, Provider } from "@/types/movie";
import { cn } from "@/utils/classNames";

interface MovieExtrasProps {
  movie: Movie;
  providers: Provider[];
  providerFallbacks: Record<string, string>;
}

export const MovieExtras = ({
  movie,
  providers,
  providerFallbacks,
}: MovieExtrasProps) => {
  const director =
    movie.credits?.crew?.find((c) => c.job === "Director")?.name ?? "Unknown";
  const country = movie.production_countries?.[0]?.name ?? "Unknown";
  const language = movie.original_language?.toUpperCase() ?? "EN";
  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Unknown";

  const cast = movie.credits?.cast?.slice(0, 4) ?? [];

  const uniqueProviders = Array.from(
    new Map(providers.map((p) => [p.provider_id, p])).values()
  );

  return (
    <div className="space-y-16 md:space-y-20 pt-12 pb-20 border-t border-zinc-800/60">
      {/* Providers */}
      <div>
        <h3 className="text-base md:text-lg font-semibold uppercase tracking-wide text-zinc-300 mb-6">
          Available On
        </h3>

        <div className="flex flex-wrap gap-3">
          {uniqueProviders.length > 0 ? (
            uniqueProviders.map((provider) => {
              // Priority: 1. Direct Link 2. Home Page Fallback 3. Null
              const href =
                provider.deep_link || providerFallbacks[provider.provider_name];

              const label =
                provider.monetization_type === "rent"
                  ? `Rent on ${provider.provider_name}`
                  : provider.monetization_type === "buy"
                  ? `Buy on ${provider.provider_name}`
                  : `Watch on ${provider.provider_name}`;

              return (
                <a
                  key={provider.provider_id}
                  href={href || "#"}
                  target={href ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center justify-center px-5 py-3 rounded-full text-sm md:text-base font-semibold transition-all border",
                    href
                      ? "bg-red-600/80 text-white border-red-600 hover:bg-red-600 hover:scale-[1.03] active:scale-100"
                      : "bg-zinc-800/50 text-zinc-500 border-zinc-700 cursor-not-allowed opacity-70"
                  )}>
                  {label}
                </a>
              );
            })
          ) : (
            <p className="text-zinc-500 text-base italic">
              No streaming options found in your region.
            </p>
          )}
        </div>
      </div>

      {/* Cast + Details grid */}
      <div className="grid md:grid-cols-2 gap-12 md:gap-20">
        <div>
          <h3 className="text-base md:text-lg font-semibold uppercase tracking-wide text-zinc-300 mb-6">
            Top Cast
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {cast.map((actor) => (
              <div
                key={actor.id}
                className="group flex flex-col items-center text-center">
                <div className="relative w-16 h-16 xl:w-24 xl:h-24 rounded-full overflow-hidden border-2 border-zinc-800 shadow-lg mb-3">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "/fallback-avatar.png"
                    }
                    alt={actor.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm font-medium text-zinc-200 line-clamp-1">
                  {actor.name}
                </p>
                <p className="text-xs text-zinc-500 line-clamp-1">
                  {actor.character}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Details Column */}
        <div>
          <h3 className="text-base md:text-lg font-semibold uppercase tracking-wide text-zinc-300 mb-6">
            Details
          </h3>
          <dl className="space-y-4 text-sm md:text-base">
            {[
              { label: "Director", value: director },
              { label: "Country", value: country },
              { label: "Language", value: language },
              { label: "Release", value: releaseDate },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between py-2 border-b border-zinc-800/40">
                <dt className="text-zinc-500">{item.label}</dt>
                <dd className="text-zinc-200 font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
