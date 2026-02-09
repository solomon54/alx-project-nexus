// src/components/movie/MovieActions.tsx
import { Provider } from "@/types/movie";
import { Bookmark, Tag, ThumbsDown } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/utils/classNames";
import { useMounted } from "@/features/movie-discovery/hooks/useMounted";

interface MovieActionsProps {
  providers: Provider[];
  onWatchNow: () => void;
  onAddToWatchlist: () => void;
  onRateVibe: () => void;
  onDismiss: () => void;
  isWatchlisted: boolean;
  isDismissed: boolean;
}

export const MovieActions = ({
  providers,
  onWatchNow,
  onAddToWatchlist,
  onRateVibe,
  onDismiss,
  isWatchlisted,
  isDismissed,
}: MovieActionsProps) => {
  const mounted = useMounted();

  const primary =
    providers.find((p) => p.monetization_type === "flatrate") ?? providers[0];

  if (!mounted) {
    // render SSR-safe
    return (
      <div className="flex flex-col sm:flex-row gap-4 mb-8 flex-wrap">
        <Button
          disabled
          className="bg-zinc-800 text-zinc-400 px-8 py-2 sm:py-4 font-bold rounded min-w-[180px]">
          Watch
        </Button>

        <Button
          disabled
          className="bg-zinc-800 text-zinc-400 px-8 py-2 sm:py-4 font-semibold rounded min-w-[180px]">
          Add to Watchlist
        </Button>
      </div>
    );
  }

  //  real client render starts here
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 flex-wrap">
      <Button
        onClick={onWatchNow}
        disabled={!primary?.deep_link}
        className="bg-netflix-red text-white px-8 py-2 sm:py-4 font-bold flex items-center gap-2 rounded hover:brightness-110 min-w-[180px]">
        {primary ? `Watch on ${primary.provider_name}` : "Not Available"}
      </Button>

      <Button
        onClick={onAddToWatchlist}
        className={cn(
          "px-8 py-2 sm:py-4 font-semibold flex items-center gap-2 rounded border min-w-[180px]",
          isWatchlisted
            ? "bg-green-600 hover:bg-green-700 text-white border-green-700"
            : "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-600"
        )}>
        <Bookmark size={18} />
        {isWatchlisted ? "In Watchlist" : "Add to Watchlist"}
      </Button>

      <Button
        onClick={onRateVibe}
        className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-2 sm:py-4 font-semibold flex items-center gap-2 rounded border border-zinc-600 min-w-[140px]">
        <Tag size={18} /> Rate Vibe
      </Button>

      <Button
        onClick={onDismiss}
        className={cn(
          "px-8 py-2 sm:py-4 font-semibold flex items-center gap-2 rounded border min-w-[160px]",
          isDismissed
            ? "bg-red-600 hover:bg-red-700 text-white border-red-700"
            : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700"
        )}>
        <ThumbsDown size={18} />
        {isDismissed ? "Dismissed" : "Not Interested"}
      </Button>
    </div>
  );
};
