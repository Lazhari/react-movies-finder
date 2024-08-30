'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Reviews() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1200&h=800&fit=crop')",
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1
          className="text-4xl md:text-6xl font-bold text-center mb-4 animate-fade-in-up"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
        >
          Interstellar Odyssey
        </h1>
        <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl animate-fade-in-up animation-delay-200">
          A journey beyond the stars that will challenge everything you know
          about space and time.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in-up animation-delay-400">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Release: 2023</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Duration: 2h 49m</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>Rating: 9.2/10</span>
          </Badge>
        </div>
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-600">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Watch Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-background/20 hover:bg-background/30 text-white border-white"
          >
            Add to Watchlist
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
