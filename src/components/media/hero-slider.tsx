"use client";

import { RatingBadge } from "@/components/media/rating-badge";
import { getBackdropURL } from "@/lib/movies";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface HeroSlide {
  id: number;
  title: string;
  overview: string;
  backdropPath: string | null;
  rating: number;
  year: string;
  mediaType: "movie" | "tv";
}

interface HeroSliderProps {
  slides: HeroSlide[];
  autoPlayInterval?: number;
}

export function HeroSlider({
  slides,
  autoPlayInterval = 6000,
}: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, next, autoPlayInterval, slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[current];
  const href =
    slide.mediaType === "movie" ? `/movies/${slide.id}` : `/tv/${slide.id}`;

  return (
    <section
      className="relative h-[70vh] w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {slide.backdropPath && (
            <Image
              src={getBackdropURL(slide.backdropPath, "original")}
              alt={slide.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl space-y-4"
          >
            <div className="flex items-center gap-3">
              <RatingBadge rating={slide.rating} size="lg" />
              <span className="text-sm text-muted-foreground">
                {slide.year ? new Date(slide.year).getFullYear() : ""}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl font-display">
              {slide.title}
            </h1>
            <p className="line-clamp-3 text-base text-white/80 sm:text-lg">
              {slide.overview}
            </p>
            <div className="flex gap-3 pt-2">
              <Link
                href={href}
                className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Play className="h-5 w-5" fill="currentColor" />
                More Details
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 glass transition-colors hover:bg-white/10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 glass transition-colors hover:bg-white/10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === current ? "w-8 bg-primary" : "w-4 bg-white/30",
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
