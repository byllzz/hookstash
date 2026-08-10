import { Command, Search } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import type { ThemePreference } from '../lib/useTheme'

function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.17.69-3.84-1.34-3.84-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 2.86-.39c.97 0 1.94.13 2.86.39 2.18-1.48 3.13-1.17 3.13-1.17.63 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.67 5.34-5.21 5.62.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  )
}

export function TopNav({
  view,
  onGoHome,
  onOpenPalette,
  themePreference,
  onThemeChange,
}: {
  view: 'gallery' | 'detail'
  onGoHome: () => void
  onOpenPalette: () => void
  themePreference: ThemePreference
  onThemeChange: (pref: ThemePreference) => void
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-canvas/90 backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-3">
        <button onClick={onGoHome} className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-ink text-xs font-semibold text-white">
            H
          </div>
          <span className="hidden font-semibold tracking-tight sm:inline">
            Hookstash
          </span>
        </button>

        <div className="mx-auto w-full max-w-md">
          <button
            onClick={onOpenPalette}
            className="flex w-full items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-2 text-sm text-ink-faint shadow-sm transition-colors hover:border-border-strong hover:text-ink-soft"
          >
            <Search className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            <span className="flex-1 text-left">Search hooks…</span>
            <span className="hidden items-center gap-0.5 rounded border border-border px-1.5 py-0.5 text-[10px] sm:flex">
              <Command className="h-2.5 w-2.5" strokeWidth={2.5} />K
            </span>
          </button>
        </div>

        <div className="flex items-center justify-end gap-2">
          {view === 'detail' && (
            <button
              onClick={onGoHome}
              className="mr-1 hidden text-sm text-ink-faint transition-colors hover:text-ink-soft md:inline"
            >
              ← All hooks
            </button>
          )}
          <a
            href="https://github.com/byllzz/hookstash"
            target="_blank"
            rel="noreferrer"
            aria-label="View on GitHub"
            className="flex h-8 w-8 items-center justify-center rounded border border-border text-ink-soft transition-colors hover:border-border-strong hover:text-ink"
          >
            <GithubMark className="h-4 w-4" />
          </a>
          <ThemeToggle preference={themePreference} onChange={onThemeChange} />
        </div>
      </div>
    </header>
  )
}
