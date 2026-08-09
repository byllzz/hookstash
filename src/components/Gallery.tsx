import { ArrowUpRight } from 'lucide-react'
import type { HookEntry } from '../lib/registry'
import { CATEGORY_ACCENT, HOOK_META } from '../lib/meta'

export function Gallery({
  hooks,
  onSelect,
}: {
  hooks: HookEntry[]
  onSelect: (slug: string) => void
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 max-w-xl">
        <h1 className="text-2xl font-semibold tracking-tight">
          A small, working shelf of React hooks.
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          Every hook here does something you'll actually reach for. Open one
          to see it run, then copy the source straight into your project.
        </p>
      </div>

      {hooks.length === 0 ? (
        <p className="py-16 text-center text-sm text-ink-faint">
          No hooks match this filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {hooks.map((hook) => {
            const meta = HOOK_META[hook.name]
            const Icon = meta?.icon
            const accent = meta ? CATEGORY_ACCENT[meta.category] : null
            return (
              <button
                key={hook.slug}
                onClick={() => onSelect(hook.slug)}
                className="group flex flex-col items-start rounded-lg border border-border bg-surface p-5 text-left transition-colors hover:border-border-strong"
              >
                <div className="mb-4 flex w-full items-start justify-between">
                  {Icon && (
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-canvas">
                      <Icon className={`h-4.5 w-4.5 ${accent?.text}`} strokeWidth={1.75} />
                    </span>
                  )}
                  <ArrowUpRight
                    className="h-4 w-4 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100"
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="font-mono text-[15px] font-medium text-ink">
                  {hook.name}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
                  {hook.summary}
                </p>
                {meta && (
                  <span
                    className={`mt-4 flex items-center gap-1.5 text-[11px] font-medium ${accent?.text}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${accent?.dot}`} />
                    {meta.category}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
