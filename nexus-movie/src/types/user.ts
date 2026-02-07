//src/types/user.ts
export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string | null;
  bio?: string;
  preferences?: {
    onboarding_completed: boolean;
    favorite_genres: number[];
  };
}

export interface AuthState {
  user: User | null;
  isGuest: boolean;
  isLoading: boolean;
}
