'use client'

import { Video } from '@/types/movies'
import { TVShowDetails } from '@/types/tv'
import { Play, Star, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

interface TvHeroProps {
  tv: TVShowDetails
  trailers: Video[]
}

export default function TvHero({ tv, trailers }: TvHeroProps) {
  const [showTrailer, setShowTrailer] = useState(false)

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowTrailer(false)
      }
    }

    if (showTrailer) {
      document.addEventListener('keydown', handleEscKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [showTrailer])

  const backdropFullURL = `https://image.tmdb.org/t/p/original${tv.backdrop_path}`
  const posterURL = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${tv.poster_path}`
  return (
    <div className="relative h-[480px] w-full overflow-hidden bg-black">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: `url('${backdropFullURL}')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* Content */}
      <div className="relative flex h-full text-white p-6 md:p-12">
        {/* Poster */}
        <div className="hidden lg:block mr-8">
          <Image
            src={tv.poster_path ? posterURL : '/placeholder.svg'}
            alt={`${tv.name} poster`}
            className="w-60 h-[360px] object-cover rounded-lg shadow-lg"
            width={600}
            height={900}
          />
        </div>

        {/* Show Details */}
        <div className="flex flex-col justify-center max-w-2xl">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">{tv.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-lg mb-4">
            <span>{new Date(tv.first_air_date).getFullYear()}</span>
            <span>•</span>
            {tv.episode_run_time.length > 1 && (
              <span>{tv.episode_run_time[0]} min</span>
            )}
            {tv.origin_country.map((country) => (
              <span
                className="px-2 py-1 bg-gray-700 rounded-md text-sm font-semibold"
                key={country}
              >
                {country}
              </span>
            ))}
            {tv.adult && (
              <span className="px-2 py-1 bg-red-600 rounded-md text-sm font-semibold">
                18+
              </span>
            )}
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
              <span className="font-bold">{tv.vote_average.toFixed(1)}</span>
            </div>
          </div>
          {/* Network Logos */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-sm text-gray-300">Available on:</span>
            {tv.networks.map((network) => (
              <div
                className="relative w-12 h-6 bg-white rounded"
                key={network.id}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w92${network.logo_path}`}
                  alt="Network 1"
                  layout="fill"
                  objectFit="contain"
                  className="p-1"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {tv.genres.map((genre) => (
              <Link key={genre.id} href={`/tv/genres/${genre.id}`} passHref>
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 cursor-pointer transition-colors flex items-center h-6"
                >
                  {genre.name}
                </Badge>
              </Link>
            ))}
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-300">{tv.overview}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {trailers.length > 0 && (
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 text-white border-none flex items-center gap-2"
                onClick={() => setShowTrailer(true)}
              >
                <Play className="h-4 w-4" />
                Watch Trailer
              </Button>
            )}
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
      {/* Full-screen Trailer Modal */}
      {showTrailer && trailers.length > 0 && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed/${trailers[0]?.key}?autoplay=1`}
              title="Interstellar Odyssey Trailer"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <Button
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
              onClick={() => setShowTrailer(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
