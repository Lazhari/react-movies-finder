import { Season } from '@/types/tv'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface TvSeasonsProps {
  seasons: Season[]
}
export default function TvSeasons({ seasons }: TvSeasonsProps) {
  return (
    <div className="w-full mx-auto px-6 md:px-12 py-6">
      <h2 className="text-xl font-bold mb-2">Seasons</h2>
      <section className="grid xl:grid-cols-8 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
        {seasons.map((season) => (
          <Card
            className="w-full max-w-sm mx-auto overflow-hidden"
            key={season.id}
          >
            <CardHeader className="p-0">
              <div className="relative overflow-hidden aspect-[2/3] group">
                <Image
                  src={
                    season.poster_path
                      ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${season.poster_path}`
                      : '/placeholder.svg'
                  }
                  alt="Season Poster"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
                {season.vote_average && (
                  <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-full flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                    <span className="text-sm font-bold">
                      {season.vote_average.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl mb-2">{season.name}</CardTitle>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{season.episode_count} Episodes</span>
                <span>{new Date(season.air_date).getFullYear()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
