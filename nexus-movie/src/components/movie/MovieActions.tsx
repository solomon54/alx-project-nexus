import { Provider } from "@/types/movie";
import { Bookmark, Tag, ThumbsDown } from "lucide-react";
import { Button } from "../ui/Button";

interface MovieActionsProps {
  providers: Provider[];
  onWatchNow: () => void;
  onAddToWatchlist: () => void;
  onRateVibe: () => void;
  onDismiss: () => void;
}

export const MovieActions = ({
  providers,
  onWatchNow,
  onAddToWatchlist,
  onRateVibe,
  onDismiss,
}: MovieActionsProps) => {
  const primary =
    providers.find((p) => p.monetization_type === "flatrate") ?? providers[0];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 flex-wrap">
      <Button
        onClick={onWatchNow}
        disabled={!primary?.deep_link}
        className="bg-netflix-red text-white px-8 py-6 font-bold flex items-center gap-2 rounded hover:brightness-110 min-w-[180px]">
        {primary ? `Watch on ${primary.provider_name}` : "Not Available"}
      </Button>

      <Button
        onClick={onAddToWatchlist}
        className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-6 font-semibold flex items-center gap-2 rounded border border-zinc-600 min-w-[180px]">
        <Bookmark size={18} /> Add to Watchlist
      </Button>

      <Button
        onClick={onRateVibe}
        className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-6 font-semibold flex items-center gap-2 rounded border border-zinc-600 min-w-[140px]">
        <Tag size={18} /> Rate Vibe
      </Button>

      <Button
        variant="outline"
        onClick={onDismiss}
        className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-8 py-6 font-semibold flex items-center gap-2 rounded border border-zinc-700 min-w-[160px]">
        <ThumbsDown size={18} /> Not Interested
      </Button>
    </div>
  );
};
