import { Command } from 'lucide-react'
import type { HookEntry } from '../lib/registry'
import { CATEGORY_ORDER, CATEGORY_ACCENT, HOOK_META } from '../lib/meta'

export function Sidebar({
  hooks,
  activeSlug,
  onSelect,
  onOpenPalette,
}: {
  hooks: HookEntry[]
  activeSlug: string
  onSelect: (slug: string) => void
  onOpenPalette: () => void
}) {
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: hooks.filter((h) => HOOK_META[h.name]?.category === category),
  })).filter((g) => g.items.length > 0)

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex items-center gap-2 border-b border-border px-4 py-4">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-ink text-[11px] font-semibold text-white">
          H
        </div>
        <span className="font-semibold tracking-tight">Hookstash</span>
        <span className="ml-auto rounded border border-border px-1.5 py-0.5 text-[10px] text-ink-faint">
          {hooks.length}
        </span>
      </div>

      <div className="p-3">
        <button
          onClick={onOpenPalette}
          className="flex w-full items-center justify-between rounded border border-border bg-canvas px-3 py-2 text-sm text-ink-faint transition-colors hover:border-border-strong hover:text-ink-soft"
        >
          <span>Jump to a hook…</span>
          <span className="flex items-center gap-0.5 rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] text-ink-faint">
            <Command className="h-2.5 w-2.5" strokeWidth={2.5} />K
          </span>
        </button>
      </div>

      <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 pb-4">
        {grouped.map(({ category, items }) => {
          const accent = CATEGORY_ACCENT[category]
          return (
            <div key={category} className="mb-5">
              <div className="mb-1.5 flex items-center gap-1.5 px-1">
                <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                <span className="text-[11px] font-medium uppercase tracking-wider text-ink-faint">
                  {category}
                </span>
                <span className="text-[11px] text-ink-faint">
                  · {items.length}
                </span>
              </div>
              <div className="space-y-0.5">
                {items.map((hook) => {
                  const meta = HOOK_META[hook.name]
                  const Icon = meta?.icon
                  const active = hook.slug === activeSlug
                  return (
                    <button
                      key={hook.slug}
                      onClick={() => onSelect(hook.slug)}
                      className={`group flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors ${
                        active
                          ? 'bg-accent-soft'
                          : 'hover:bg-canvas'
                      }`}
                    >
                      {Icon && (
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded ${
                            active ? 'bg-white' : 'bg-canvas group-hover:bg-white'
                          }`}
                        >
                          <Icon
                            className={`h-3.5 w-3.5 ${
                              active ? accent.text : 'text-ink-faint'
                            }`}
                            strokeWidth={1.75}
                          />
                        </span>
                      )}
                      <span
                        className={`truncate font-mono text-[13px] ${
                          active ? 'text-accent font-medium' : 'text-ink-soft'
                        }`}
                      >
                        {hook.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
        {hooks.length === 0 && (
          <p className="px-2 py-4 text-sm text-ink-faint">No hooks match your search.</p>
        )}
      </nav>
    </aside>
  )
}
