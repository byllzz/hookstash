import { ArrowUpRight, Sparkles, Star, Search, Command, ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import type { HookEntry } from '../lib/registry'
import { CATEGORY_ORDER, CATEGORY_ACCENT, HOOK_META, type Category } from '../lib/meta'
import { Faq } from './Faq'

export function Gallery({
  hooks,
  allCount,
  category,
  onCategoryChange,
  onSelect,
  favorites,
  onToggleFavorite,
  favoritesOnly,
  onToggleFavoritesOnly,
  query,
  onQueryChange,
  onOpenPlayground,
}: {
  hooks: HookEntry[]
  allCount: number
  category: Category | 'All'
  onCategoryChange: (c: Category | 'All') => void
  onSelect: (slug: string) => void
  favorites: string[]
  onToggleFavorite: (slug: string) => void
  favoritesOnly: boolean
  onToggleFavoritesOnly: () => void
  query: string
  onQueryChange: (q: string) => void
  onOpenPlayground: () => void
}) {
  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <div className="mx-auto mb-5 flex w-fit items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs text-ink-faint">
            <Sparkles className="h-3 w-3" strokeWidth={2} />
            {allCount} hooks · zero dependencies · MIT licensed
          </div>
          <h1 className="mx-auto max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            A small, working shelf<br className="hidden sm:block" /> of React hooks.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
            Every hook here does something you'll actually reach for. Open
            one to see it run, then copy the source straight into your
            project - no package, no bundle weight.
          </p>
          <div className="mt-7 flex items-center justify-center gap-2.5">
            <a
              href="#browse"
              className="rounded-lg bg-solid px-4 py-2.5 text-sm font-medium text-on-solid transition-opacity hover:opacity-90"
            >
              Browse hooks
            </a>
            <button
              onClick={onOpenPlayground}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:border-border-strong hover:text-ink"
            >
              Try the playground
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </section>

      <div id="browse" className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            <FilterPill
              active={category === 'All' && !favoritesOnly}
              onClick={() => {
                onCategoryChange('All')
                if (favoritesOnly) onToggleFavoritesOnly()
              }}
              label={`All · ${allCount}`}
            />
            {CATEGORY_ORDER.map((c) => (
              <FilterPill
                key={c}
                active={category === c && !favoritesOnly}
                onClick={() => {
                  onCategoryChange(c)
                  if (favoritesOnly) onToggleFavoritesOnly()
                }}
                label={c}
                dotClass={CATEGORY_ACCENT[c].dot}
              />
            ))}
            <span className="mx-1 h-4 w-px bg-border" />
            <FilterPill
              active={favoritesOnly}
              onClick={onToggleFavoritesOnly}
              label={`Favorites · ${favorites.length}`}
              icon={<Star className="h-3 w-3" strokeWidth={2} fill={favoritesOnly ? 'currentColor' : 'none'} />}
            />
          </div>

          <div className="relative w-full sm:w-56">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" strokeWidth={1.75} />
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Filter hooks…"
              className="w-full rounded-md border border-border bg-surface py-1.5 pl-8 pr-12 text-sm outline-none transition-colors focus:border-accent"
            />
            <span className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-border px-1 py-0.5 text-[10px] text-ink-faint sm:flex">
              <Command className="h-2.5 w-2.5" strokeWidth={2.5} />K
            </span>
          </div>
        </div>

        <div className="min-h-[420px] pb-16">
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
                const isFav = favorites.includes(hook.slug)
                return (
                  <div
                    key={hook.slug}
                    className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_4px_20px_-8px_rgba(0,0,0,0.12)]"
                  >
                    <span className={`absolute inset-x-0 top-0 h-0.5 ${accent?.dot ?? 'bg-border'}`} />

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleFavorite(hook.slug)
                      }}
                      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                      className="absolute right-3.5 top-4 z-10 text-ink-faint transition-colors hover:text-amber-500"
                    >
                      <Star
                        className="h-4 w-4"
                        strokeWidth={1.75}
                        fill={isFav ? 'currentColor' : 'none'}
                        color={isFav ? '#d97706' : undefined}
                      />
                    </button>

                    <button
                      onClick={() => onSelect(hook.slug)}
                      className="flex flex-1 flex-col items-start p-5 pt-6 text-left"
                    >
                      {Icon && (
                        <span
                          className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${accent?.text}`}
                          style={{ backgroundColor: 'color-mix(in srgb, currentColor 12%, transparent)' }}
                        >
                          <Icon className="h-5 w-5" strokeWidth={1.6} />
                        </span>
                      )}
                      <h3 className="font-mono text-[15px] font-medium text-ink">
                        {hook.name}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-ink-soft">
                        {hook.summary}
                      </p>

                      <div className="mt-auto flex w-full items-center justify-between pt-5">
                        {meta && (
                          <span className={`flex items-center gap-1.5 text-[11px] font-medium ${accent?.text}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${accent?.dot}`} />
                            {meta.category}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-[11px] font-medium text-ink-faint opacity-0 transition-opacity group-hover:opacity-100">
                          View
                          <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
                        </span>
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <Faq />
    </div>
  )
}

function FilterPill({
  active,
  onClick,
  label,
  dotClass,
  icon,
}: {
  active: boolean
  onClick: () => void
  label: string
  dotClass?: string
  icon?: ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? 'border-solid bg-solid text-on-solid'
          : 'border-border text-ink-soft hover:border-border-strong'
      }`}
    >
      {dotClass && (
        <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-white' : dotClass}`} />
      )}
      {icon}
      {label}
    </button>
  )
}
