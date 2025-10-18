"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface Movie {
  imdb_link: string | null;
  poster: string | null;
  title: string;
}

interface MovieCarouselProps {
  movies: Movie[];
  selectedMovie: Movie;
  onSelectMovie: (movie: Movie) => void;
}

export default function MovieCarousel({
  movies,
  selectedMovie,
  onSelectMovie,
}: MovieCarouselProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 pb-8 sm:pb-10 pt-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
      {/* Scroll Indicators */}
      <div className="absolute -top-2 left-0 right-0 flex justify-center gap-2">
        <div className="h-1 w-16 bg-white/20 rounded-full">
          <div className="h-full w-1/3 bg-white rounded-full transition-all duration-300" />
        </div>
      </div>

      {/* Movie List */}
      <div className="overflow-x-auto hide-scrollbar px-6 sm:px-8 md:px-12">
        <div className="flex gap-4 md:gap-6 min-w-max mx-auto pb-4">
          {movies.map((movie) => (
            <div
              key={movie.title}
              className="relative cursor-pointer group snap-center"
              onClick={() => onSelectMovie(movie)}
            >
              <div
                className={cn(
                  "relative w-[110px] sm:w-[130px] lg:w-[170px] h-[165px] sm:h-[195px] lg:h-[255px] transition-all duration-500 transform",
                  movie.title === selectedMovie.title
                    ? "scale-110 shadow-2xl shadow-black/50"
                    : "hover:scale-110 group-hover:shadow-2xl group-hover:shadow-black/50"
                )}
              >
                {movie.poster ? (
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 640px) 150px, (max-width: 768px) 180px, 200px"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm p-4 text-center">
                      {movie.title}
                    </span>
                  </div>
                )}
                {/* Gradient overlay */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-lg transition-all duration-300",
                    movie.title === selectedMovie.title
                      ? "bg-gradient-to-t from-black via-black/70 to-transparent"
                      : "bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100"
                  )}
                />
                {/* Title overlay */}
                <div
                  className={cn(
                    "absolute bottom-4 left-0 right-0 px-3 transition-all duration-300 transform",
                    movie.title === selectedMovie.title
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  )}
                >
                  <p className="text-white text-sm sm:text-base font-bold text-center line-clamp-2 drop-shadow-xl">
                    {movie.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
