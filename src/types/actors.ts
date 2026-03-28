import { Movie } from '@/models/movie'

export interface ActorMovieCredits {
  cast: (Movie & { character: string })[]
}
