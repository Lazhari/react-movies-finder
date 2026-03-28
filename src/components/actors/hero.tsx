'use client'

import { Badge } from '@/components/ui/badge'
import { Tiles } from '@/components/ui/tiles' // Import Tiles component
import { Actor } from '@/models/actor'
import { Cake, MapPin, Star } from 'lucide-react'
import Image from 'next/image'

interface ActorHeroProps {
  actor: Actor
}

export default function ActorHero({ actor }: ActorHeroProps) {
  const posterURL = actor.profile_path
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${actor.profile_path}`
    : '/placeholder.svg'

  return (
    <div className="relative h-[480px] w-full overflow-hidden">
      {/* Tiles Background Effect */}
      <Tiles className="absolute inset-0 opacity-20" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* Content Container */}
      <div className="relative flex h-full text-white p-6 md:p-12 items-center">
        {/* Actor Poster */}
        <div className="hidden lg:block mr-8 flex-shrink-0">
          <Image
            src={posterURL}
            alt={`${actor.name} poster`}
            className="w-60 h-[360px] object-cover rounded-lg shadow-lg"
            width={600}
            height={900}
          />
        </div>

        {/* Actor Information */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{actor.name}</h1>
          <p className="text-sm md:text-lg mb-4 text-gray-300">
            {actor.known_for_department}
          </p>

          {/* Actor Details */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white flex items-center h-6"
            >
              <Cake className="h-3 w-3 mr-1" />
              {actor.birthday || 'N/A'}
            </Badge>
            {actor.place_of_birth && (
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white flex items-center h-6"
              >
                <MapPin className="h-3 w-3 mr-1" />
                {actor.place_of_birth}
              </Badge>
            )}
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white flex items-center h-6"
            >
              <Star className="h-3 w-3 mr-1" />
              {actor.popularity.toFixed(1)}
            </Badge>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Biography</h2>
            <p className="text-sm text-gray-300">
              {actor.biography || 'No biography available.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
