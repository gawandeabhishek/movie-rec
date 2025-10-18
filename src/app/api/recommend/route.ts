import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movie = searchParams.get("movie");

  if (!movie) {
    return NextResponse.json(
      { error: "Movie parameter is required" },
      { status: 400 }
    );
  }

  try {
    const apiUrl = `https://movie-recommender-api.p.rapidapi.com/api/recommend?movie=${encodeURIComponent(
      movie
    )}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
        "x-rapidapi-host": process.env.RAPIDAPI_HOST || "",
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.json(
      { error: "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
}
