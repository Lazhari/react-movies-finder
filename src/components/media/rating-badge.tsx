import { cn } from "@/lib/utils";

interface RatingBadgeProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

function getRatingColor(rating: number): string {
  if (rating >= 7) return "text-green-400 border-green-400/50";
  if (rating >= 5) return "text-yellow-400 border-yellow-400/50";
  return "text-red-400 border-red-400/50";
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
} as const;

export function RatingBadge({
  rating,
  size = "md",
  className,
}: RatingBadgeProps) {
  if (!rating || isNaN(rating)) return null;

  const score = Math.round(rating * 10) / 10;

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border-2 bg-background/80 font-bold",
        getRatingColor(rating),
        sizeClasses[size],
        className,
      )}
    >
      {score}
    </div>
  );
}
