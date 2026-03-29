"use client";

import { RatingBadge } from "@/components/media/rating-badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/movies";
import { Review } from "@/types/review";

interface ReviewsProps {
  reviews: Review[];
}

export default function Reviews({ reviews }: ReviewsProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="space-y-4 px-4 sm:px-8">
      <h2 className="text-xl font-bold text-primary sm:text-2xl">Reviews</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <Dialog key={review.id}>
            <DialogTrigger asChild>
              <button className="glass space-y-3 rounded-lg p-4 text-left transition-colors hover:bg-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="font-medium">{review.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(review.created_at)}
                    </p>
                  </div>
                  {review.author_details.rating && (
                    <RatingBadge
                      rating={review.author_details.rating}
                      size="sm"
                    />
                  )}
                </div>
                <p className="line-clamp-4 text-sm text-foreground/80">
                  {review.content}
                </p>
              </button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
              <DialogTitle>{review.author}&apos;s Review</DialogTitle>
              <div className="space-y-4 pt-2">
                {review.author_details.rating && (
                  <RatingBadge rating={review.author_details.rating} />
                )}
                <p className="whitespace-pre-line text-sm leading-relaxed">
                  {review.content}
                </p>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
