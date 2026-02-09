//src/app/profile/page.tsx
"use client";

import ProfileSection from "@/components/userProfile/ProfileSection";
import AuthGuard from "@/components/auth/AuthGuard";

export default function ProfilePage() {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-cinema-black">
        <ProfileSection />
      </main>
    </AuthGuard>
  );
}
