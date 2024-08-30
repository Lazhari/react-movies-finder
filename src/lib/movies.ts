export function humanizeDuration(duration: number) {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${hours}h ${minutes}m`
}

export function getBackdropURL(path: string) {
  return `https://image.tmdb.org/t/p/w1280${path}`
}
