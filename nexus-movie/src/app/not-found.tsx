"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Home, Film } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 text-center">
      <h1 className="text-7xl font-bold text-cyan-400 animate-pulse mb-4">
        404
      </h1>
      <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
        Oops! Page Not Found
      </h2>
      <p className="text-slate-300 max-w-lg mb-8">
        Looks like the movie you’re searching for got lost in space. Don’t
        worry, we can take you back to explore the cinematic universe.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-full px-5 py-3 transition-all">
          <ArrowLeft size={18} />
          Go Back
        </Button>

        <Link href="/">
          <Button className="flex items-center gap-2 bg-slate-900 border border-cyan-500 hover:bg-slate-800 hover:text-cyan-400 font-semibold rounded-full px-5 py-3 transition-all">
            <Home size={18} />
            Home
          </Button>
        </Link>

        <Link href="/library">
          <Button className="flex items-center gap-2 bg-slate-900 border border-cyan-500 hover:bg-slate-800 hover:text-cyan-400 font-semibold rounded-full px-5 py-3 transition-all">
            <Film size={18} />
            My Library
          </Button>
        </Link>
      </div>

      <div className="mt-12">
        <img
          src="/screens/SignUpGateway-desk.png"
          alt="Lost in cinema illustration"
          className="max-w-xs sm:max-w-md rounded-lg shadow-xl mx-auto animate-fadeIn"
        />
      </div>
    </div>
  );
}
