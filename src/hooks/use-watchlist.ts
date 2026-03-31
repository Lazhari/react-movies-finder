"use client";

import { useCallback, useEffect, useState } from "react";

export interface WatchlistItem {
  id: number;
  type: "movie" | "tv";
  title: string;
  posterPath: string | null;
  rating: number;
  year: string;
  addedAt: number;
}

const STORAGE_KEY = "sb-watchlist";

function readStorage(): WatchlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStorage(items: WatchlistItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function useWatchlist() {
  const [items, setItems] = useState<WatchlistItem[]>(() => readStorage());

  const add = useCallback(
    (item: Omit<WatchlistItem, "addedAt">) => {
      const updated = [
        ...items.filter((i) => !(i.id === item.id && i.type === item.type)),
        { ...item, addedAt: Date.now() },
      ];
      writeStorage(updated);
      setItems(updated);
    },
    [items],
  );

  const remove = useCallback(
    (id: number, type: "movie" | "tv") => {
      const updated = items.filter(
        (i) => !(i.id === id && i.type === type),
      );
      writeStorage(updated);
      setItems(updated);
    },
    [items],
  );

  const has = useCallback(
    (id: number, type: "movie" | "tv") => {
      return items.some((i) => i.id === id && i.type === type);
    },
    [items],
  );

  const clear = useCallback(() => {
    writeStorage([]);
    setItems([]);
  }, []);

  const encode = useCallback((): string => {
    const data = items.map((i) => `${i.type[0]}${i.id}`).join(",");
    return btoa(data);
  }, [items]);

  return { items, add, remove, has, clear, encode };
}

export function decodeWatchlist(
  encoded: string,
): { id: number; type: "movie" | "tv" }[] {
  try {
    const decoded = atob(encoded);
    return decoded.split(",").map((entry) => ({
      type: entry[0] === "t" ? "tv" : "movie",
      id: Number(entry.slice(1)),
    }));
  } catch {
    return [];
  }
}
