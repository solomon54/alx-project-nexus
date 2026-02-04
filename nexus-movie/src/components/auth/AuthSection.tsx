//src/components/auth/AuthSection.tsx
"use client";

import { useState } from "react";
import { AuthInput } from "@/components/ui/AuthInput";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";

type AuthMode = "login" | "signup";
type AuthProvider = "email" | "google" | "guest";

export const AuthSection = () => {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [isLoading, setIsLoading] = useState(false);

  const isSignup = mode === "signup";

  const simulateAuth = async (provider: AuthProvider) => {
    setIsLoading(true);
    console.log(`[AUTH] ${provider} authentication`);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsLoading(false);
    alert(`${provider} auth simulated. Ready for backend.`);
  };

  return (
    <section className="flex min-h-screen bg-cinema-black overflow-hidden">
      {/* Desktop Visual */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src="/assets/fallback-backdrop.jpg"
          alt="Cinematic background"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-cinema-black/70" />
        <div className="absolute inset-0 bg-linear-to-r from-transparent to-cinema-black" />

        <div className="relative z-10 flex flex-col justify-end p-16 pb-24">
          <h2 className="font-bebas md:text-4xl xl:text-7xl leading-[0.8]">
            UNLIMITED <br />
            <span className="text-netflix-red">EXPERIENCES.</span>
          </h2>
          <p className="text-metadata-grey max-w-md text-xl mt-4">
            Your universal watchlist,
            <span className="text-white"> everywhere.</span>
          </p>
        </div>
      </div>

      {/* Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[400px] space-y-8">
          <header className="text-center lg:text-left">
            <h1 className="font-bebas text-6xl text-netflix-red">NEXUS</h1>
            <p className="text-metadata-grey mt-2 text-sm uppercase tracking-widest">
              {isSignup ? "Start your journey" : "Welcome back"}
            </p>
          </header>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              simulateAuth("email");
            }}>
            {isSignup && (
              <AuthInput label="Full Name" placeholder="John Doe" required />
            )}

            <AuthInput
              label="Email Address"
              type="email"
              placeholder="alex@prestige.com"
              required
            />

            <AuthInput
              label="Password"
              type="password"
              placeholder="••••••••"
              required
            />

            <Button
              disabled={isLoading}
              className="w-full py-4 text-lg font-bold bg-netflix-red hover:bg-red-700 flex justify-center">
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : isSignup ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <Divider />

          <button
            onClick={() => simulateAuth("google")}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-3 rounded-lg hover:bg-zinc-200 transition active:scale-[0.98] disabled:opacity-50">
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="text-center space-y-6 pt-6">
            {/* Switch Auth Mode */}
            <p className="text-sm text-metadata-grey">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                disabled={isLoading}
                onClick={() => setMode(isSignup ? "login" : "signup")}
                className="text-netflix-red font-semibold text-base hover:underline transition-colors">
                {isSignup ? "Log In" : "Sign Up"}
              </button>
            </p>

            {/* Guest Access */}
            <button
              onClick={() => simulateAuth("guest")}
              className="text-electric-cyan text-base font-medium hover:brightness-125 transition-all border-b border-electric-cyan/30 pb-1">
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---- Small helpers (local, MVP-safe) ---- */

const Divider = () => (
  <div className="relative flex items-center py-2">
    <div className="grow border-t border-white/10" />
    <span className="mx-4 text-metadata-grey text-[10px] tracking-widest">
      OR
    </span>
    <div className="grow border-t border-white/10" />
  </div>
);

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
