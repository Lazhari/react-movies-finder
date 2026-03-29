import { MediaCard } from "@/components/media/media-card";
import { discoverMovies } from "@/lib/api/tmdb";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ name?: string; page?: string; sort?: string }>;
}

export default async function GenreDetailPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { name, page, sort } = await searchParams;
  const genreId = Number(id);
  const currentPage = Number(page) || 1;

  const data = await discoverMovies({
    with_genres: String(genreId),
    page: currentPage,
    sort_by: sort || "popularity.desc",
  });

  const genreName = name || "Genre";

  return (
    <main className="flex flex-1 flex-col gap-8 px-4 py-8 sm:px-8">
      <h1 className="font-display text-3xl font-bold text-primary">
        {genreName} Movies
      </h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.results.map((movie, i) => (
          <MediaCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            rating={movie.vote_average}
            year={movie.release_date}
            mediaType="movie"
            index={i}
          />
        ))}
      </div>

      {data.total_pages > 1 && (
        <div className="flex justify-center gap-2">
          {currentPage > 1 && (
            <a
              href={`/genres/${id}?name=${encodeURIComponent(genreName)}&page=${currentPage - 1}`}
              className="rounded-md bg-secondary px-4 py-2 text-sm hover:bg-secondary/80"
            >
              Previous
            </a>
          )}
          <span className="flex items-center px-4 text-sm text-muted-foreground">
            Page {currentPage} of {Math.min(data.total_pages, 500)}
          </span>
          {currentPage < data.total_pages && (
            <a
              href={`/genres/${id}?name=${encodeURIComponent(genreName)}&page=${currentPage + 1}`}
              className="rounded-md bg-secondary px-4 py-2 text-sm hover:bg-secondary/80"
            >
              Next
            </a>
          )}
        </div>
      )}
    </main>
  );
}
