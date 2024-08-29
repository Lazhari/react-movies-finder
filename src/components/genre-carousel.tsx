import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Link from 'next/link'

interface GenreCarouselProps {
  genres: { name: string; id: number }[]
}

export default function GenreCarousel({ genres }: GenreCarouselProps) {
  return (
    <div className="sm:p-8 sm:py-4 px-4 flex flex-col gap-5">
      <h2 className="text-2xl font-bold text-primary">Explore by Genre</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {genres.map(({ name, id }) => (
            <CarouselItem key={id} className="pl-2 basis-auto">
              <Link href={`/genres/${id}`} passHref>
                <Card className="w-[120px] h-[40px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 border-0 overflow-hidden transition-transform duration-200 ease-in-out hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  <CardContent className="p-0 flex items-center justify-center h-full">
                    <span className="text-xs font-semibold text-white text-center px-1">
                      {name}
                    </span>
                  </CardContent>
                </Card>
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
