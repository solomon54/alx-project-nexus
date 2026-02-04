import { Movie, Provider } from "@/types/movie";

interface MovieExtrasProps {
  movie: Movie;
  providers: Provider[];
}

export const MovieExtras = ({ movie, providers }: MovieExtrasProps) => {
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
          {providers.length > 0 ? (
            providers.map((provider) => {
              const logoSrc =
                (provider as any).custom_logo ||
                (provider.logo_path
                  ? `https://image.tmdb.org/t/p/original${provider.logo_path}`
                  : null);

              return (
                <a
                  key={provider.provider_id}
                  href={provider.deep_link ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-zinc-900/80 border border-zinc-700/70 hover:border-red-600/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-100">
                  {logoSrc ? (
                    <img
                      src={logoSrc}
                      alt={provider.provider_name}
                      className="w-full h-full object-contain p-4 md:p-5 transition-all group-hover:brightness-110"
                      onError={(e) => {
                        e.currentTarget.src = "/fallback-provider.png";
                        e.currentTarget.classList.remove("p-4", "p-5");
                        e.currentTarget.classList.add("p-3");
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950">
                      <span className="text-xl md:text-2xl font-bold text-zinc-400 tracking-wider">
                        {provider.provider_name.slice(0, 3).toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* Name tooltip */}
                  <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 bg-zinc-900/95 text-zinc-200 text-xs md:text-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-zinc-700/80 shadow-md">
                    {provider.provider_name}
                  </span>
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

      {/* Cast + Details grid */}
      <div className="grid md:grid-cols-2 gap-12 md:gap-20">
        <div>
          <h3 className="text-base md:text-lg font-semibold uppercase tracking-wide text-zinc-300 mb-6">
            Top Cast
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
            {cast.map((actor) => (
              <div
                key={actor.id}
                className="group flex flex-col items-center text-center transition-all duration-300 hover:scale-105">
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-zinc-700/60 shadow-xl mb-3">
                  <img
                    src={
                      "/fallback-avatar.png" //
                    }
                    alt={actor.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
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
            ))}

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
