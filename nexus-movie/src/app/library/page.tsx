// src/app/library/page.tsx
import LibrarySection from "@/components/library/LibrarySection";
import AuthGuard from "@/components/auth/AuthGuard";

export default function LibraryPage() {
  return (
    <AuthGuard>
      <LibrarySection />
    </AuthGuard>
  );
}
