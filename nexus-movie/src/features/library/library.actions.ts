//src/features/library/library.actions.ts
import { supabase } from "@/lib/supabase";
import { MovieId, DiscoveryMood } from "../memory/memory.types";

export async function syncMemoryToCloud(
  userId: string,
  watchlist: MovieId[],
  dismissed: MovieId[]
) {
  if (watchlist.length > 0) {
    const watchlistData = watchlist.map((id) => ({
      user_id: userId,
      movie_id: id,
    }));
    await supabase
      .from("watchlist")
      .upsert(watchlistData, { onConflict: "user_id,movie_id" });
  }
  if (dismissed.length > 0) {
    const dismissedData = dismissed.map((id) => ({
      user_id: userId,
      movie_id: id,
    }));
    await supabase
      .from("dismissed")
      .upsert(dismissedData, { onConflict: "user_id,movie_id" });
  }
}

//Fetches everything from cloud to populate local state on login

export async function fetchUserLibrary(userId: string) {
  const [wl, ds, pr] = await Promise.all([
    supabase.from("watchlist").select("movie_id").eq("user_id", userId),
    supabase.from("dismissed").select("movie_id").eq("user_id", userId),
    supabase
      .from("preferences")
      .select("mood, genres")
      .eq("user_id", userId)
      .single(),
  ]);

  return {
    watchlist: wl.data?.map((i) => i.movie_id) || [],
    dismissed: ds.data?.map((i) => i.movie_id) || [],
    preferences: pr.data || null,
  };
}

export const cloudLibrary = {
  async addToWatchlist(userId: string, movieId: MovieId) {
    await supabase
      .from("watchlist")
      .upsert({ user_id: userId, movie_id: movieId });
    await supabase
      .from("dismissed")
      .delete()
      .match({ user_id: userId, movie_id: movieId });
  },
  async dismissMovie(userId: string, movieId: MovieId) {
    await supabase
      .from("dismissed")
      .upsert({ user_id: userId, movie_id: movieId });
    await supabase
      .from("watchlist")
      .delete()
      .match({ user_id: userId, movie_id: movieId });
  },
  async removeFromWatchlist(userId: string, movieId: MovieId) {
    await supabase
      .from("watchlist")
      .delete()
      .match({ user_id: userId, movie_id: movieId });
  },
  async updatePreferences(
    userId: string,
    mood?: DiscoveryMood,
    genres: string[] = []
  ) {
    await supabase.from("preferences").upsert(
      {
        user_id: userId,
        mood,
        genres,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );
  },
};
