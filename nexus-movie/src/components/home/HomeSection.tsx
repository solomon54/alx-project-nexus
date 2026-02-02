// src/components/home/HomeSection.tsx
import HomeHeader from "./HomeHeader";
import HeroSection from "./HeroSection";
import MovieRow from "./MovieRow";
import FloatingMoodButton from "./FloatingMoodButton";
import { Movie } from "@/types/movie"; // Real type!

// Temporary mock data (remove when Engine hook is ready)
const mockMovies: Movie[] = [
  {
    id: 693134,
    title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides...",
    poster_path: "/kCGlIMHnOm8JPXq3rXM6c5wMSoL.jpg",
    backdrop_path: "/zGoZB4CboMzY1z4G3nU6BWnMDB2.jpg",
    release_date: "2024-02-28",
    vote_average: 8.3,
    vote_count: 3200,
    popularity: 1500,
    genres: [
      { id: 878, name: "Science Fiction" },
      { id: 12, name: "Adventure" },
    ],
    adult: false,
  },
  {
    id: 872585,
    title: "Oppenheimer",
    overview: "The story of American scientist J. Robert Oppenheimer...",
    poster_path: "/kCGlIMHnOm8JPXq3rXM6c5wMSoL.jpg",
    backdrop_path: "/zGoZB4CboMzY1z4G3nU6BWnMDB2.jpg",
    release_date: "2023-07-19",
    vote_average: 8.1,
    vote_count: 7800,
    popularity: 900,
    genres: [
      { id: 18, name: "Drama" },
      { id: 36, name: "History" },
    ],
    adult: false,
  },
  {
    id: 792307,
    title: "Poor Things",
    overview:
      "Brought back to life by the brilliant and unorthodox scientist...",
    poster_path: "/kCGlIMHnOm8JPXq3rXM6c5wMSoL.jpg",
    backdrop_path: "/zGoZB4CboMzY1z4G3nU6BWnMDB2.jpg",
    release_date: "2023-12-07",
    vote_average: 7.8,
    vote_count: 3800,
    popularity: 600,
    genres: [
      { id: 35, name: "Comedy" },
      { id: 878, name: "Science Fiction" },
    ],
    adult: true,
  },
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

      <HeroSection movies={heroMovies} />

      <MovieRow title="Hidden Gems" movies={hiddenGems} />
      <MovieRow title="Continue Watching" movies={continueWatching} />
      <MovieRow title="Based on your Vibe" movies={vibeMovies} />

      <FloatingMoodButton />
    </main>
  );
}
