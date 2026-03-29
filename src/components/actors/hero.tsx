import { RatingBadge } from "@/components/media/rating-badge";
import { formatDate, getBackdropURL, getProfileURL } from "@/lib/movies";
import { Actor } from "@/types/actors";
import { Calendar, Film, MapPin, Star, TrendingUp } from "lucide-react";
import Image from "next/image";

interface ActorHeroProps {
  actor: Actor;
  heroBackdrop: string | null;
  movieCount: number;
  avgRating: number;
}

export default function ActorHero({
  actor,
  heroBackdrop,
  movieCount,
  avgRating,
}: ActorHeroProps) {
  const age = actor.birthday
    ? Math.floor(
        (new Date().getTime() - new Date(actor.birthday).getTime()) /
          (365.25 * 24 * 60 * 60 * 1000),
      )
    : null;

  return (
    <section className="relative">
      {/* Background */}
      {heroBackdrop ? (
        <div className="absolute inset-0 h-full">
          <Image
            src={getBackdropURL(heroBackdrop, "original")}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-background/30" />
        </div>
      ) : (
        <div className="absolute inset-0 h-full bg-gradient-to-b from-secondary/50 to-background" />
      )}

      <div className="relative mx-auto max-w-screen-lg px-4 pb-12 pt-12 sm:px-8 sm:pt-20">
        <div className="flex flex-col items-center text-center">
          {/* Profile photo */}
          {actor.profile_path && (
            <div className="relative mb-6 h-36 w-36 overflow-hidden rounded-full ring-4 ring-background shadow-2xl sm:h-44 sm:w-44">
              <Image
                src={getProfileURL(actor.profile_path, "original")}
                alt={actor.name}
                fill
                priority
                className="object-cover"
                sizes="176px"
              />
            </div>
          )}

          {/* Name */}
          <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
            {actor.name}
          </h1>

          {/* Department */}
          <p className="mt-2 text-sm tracking-widest uppercase text-muted-foreground">
            {actor.known_for_department}
          </p>

          {/* Stats row */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {actor.birthday && (
              <div className="glass flex items-center gap-2 rounded-full px-4 py-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {formatDate(actor.birthday)}
                  {age !== null && !actor.deathday && (
                    <span className="text-muted-foreground"> ({age})</span>
                  )}
                </span>
              </div>
            )}
            {actor.place_of_birth && (
              <div className="glass flex items-center gap-2 rounded-full px-4 py-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{actor.place_of_birth}</span>
              </div>
            )}
            {movieCount > 0 && (
              <div className="glass flex items-center gap-2 rounded-full px-4 py-2">
                <Film className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{movieCount} movies</span>
              </div>
            )}
            {avgRating > 0 && (
              <div className="glass flex items-center gap-2 rounded-full px-4 py-2">
                <Star className="h-4 w-4 text-amber" />
                <span className="text-sm">{avgRating.toFixed(1)} avg</span>
              </div>
            )}
            {actor.popularity > 0 && (
              <div className="glass flex items-center gap-2 rounded-full px-4 py-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{Math.round(actor.popularity)}</span>
              </div>
            )}
          </div>

          {/* Biography */}
          {actor.biography && (
            <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-foreground/70">
              {actor.biography.length > 600
                ? actor.biography.slice(0, 600).replace(/\s+\S*$/, "") + "..."
                : actor.biography}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
