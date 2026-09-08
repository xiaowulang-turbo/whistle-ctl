import { Zap, ShieldCheck, Package, FileCode2, Workflow, ShieldAlert } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { FEATURES } from '../lib/site'

const ICONS: Record<string, LucideIcon> = {
  Zap,
  ShieldCheck,
  Package,
  FileCode2,
  Workflow,
  ShieldAlert,
}

export function Features() {
  return (
    <section id="features" className="relative border-t border-border/60 bg-card/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Built for the way agents actually switch mocks
          </h2>
          <p className="mt-4 text-muted-foreground">
            Rule-group toggling is the highest-frequency operation in proxy workflows. whistle-ctl
            makes it scriptable and safe.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = ICONS[f.icon] ?? Zap
            return (
              <div
                key={f.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-sky-500/40 hover:shadow-lg hover:shadow-sky-950/30"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-sky-500/12 text-sky-400 transition-colors group-hover:bg-sky-500/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
