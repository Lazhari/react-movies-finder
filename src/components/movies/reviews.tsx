import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface ReviewsProps {
  reviews: Review[]
}

export default function Reviews({ reviews }: ReviewsProps) {
  const ReviewCard = ({ review }: { review: Review }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="bg-background h-full flex flex-col cursor-pointer hover:bg-accent transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage
                  src={`https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`}
                  alt={review.author}
                />
                <AvatarFallback>
                  {review.author
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg font-semibold">
                {review.author}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground line-clamp-3">
              {review.content}
            </p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-2">
            <Avatar>
              <AvatarImage
                src={`https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`}
                alt={review.author}
              />
              <AvatarFallback>
                {review.author
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            {review.author}&lsquo;s Review
          </DialogTitle>
        </DialogHeader>
        <p className="mt-4 text-muted-foreground">{review.content}</p>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="w-full mx-auto px-6 md:px-12 mt-6">
      <h2 className="text-xl font-bold mb-2">Reviews</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {reviews.map((review) => (
            <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <ReviewCard review={review} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
