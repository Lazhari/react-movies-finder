export interface Credit {
  id: number
  adult: boolean
  gender: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  cast_id: string
}

export interface CreditCast extends Credit {
  character: string
  credit_id: string
  order: number
}

export interface CreditCrew extends Credit {
  department: string
  job: string
}
