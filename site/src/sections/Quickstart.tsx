import { SITE } from '../lib/site'

const STEPS = [
  {
    n: '01',
    title: 'Run Whistle (v2.10.7+)',
    body: 'whistle-ctl talks to the Whistle Local Agent API, so a global whistle >= 2.10.7 must be installed and running.',
    code: `npm install -g whistle@latest
w2 start`,
  },
  {
    n: '02',
    title: 'Install whistle-ctl',
    body: 'A single, zero-dependency package. The bin resolves the API module for you via w2 — no version paths to maintain.',
    code: `npm install -g whistle-ctl`,
  },
  {
    n: '03',
    title: 'Drive your rule groups',
    body: 'Rules are plain text, groups are switched instantly, and multi-select means other active groups are never lost.',
    code: `whistle-ctl add my-mock --file rules.txt --select --top
whistle-ctl list | grep my-mock
whistle-ctl unselect my-mock   # instant
whistle-ctl rm my-mock         # clean up`,
  },
]

export function Quickstart() {
  return (
    <section id="quickstart" className="border-t border-border/60 bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Up and running in 30 seconds
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three commands from a fresh shell to your first instant rule-group switch.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex flex-col rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-semibold text-sky-400">{s.n}</span>
                <div className="h-px flex-1 bg-border" />
                <span className="font-mono text-xs text-muted-foreground">step {i + 1}/3</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              <pre className="mt-5 overflow-x-auto rounded-lg border border-border bg-[#0d1526] p-4 font-mono text-[13px] leading-relaxed text-slate-200">
                {s.code}
              </pre>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={SITE.npmUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
          >
            View on npm →
          </a>
        </div>
      </div>
    </section>
  )
}
