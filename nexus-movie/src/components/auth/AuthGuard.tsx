"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      const searchParams = new URLSearchParams();
      searchParams.set("next", pathname);
      router.replace(`/auth?${searchParams.toString()}`);
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-cinema-black flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-netflix-red" />
        <p className="text-zinc-500 font-bebas tracking-widest animate-pulse">
          SECURE ACCESS...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
