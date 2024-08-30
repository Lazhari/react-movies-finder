import { Movie } from '@/models/movie'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '../ui/card'
import { MotionDiv } from '../ui/motion-div'

type MovieCardProps = {
  movie: Movie
  index: number
}

const variant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}
export default function MovieCard({ movie, index }: MovieCardProps) {
  return (
    <Link href={`/movies/${movie.id}`} passHref>
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
        <Card className="overflow-hidden">
          <div className="relative aspect-[2/3] w-full">
            <Image
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`
                  : '/placeholder.svg'
              }
              alt={`${movie.title} poster`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </div>
          <CardHeader className="p-4">
            <h3 className="truncate text-md font-bold">{movie.title}</h3>
          </CardHeader>
          <CardContent className="flex items-center justify-between p-4 pt-0">
            <p className="text-sm text-muted-foreground">
              {movie.release_date}
            </p>
            <div className="flex items-center space-x-1">
              <StarIcon className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </CardContent>
        </Card>
      </MotionDiv>
    </Link>
  )
}
