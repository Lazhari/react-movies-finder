import { Menu, Popcorn, Search } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Popcorn className="h-8 w-8" />
          <span className="sr-only">Movies Finder</span>
        </Link>
        <Link
          href="/"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Popular
        </Link>
        <Link
          href="/upcoming"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Upcoming
        </Link>
        <Link
          href="/tv"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Series
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Popcorn className="h-8 w-8" />
              <span className="sr-only">Movies Finder</span>
            </Link>
            <Link href="/" className="hover:text-foreground">
              Popular
            </Link>
            <Link
              href="/upcoming"
              className="text-muted-foreground hover:text-foreground"
            >
              Upcoming
            </Link>
            <Link
              href="/tv"
              className="text-muted-foreground hover:text-foreground"
            >
              Series
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search movies..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
      </div>
    </header>
  )
}
