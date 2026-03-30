"use client";

import { MediaCard } from "@/components/media/media-card";
import { RatingBadge } from "@/components/media/rating-badge";
import {
  decodeWatchlist,
  useWatchlist,
  WatchlistItem,
} from "@/hooks/use-watchlist";
import { getPosterURL } from "@/lib/movies";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  Check,
  Link2,
  List,
  Loader2,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState, useTransition } from "react";
import { fetchWatchlistDetails } from "./actions";

interface SharedItem {
  id: number;
  type: "movie" | "tv";
  title: string;
  posterPath: string | null;
  rating: number;
  year: string;
  overview: string;
}

function WatchlistContent() {
  const searchParams = useSearchParams();
  const sharedList = searchParams.get("list");

  const { items, remove, clear, encode, add } = useWatchlist();
  const [copied, setCopied] = useState(false);
  const [sharedItems, setSharedItems] = useState<SharedItem[]>([]);
  const [isLoadingShared, startTransition] = useTransition();

  // Load shared list if present
  useEffect(() => {
    if (!sharedList) return;
    const entries = decodeWatchlist(sharedList);
    if (entries.length === 0) return;

    startTransition(async () => {
      const details = await fetchWatchlistDetails(entries);
      setSharedItems(details.filter((d): d is SharedItem => d !== null));
    });
  }, [sharedList]);

  const handleShare = useCallback(() => {
    const encoded = encode();
    const url = `${window.location.origin}/watchlist?list=${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [encode]);

  const handleSaveSharedItem = useCallback(
    (item: SharedItem) => {
      add({
        id: item.id,
        type: item.type,
        title: item.title,
        posterPath: item.posterPath,
        rating: item.rating,
        year: item.year,
      });
    },
    [add],
  );

  // Viewing a shared list
  if (sharedList) {
    return (
      <main className="flex flex-1 flex-col gap-8 px-4 py-8 sm:px-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link2 className="h-4 w-4" />
            Shared Watchlist
          </div>
          <h1 className="font-display text-3xl font-bold text-primary">
            Someone shared their watchlist with you
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isLoadingShared
              ? "Loading..."
              : `${sharedItems.length} titles`}
          </p>
        </div>

        {isLoadingShared && (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {!isLoadingShared && sharedItems.length > 0 && (
          <div className="space-y-2">
            {sharedItems.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-secondary/50"
              >
                <Link
                  href={
                    item.type === "movie"
                      ? `/movies/${item.id}`
                      : `/tv/${item.id}`
                  }
                  className="relative aspect-[2/3] w-16 shrink-0 overflow-hidden rounded-lg"
                >
                  {item.posterPath ? (
                    <Image
                      src={getPosterURL(item.posterPath, "small")}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground">
                      N/A
                    </div>
                  )}
                </Link>

                <Link
                  href={
                    item.type === "movie"
                      ? `/movies/${item.id}`
                      : `/tv/${item.id}`
                  }
                  className="flex-1 min-w-0"
                >
                  <p className="text-sm font-semibold transition-colors group-hover:text-primary">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.type === "movie" ? "Movie" : "TV Show"}
                    {item.year
                      ? ` \u00B7 ${new Date(item.year).getFullYear()}`
                      : ""}
                  </p>
                  {item.overview && (
                    <p className="mt-1 line-clamp-1 text-xs text-foreground/50">
                      {item.overview}
                    </p>
                  )}
                </Link>

                {item.rating > 0 && (
                  <RatingBadge rating={item.rating} size="sm" />
                )}

                <button
                  onClick={() => handleSaveSharedItem(item)}
                  className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium glass hover:bg-white/10 transition-colors"
                >
                  + Save
                </button>
              </div>
            ))}
          </div>
        )}

        <Link
          href="/watchlist"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          View your own watchlist
        </Link>
      </main>
    );
  }

  // Personal watchlist
  const sorted = [...items].sort((a, b) => b.addedAt - a.addedAt);

  return (
    <main className="flex flex-1 flex-col gap-8 px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20">
            <Bookmark className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-primary">
              Watchlist
            </h1>
            <p className="text-sm text-muted-foreground">
              {sorted.length} title{sorted.length !== 1 ? "s" : ""} saved
            </p>
          </div>
        </div>

        {sorted.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Link2 className="h-4 w-4" />
              )}
              {copied ? "Copied!" : "Share"}
            </button>
            <button
              onClick={clear}
              className="rounded-lg p-2.5 glass hover:bg-white/10 transition-colors"
              title="Clear all"
            >
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        )}
      </div>

      {sorted.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-20">
          <List className="h-16 w-16 text-muted-foreground/30" />
          <p className="text-lg text-muted-foreground">
            Your watchlist is empty
          </p>
          <p className="text-sm text-muted-foreground/60">
            Browse movies and TV shows, then tap the bookmark button to save
            them here.
          </p>
          <Link
            href="/"
            className="mt-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Start Browsing
          </Link>
        </div>
      )}

      {sorted.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {sorted.map((item) => (
            <div key={`${item.type}-${item.id}`} className="group relative">
              <MediaCard
                id={item.id}
                title={item.title}
                posterPath={item.posterPath}
                rating={item.rating}
                year={item.year}
                mediaType={item.type}
              />
              <button
                onClick={() => remove(item.id, item.type)}
                className="absolute right-2 top-2 rounded-full bg-black/70 p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
                title="Remove"
              >
                <X className="h-3.5 w-3.5 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default function WatchlistPage() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </main>
      }
    >
      <WatchlistContent />
    </Suspense>
  );
}
