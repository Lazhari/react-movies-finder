import { Movie } from '@/models/movie'
import { Clapperboard, Star } from 'lucide-react'
import Image from 'next/image'
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
      <div className="relative w-full h-[60vh]">
        <Image
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
          alt={movie.title}
          fill
          className="rounded-xl"
        />
      </div>
      <div className="py-4 flex flex-col gap-3">
        <div className="flex justify-between items-center gap-1">
          <h2 className="font-bold text-xl line-clamp-1 w-full">
            {movie.title}
          </h2>
          {/* <div className="py-1 px-2 bg-[#161921] rounded-sm">
            <p className="text-sm font-bold text-white capitalize">
              {movie.vote_count} votes
            </p>
          </div> */}
        </div>
        <div className="flex gap-4 items-center justify-between">
          <div className="flex flex-row gap-2 items-center">
            <Clapperboard size={18} className="text-red-900" />
            <p className="text-base font-bold">{movie.release_date}</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Star size={18} className="text-[#FFAD49]" />
            <p className="text-base font-bold text-[#FFAD49]">
              {movie.vote_average}
            </p>
          </div>
        </div>
      </div>
    </MotionDiv>
  )
}
