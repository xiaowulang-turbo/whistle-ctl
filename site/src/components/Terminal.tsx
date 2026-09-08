import { TERMINAL_LINES } from '../lib/site'

export function TerminalWindow() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[#0d1526] shadow-2xl shadow-sky-950/40">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border/70 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">whistle-ctl — mock workflow</span>
      </div>
      {/* Body */}
      <div className="space-y-2 p-5 font-mono text-[13px] leading-relaxed">
        {TERMINAL_LINES.map((line, i) => (
          <div key={i}>
            {line.comment && (
              <div className="text-slate-500"># {line.comment}</div>
            )}
            {line.prompt && (
              <div className="text-slate-100">
                <span className="mr-2 select-none text-sky-400">{line.prompt}</span>
                <span className="whitespace-pre-wrap">{line.cmd}</span>
              </div>
            )}
            {line.out && (
              <div className="whitespace-pre-wrap text-emerald-400">{line.out}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
