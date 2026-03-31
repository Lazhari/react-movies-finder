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
              Screenbox
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
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/40 transition-colors hover:text-primary"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"/></svg>
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
            Screenbox
          </Link>
          <p className="text-xs text-muted-foreground/40">
            Open source movie discovery. No accounts, no tracking.
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground/30">
            <a
              href="https://github.com/Lazhari/react-movies-finder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"/></svg>
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
            Screenbox v3.0 &middot; Open Source &middot; No tracking
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
