import { COMPARE_ROWS } from '../lib/site'

export function Compare() {
  return (
    <section id="compare" className="border-t border-border/60 bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Why not just use w2 add?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three ways to touch Whistle rules, compared. whistle-ctl keeps the instant, additive
            API behavior without writing Node code.
          </p>
        </div>

        <div className="mt-12 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-card">
                <th className="px-6 py-4 font-medium text-muted-foreground">Capability</th>
                <th className="px-6 py-4 font-semibold text-sky-400">whistle-ctl</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">w2 add --force</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Raw Local Agent API</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((r) => (
                <tr key={r.feature} className="border-b border-border last:border-0 hover:bg-secondary/30">
                  <td className="px-6 py-4 font-medium text-foreground">{r.feature}</td>
                  <td className="px-6 py-4 text-emerald-400">{r.whistleCtl}</td>
                  <td className="px-6 py-4 text-muted-foreground">{r.w2Add}</td>
                  <td className="px-6 py-4 font-mono text-[13px] text-muted-foreground">{r.localApiRaw}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
          <h3 className="text-sm font-semibold text-amber-300">Known boundary</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The Local Agent API has <span className="font-medium text-foreground">no update</span>{' '}
            for the content of an <em>existing</em> rule group. To edit a long-lived group (for
            example, commenting out one line of your project rules), whistle-ctl deliberately stays
            out of the way — use{' '}
            <code className="font-mono text-[13px] text-amber-300">w2 add --force .whistle.js</code>{' '}
            instead. Boundaries are documented, not hidden.
          </p>
        </div>
      </div>
    </section>
  )
}
