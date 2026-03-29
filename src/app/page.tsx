import { HeroSlider } from "@/components/media/hero-slider";
import { MediaCard } from "@/components/media/media-card";
import { MediaCarousel } from "@/components/media/media-carousel";
import { Movie } from "@/types/movies";
import { TVShow } from "@/types/tv";
import { getHomePageData } from "./actions";

function isMovie(item: Movie | TVShow): item is Movie {
  return "title" in item;
}

function toHeroSlide(item: Movie | TVShow) {
  const isMovieItem = isMovie(item);
  return {
    id: item.id,
    title: isMovieItem ? item.title : item.name,
    overview: item.overview,
    backdropPath: item.backdrop_path,
    rating: item.vote_average,
    year: isMovieItem ? item.release_date : item.first_air_date,
    mediaType: (isMovieItem ? "movie" : "tv") as "movie" | "tv",
  };
}

function renderCarouselItems(items: (Movie | TVShow)[]) {
  return items.slice(0, 20).map((item, i) => {
    const isMovieItem = isMovie(item);
    return (
      <div key={item.id} className="w-[160px] shrink-0 sm:w-[185px]">
        <MediaCard
          id={item.id}
          title={isMovieItem ? item.title : item.name}
          posterPath={item.poster_path}
          rating={item.vote_average}
          year={
            isMovieItem ? item.release_date : (item as TVShow).first_air_date
          }
          mediaType={isMovieItem ? "movie" : "tv"}
          index={i}
        />
      </div>
    );
  });
}

export default async function Home() {
  const {
    trendingDay,
    trendingWeek,
    popularMovies,
    popularTV,
    upcoming,
    genres,
  } = await getHomePageData();

  const heroSlides = trendingDay.slice(0, 5).map(toHeroSlide);

  return (
    <main className="flex flex-1 flex-col">
      <HeroSlider slides={heroSlides} />

      <div className="space-y-8 py-8">
        {/* Genre pills */}
        <div
          className="flex gap-2 overflow-x-auto px-4 sm:px-8"
          style={{ scrollbarWidth: "none" }}
        >
          {genres.map((genre) => (
            <a
              key={genre.id}
              href={`/genres/${genre.id}?name=${encodeURIComponent(genre.name)}`}
              className="glass shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
            >
              {genre.name}
            </a>
          ))}
        </div>

        <MediaCarousel title="Trending Today">
          {renderCarouselItems(trendingDay)}
        </MediaCarousel>

        <MediaCarousel title="Trending This Week">
          {renderCarouselItems(trendingWeek)}
        </MediaCarousel>

        <MediaCarousel title="Popular Movies" viewAllHref="/movies">
          {popularMovies.slice(0, 20).map((movie, i) => (
            <div key={movie.id} className="w-[160px] shrink-0 sm:w-[185px]">
              <MediaCard
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                rating={movie.vote_average}
                year={movie.release_date}
                mediaType="movie"
                index={i}
              />
            </div>
          ))}
        </MediaCarousel>

        <MediaCarousel title="Popular TV Shows" viewAllHref="/tv">
          {popularTV.slice(0, 20).map((show, i) => (
            <div key={show.id} className="w-[160px] shrink-0 sm:w-[185px]">
              <MediaCard
                id={show.id}
                title={show.name}
                posterPath={show.poster_path}
                rating={show.vote_average}
                year={show.first_air_date}
                mediaType="tv"
                index={i}
              />
            </div>
          ))}
        </MediaCarousel>

        <MediaCarousel title="Upcoming" viewAllHref="/upcoming">
          {upcoming.slice(0, 20).map((movie, i) => (
            <div key={movie.id} className="w-[160px] shrink-0 sm:w-[185px]">
              <MediaCard
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                rating={movie.vote_average}
                year={movie.release_date}
                mediaType="movie"
                index={i}
              />
            </div>
          ))}
        </MediaCarousel>
      </div>
    </main>
  );
}
