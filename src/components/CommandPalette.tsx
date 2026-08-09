import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, CornerDownLeft } from 'lucide-react'
import type { HookEntry } from '../lib/registry'
import { HOOK_META } from '../lib/meta'

export function CommandPalette({
  hooks,
  open,
  onClose,
  onSelect,
}: {
  hooks: HookEntry[]
  open: boolean
  onClose: () => void
  onSelect: (slug: string) => void
}) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return hooks
    return hooks.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.summary.toLowerCase().includes(q) ||
        h.tags.some((t) => t.includes(q)),
    )
  }, [hooks, query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setCursor(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    setCursor(0)
  }, [query])

  if (!open) return null

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => Math.min(c + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => Math.max(c - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const pick = results[cursor]
      if (pick) {
        onSelect(pick.slug)
        onClose()
      }
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/30 pt-[14vh] backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-lg border border-border-strong bg-surface shadow-xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-ink-faint" strokeWidth={2} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hooks by name, purpose, or tag…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-ink-faint"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-ink-faint">
            esc
          </kbd>
        </div>

        <div className="scrollbar-thin max-h-80 overflow-y-auto p-1.5">
          {results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-ink-faint">
              No hooks found.
            </p>
          )}
          {results.map((hook, i) => {
            const meta = HOOK_META[hook.name]
            const Icon = meta?.icon
            const active = i === cursor
            return (
              <button
                key={hook.slug}
                onMouseEnter={() => setCursor(i)}
                onClick={() => {
                  onSelect(hook.slug)
                  onClose()
                }}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors ${
                  active ? 'bg-accent-soft' : ''
                }`}
              >
                {Icon && (
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      active ? 'text-accent' : 'text-ink-faint'
                    }`}
                    strokeWidth={1.75}
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div
                    className={`font-mono text-[13px] ${
                      active ? 'text-accent font-medium' : 'text-ink'
                    }`}
                  >
                    {hook.name}
                  </div>
                  <div className="truncate text-xs text-ink-faint">
                    {hook.summary}
                  </div>
                </div>
                {active && (
                  <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2} />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
