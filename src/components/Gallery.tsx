import { ArrowUpRight, Sparkles, Star } from 'lucide-react'
import type { HookEntry } from '../lib/registry'
import { CATEGORY_ORDER, CATEGORY_ACCENT, HOOK_META, type Category } from '../lib/meta'

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
              const isFav = favorites.includes(hook.slug)
              return (
                <div
                  key={hook.slug}
                  className="group relative flex flex-col items-start rounded-lg border border-border bg-surface p-5 text-left transition-colors hover:border-border-strong"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleFavorite(hook.slug)
                    }}
                    aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    className="absolute right-4 top-4 text-ink-faint transition-colors hover:text-amber-500"
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
                    className="flex w-full flex-col items-start text-left"
                  >
                    <div className="mb-4 flex w-full items-start justify-between pr-6">
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
                </div>
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
  icon,
}: {
  active: boolean
  onClick: () => void
  label: string
  dotClass?: string
  icon?: React.ReactNode
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
      {icon}
      {label}
    </button>
  )
}
