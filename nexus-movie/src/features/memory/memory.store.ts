import { MemoryState, MovieId } from "./memory.types";
import { loadMemory, saveMemory } from "./memory.persistence";

type Listener = () => void;

class MemoryStore {
  private state: MemoryState = loadMemory();
  private listeners = new Set<Listener>();

  // -------- internal --------
  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  // -------- react bridge --------
  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getState() {
    return this.state;
  }

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
    this.notify();
  }

  dismissMovie(id: MovieId) {
    this.state.dismissed.add(id);
    this.state.watchlist.delete(id);
    saveMemory(this.state);
    this.notify();
  }

  removeFromWatchlist(id: MovieId) {
    this.state.watchlist.delete(id);
    saveMemory(this.state);
    this.notify();
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

    // dismissed > watchlist
    this.state.dismissed.forEach((id) => this.state.watchlist.delete(id));

    saveMemory(this.state);
    this.notify();
  }

  // -------- reset memory --------
  clear() {
    this.state.watchlist.clear();
    this.state.dismissed.clear();
    saveMemory(this.state);
    this.notify();
  }
}

export const memoryStore = new MemoryStore();
