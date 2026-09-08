import { COMMANDS } from '../lib/site'

export function Commands() {
  return (
    <section id="commands" className="border-t border-border/60 bg-card/30 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Commands
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every command maps 1:1 to the Whistle Local Agent API — easy to reason about, easy to
            script.
          </p>
        </div>

        <div className="mt-12 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {COMMANDS.map((c) => (
            <div
              key={c.cmd}
              className="grid items-start gap-2 px-6 py-4 transition-colors hover:bg-secondary/40 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] sm:gap-6"
            >
              <code className="font-mono text-[13px] leading-relaxed text-sky-300">{c.cmd}</code>
              <p className="text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
