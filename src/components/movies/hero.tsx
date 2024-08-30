'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { humanizeDuration } from '@/lib/movies'
import { MovieDetails } from '@/models/movie'
import { Calendar, Clock, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface MovieHeroProps {
  movie: MovieDetails
}

export default function MovieHero({ movie }: MovieHeroProps) {
  const backdropFullURL = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
  const posterURL = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
  return (
    <div className="relative h-[480px] w-full overflow-hidden bg-black">
      {/* Backdrop Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: `url('${backdropFullURL}')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 flex h-full text-white p-6 md:p-12">
        {/* Movie Poster */}
        <div className="hidden lg:block mr-8">
          <Image
            src={posterURL}
            alt={`${movie.title} poster`}
            className="w-60 h-[360px] object-cover rounded-lg shadow-lg"
            width={600}
            height={900}
          />
        </div>

        {/* Movie Information */}
        <div className="flex flex-col justify-center max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            Interstellar Odyssey
          </h1>
          <p className="text-sm md:text-lg mb-4 text-gray-300">
            A journey beyond the stars that will challenge everything you know
            about space and time.
          </p>

          {/* Movie Details */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white flex items-center h-6"
            >
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(movie.release_date).getFullYear()}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white flex items-center h-6"
            >
              <Clock className="h-3 w-3 mr-1" />
              {humanizeDuration(movie.runtime)}
            </Badge>
            {movie.genres.map((genre) => (
              <Link key={genre.id} href={`/genres/${genre.id}`} passHref>
                <Badge
                  key={genre.id}
                  variant="secondary"
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 cursor-pointer transition-colors flex items-center h-6"
                >
                  {genre.name}
                </Badge>
              </Link>
            ))}
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-300">{movie.overview}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 text-white border-none flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Watch Now
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-black/50 hover:bg-black/70 text-pink-400 border-pink-400 hover:text-pink-300 hover:border-pink-300"
            >
              Add to Watchlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
