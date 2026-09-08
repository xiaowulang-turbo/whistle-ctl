import { Github, TerminalSquare } from 'lucide-react'
import { SITE } from '../lib/site'

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-12 sm:flex-row">
        <div className="flex items-center gap-2 font-mono text-sm text-foreground">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-sky-500/15 text-sky-400">
            <TerminalSquare className="h-3.5 w-3.5" />
          </span>
          whistle-ctl
          <span className="ml-2 text-xs text-muted-foreground">v0.1.0 · MIT</span>
        </div>

        <p className="text-sm text-muted-foreground">
          An independent CLI over the{' '}
          <a
            href={SITE.docsUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 transition-colors hover:text-sky-300"
          >
            Whistle Local Agent API
          </a>
          .
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href={SITE.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-foreground">
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a href={SITE.npmUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
            npm
          </a>
        </div>
      </div>
    </footer>
  )
}
