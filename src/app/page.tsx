"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import MovieHero from "@/components/MovieHero";
import MovieCarousel from "@/components/MovieCarousel";

interface Movie {
  imdb_link: string | null;
  poster: string | null;
  title: string;
}

const defaultMovieData = {
  recommendations: [
    {
      imdb_link: "https://www.imdb.com/title/tt0758730",
      poster: "https://image.tmdb.org/t/p/w500/jCyJN1vj8jqJJ0vNw4hDH2KlySO.jpg",
      title: "Aliens vs Predator: Requiem",
    },
    {
      imdb_link: "https://www.imdb.com/title/tt0090605",
      poster: "https://image.tmdb.org/t/p/w500/r1x5JGpyqZU8PYhbs4UcrO1Xb6x.jpg",
      title: "Aliens",
    },
    {
      imdb_link: "https://www.imdb.com/title/tt2295722",
      poster: "https://image.tmdb.org/t/p/w500/4wnfTO8mvqcTU62YMkUeKq49VMT.jpg",
      title: "Falcon Rising",
    },
    {
      imdb_link: "https://www.imdb.com/title/tt0116629",
      poster: "https://image.tmdb.org/t/p/w500/p0BPQGSPoSa8Ml0DAf2mB2kCU0R.jpg",
      title: "Independence Day",
    },
    {
      imdb_link: null,
      poster: null,
      title: "Titan A.E.",
    },
  ],
};

const DEFAULT_MOVIE = "Avatar";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>(
    defaultMovieData.recommendations
  );
  const [selectedMovie, setSelectedMovie] = useState<Movie>(
    defaultMovieData.recommendations[0]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecommendations = async (movieTitle: string) => {
    if (!movieTitle.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/recommend?movie=${encodeURIComponent(movieTitle)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error ||
            `Failed to fetch recommendations. Please try again.`
        );
      }

      const data = await response.json();

      if (!data.recommendations?.length) {
        setError("No movies found. Try a different search term.");
        setMovies(defaultMovieData.recommendations);
        setSelectedMovie(defaultMovieData.recommendations[0]);
        return;
      }

      setMovies(data.recommendations);
      setSelectedMovie(data.recommendations[0]);
      setError("");
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Search failed! Please try again."
      );
      setMovies(defaultMovieData.recommendations);
      setSelectedMovie(defaultMovieData.recommendations[0]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations(DEFAULT_MOVIE);
  }, []);

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      await fetchRecommendations(query);
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-b from-black/90 to-transparent p-4 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Movie Recommender</h1>
          <div className="flex items-center gap-4">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
        {error && (
          <div className="bg-red-500/90 text-white px-4 py-2 rounded-lg shadow-lg">
            {error}
          </div>
        )}
        {isLoading && (
          <div className="bg-black text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Searching...
          </div>
        )}
      </div>

      {/* Hero Section */}
      <MovieHero movie={selectedMovie} />

      {/* Movie List */}
      <div className="relative z-10">
        <MovieCarousel
          movies={movies}
          selectedMovie={selectedMovie}
          onSelectMovie={setSelectedMovie}
        />
      </div>

      {/* Footer Gradient */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent h-48 pointer-events-none" />
    </div>
  );
}
