// src/app/auth/page.tsx
import { Suspense } from "react";
import { AuthSection } from "@/components/auth/AuthSection";

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cinema-black flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-electric-cyan border-t-transparent rounded-full animate-spin" />
        </div>
      }>
      <AuthSection />
    </Suspense>
  );
}
