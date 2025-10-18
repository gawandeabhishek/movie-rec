"use server";

interface Movie {
  imdb_link: string | null;
  poster: string | null;
  title: string;
}

interface RecommendationResponse {
  recommendations: Movie[];
}

export async function getMovieRecommendations(
  movieTitle: string = "Avatar"
): Promise<Movie[]> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API Base URL not configured");
  }

  try {
    const response = await fetch(
      `${apiBaseUrl}/api/recommend?movie=${encodeURIComponent(movieTitle)}`,
      {
        cache: "no-store", // Disable caching to always get fresh recommendations
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recommendations");
    }

    const data: RecommendationResponse = await response.json();
    return data.recommendations;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
}
