import { Movie } from "./movies";

export interface Actor {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
  also_known_as: string[];
  gender: number;
  homepage: string | null;
  imdb_id: string | null;
}

export interface ActorMovieCredit extends Movie {
  character: string;
  credit_id: string;
}

export interface ActorMovieCredits {
  id: number;
  cast: ActorMovieCredit[];
}
