'use client'

import { fetchMovies } from '@/app/actions'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

let page = 2
export type MovieCard = JSX.Element

export function LoadMore() {
  const { ref, inView } = useInView()
  const [data, setData] = useState<MovieCard[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (inView) {
      setLoading(true)
      const delay = 500
      const timeoutId = setTimeout(async () => {
        const newData = await fetchMovies(page)
        setData([...data, ...newData])
        setLoading(false)
        page++
      }, delay)

      return () => clearTimeout(timeoutId)
    }
  }, [inView, data])

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          {inView && loading && (
            <Image
              src="./spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
          )}
        </div>
      </section>
    </>
  )
}
