"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { YOUTUBE_EMBED_BASE } from "@/lib/constants";
import { Play } from "lucide-react";
import { useState } from "react";

interface VideoPlayerProps {
  videoKey: string | null;
  title?: string;
}

export function VideoPlayer({ videoKey, title = "Trailer" }: VideoPlayerProps) {
  const [open, setOpen] = useState(false);

  if (!videoKey) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg bg-amber px-6 py-3 font-semibold text-amber-foreground transition-colors hover:bg-amber/90"
      >
        <Play className="h-5 w-5" fill="currentColor" />
        Watch Trailer
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              src={`${YOUTUBE_EMBED_BASE}/${videoKey}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
