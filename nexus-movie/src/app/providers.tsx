// src/app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState, useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
          },
        },
      })
  );

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("🟢 Nexus SW registered:", reg.scope);
        })
        .catch((err) => {
          console.error("❌ Nexus SW registration failed:", err);
        });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
