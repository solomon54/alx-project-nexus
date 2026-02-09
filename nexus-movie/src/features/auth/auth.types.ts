// src/features/auth/auth.types.ts

export type AuthStatus = "guest" | "authenticated" | "loading";

export interface AuthUser {
  id: string;
  email: string;
  displayName?: string | null;
}

export interface AuthState {
  status: AuthStatus;
  user: AuthUser | null;
}
