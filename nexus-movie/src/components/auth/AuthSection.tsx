//src/components/auth/AuthSection.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { AuthInput } from "@/components/ui/AuthInput";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthForm, AuthMode } from "@/features/auth/useAuthForm";

const PROTECTED_PATHS = ["/profile", "/library", "/settings"];

export const AuthSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    user,
    isLoading: authLoading,
    signInWithGoogle,
    continueAsGuest,
  } = useAuth();

  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);

  const isSignup = mode === "signup";
  const {
    errors,
    isLoading: formLoading,
    handleAuthSubmit,
    validateField,
  } = useAuthForm(mode);

  // Fallback: Home '/'

  const getSafeRedirect = useCallback(() => {
    const next = searchParams.get("next");
    if (next && next !== "/auth") return next;

    if (typeof document !== "undefined" && document.referrer) {
      const referrer = new URL(document.referrer);
      if (
        referrer.host === window.location.host &&
        referrer.pathname !== "/auth"
      ) {
        return referrer.pathname;
      }
    }
    return "/";
  }, [searchParams]);

  useEffect(() => {
    if (user && !authLoading) {
      router.replace(getSafeRedirect());
    }
  }, [user, authLoading, router, getSafeRedirect]);


  if (authLoading || user) {
    return (
      <div className="min-h-screen bg-cinema-black flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-netflix-red mb-4" size={40} />
        <p className="text-zinc-500 font-bebas tracking-widest animate-pulse">
          Initializing Nexus...
        </p>
      </div>
    );
  }

  const handleGuestEntry = async () => {
    await continueAsGuest();
    const destination = getSafeRedirect();
    const isProtected = PROTECTED_PATHS.some((path) =>
      destination.startsWith(path)
    );
    router.replace(isProtected ? "/search" : destination);
  };

  const toggleMode = () =>
    setMode((prev) => (prev === "login" ? "signup" : "login"));

  return (
    <section className="flex min-h-screen bg-cinema-black overflow-hidden relative">
      {/* Left Side Visuals */}
      <div className="hidden lg:flex w-1/2 relative border-r border-white/10">
        <div className="absolute inset-0 bg-[url('/assets/fallback-backdrop.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-linear-to-tl from-cinema-black via-cinema-black/80 to-transparent" />
        </div>
        <div className="relative z-10 self-end p-16 space-y-4">
          <h2 className="font-bebas text-7xl text-white leading-none">
            EVERY STORY.
            <br />
            <span className="text-netflix-red">ONE PLACE.</span>
          </h2>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-cinema-black">
        <motion.div layout className="w-full max-w-md space-y-8">
          <header className="space-y-2">
            <h1 className="font-bebas text-6xl text-netflix-red tracking-tighter">
              NEXUS
            </h1>
            <p className="text-zinc-400 uppercase tracking-[0.2em] text-[10px] font-black">
              {isSignup ? "Join the crew" : "Welcome back, Captain"}
            </p>
          </header>
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {isSignup && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}>
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

            <div className="relative">
              <AuthInput
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                onChange={(e) => validateField("password", e.target.value)}
                error={errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-zinc-500 hover:text-white transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.general && (
              <p className="text-red-500 text-xs font-bold bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                {errors.general}
              </p>
            )}

            <Button
              type="submit"
              disabled={formLoading}
              className="w-full h-14 bg-netflix-red text-white font-black uppercase tracking-widest transition-all shadow-lg active:scale-[0.98]">
              {formLoading ? (
                <Loader2 className="animate-spin mx-auto" size={20} />
              ) : isSignup ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/30" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
              <span className="bg-cinema-black px-4 text-zinc-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => signInWithGoogle()}
              className="flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl font-bold text-xs hover:bg-zinc-200 transition-all">
              <GoogleIcon /> Google
            </button>
            <button
              onClick={handleGuestEntry}
              className="flex items-center justify-center gap-3 bg-zinc-900 text-white py-3 rounded-xl font-bold text-xs hover:bg-zinc-800 border border-white/5 transition-all">
              Guest Mode
            </button>
          </div>
          <footer className="text-center pt-2">
            <button
              onClick={toggleMode}
              className="text-zinc-300 hover:text-white transition-colors text-xs font-medium">
              {isSignup ? "Already a member?" : "New to the platform?"}
              <span className="text-netflix-red font-black ml-2 uppercase tracking-tighter hover:underline">
                {isSignup ? "Login here" : "Sign up now"}
              </span>
            </button>
          </footer>
        </motion.div>
      </div>
    </section>
  );
};

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
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
