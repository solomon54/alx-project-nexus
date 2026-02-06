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

  return (
    <div className="space-y-16 md:space-y-20 pt-12 pb-20 border-t border-zinc-800/60">
      {/* Providers – bigger, cleaner */}
      <div>
        <h3 className="text-base md:text-lg font-semibold uppercase tracking-wide text-zinc-300 mb-6">
          Available On
        </h3>

        <div className="flex flex-wrap gap-5 md:gap-6">
          <div className="flex flex-wrap gap-3">
            {providers.length > 0 ? (
              providers.map((provider) => {
                const href =
                  provider.deep_link ||
                  providerFallbacks[provider.provider_name];

                const label =
                  provider.monetization_type === "rent"
                    ? `Rent on ${provider.provider_name}`
                    : provider.monetization_type === "buy"
                    ? `Buy on ${provider.provider_name}`
                    : `Watch on ${provider.provider_name}`;

                return (
                  <a
                    key={provider.provider_id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={!href}
                    className={cn(
                      "inline-flex items-center justify-center px-5 py-3 rounded-full text-sm md:text-base font-semibold transition-all border",
                      href
                        ? "bg-red-600/80 text-white border-red-600 hover:bg-red-600 hover:scale-[1.03] active:scale-100"
                        : "bg-zinc-800 text-zinc-400 border-zinc-700 pointer-events-none"
                    )}>
                    {label}
                  </a>
                );
              })
            ) : (
              <p className="text-zinc-500 text-base">
                No streaming options available
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Cast + Details grid */}
      <div className="grid md:grid-cols-2 gap-12 md:gap-20">
        <div>
          <h3 className="text-base md:text-lg font-semibold uppercase tracking-wide text-zinc-300 mb-6">
            Top Cast
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
            {cast.map((actor) => {
              const actorImageSrc = actor.profile_path
                ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                : "/fallback-avatar.png";

              return (
                <div
                  key={actor.id}
                  className="group flex flex-col items-center text-center transition-all duration-300 hover:scale-105">
                  <div className="relative w-12 h-12 md:w-16 md:h-16 xl:w-28 xl:h-28 rounded-full overflow-hidden border-2 border-zinc-700/60 shadow-xl mb-3">
                    <img
                      src={actorImageSrc}
                      alt={actor.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = "/fallback-avatar.png";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <p className="text-sm md:text-base font-medium text-zinc-200 group-hover:text-white line-clamp-2">
                    {actor.name}
                  </p>

                  {actor.character && (
                    <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
                      {actor.character}
                    </p>
                  )}
                </div>
              );
            })}

            {cast.length === 0 && (
              <p className="col-span-full text-zinc-500 text-center py-8">
                No cast information available
              </p>
            )}
          </div>
        </div>

        {/* Details */}
        <div>
          <h3 className="text-base md:text-lg font-semibold uppercase tracking-wide text-zinc-300 mb-6">
            Details
          </h3>

          <div className="space-y-5 text-base">
            {[
              { label: "Director", value: director },
              { label: "Country", value: country },
              { label: "Language", value: language },
              { label: "Release", value: releaseDate },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center py-3 border-b border-zinc-800/60 last:border-0">
                <dt className="text-zinc-400 font-medium">{item.label}</dt>
                <dd className="text-zinc-100 font-medium text-right">
                  {item.value}
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
