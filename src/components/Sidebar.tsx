import { Search } from 'lucide-react'
import type { HookEntry } from '../lib/registry'

export function Sidebar({
  hooks,
  query,
  onQueryChange,
  activeSlug,
  onSelect,
}: {
  hooks: HookEntry[]
  query: string
  onQueryChange: (q: string) => void
  activeSlug: string
  onSelect: (slug: string) => void
}) {
  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex items-center gap-2 border-b border-border px-4 py-4">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-ink text-[11px] font-semibold text-white">
          H
        </div>
        <span className="font-semibold tracking-tight">Hookstash</span>
      </div>

      <div className="border-b border-border p-3">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint"
            strokeWidth={2}
          />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search hooks…"
            className="w-full rounded border border-border bg-canvas py-1.5 pl-8 pr-2 text-sm outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      <nav className="scrollbar-thin flex-1 overflow-y-auto p-2">
        {hooks.length === 0 ? (
          <p className="px-2 py-4 text-sm text-ink-faint">No hooks match "{query}".</p>
        ) : (
          hooks.map((hook) => {
            const active = hook.slug === activeSlug
            return (
              <button
                key={hook.slug}
                onClick={() => onSelect(hook.slug)}
                className={`mb-0.5 w-full rounded px-3 py-2 text-left transition-colors ${
                  active
                    ? 'bg-accent-soft text-accent'
                    : 'text-ink-soft hover:bg-canvas hover:text-ink'
                }`}
              >
                <div className="font-mono text-[13px] font-medium">{hook.name}</div>
                <div className="mt-0.5 truncate text-xs text-ink-faint">
                  {hook.summary}
                </div>
              </button>
            )
          })
        )}
      </nav>

      <div className="border-t border-border px-4 py-3 text-xs text-ink-faint">
        {hooks.length} hook{hooks.length === 1 ? '' : 's'} stashed
      </div>
    </aside>
  )
}
