import { IMAGE_SIZES } from "./constants";

export function humanizeDuration(duration: number): string {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

export function getBackdropURL(
  path: string | null,
  size: keyof typeof IMAGE_SIZES.backdrop = "large",
): string {
  if (!path) return "";
  return `${IMAGE_SIZES.backdrop[size]}${path}`;
}

export function getPosterURL(
  path: string | null,
  size: keyof typeof IMAGE_SIZES.poster = "medium",
): string {
  if (!path) return "";
  return `${IMAGE_SIZES.poster[size]}${path}`;
}

export function getProfileURL(
  path: string | null,
  size: keyof typeof IMAGE_SIZES.profile = "medium",
): string {
  if (!path) return "";
  return `${IMAGE_SIZES.profile[size]}${path}`;
}

export function getLogoURL(
  path: string | null,
  size: keyof typeof IMAGE_SIZES.logo = "small",
): string {
  if (!path) return "";
  return `${IMAGE_SIZES.logo[size]}${path}`;
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatYear(dateString: string): string {
  if (!dateString) return "";
  return new Date(dateString).getFullYear().toString();
}
