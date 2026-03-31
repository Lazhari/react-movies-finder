# Screenbox

> Formerly **Movies Finder**. The project has been renamed to Screenbox as of v3. The repository name (`react-movies-finder`) remains unchanged.

A lightweight, open-source movie and TV show discovery app. Browse trending titles, explore genres, build shareable watchlists, and find your next watch. No accounts, no tracking.

Built with Next.js 16, React 19, Tailwind CSS 4, and the TMDB API.

## Features

- **Home**: trending spotlight hero, horizontal carousels for trending/popular/upcoming
- **Movie Details**: cinematic hero, trailer player, cast, reviews, recommendations, watch providers, collection links
- **TV Show Details**: status badges, season browser with episode lists, network logos, next/last episode info
- **Genres**: backdrop-image genre cards for movies, dedicated TV genre browse with sorting
- **Upcoming**: discover endpoint with future date range, spotlight hero, countdown badges, grouped by month
- **Search**: multi-search with results split by Movies/TV Shows
- **Surprise Me**: random movie picker with genre and streaming provider filters
- **Watchlist**: localStorage-based, shareable via URL (base64 encoded), bookmark toggle on detail pages
- **Actors**: cinematic hero with best performances highlight, filmography grouped by decade
- **Collections**: hero with average rating, movies in release order
- **Seasons**: per-season episode list with best-rated episode hero, trailer, watch providers

## Tech Stack

| Layer      | Technology                               |
| ---------- | ---------------------------------------- |
| Framework  | Next.js 16.2.1 (App Router, Turbopack)   |
| UI         | React 19, Tailwind CSS 4.2, shadcn/ui v2 |
| Animation  | Framer Motion 12                         |
| Icons      | Lucide React                             |
| API        | TMDB (The Movie Database) v3             |
| Deployment | Vercel                                   |

## Getting Started

### Prerequisites

- Node.js 20+
- A TMDB API key ([get one here](https://www.themoviedb.org/settings/api))

### Setup

```bash
git clone https://github.com/Lazhari/react-movies-finder.git
cd react-movies-finder
npm install
```

Create a `.env.local` file (see `.env.example`):

```bash
MOVIE_DB_URL=https://api.themoviedb.org/3
MOVIE_DB_API_KEY=your_tmdb_api_key_here
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/              # Next.js App Router pages
    actors/         # Actor detail
    collections/    # Collection detail
    genres/         # Movie genre browse
    movies/         # Movie detail
    search/         # Search results
    surprise/       # Random picker
    tv/             # TV shows, detail, genres, seasons
    upcoming/       # Upcoming movies
    watchlist/      # Shareable watchlist
  components/
    blocks/         # Header, Footer
    media/          # MediaCard, MediaCarousel, HeroSlider, RatingBadge,
                    #   VideoPlayer, ProviderList, WatchlistButton, PhotoGrid
    movies/         # Movie hero, cast, reviews
    tv/             # TV hero, seasons
    actors/         # Actor hero
    ui/             # shadcn/ui components
  hooks/            # useWatchlist
  lib/
    api/            # TMDB client (tmdb.ts) and types
    constants.ts    # Image sizes, YouTube embed URL
    movies.ts       # URL helpers, date formatting
    utils.ts        # cn() utility
  types/            # TypeScript interfaces
```

## License

MIT License. Copyright (c) 2020 Lazhari.
