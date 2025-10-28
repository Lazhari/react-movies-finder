'use server'

import { redirect } from 'next/navigation'

const baseURL = process.env.MOVIE_DB_URL
const apiKey = process.env.MOVIE_DB_API_KEY

export async function search(formData: FormData) {
  const query = formData.get('query') as string
  redirect(`/search?query=${query}`)
}

export async function searchMulti(query: string) {
  const resp = await fetch(
    `${baseURL}/search/multi?api_key=${apiKey}&query=${query}`
  )
  const data = await resp.json()
  return data?.results
}
