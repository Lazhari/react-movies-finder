'use client'

import { MoviesReqOptions } from '@/types/movies'
import { LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

let page = 2
export type MovieCard = JSX.Element

interface LoadMoreProps {
  fetchAction: (opts: MoviesReqOptions) => Promise<MovieCard[]>
  genreId?: number
}

export function LoadMore({ fetchAction, genreId }: LoadMoreProps) {
  const { ref, inView } = useInView()
  const [data, setData] = useState<MovieCard[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (inView) {
      setLoading(true)
      const delay = 500
      const timeoutId = setTimeout(async () => {
        const newData = await fetchAction({ page, genreId })
        setData([...data, ...newData])
        setLoading(false)
        page++
      }, delay)

      return () => clearTimeout(timeoutId)
    }
  }, [inView, data, genreId])

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          {inView && loading && (
            <LoaderCircle className="w-12 h-12 animate-spin" />
          )}
        </div>
      </section>
    </>
  )
}
