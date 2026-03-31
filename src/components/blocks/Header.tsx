"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useWatchlist } from "@/hooks/use-watchlist";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  ChevronRight,
  Clapperboard,
  Clock,
  Dice5,
  Home,
  Layers,
  Menu,
  Search,
  Tv,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home", subtitle: "Featured & trending", icon: Home, color: "bg-blue-500/20 text-blue-400" },
  { href: "/upcoming", label: "Upcoming", subtitle: "Coming soon to theaters", icon: Clock, color: "bg-purple-500/20 text-purple-400" },
  { href: "/tv", label: "TV Shows", subtitle: "Series & episodes", icon: Tv, color: "bg-amber/20 text-amber" },
  { href: "/genres", label: "Genres", subtitle: "Browse by category", icon: Layers, color: "bg-green-500/20 text-green-400" },
  { href: "/watchlist", label: "Watchlist", subtitle: "", icon: Bookmark, color: "bg-red-500/20 text-red-400" },
  { href: "/surprise", label: "Surprise Me", subtitle: "Random pick for tonight", icon: Dice5, color: "bg-amber/20 text-amber" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { items: watchlistItems } = useWatchlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setSheetOpen(false);
      setQuery("");
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-border"
          : "bg-gradient-to-b from-background/80 to-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold font-display text-primary"
        >
          <Clapperboard className="h-5 w-5" />
          <span className="hidden sm:inline">Screenbox</span>
          <span className="sm:hidden">SB</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Desktop search */}
          <div className="hidden sm:block">
            {searchOpen ? (
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-2"
              >
                <Input
                  type="search"
                  placeholder="Search movies, TV shows..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-64 bg-background/50"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Mobile menu */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="h-[85vh] rounded-t-3xl p-0 [&>button:last-child]:hidden"
              aria-describedby={undefined}
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>

              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-start justify-between px-5 pt-6 pb-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-primary/60">
                      Navigation
                    </p>
                    <h2 className="mt-0.5 text-xl font-bold">Browse</h2>
                  </div>
                  <SheetClose className="rounded-full bg-white/[0.06] p-2 hover:bg-white/10 transition-colors">
                    <X className="h-4 w-4 text-muted-foreground" />
                  </SheetClose>
                </div>

                {/* Search */}
                <div className="px-5 pb-5">
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
                      <Input
                        type="search"
                        placeholder="Search movies, shows..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="h-11 rounded-xl border-white/[0.06] bg-white/[0.04] pl-10 text-sm placeholder:text-muted-foreground/30 focus:border-primary/30 focus:bg-white/[0.06]"
                      />
                    </div>
                  </form>
                </div>

                {/* Section label */}
                <div className="px-5 pb-2">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40">
                    Menu
                  </p>
                </div>

                {/* Nav links */}
                <nav className="flex-1 space-y-1 px-3">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    const isWatchlist = link.href === "/watchlist";
                    const subtitle =
                      isWatchlist && watchlistItems.length > 0
                        ? `${watchlistItems.length} title${watchlistItems.length !== 1 ? "s" : ""} saved`
                        : link.subtitle;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setSheetOpen(false)}
                        className={cn(
                          "flex items-center gap-3.5 rounded-2xl px-3 py-3 transition-all duration-200",
                          isActive
                            ? "bg-primary/15"
                            : "hover:bg-white/[0.03]",
                        )}
                      >
                        {/* Icon */}
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                            isActive ? "bg-primary text-primary-foreground" : link.color,
                          )}
                        >
                          <Icon className="h-[18px] w-[18px]" />
                        </div>

                        {/* Label + subtitle */}
                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              "text-[15px] font-semibold leading-tight",
                              isActive
                                ? "text-primary"
                                : "text-foreground/90",
                            )}
                          >
                            {link.label}
                          </p>
                          {subtitle && (
                            <p className="mt-0.5 text-[12px] text-muted-foreground/50">
                              {subtitle}
                            </p>
                          )}
                        </div>

                        {/* Badge or chevron */}
                        {isWatchlist && watchlistItems.length > 0 ? (
                          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                            {watchlistItems.length}
                          </span>
                        ) : (
                          <ChevronRight
                            className={cn(
                              "h-4 w-4 shrink-0",
                              isActive
                                ? "text-primary"
                                : "text-muted-foreground/20",
                            )}
                          />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {/* Footer */}
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[12px] font-medium text-primary/40">
                        Screenbox v3
                      </p>
                      <p className="text-[11px] text-muted-foreground/25">
                        Last updated Mar 2026
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06]">
                        <Clapperboard className="h-3.5 w-3.5 text-muted-foreground/40" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
