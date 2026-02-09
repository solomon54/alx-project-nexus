// src/components/navigation/InstallPWA.tsx
"use client";

import { useEffect, useState } from "react";
import { usePWA } from "@/features/movie-discovery/hooks/usePWA";
import { Button } from "@/components/ui/Button";
import { Download, X, Sparkles } from "lucide-react";

const DISMISS_KEY = "nexus_pwa_install_dismissed";

export const InstallPWA = () => {
  const { isInstallable, installApp, isInstalled } = usePWA();
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDismissed(localStorage.getItem(DISMISS_KEY) === "true");
  }, []);

  if (!mounted || !isInstallable || isInstalled || dismissed) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "true");
    setDismissed(true);
  };

  return (
    <div
      role="dialog"
      className="
        fixed bottom-0 left-0 right-0 z-[100] 
        p-4 sm:bottom-6 sm:right-auto sm:left-6 sm:w-80
        animate-in fade-in slide-in-from-bottom-full duration-500
      ">
      <div
        className="
          relative overflow-hidden
          flex flex-col gap-4 p-5
          bg-zinc-950/90 backdrop-blur-xl
          border border-white/10 sm:border-cyan-500/30
          rounded-2xl sm:rounded-xl shadow-2xl shadow-cyan-500/10
        ">
        <div className="w-12 h-1 bg-white/10 rounded-full self-center mb-1 sm:hidden" />

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Nexus Movie</h3>
              <p className="text-xs text-zinc-400">
                Add to home screen for AI insights
              </p>
            </div>
          </div>
          <button
            onClick={dismiss}
            className="p-1 text-zinc-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <Button
          onClick={installApp}
          className="
            w-full py-6 sm:py-2
            bg-cyan-500 hover:bg-cyan-400 
            text-black font-bold text-base sm:text-sm
            rounded-xl flex items-center justify-center gap-2
            shadow-[0_0_15px_rgba(6,182,212,0.3)]
          ">
          <Download size={18} />
          Install App
        </Button>
      </div>
    </div>
  );
};
