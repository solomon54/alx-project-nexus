// src/types/user.ts
export interface UserMetadata {
  username?: string;
  display_name?: string;
  avatar_url?: string | null;
  bio?: string;
  onboarding_completed?: boolean;
  favorite_genres?: number[];
}

export interface User {
  id: string;
  email?: string;
  user_metadata: UserMetadata;
  username?: string;
  avatar_url?: string | null;
  bio?: string;
}

export interface AuthState {
  user: User | null;
  isGuest: boolean;
  isLoading: boolean;
}
