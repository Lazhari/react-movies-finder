import { Badge } from "@/components/ui/badge";
import { formatDate, getProfileURL } from "@/lib/movies";
import { Actor } from "@/types/actors";
import Image from "next/image";

interface ActorHeroProps {
  actor: Actor;
}

export default function ActorHero({ actor }: ActorHeroProps) {
  return (
    <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-8">
      <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
        {actor.profile_path && (
          <div className="shrink-0 self-start">
            <div className="relative aspect-[2/3] w-56 overflow-hidden rounded-xl shadow-2xl sm:w-72">
              <Image
                src={getProfileURL(actor.profile_path, "original")}
                alt={actor.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 224px, 288px"
              />
            </div>
          </div>
        )}

        <div className="flex-1 space-y-4">
          <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
            {actor.name}
          </h1>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{actor.known_for_department}</Badge>
            {actor.birthday && (
              <Badge variant="outline">{formatDate(actor.birthday)}</Badge>
            )}
            {actor.place_of_birth && (
              <Badge variant="outline">{actor.place_of_birth}</Badge>
            )}
          </div>

          {actor.biography && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Biography</h2>
              <p className="max-w-3xl whitespace-pre-line text-sm leading-relaxed text-foreground/80">
                {actor.biography}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
