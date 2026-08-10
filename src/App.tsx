import { useEffect, useMemo, useState } from 'react'
import { TopNav } from './components/TopNav'
import { Gallery } from './components/Gallery'
import { HookDetail } from './components/HookDetail'
import { CommandPalette } from './components/CommandPalette'
import { registry } from './lib/registry'
import { HOOK_META, type Category } from './lib/meta'
import { useTheme } from './lib/useTheme'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function App() {
  const [view, setView] = useState<'gallery' | 'detail'>('gallery')
  const [activeSlug, setActiveSlug] = useState(registry[0].slug)
  const [category, setCategory] = useState<Category | 'All'>('All')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
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

  const filtered = useMemo(() => {
    let list = registry
    if (favoritesOnly) list = list.filter((h) => favorites.includes(h.slug))
    else if (category !== 'All')
      list = list.filter((h) => HOOK_META[h.name]?.category === category)
    return list
  }, [category, favoritesOnly, favorites])

  const active = registry.find((h) => h.slug === activeSlug) ?? registry[0]

  const selectHook = (slug: string) => {
    setActiveSlug(slug)
    setView('detail')
  }

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    )
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <TopNav
        view={view}
        onGoHome={() => setView('gallery')}
        onOpenPalette={() => setPaletteOpen(true)}
        themePreference={preference}
        onThemeChange={setPreference}
      />

      {view === 'gallery' ? (
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
        />
      ) : (
        <HookDetail
          hook={active}
          onSelect={selectHook}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}

      <CommandPalette
        hooks={registry}
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelect={selectHook}
      />
    </div>
  )
}
