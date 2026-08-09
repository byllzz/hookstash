import { useEffect, useMemo, useState } from 'react'
import { TopNav } from './components/TopNav'
import { Gallery } from './components/Gallery'
import { HookDetail } from './components/HookDetail'
import { CommandPalette } from './components/CommandPalette'
import { registry } from './lib/registry'
import { HOOK_META, type Category } from './lib/meta'
import { useTheme } from './lib/useTheme'

export default function App() {
  const [view, setView] = useState<'gallery' | 'detail'>('gallery')
  const [activeSlug, setActiveSlug] = useState(registry[0].slug)
  const [category, setCategory] = useState<Category | 'All'>('All')
  const [paletteOpen, setPaletteOpen] = useState(false)
  const { preference, setPreference } = useTheme()

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
    if (category === 'All') return registry
    return registry.filter((h) => HOOK_META[h.name]?.category === category)
  }, [category])

  const active = registry.find((h) => h.slug === activeSlug) ?? registry[0]

  const selectHook = (slug: string) => {
    setActiveSlug(slug)
    setView('detail')
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
        />
      ) : (
        <HookDetail hook={active} onSelect={selectHook} />
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
