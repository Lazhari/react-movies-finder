'use server'

import { Actor } from '@/models/actor'
import { ActorMovieCredits } from '@/types/actors'

const baseURL = process.env.MOVIE_DB_URL
const apiKey = process.env.MOVIE_DB_API_KEY

export async function fetchActorDetails(id: string): Promise<Actor> {
  const resp = await fetch(`${baseURL}/person/${id}?api_key=${apiKey}`)
  if (!resp.ok) {
    throw new Error(`Failed to fetch actor details: ${resp.statusText}`)
  }
  return resp.json()
}

export async function fetchActorMovieCredits(
  id: string
): Promise<ActorMovieCredits> {
  const resp = await fetch(
    `${baseURL}/person/${id}/movie_credits?api_key=${apiKey}`
  )
  if (!resp.ok) {
    throw new Error(`Failed to fetch actor movie credits: ${resp.statusText}`)
  }
  return resp.json()
}
