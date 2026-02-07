//src/features/auth/auth.actions.ts
import { supabase } from "@/lib/supabase";
import { AuthUser } from "./auth.types";

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName?: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
      },
    },
  });

  if (error) throw error;
  return data;
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export function mapSupabaseUser(user: any): AuthUser {
  return {
    id: user.id,
    email: user.email,
    displayName: user.user_metadata?.display_name ?? null,
  };
}
