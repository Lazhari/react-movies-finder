"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface PhotoGridProps {
  images: { file_path: string; width: number; height: number }[];
  baseUrl: string;
  title?: string;
}

export function PhotoGrid({
  images,
  baseUrl,
  title = "Photos",
}: PhotoGridProps) {
  const [selected, setSelected] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const displayImages = images.slice(0, 12);

  return (
    <section className="space-y-4 px-4 sm:px-8">
      <h2 className="text-xl font-bold text-primary sm:text-2xl">{title}</h2>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
        {displayImages.map((img, i) => (
          <button
            key={img.file_path}
            onClick={() => setSelected(i)}
            className="relative aspect-[2/3] overflow-hidden rounded-lg transition-opacity hover:opacity-80"
          >
            <Image
              src={`${baseUrl}${img.file_path}`}
              alt={`Photo ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
            />
          </button>
        ))}
      </div>

      <Dialog open={selected !== null} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">Photo viewer</DialogTitle>
          {selected !== null && (
            <div className="relative">
              <Image
                src={`https://image.tmdb.org/t/p/original${displayImages[selected].file_path}`}
                alt={`Photo ${selected + 1}`}
                width={displayImages[selected].width}
                height={displayImages[selected].height}
                className="mx-auto max-h-[80vh] w-auto rounded-lg object-contain"
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute right-2 top-2 rounded-full p-1.5 glass"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              {selected > 0 && (
                <button
                  onClick={() => setSelected(selected - 1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 glass"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}
              {selected < displayImages.length - 1 && (
                <button
                  onClick={() => setSelected(selected + 1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 glass"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
