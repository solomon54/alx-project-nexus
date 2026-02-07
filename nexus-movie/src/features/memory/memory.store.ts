//src/features/memory/memory.store.ts
import { MemoryState, MovieId, DiscoveryMood } from "./memory.types";
import { loadMemory, saveMemory } from "./memory.persistence";
import { cloudLibrary, syncMemoryToCloud } from "../library/library.actions";

type Listener = () => void;

class MemoryStore {
  private state: MemoryState = loadMemory();
  private listeners = new Set<Listener>();

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getState() {
    return this.state;
  }

  isWatchlisted(id: MovieId) {
    return this.state.watchlist.has(id);
  }
  isDismissed(id: MovieId) {
    return this.state.dismissed.has(id);
  }
  getMood(): DiscoveryMood | undefined {
    return this.state.mood;
  }
  getGenres(): string[] {
    return this.state.genres;
  }
  getWatchlist(): MovieId[] {
    return Array.from(this.state.watchlist);
  }
  getDismissed(): MovieId[] {
    return Array.from(this.state.dismissed);
  }

  async addToWatchlist(id: MovieId, userId?: string) {
    this.state.watchlist.add(id);
    this.state.dismissed.delete(id);
    this.persist();
    if (userId) await cloudLibrary.addToWatchlist(userId, id);
  }

  async dismissMovie(id: MovieId, userId?: string) {
    this.state.dismissed.add(id);
    this.state.watchlist.delete(id);
    this.persist();
    if (userId) await cloudLibrary.dismissMovie(userId, id);
  }

  async removeFromWatchlist(id: MovieId, userId?: string) {
    this.state.watchlist.delete(id);
    this.persist();
    if (userId) await cloudLibrary.removeFromWatchlist(userId, id);
  }

  async setMood(mood: DiscoveryMood, userId?: string) {
    this.state.mood = mood;
    this.persist();
    if (userId)
      await cloudLibrary.updatePreferences(userId, mood, this.state.genres);
  }

  async setGenres(genres: string[], userId?: string) {
    this.state.genres = genres;
    this.persist();
    if (userId)
      await cloudLibrary.updatePreferences(userId, this.state.mood, genres);
  }

  //IMPORTANT: Merges local guest data with cloud data

  async mergeGuestMemory(guestState: MemoryState, userId: string) {
    const localWatchlist = this.getWatchlist();
    const localDismissed = this.getDismissed();

    // Push local to cloud
    if (localWatchlist.length > 0 || localDismissed.length > 0) {
      await syncMemoryToCloud(userId, localWatchlist, localDismissed);
    }
  }

  hydrateFromCloud(watchlist: MovieId[], dismissed: MovieId[], prefs: any) {
    // Merge cloud arrays into existing Sets to prevent data loss
    watchlist.forEach((id) => this.state.watchlist.add(id));
    dismissed.forEach((id) => this.state.dismissed.add(id));

    // Dismissed takes priority over watchlist
    dismissed.forEach((id) => this.state.watchlist.delete(id));

    if (prefs) {
      this.state.mood = prefs.mood || this.state.mood;
      this.state.genres = prefs.genres || this.state.genres;
    }
    this.persist();
  }

  clear() {
    this.state.watchlist.clear();
    this.state.dismissed.clear();
    this.state.genres = [];
    this.state.mood = undefined;
    this.persist();
  }

  private persist() {
    saveMemory(this.state);
    this.notify();
  }
}

export const memoryStore = new MemoryStore();
