// 'use client'

"use client";

export default function FloatingMoodButton() {
  return (
    <button
      className="fixed bottom-6 right-6 bg-netflix-red text-white p-4 rounded-full shadow-2xl hover:bg-red-700 transition transform hover:scale-110 z-40"
      aria-label="Quick mood filter">
      {/* Icon later: Mood picker emoji or Lucide */}
      Mood
    </button>
  );
}
