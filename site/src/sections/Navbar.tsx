import { Github, TerminalSquare, Box } from 'lucide-react'
import { NAV_LINKS, SITE } from '../lib/site'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm font-semibold text-foreground">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-sky-500/15 text-sky-400">
            <TerminalSquare className="h-4 w-4" />
          </span>
          whistle-ctl
        </a>

        <div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={SITE.repoUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-sky-500/50 hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={SITE.npmUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-sky-50 transition-colors hover:bg-sky-400 sm:flex"
          >
            <Box className="h-4 w-4" />
            npm
          </a>
        </div>
      </nav>
    </header>
  )
}
