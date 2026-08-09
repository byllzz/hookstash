import { useMemo, useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { HookDetail } from './components/HookDetail'
import { registry } from './lib/registry'

export default function App() {
  const [query, setQuery] = useState('')
  const [activeSlug, setActiveSlug] = useState(registry[0].slug)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return registry
    return registry.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.summary.toLowerCase().includes(q) ||
        h.tags.some((t) => t.includes(q)),
    )
  }, [query])

  const active =
    registry.find((h) => h.slug === activeSlug) ?? filtered[0] ?? registry[0]

  return (
    <div className="flex h-screen bg-canvas text-ink">
      <Sidebar
        hooks={filtered}
        query={query}
        onQueryChange={setQuery}
        activeSlug={active.slug}
        onSelect={setActiveSlug}
      />
      <main className="flex-1 overflow-hidden">
        <HookDetail hook={active} />
      </main>
    </div>
  )
}
