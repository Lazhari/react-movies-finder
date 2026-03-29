"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

interface MediaCarouselProps {
  title: string;
  viewAllHref?: string;
  children: React.ReactNode;
  className?: string;
}

export function MediaCarousel({
  title,
  viewAllHref,
  children,
  className,
}: MediaCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between px-4 sm:px-8">
        <h2 className="text-xl font-bold text-primary sm:text-2xl">{title}</h2>
        <div className="flex items-center gap-2">
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              View All
            </Link>
          )}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="rounded-full p-1.5 glass disabled:opacity-30 transition-colors hover:bg-white/10"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="rounded-full p-1.5 glass disabled:opacity-30 transition-colors hover:bg-white/10"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto px-4 pb-4 sm:px-8"
        style={{ scrollbarWidth: "none" }}
      >
        {children}
      </div>
    </section>
  );
}
