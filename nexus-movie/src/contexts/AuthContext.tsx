//src/contexts/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { supabase } from "@/lib/supabase";
import { memoryStore } from "@/features/memory/memory.store";
import { User } from "@/types/user";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isGuest: boolean;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  continueAsGuest: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Memoized format helper to keep user object consistent
  const formatUser = useCallback((supabaseUser: any): User | null => {
    if (!supabaseUser) return null;
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || "",
      username:
        supabaseUser.user_metadata?.display_name ||
        supabaseUser.email?.split("@")[0] ||
        "User",
      avatar_url: supabaseUser.user_metadata?.avatar_url || null,

      bio: supabaseUser.user_metadata?.bio || "",
    };
  }, []);

  useEffect(() => {
    //  Check for existing session on mount
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(formatUser(session.user));
        setIsGuest(false);
      }
      setIsLoading(false);
    };

    initAuth();

    //  Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = formatUser(session?.user);
      setUser(currentUser);

      if (currentUser) {
        setIsGuest(false);
        // MERGE logic: Transfers guest watchlists to the DB/Store
        const guestState = memoryStore.getState();
        memoryStore.mergeGuestMemory(guestState, currentUser.id);
      }

      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [formatUser]);

  const signUp = async (email: string, password: string, name?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: name } },
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsGuest(false);
    memoryStore.clear();
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isGuest,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        continueAsGuest,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
