// src/lib/mockdata.ts
import { Movie, Provider } from "@/types/movie";

export const mockMovies: Movie[] = [
  {
    id: 872585,
    title: "Oppenheimer",
    overview:
      "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    poster_path:
      "https://image.tmdb.org/t/p/w440_and_h660_face/bez40PgT36RUu4gstD2A6GSM0tP.jpg",
    backdrop_path: "/zGoZB4CboMzY1z4G3nU6BWnMDB2.jpg",
    release_date: "2023-07-19",
    runtime: 180,
    vote_average: 8.1,
    vote_count: 9200,
    popularity: 120.5,
    genres: [
      { id: 18, name: "Drama" },
      { id: 36, name: "History" },
    ],
    adult: false,
    original_language: "en",
    production_countries: [
      { iso_3166_1: "US", name: "United States of America" },
    ],
    production_companies: [
      { id: 525, name: "Syncopy", logo_path: null, origin_country: "GB" },
    ],

    trailer_key: "uYPbbksJxIg", // Official trailer (Universal Pictures)
    credits: {
      cast: [
        {
          id: 2037,
          name: "Cillian Murphy",
          character: "J. Robert Oppenheimer",
          profile_path: "/iN8RJ0iaT2dQv3hJ9h1z4vZ.jpg",
        },
        {
          id: 1245,
          name: "Emily Blunt",
          character: "Kitty Oppenheimer",
          profile_path: "/some-real-path.jpg",
        },
        {
          id: 74568,
          name: "Matt Damon",
          character: "Leslie Groves",
          profile_path: "/some-real-path.jpg",
        },
        {
          id: 19271,
          name: "Robert Downey Jr.",
          character: "Lewis Strauss",
          profile_path: "/some-real-path.jpg",
        },
      ],
      crew: [{ id: 525, name: "Christopher Nolan", job: "Director" }],
    },
    moods: ["Gritty", "Historical", "Intense", "Thought-Provoking"],
    providers: [
      {
        provider_id: 8,
        provider_name: "Netflix",
        logo_path: "/t2yyOv40HZeP4Qsq1x5gW8rS8sR.jpg",
        deep_link: "https://www.netflix.com/title/81614956",
        monetization_type: "flatrate",
      } satisfies Provider,
      {
        provider_id: 119,
        provider_name: "Prime Video",
        logo_path: "/p3z3l8m8x9r9q9s9t9u9v9w9x9y9z.jpg",
        deep_link: "https://www.primevideo.com/detail/Oppenheimer/0...",
        monetization_type: "rent",
      } satisfies Provider,
    ] as Provider[],
    is_watchlisted: false,
    is_dismissed: false,
    hidden_gem_score: 0,
    isHiddenGem: undefined,
  },

  {
    id: 693134,
    title: "Dune: Part Two",
    overview:
      "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge and personal growth.",
    poster_path:
      "https://image.tmdb.org/t/p/w440_and_h660_face/1MccRnw41qQjREuZkovqP2UX1i3.jpg",
    backdrop_path: "/oD3Eey4e4Z259XLm3eD3WGcoJAh.jpg",
    release_date: "2024-02-28",
    runtime: 166,
    vote_average: 8.3,
    vote_count: 4800,
    popularity: 180.2,
    genres: [
      { id: 878, name: "Science Fiction" },
      { id: 12, name: "Adventure" },
      { id: 28, name: "Action" },
    ],
    adult: false,
    original_language: "en",
    production_countries: [
      { iso_3166_1: "US", name: "United States of America" },
    ],

    trailer_key: "Way9Dexny3w", // Official trailer (Warner Bros.)
    credits: {
      cast: [
        {
          id: 224513,
          name: "Timothée Chalamet",
          character: "Paul Atreides",
          profile_path: "/some-real-path.jpg",
        },
        {
          id: 505710,
          name: "Zendaya",
          character: "Chani",
          profile_path: "/some-real-path.jpg",
        },
        {
          id: 131503,
          name: "Rebecca Ferguson",
          character: "Lady Jessica",
          profile_path: "/some-real-path.jpg",
        },
        {
          id: 5293,
          name: "Javier Bardem",
          character: "Stilgar",
          profile_path: "/some-real-path.jpg",
        },
      ],
      crew: [{ id: 476, name: "Denis Villeneuve", job: "Director" }],
    },
    moods: ["Epic", "Sci-Fi", "Desert", "Destiny", "Revenge"],
    providers: [
      {
        provider_id: 337,
        provider_name: "Disney+",
        logo_path: "/dTlv0fzn4dR5u9p3j6jQvQ7Z7Z.jpg",
        deep_link: "https://www.disneyplus.com/movies/dune-part-two/...",
        monetization_type: "flatrate",
      } satisfies Provider,
      {
        provider_id: 8,
        provider_name: "Netflix",
        logo_path: "/t2yyOv40HZeP4Qsq1x5gW8rS8sR.jpg",
        deep_link: "https://www.netflix.com/title/...",
        monetization_type: "flatrate",
      } satisfies Provider,
    ] as Provider[],
    is_watchlisted: false,
    is_dismissed: false,
    hidden_gem_score: 0,
    isHiddenGem: undefined,
  },

  {
    id: 792307,
    title: "Poor Things",
    overview:
      "Brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter, insatiable Bella is introduced to the wonders of the modern world.",
    poster_path:
      "https://image.tmdb.org/t/p/w440_and_h660_face/klvZs66SG19qmacdwxSRkdFQhQS.jpg",
    backdrop_path: "/klvZs66SG19qmacdwxSRkdFQhQS.jpg",
    release_date: "2023-12-07",
    runtime: 141,
    vote_average: 7.8,
    vote_count: 3800,
    popularity: 85.4,
    genres: [
      { id: 878, name: "Science Fiction" },
      { id: 12, name: "Adventure" },
      { id: 35, name: "Comedy" },
    ],
    adult: false,
    original_language: "en",
    production_countries: [{ iso_3166_1: "GB", name: "United Kingdom" }],

    trailer_key: "RlbR5N6veqw", // Official trailer (Searchlight Pictures)
    credits: {
      cast: [
        {
          id: 1397778,
          name: "Emma Stone",
          character: "Bella Baxter",
          profile_path: "/some-real-path.jpg",
        },
        {
          id: 3131,
          name: "Mark Ruffalo",
          character: "Duncan Wedderburn",
          profile_path: "/some-real-path.jpg",
        },
        {
          id: 5293,
          name: "Willem Dafoe",
          character: "Dr. Godwin Baxter",
          profile_path: "/some-real-path.jpg",
        },
        {
          id: 15286,
          name: "Ramy Youssef",
          character: "Max McCandles",
          profile_path: "/some-real-path.jpg",
        },
      ],
      crew: [{ id: 57695, name: "Yorgos Lanthimos", job: "Director" }],
    },
    moods: ["Quirky", "Surreal", "Feminist", "Adventure"],
    providers: [
      {
        provider_id: 337,
        provider_name: "Disney+",
        logo_path: "/dTlv0fzn4dR5u9p3j6jQvQ7Z7Z.jpg",
        deep_link: "https://www.disneyplus.com/movies/poor-things/...",
        monetization_type: "flatrate",
      } satisfies Provider,
      {
        provider_id: 8,
        provider_name: "Netflix",
        logo_path: "/t2yyOv40HZeP4Qsq1x5gW8rS8sR.jpg",
        deep_link: "https://www.netflix.com/title/...",
        monetization_type: "flatrate",
      } satisfies Provider,
    ] as Provider[],
    is_watchlisted: false,
    is_dismissed: false,
    hidden_gem_score: 0,
    isHiddenGem: undefined,
  },

  // New unique entries with full matching structure
  {
    id: 569094,
    title: "Spider-Man: Across the Spider-Verse",
    overview:
      "After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse’s very existence.",
    poster_path:
      "https://image.tmdb.org/t/p/w440_and_h660_face/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdrop_path: "/qWjRfB8rNqXhWjX6dZ6xK0vG5.jpg",
    release_date: "2023-05-31",
    runtime: 140,
    vote_average: 8.4,
    vote_count: 6800,
    popularity: 220.8,
    genres: [
      { id: 16, name: "Animation" },
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 878, name: "Science Fiction" },
    ],
    adult: false,
    original_language: "en",
    production_countries: [
      { iso_3166_1: "US", name: "United States of America" },
    ],
    production_companies: [
      {
        id: 420,
        name: "Sony Pictures Animation",
        logo_path: null,
        origin_country: "US",
      },
    ],

    trailer_key: "shW9i6k8czo", // Official trailer (Sony Pictures)
    credits: {
      cast: [
        {
          id: 16828,
          name: "Shameik Moore",
          character: "Miles Morales / Spider-Man",
          profile_path: "/some-real-path.jpg",
        },
        {
          id: 1136406,
          name: "Hailee Steinfeld",
          character: "Gwen Stacy / Spider-Gwen",
          profile_path: "/some-real-path.jpg",
        },
        {
          id: 1663195,
          name: "Brian Tyree Henry",
          character: "Jefferson Davis",
          profile_path: "/some-real-path.jpg",
        },
      ],
      crew: [{ id: 1147513, name: "Joaquim Dos Santos", job: "Director" }],
    },
    moods: ["Vibrant", "Multiverse", "Emotional", "Action-Packed"],
    providers: [
      {
        provider_id: 119,
        provider_name: "Prime Video",
        logo_path: "/seGSXajazLMCKGB5hnRCidtjay1.jpg",
        deep_link:
          "https://www.primevideo.com/detail/Spider-Man-Across-the-Spider-Verse/...",
        monetization_type: "flatrate",
      } satisfies Provider,
    ] as Provider[],
    is_watchlisted: false,
    is_dismissed: false,
    hidden_gem_score: 0,
    isHiddenGem: undefined,
  },

  {
    id: 976573,
    title: "Elemental",
    overview:
      "In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common.",
    poster_path:
      "https://image.tmdb.org/t/p/w440_and_h660_face/6oH378KUfCEitzJkm07r97L0RsZ.jpg",
    backdrop_path: "/i4Q78qyr7sV3xO1g7q2f3S4X7.jpg",
    release_date: "2023-06-14",
    runtime: 93,
    vote_average: 7.7,
    vote_count: 4200,
    popularity: 150.3,
    genres: [
      { id: 16, name: "Animation" },
      { id: 35, name: "Comedy" },
      { id: 10751, name: "Family" },
      { id: 14, name: "Fantasy" },
      { id: 10749, name: "Romance" },
    ],
    adult: false,
    original_language: "en",
    production_countries: [
      { iso_3166_1: "US", name: "United States of America" },
    ],
    production_companies: [
      { id: 2, name: "Pixar", logo_path: null, origin_country: "US" },
    ],

    trailer_key: "hXzjiM2A2Oo", // Official trailer (Disney/Pixar)
    credits: {
      cast: [
        {
          id: 1532,
          name: "Leah Lewis",
          character: "Ember Lumen (voice)",
          profile_path: "/some-real-path.jpg",
        },
        {
          id: 1663195,
          name: "Mamoudou Athie",
          character: "Wade Ripple (voice)",
          profile_path: "/some-real-path.jpg",
        },
      ],
      crew: [{ id: 60898, name: "Peter Sohn", job: "Director" }],
    },
    moods: ["Heartwarming", "Romantic", "Colorful", "Family-Friendly"],
    providers: [
      {
        provider_id: 337,
        provider_name: "Disney+",
        logo_path: "/dTlv0fzn4dR5u9p3j6jQvQ7Z7Z.jpg",
        deep_link: "https://www.disneyplus.com/movies/elemental/...",
        monetization_type: "flatrate",
      } satisfies Provider,
    ] as Provider[],
    is_watchlisted: false,
    is_dismissed: false,
    hidden_gem_score: 0,
    isHiddenGem: undefined,
  },

  // Add more as needed...
];

export const mockMovieMap = new Map<number, Movie>(
  mockMovies.map((m) => [m.id, m])
);
