import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Movie {
  imdb_link: string | null;
  poster: string | null;
  title: string;
}

export default function MovieHero({ movie }: { movie: Movie }) {
  return (
    <div className="relative w-full h-[100vh]">
      {/* Background */}
      <div className="absolute inset-0 bg-black">
        {/* Poster Image */}
        {movie.poster && (
          <>
            <Image
              src={movie.poster}
              alt={movie.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </>
        )}
      </div>

      {/* Content */}
      <div className="absolute bottom-64 sm:bottom-72 md:bottom-[35%] left-[5%] z-10">
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-2xl sm:text-4xl md:text-7xl font-black text-white drop-shadow-lg max-w-[280px] sm:max-w-xl md:max-w-4xl leading-tight">
            {movie.title}
          </h1>
          {movie.imdb_link && (
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 h-9 sm:h-11 md:h-14 px-4 sm:px-6 md:px-8 text-sm sm:text-base md:text-lg shadow-xl"
              asChild
            >
              <a
                href={movie.imdb_link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold"
              >
                View on IMDb
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
