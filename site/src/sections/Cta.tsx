import { Github, Box, TerminalSquare } from 'lucide-react'
import { SITE } from '../lib/site'

export function Cta() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Start switching rules instantly
        </h2>
        <p className="mt-4 text-muted-foreground">
          Install it once, and put rule-group control into your scripts and agents.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href={SITE.npmUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-6 py-3 text-sm font-semibold text-sky-50 transition-all hover:bg-sky-400 hover:shadow-lg hover:shadow-sky-500/25"
          >
            <Box className="h-4 w-4" />
            npm install -g whistle-ctl
          </a>
          <a
            href={SITE.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-sky-500/50"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={SITE.docsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-sky-500/50"
          >
            <TerminalSquare className="h-4 w-4" />
            Whistle API docs
          </a>
        </div>
      </div>
    </section>
  )
}
