"use client";

import { useWatchlist } from "@/hooks/use-watchlist";
import { cn } from "@/lib/utils";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface WatchlistButtonProps {
  id: number;
  type: "movie" | "tv";
  title: string;
  posterPath: string | null;
  rating: number;
  year: string;
  className?: string;
}

export function WatchlistButton({
  id,
  type,
  title,
  posterPath,
  rating,
  year,
  className,
}: WatchlistButtonProps) {
  const { has, add, remove } = useWatchlist();
  const saved = has(id, type);

  return (
    <button
      onClick={() =>
        saved
          ? remove(id, type)
          : add({ id, type, title, posterPath, rating, year })
      }
      className={cn(
        "flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all",
        saved
          ? "bg-primary/20 text-primary hover:bg-primary/30"
          : "glass hover:bg-white/10",
        className,
      )}
    >
      {saved ? (
        <BookmarkCheck className="h-4 w-4" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
      {saved ? "Saved" : "Watchlist"}
    </button>
  );
}
