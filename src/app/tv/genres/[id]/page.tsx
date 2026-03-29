import { MediaCard } from "@/components/media/media-card";
import { discoverTV, fetchTVGenres } from "@/lib/api/tmdb";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ name?: string; page?: string; sort?: string }>;
}

export default async function TVGenreDetailPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { name, page, sort } = await searchParams;
  const genreId = Number(id);
  const currentPage = Number(page) || 1;
  const currentSort = sort || "popularity.desc";

  const [data, genresData] = await Promise.all([
    discoverTV({
      with_genres: String(genreId),
      page: currentPage,
      sort_by: currentSort,
    }),
    fetchTVGenres(),
  ]);

  const genreName = name || "Genre";

  const sortOptions = [
    { value: "popularity.desc", label: "Popular" },
    { value: "vote_average.desc", label: "Top Rated" },
    { value: "first_air_date.desc", label: "Newest" },
  ];

  return (
    <main className="flex flex-1 flex-col gap-8 px-4 py-8 sm:px-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-primary">
          {genreName} TV Shows
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {data.total_results.toLocaleString()} shows
        </p>
      </div>

      {/* Genre pills */}
      <div
        className="flex gap-2 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {genresData.genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/tv/genres/${genre.id}?name=${encodeURIComponent(genre.name)}`}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              genre.id === genreId
                ? "bg-primary text-primary-foreground"
                : "glass hover:bg-white/10",
            )}
          >
            {genre.name}
          </Link>
        ))}
      </div>

      {/* Sort */}
      <div className="flex gap-2">
        {sortOptions.map((opt) => (
          <Link
            key={opt.value}
            href={`/tv/genres/${id}?name=${encodeURIComponent(genreName)}&sort=${opt.value}`}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              currentSort === opt.value
                ? "bg-secondary text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {opt.label}
          </Link>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.results.map((show, i) => (
          <MediaCard
            key={show.id}
            id={show.id}
            title={show.name}
            posterPath={show.poster_path}
            rating={show.vote_average}
            year={show.first_air_date}
            mediaType="tv"
            index={i}
          />
        ))}
      </div>

      {/* Pagination */}
      {data.total_pages > 1 && (
        <div className="flex justify-center gap-2">
          {currentPage > 1 && (
            <Link
              href={`/tv/genres/${id}?name=${encodeURIComponent(genreName)}&sort=${currentSort}&page=${currentPage - 1}`}
              className="rounded-md bg-secondary px-4 py-2 text-sm hover:bg-secondary/80"
            >
              Previous
            </Link>
          )}
          <span className="flex items-center px-4 text-sm text-muted-foreground">
            Page {currentPage} of {Math.min(data.total_pages, 500)}
          </span>
          {currentPage < data.total_pages && (
            <Link
              href={`/tv/genres/${id}?name=${encodeURIComponent(genreName)}&sort=${currentSort}&page=${currentPage + 1}`}
              className="rounded-md bg-secondary px-4 py-2 text-sm hover:bg-secondary/80"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </main>
  );
}
