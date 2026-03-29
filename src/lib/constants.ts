export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export const IMAGE_SIZES = {
  backdrop: {
    small: `${TMDB_IMAGE_BASE}/w300`,
    medium: `${TMDB_IMAGE_BASE}/w780`,
    large: `${TMDB_IMAGE_BASE}/w1280`,
    original: `${TMDB_IMAGE_BASE}/original`,
  },
  poster: {
    small: `${TMDB_IMAGE_BASE}/w185`,
    medium: `${TMDB_IMAGE_BASE}/w342`,
    large: `${TMDB_IMAGE_BASE}/w500`,
    original: `${TMDB_IMAGE_BASE}/original`,
  },
  profile: {
    small: `${TMDB_IMAGE_BASE}/w185`,
    medium: `${TMDB_IMAGE_BASE}/w342`,
    original: `${TMDB_IMAGE_BASE}/original`,
  },
  logo: {
    small: `${TMDB_IMAGE_BASE}/w92`,
    medium: `${TMDB_IMAGE_BASE}/w154`,
  },
} as const;

export const PAGE_SIZE = 20;

export const YOUTUBE_EMBED_BASE = "https://www.youtube.com/embed";
