import { getProfileURL } from "@/lib/movies";
import { CastMember } from "@/types/credits";
import Image from "next/image";
import Link from "next/link";

interface CastProps {
  cast: CastMember[];
}

export default function Cast({ cast }: CastProps) {
  if (!cast || cast.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="px-4 text-xl font-bold text-primary sm:px-8 sm:text-2xl">
        Cast
      </h2>
      <div
        className="flex gap-4 overflow-x-auto px-4 pb-4 sm:px-8"
        style={{ scrollbarWidth: "none" }}
      >
        {cast.slice(0, 20).map((member) => (
          <Link
            key={member.credit_id}
            href={`/actors/${member.id}`}
            className="group w-32 shrink-0 space-y-2"
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
              {member.profile_path ? (
                <Image
                  src={getProfileURL(member.profile_path, "medium")}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="128px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <span className="text-xs text-muted-foreground">
                    No Photo
                  </span>
                </div>
              )}
            </div>
            <div>
              <p className="truncate text-sm font-medium">{member.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {member.character}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
