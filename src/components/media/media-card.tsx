"use client";

import { RatingBadge } from "@/components/media/rating-badge";
import { getPosterURL } from "@/lib/movies";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface MediaCardProps {
  id: number;
  title: string;
  posterPath: string | null;
  rating: number;
  year: string;
  mediaType: "movie" | "tv";
  index?: number;
  className?: string;
}

export function MediaCard({
  id,
  title,
  posterPath,
  rating,
  year,
  mediaType,
  index = 0,
  className,
}: MediaCardProps) {
  const href = mediaType === "movie" ? `/movies/${id}` : `/tv/${id}`;
  const yearDisplay = year ? new Date(year).getFullYear() : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn("group relative", className)}
    >
      <Link href={href} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
          {posterPath ? (
            <Image
              src={getPosterURL(posterPath, "large")}
              alt={title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-sm text-muted-foreground">No Poster</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-2 left-2 right-2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="truncate text-sm font-medium text-white">{title}</p>
            <p className="text-xs text-white/70">{yearDisplay}</p>
          </div>
          <div className="absolute right-2 top-2">
            <RatingBadge rating={rating} size="sm" />
          </div>
        </div>
        <div className="mt-2 transition-opacity duration-300 group-hover:opacity-0">
          <p className="truncate text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{yearDisplay}</p>
        </div>
      </Link>
    </motion.div>
  );
}
