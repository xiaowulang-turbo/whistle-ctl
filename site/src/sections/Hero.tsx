import { Copy, Check, Package, TerminalSquare } from 'lucide-react'
import { useState } from 'react'
import { SITE } from '../lib/site'
import { TerminalWindow } from '../components/Terminal'

function InstallCommand() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.installCmd)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable */
    }
  }
  return (
    <div className="group relative inline-flex w-full max-w-xl items-center gap-3 overflow-hidden rounded-lg border border-border bg-[#0d1526] py-3 pl-4 pr-14 font-mono text-sm text-slate-100 sm:text-base">
      <Package className="h-4 w-4 shrink-0 text-sky-400" />
      <span>{SITE.installCmd}</span>
      <button
        onClick={copy}
        aria-label="Copy install command"
        className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  )
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 text-center sm:pt-28">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Built on the Whistle Local Agent API · v2.10.7+
          </span>
        </div>

        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl">
          Drive Whistle <span className="text-gradient">rule groups</span> from your terminal
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          whistle-ctl is a tiny, zero-dependency CLI that adds, selects, unselects and re-orders
          Whistle rule groups <span className="font-medium text-foreground">instantly</span> — no{' '}
          <code className="font-mono text-sm text-sky-400">w2 restart</code>, no web UI, no Node glue.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4">
          <InstallCommand />
          <a
            href="#quickstart"
            className="inline-flex items-center gap-2 text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
          >
            <TerminalSquare className="h-4 w-4" />
            See the 30-second quickstart
          </a>
        </div>

        {/* Terminal demo */}
        <div className="mx-auto mt-16 max-w-3xl text-left">
          <TerminalWindow />
        </div>
      </div>
    </section>
  )
}
