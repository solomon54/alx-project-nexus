// src/features/auth/useAuthForm.ts
"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export type AuthMode = "login" | "signup";

interface AuthFormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  general?: string;
}

export const useAuthForm = (mode: AuthMode) => {
  const { signUp, signIn } = useAuth();
  const router = useRouter();
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = useCallback((name: string, value: string) => {
    let error = "";
    if (name === "fullName") {
      const words = value.trim().split(/\s+/);
      if (words.length < 2) error = "First and last name required";
      else if (words.some((w) => w.length < 4))
        error = "Each name must be 4+ characters";
    }

    if (name === "email") {
      if (!/^\S+@\S+\.\S+$/.test(value)) error = "Invalid email format";
    }

    if (name === "password") {
      if (value.length < 8) error = "Min 8 characters";
      else if (!/[A-Z]/.test(value)) error = "Need one uppercase letter";
      else if (!/[0-9]/.test(value)) error = "Need one number";
    }

    setErrors((prev) => ({ ...prev, [name]: error, general: "" }));
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;

    try {
      if (mode === "signup") {
        await signUp(email, password, fullName);
      } else {
        await signIn(email, password);
      }

      // Redirect Logic: Check session storage for intended destination
      const redirectTo = sessionStorage.getItem("redirectTo") || "/library";
      sessionStorage.removeItem("redirectTo");
      window.location.href = redirectTo; // Force full load to refresh auth state
    } catch (err: any) {
      // Handle Supabase specific errors inline
      const msg = err.message.toLowerCase();
      if (msg.includes("email already") || msg.includes("registered")) {
        setErrors({ email: "This email is already taken." });
      } else if (msg.includes("invalid login")) {
        setErrors({ general: "Invalid email or password." });
      } else {
        setErrors({ general: err.message || "An unexpected error occurred." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { errors, isLoading, handleAuthSubmit, validateField };
};
