// src/components/home/HomeSection.tsx
import HomeHeader from "./HomeHeader";
import HeroSection from "./HeroSection";
import MovieRow from "./MovieRow";
import FloatingMoodButton from "./FloatingMoodButton";
import { Movie } from "@/types/movie"; // Real type!

// Temporary mock data (remove when Engine hook is ready)
const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Dune: Part Two",
    overview: "Paul Atreides unites with Chani...",
    poster_path: "/poster-dune.jpg", // Replace with real TMDB path later
    backdrop_path: "/backdrop-dune.jpg",
    release_date: "2024-03-01",
    vote_average: 8.5,
    vote_count: 4500,
    popularity: 1200,
    genres: [{ id: 878, name: "Science Fiction" }],
    adult: false,
  },
  {
    id: 2,
    title: "Oppenheimer",
    overview: "The story of the man behind the atomic bomb...",
    poster_path: "/poster-oppenheimer.jpg",
    backdrop_path: "/backdrop-oppenheimer.jpg",
    release_date: "2023-07-21",
    vote_average: 8.4,
    vote_count: 6200,
    popularity: 980,
    genres: [{ id: 18, name: "Drama" }],
    adult: false,
  },
  {
    id: 3,
    title: "Poor Things",
    overview: "A young woman embarks on a wild adventure...",
    poster_path: "/poster-poor-things.jpg",
    backdrop_path: "/backdrop-poor-things.jpg",
    release_date: "2023-12-08",
    vote_average: 7.9,
    vote_count: 2800,
    popularity: 750,
    genres: [{ id: 35, name: "Comedy" }],
    adult: true,
  },
  // Add 5-10 more mocks if you want fuller rows
];

export default function HomeSection() {
  // Simple stubs (move to contexts/logic later)
  const dismissedIds: number[] = []; // Blacklist
  const isGuest = true; // From AuthContext later

  // Filter dismissed (stub logic)
  const filteredMovies = mockMovies.filter((m) => !dismissedIds.includes(m.id));

  // Derive rows (simple slice for now)
  const heroMovies = filteredMovies.slice(0, 3);
  const hiddenGems = filteredMovies.slice(0, 5); // Later: real hiddenGems.logic
  const vibeMovies = filteredMovies.slice(3, 8); // Later: moodFilter.logic
  const continueWatching: Movie[] = []; // Empty for now

  return (
    <main className="min-h-screen bg-cinema-black text-white relative">
      <HomeHeader />

      {isGuest && (
        <div className="bg-surface-grey text-metadata-grey text-center py-3 text-sm sticky top-0 z-40">
          Continue as guest · Login to sync your library forever
        </div>
      )}

      <HeroSection movies={heroMovies} />

      <MovieRow title="Hidden Gems" movies={hiddenGems} />
      <MovieRow title="Continue Watching" movies={continueWatching} />
      <MovieRow title="Based on your Vibe" movies={vibeMovies} />

      <FloatingMoodButton />
    </main>
  );
}
