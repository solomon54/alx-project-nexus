// src/components/auth/AuthSection.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ChevronRight, Github } from "lucide-react";
import { AuthInput } from "@/components/ui/AuthInput";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthForm, AuthMode } from "@/features/auth/useAuthForm";

export const AuthSection = () => {
  const [mode, setMode] = useState<AuthMode>("signup");
  const isSignup = mode === "signup";
  const { signInWithGoogle, continueAsGuest } = useAuth();
  const { errors, isLoading, handleAuthSubmit, validateField } =
    useAuthForm(mode);

  const toggleMode = () =>
    setMode((prev) => (prev === "signup" ? "login" : "signup"));

  return (
    <section className="flex min-h-screen bg-cinema-black overflow-hidden relative">
      {/* Visual Side */}
      <div className="hidden lg:flex w-1/2 relative border-r border-white/10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-[url('/assets/fallback-backdrop.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-linear-to-tl from-cinema-black via-cinema-black/80 to-transparent" />
        </motion.div>

        <div className="relative z-10 self-end p-16 space-y-4">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-bebas text-7xl text-white leading-none">
            EVERY STORY.
            <br />
            <span className="text-netflix-red">ONE PLACE.</span>
          </motion.h2>
          <p className="text-zinc-400 text-xl max-w-sm">
            Access your curated cinematic library from any device.
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          layout
          className="w-full max-w-md space-y-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}>
          <header className="space-y-2">
            <h1 className="font-bebas text-5xl text-netflix-red tracking-tighter">
              NEXUS
            </h1>
            <p className="text-zinc-500 uppercase tracking-[0.2em] text-xs font-bold">
              {isSignup ? "Create your account" : "Welcome back, Captain"}
            </p>
          </header>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {isSignup && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}>
                  <AuthInput
                    label="Full Name"
                    name="fullName"
                    placeholder="Dominic Toretto"
                    onChange={(e) => validateField("fullName", e.target.value)}
                    error={errors.fullName}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <AuthInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="name@domain.com"
              onChange={(e) => validateField("email", e.target.value)}
              error={errors.email}
            />

            <AuthInput
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={(e) => validateField("password", e.target.value)}
              error={errors.password}
            />

            {errors.general && (
              <p className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                {errors.general}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-netflix-red hover:bg-red-700 text-white font-bold transition-all">
              {isLoading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : isSignup ? (
                "Sign Up"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-cinema-black px-4 text-zinc-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => signInWithGoogle()}
              className="flex items-center justify-center gap-2 bg-white text-black py-2.5 rounded-lg font-bold hover:bg-zinc-200 transition">
              <GoogleIcon /> Google
            </button>
            <button
              onClick={() => {
                continueAsGuest();
                window.location.href = "/search";
              }}
              className="flex  items-center justify-center gap-2 bg-zinc-700 text-white py-2.5 rounded-lg font-bold hover:bg-zinc-800 border border-white/5 transition">
              Guest Mode
            </button>
          </div>

          <footer className="text-center">
            <button
              onClick={toggleMode}
              className="text-zinc-300 hover:text-white transition text-sm">
              {isSignup ? "Already have an account?" : "New to Nexus?"}
              <span className="text-netflix-red font-bold ml-1 hover:underline">
                {isSignup ? "Login" : "Sign up now"}
              </span>
            </button>
          </footer>
        </motion.div>
      </div>
    </section>
  );
};

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);
