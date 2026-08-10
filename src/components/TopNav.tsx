import { ThemeToggle } from './ThemeToggle'
import type { ReactNode } from 'react'
import type { ThemePreference } from '../lib/useTheme'

function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.17.69-3.84-1.34-3.84-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 2.86-.39c.97 0 1.94.13 2.86.39 2.18-1.48 3.13-1.17 3.13-1.17.63 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.67 5.34-5.21 5.62.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  )
}

type View = 'gallery' | 'detail' | 'docs' | 'playground'

export function TopNav({
  view,
  onGoHome,
  onNavigate,
  themePreference,
  onThemeChange,
}: {
  view: View
  onGoHome: () => void
  onNavigate: (view: 'docs' | 'playground') => void
  themePreference: ThemePreference
  onThemeChange: (pref: ThemePreference) => void
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-canvas/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3">
       

        <button onClick={onGoHome} className="flex shrink-0 items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-solid text-xs font-semibold text-on-solid">
            <svg
              fill="currentColor"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M9.09,15.2458l4.6706,2.2777a1.0706,1.0706,0,0,1-.21,2.0011L8.5087,20.7818a1.0729,1.0729,0,0,1-1.3241-.921,9.2173,9.2173,0,0,1,.4213-3.9965A1.0706,1.0706,0,0,1,9.09,15.2458Z" />
              <path d="M10.96,24.8605l3.4763-3.8613a1.0707,1.0707,0,0,1,1.8657.7537l-.1814,5.1945a1.072,1.072,0,0,1-1.2491,1.0192A9.3014,9.3014,0,0,1,11.1488,26.46,1.0713,1.0713,0,0,1,10.96,24.8605Z" />
              <path d="M19.2025,19.7222l4.9412,1.6058a1.0713,1.0713,0,0,1,.6363,1.4794,9.3022,9.3022,0,0,1-2.4707,3.1663,1.072,1.072,0,0,1-1.5914-.2581l-2.7543-4.4078A1.0707,1.0707,0,0,1,19.2025,19.7222Z" />
              <path d="M24.2273,16.57l-4.9948,1.4321A1.0706,1.0706,0,0,1,18.05,16.3742l2.906-4.3078A1.0706,1.0706,0,0,1,22.55,11.86,9.2168,9.2168,0,0,1,24.9135,15.11,1.0729,1.0729,0,0,1,24.2273,16.57Z" />
              <path d="M12.5561,4.45a14.9542,14.9542,0,0,0-2.5676.9459,1.07,1.07,0,0,0-.4636,1.5013l4.8819,8.4557a1.0707,1.0707,0,0,0,1.9979-.5353V5.0534A1.07,1.07,0,0,0,15.2526,3.985,14.9577,14.9577,0,0,0,12.5561,4.45Z" />
            </svg>
          </div>
          <span className="hidden font-semibold tracking-tight sm:inline">
            Hookstash
          </span>
        </button>

        <nav className="hidden items-center gap-5 md:flex">
          <NavLink
            active={view === "gallery" || view === "detail"}
            onClick={onGoHome}
          >
            Hooks
          </NavLink>
          <NavLink
            active={view === "playground"}
            onClick={() => onNavigate("playground")}
          >
            Playground
          </NavLink>
          <NavLink active={view === "docs"} onClick={() => onNavigate("docs")}>
            Docs
          </NavLink>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
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
  );
}

function NavLink({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`text-sm transition-colors ${
        active ? 'font-medium text-ink' : 'text-ink-faint hover:text-ink-soft'
      }`}
    >
      {children}
    </button>
  )
}
