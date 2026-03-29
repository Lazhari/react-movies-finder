export interface CastMember {
  id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
  order: number;
  gender: number;
  credit_id: string;
  cast_id?: number;
  adult?: boolean;
}

export interface CrewMember {
  id: number;
  name: string;
  original_name: string;
  department: string;
  job: string;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
  gender: number;
  credit_id: string;
  adult?: boolean;
}

export interface Credits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}
