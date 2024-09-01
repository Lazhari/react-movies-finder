import { Card, CardContent } from '@/components/ui/card'
import { TVShow } from '@/types/tv'
import { Calendar, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { MotionDiv } from '../ui/motion-div'

interface TVCardProps {
  tv: TVShow
  index: number
}

const variant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}
export default function TVShowCard({ tv, index }: TVCardProps) {
  const posterFullUrl = tv.poster_path
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${tv.poster_path}`
    : '/placeholder.svg'
  return (
    <Link href={`/tv/${tv.id}`} passHref>
      <MotionDiv
        variants={variant}
        initial="hidden"
        animate="visible"
        transition={{
          delay: index * 0.1,
          ease: 'easeInOut',
          duration: 0.5,
        }}
        viewport={{ amount: 0 }}
        className="relative max-w-sm rounded w-full"
      >
        <Card className="overflow-hidden hover:shadow-xl">
          <div className="relative aspect-[2/3] w-full">
            <Image
              src={posterFullUrl}
              alt={`${tv.name} poster`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            <div className="absolute top-2 right-2">
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white shadow-sm">
                {tv.origin_country.join(', ')}
              </span>
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-2 truncate" title={tv.name}>
              {tv.name}
            </h3>
            <div className="flex items-center justify-between text-sm">
              {tv.first_air_date && (
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(tv.first_air_date).getFullYear()}</span>
                </div>
              )}

              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1 fill-current" />
                <span className="font-semibold">
                  {tv.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </MotionDiv>
    </Link>
  )
}
