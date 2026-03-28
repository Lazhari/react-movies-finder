import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { CastMember } from '@/types/credits'
import Image from 'next/image'
import Link from 'next/link'

interface CastProps {
  cast: CastMember[]
  title: string
}

export default function Cast({ cast, title }: CastProps) {
  return (
    <div className="w-full mx-auto px-6 md:px-12">
      <h2 className="text-xl font-bold mb-2">Cast of {title}</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 md:-ml-5">
          {cast.map((member) => (
            <CarouselItem key={member.id} className="pl-3 basis-auto">
              <Link href={`/actors/${member.id}`} passHref>
                <div className="cursor-pointer hover:bg-accent/10 transition-colors rounded-lg p-3 h-full flex flex-col items-center justify-between">
                  <div className="w-28 h-28 rounded-full overflow-hidden mb-3">
                    <Image
                      src={
                        member.profile_path
                          ? `https://image.tmdb.org/t/p/w276_and_h350_face/${member.profile_path}`
                          : '/placeholder.svg'
                      }
                      alt={member.name}
                      width={112}
                      height={112}
                      className="object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-sm line-clamp-1">
                      {member.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {member.character}
                    </p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
