import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { TopNav } from './components/TopNav'
import { Gallery } from './components/Gallery'
import { HookDetail } from './components/HookDetail'
import { CommandPalette } from './components/CommandPalette'
import { Docs } from './components/Docs'
import { Footer } from './components/Footer'
import { TopLoader } from './components/TopLoader'
import { registry } from './lib/registry'
import { HOOK_META, type Category } from './lib/meta'
import { useTheme } from './lib/useTheme'
import { useLocalStorage } from './hooks/useLocalStorage'

const Playground = lazy(() =>
  import('./components/Playground').then((m) => ({ default: m.Playground })),
)

type View = 'gallery' | 'detail' | 'docs' | 'playground'

export default function App() {
  const [view, setView] = useState<View>('gallery')
  const [activeSlug, setActiveSlug] = useState(registry[0].slug)
  const [category, setCategory] = useState<Category | 'All'>('All')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [query, setQuery] = useState('')
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [navLoading, setNavLoading] = useState(false)
  const { preference, setPreference } = useTheme()
  const [favorites, setFavorites] = useLocalStorage<string[]>(
    'hookstash-favorites',
    [],
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.ctrlKey
      if (isMeta && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((v) => !v)
      }
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault()
        setPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const navigate = (next: View) => {
    if (next === view) return
    setNavLoading(true)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    setView(next)
    const t = setTimeout(() => setNavLoading(false), 260)
    return () => clearTimeout(t)
  }

  const filtered = useMemo(() => {
    let list = registry
    if (favoritesOnly) list = list.filter((h) => favorites.includes(h.slug))
    else if (category !== 'All')
      list = list.filter((h) => HOOK_META[h.name]?.category === category)

    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.summary.toLowerCase().includes(q) ||
          h.tags.some((t) => t.includes(q)),
      )
    }
    return list
  }, [category, favoritesOnly, favorites, query])

  const active = registry.find((h) => h.slug === activeSlug) ?? registry[0]

  const selectHook = (slug: string) => {
    setActiveSlug(slug)
    navigate('detail')
  }

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <TopLoader active={navLoading} />
      <TopNav
        view={view}
        onGoHome={() => navigate('gallery')}
        onNavigate={navigate}
        themePreference={preference}
        onThemeChange={setPreference}
      />

      <main className="flex-1">
        {view === 'gallery' && (
          <Gallery
            hooks={filtered}
            allCount={registry.length}
            category={category}
            onCategoryChange={setCategory}
            onSelect={selectHook}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            favoritesOnly={favoritesOnly}
            onToggleFavoritesOnly={() => setFavoritesOnly((v) => !v)}
            query={query}
            onQueryChange={setQuery}
            onOpenPlayground={() => navigate('playground')}
          />
        )}
        {view === 'detail' && (
          <HookDetail
            hook={active}
            onSelect={selectHook}
            onBack={() => navigate('gallery')}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}
        {view === 'docs' && <Docs />}
        {view === 'playground' && (
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-32 text-sm text-ink-faint">
                Loading playground…
              </div>
            }
          >
            <Playground />
          </Suspense>
        )}
      </main>

      <Footer onNavigate={navigate} />

      <CommandPalette
        hooks={registry}
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelect={selectHook}
      />
    </div>
  )
}
