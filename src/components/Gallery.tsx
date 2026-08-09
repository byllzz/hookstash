import { ArrowUpRight, Sparkles } from 'lucide-react'
import type { HookEntry } from '../lib/registry'
import { CATEGORY_ORDER, CATEGORY_ACCENT, HOOK_META, type Category } from '../lib/meta'

export function Gallery({
  hooks,
  allCount,
  category,
  onCategoryChange,
  onSelect,
}: {
  hooks: HookEntry[]
  allCount: number
  category: Category | 'All'
  onCategoryChange: (c: Category | 'All') => void
  onSelect: (slug: string) => void
}) {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="border-b border-border py-16 text-center">
        <div className="mx-auto mb-4 flex w-fit items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs text-ink-faint">
          <Sparkles className="h-3 w-3" strokeWidth={2} />
          {allCount} hooks, zero dependencies
        </div>
        <h1 className="mx-auto max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          A small, working shelf of React hooks.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
          Every hook here does something you'll actually reach for. Open one
          to see it run, then copy the source straight into your project.
        </p>
      </section>

      <div className="flex flex-wrap items-center gap-1.5 py-6">
        <FilterPill
          active={category === 'All'}
          onClick={() => onCategoryChange('All')}
          label={`All · ${allCount}`}
        />
        {CATEGORY_ORDER.map((c) => (
          <FilterPill
            key={c}
            active={category === c}
            onClick={() => onCategoryChange(c)}
            label={c}
            dotClass={CATEGORY_ACCENT[c].dot}
          />
        ))}
      </div>

      <div className="pb-16">
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
    </div>
  )
}

function FilterPill({
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
        <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-white' : dotClass}`} />
      )}
      {label}
    </button>
  )
}
