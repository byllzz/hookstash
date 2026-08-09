import { useState } from 'react'
import { Sun, Moon, Monitor, Check } from 'lucide-react'
import { useClickOutside } from '../hooks/useClickOutside'
import type { ThemePreference } from '../lib/useTheme'

const OPTIONS: { value: ThemePreference; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
]

export function ThemeToggle({
  preference,
  onChange,
}: {
  preference: ThemePreference
  onChange: (pref: ThemePreference) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false))
  const current = OPTIONS.find((o) => o.value === preference) ?? OPTIONS[2]
  const CurrentIcon = current.icon

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change theme"
        className="flex h-8 w-8 items-center justify-center rounded border border-border text-ink-soft transition-colors hover:border-border-strong hover:text-ink"
      >
        <CurrentIcon className="h-4 w-4" strokeWidth={1.75} />
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-40 w-36 overflow-hidden rounded-lg border border-border bg-surface py-1 shadow-lg">
          {OPTIONS.map((opt) => {
            const Icon = opt.icon
            const active = opt.value === preference
            return (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors ${
                  active ? 'text-ink' : 'text-ink-soft hover:bg-canvas'
                }`}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                <span className="flex-1">{opt.label}</span>
                {active && <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2} />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
