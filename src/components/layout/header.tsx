import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold font-headline sm:inline-block">
            Minimal Website
          </span>
        </Link>
        <nav className="flex items-center space-x-4 sm:space-x-6 text-sm font-medium">
          <Link
            href="#home"
            className="transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="#about"
            className="transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link
            href="#contact"
            className="transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
