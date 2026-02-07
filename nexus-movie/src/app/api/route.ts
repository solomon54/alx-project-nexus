import { NextResponse } from "next/server";
import { fetchTrendingMovies } from "@/lib/tmdb";

export async function GET() {
  try {
    const movies = await fetchTrendingMovies();
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
