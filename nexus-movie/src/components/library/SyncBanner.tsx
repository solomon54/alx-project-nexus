"use client";

import { useRouter } from "next/navigation";
import { Cloud, LogIn } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/classNames";

interface SyncBannerProps {
  isGuest?: boolean;
}

export default function SyncBanner({ isGuest = true }: SyncBannerProps) {
  const router = useRouter();

  if (!isGuest) return null;

  return (
    <div
      className={cn(
        "mx-4 md:mx-8 mt-5 md:mt-6",
        "p-4 md:p-5",
        "bg-linear-to-r from-surface-grey/70 to-zinc-900/70",
        "rounded-2xl border border-electric-cyan/25 backdrop-blur-md shadow-lg"
      )}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6">
        <div className="flex items-start gap-3 text-center sm:text-left">
          <Cloud
            className="text-electric-cyan shrink-0 mt-1"
            size={24}
            aria-hidden="true"
          />
          <div>
            <h3 className="text-base md:text-lg font-medium text-white">
              Sync to Cloud
            </h3>
            <p className="text-xs md:text-sm text-metadata-grey mt-1 leading-relaxed">
              Don’t lose your watchlist when switching devices.
            </p>
          </div>
        </div>

        {/* Right: CTA Button */}
        <Button
          variant="primary"
          className={cn(
            "whitespace-nowrap px-6 py-2.5 md:px-8 md:py-3",
            "text-sm md:text-base font-semibold",
            "shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-offset-cinema-black focus:ring-electric-cyan"
          )}
          aria-label="Sign up to sync your library to the cloud"
          onClick={() => router.push("/auth")}>
          <LogIn size={18} className="mr-2" />
          Sign Up
        </Button>
      </div>
    </div>
  );
}
