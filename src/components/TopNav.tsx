import { Command } from 'lucide-react'
import { CATEGORY_ORDER, CATEGORY_ACCENT, type Category } from '../lib/meta'

export function TopNav({
  view,
  onGoHome,
  activeCategory,
  onCategoryChange,
  onOpenPalette,
  count,
}: {
  view: 'gallery' | 'detail'
  onGoHome: () => void
  activeCategory: Category | 'All'
  onCategoryChange: (c: Category | 'All') => void
  onOpenPalette: () => void
  count: number
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-canvas/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
        <button onClick={onGoHome} className="flex items-center gap-2 shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-ink text-xs font-semibold text-white">
            H
          </div>
          <span className="font-semibold tracking-tight">Hookstash</span>
        </button>

        {view === 'gallery' && (
          <nav className="flex flex-1 items-center gap-1.5 overflow-x-auto">
            <Pill
              active={activeCategory === 'All'}
              onClick={() => onCategoryChange('All')}
              label={`All · ${count}`}
            />
            {CATEGORY_ORDER.map((c) => (
              <Pill
                key={c}
                active={activeCategory === c}
                onClick={() => onCategoryChange(c)}
                label={c}
                dotClass={CATEGORY_ACCENT[c].dot}
              />
            ))}
          </nav>
        )}

        {view === 'detail' && (
          <button
            onClick={onGoHome}
            className="text-sm text-ink-faint transition-colors hover:text-ink-soft"
          >
            ← Back to all hooks
          </button>
        )}

        <button
          onClick={onOpenPalette}
          className="ml-auto flex shrink-0 items-center gap-2 rounded border border-border bg-surface px-3 py-1.5 text-sm text-ink-faint transition-colors hover:border-border-strong hover:text-ink-soft"
        >
          <span className="hidden sm:inline">Search</span>
          <span className="flex items-center gap-0.5 rounded border border-border px-1.5 py-0.5 text-[10px]">
            <Command className="h-2.5 w-2.5" strokeWidth={2.5} />K
          </span>
        </button>
      </div>
    </header>
  )
}

function Pill({
  active,
  onClick,
  label,
  dotClass,
}: {
  active: boolean
  onClick: () => void
  label: string
  dotClass?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? 'border-ink bg-ink text-white'
          : 'border-border text-ink-soft hover:border-border-strong'
      }`}
    >
      {dotClass && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-white' : dotClass}`}
        />
      )}
      {label}
    </button>
  )
}
