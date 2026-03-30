import { Clapperboard } from "lucide-react";
import Link from "next/link";

const navColumns = [
  {
    title: "Discover",
    links: [
      { href: "/", label: "Popular Movies" },
      { href: "/upcoming", label: "Upcoming" },
      { href: "/tv", label: "TV Shows" },
      { href: "/genres", label: "Genres" },
    ],
  },
  {
    title: "Features",
    links: [
      { href: "/surprise", label: "Surprise Me" },
      { href: "/watchlist", label: "Watchlist" },
      { href: "/search", label: "Search" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-background">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-8 sm:py-12">
        {/* Mobile: compact centered layout */}
        {/* Desktop: full grid */}
        <div className="hidden sm:grid sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-lg font-bold text-primary"
            >
              <Clapperboard className="h-5 w-5" />
              MoviesFinder
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground/60">
              A lightweight, open-source movie discovery app. Find your next
              favorite movie or TV show, build watchlists, and share them with
              friends. No accounts, no tracking.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a
                href="https://github.com/Lazhari/react-movies-finder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-muted-foreground/40 transition-colors hover:text-primary"
              >
                GitHub
              </a>
              <span className="text-muted-foreground/20">&#183;</span>
              <span className="text-xs text-muted-foreground/30">
                Powered by TMDB
              </span>
            </div>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.title} className="space-y-3">
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground/60 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile: minimal */}
        <div className="flex flex-col items-center gap-4 text-center sm:hidden">
          <Link
            href="/"
            className="flex items-center gap-2 font-display font-bold text-primary"
          >
            <Clapperboard className="h-4 w-4" />
            MoviesFinder
          </Link>
          <p className="text-xs text-muted-foreground/40">
            Open source movie discovery. No accounts, no tracking.
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground/30">
            <a
              href="https://github.com/Lazhari/react-movies-finder"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <span>&#183;</span>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              TMDB
            </a>
            <span>&#183;</span>
            <span>v3.0</span>
          </div>
        </div>

        {/* Bottom bar: desktop only */}
        <div className="mt-10 hidden items-center justify-between border-t border-white/[0.04] pt-6 sm:flex">
          <p className="text-xs text-muted-foreground/30">
            MoviesFinder v3.0 &middot; Open Source &middot; No tracking
          </p>
          <p className="text-xs text-muted-foreground/20">
            Data provided by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/40 transition-colors hover:text-primary"
            >
              The Movie Database (TMDB)
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
