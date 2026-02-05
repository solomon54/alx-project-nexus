// src/features/memory/memory.store.ts
import { MemoryState, MovieId } from "./memory.types";
import { loadMemory, saveMemory } from "./memory.persistence";

class MemoryStore {
  private state: MemoryState = loadMemory();

  // -------- queries --------
  isWatchlisted(id: MovieId) {
    return this.state.watchlist.has(id);
  }

  isDismissed(id: MovieId) {
    return this.state.dismissed.has(id);
  }

  // -------- commands --------
  addToWatchlist(id: MovieId) {
    this.state.watchlist.add(id);
    this.state.dismissed.delete(id);
    saveMemory(this.state);
  }

  dismissMovie(id: MovieId) {
    this.state.dismissed.add(id);
    this.state.watchlist.delete(id);
    saveMemory(this.state);
  }

  removeFromWatchlist(id: MovieId) {
    this.state.watchlist.delete(id);
    saveMemory(this.state);
  }

  // -------- guest → member merge --------
  mergeGuestMemory(guestState: MemoryState) {
    this.state.watchlist = new Set([
      ...this.state.watchlist,
      ...guestState.watchlist,
    ]);
    this.state.dismissed = new Set([
      ...this.state.dismissed,
      ...guestState.dismissed,
    ]);
    // remove conflicts: dismissed > watchlist
    this.state.dismissed.forEach((id) => this.state.watchlist.delete(id));

    saveMemory(this.state);
  }

  // -------- reset memory --------
  clear() {
    this.state.watchlist.clear();
    this.state.dismissed.clear();
    saveMemory(this.state);
  }
}

export const memoryStore = new MemoryStore();
