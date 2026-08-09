import { useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useToggle } from '../hooks/useToggle'
import { useClickOutside } from '../hooks/useClickOutside'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import { useInterval } from '../hooks/useInterval'
import { useOnScreen } from '../hooks/useOnScreen'

const field =
  'w-full rounded border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-accent transition-colors'

const pill =
  'inline-flex items-center gap-1.5 rounded border border-border bg-accent-soft px-2.5 py-1 text-xs font-mono text-accent'

export function DebounceDemo() {
  const [input, setInput] = useState('')
  const debounced = useDebounce(input, 400)
  return (
    <div className="space-y-3">
      <input
        className={field}
        placeholder="Type something…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex items-center gap-2 text-sm text-ink-soft">
        <span>Debounced value:</span>
        <span className={pill}>{debounced || '—'}</span>
      </div>
    </div>
  )
}

export function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('hookstash-demo-name', '')
  return (
    <div className="space-y-3">
      <input
        className={field}
        placeholder="Saved across reloads…"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p className="text-sm text-ink-soft">
        Refresh the page — this value persists in{' '}
        <code className="font-mono text-ink">localStorage</code>.
      </p>
    </div>
  )
}

export function ToggleDemo() {
  const [on, toggle] = useToggle(false)
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => toggle()}
        className={`h-7 w-12 rounded-full border transition-colors ${
          on ? 'border-accent bg-accent' : 'border-border-strong bg-border'
        }`}
        aria-pressed={on}
      >
        <span
          className={`block h-5 w-5 translate-y-0.5 rounded-full bg-surface transition-transform ${
            on ? 'translate-x-6' : 'translate-x-0.5'
          }`}
        />
      </button>
      <span className="text-sm text-ink-soft">
        State is <span className={pill}>{String(on)}</span>
      </span>
    </div>
  )
}

export function ClickOutsideDemo() {
  const [open, setOpen] = useState(false)
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded border border-border bg-surface px-3 py-2 text-sm hover:border-border-strong transition-colors"
      >
        {open ? 'Panel is open' : 'Open panel'}
      </button>
      {open && (
        <div
          ref={ref}
          className="absolute left-0 top-11 z-10 w-56 rounded border border-border bg-surface p-3 text-sm text-ink-soft shadow-sm"
        >
          Click anywhere outside this box to close it.
        </div>
      )}
    </div>
  )
}

export function MediaQueryDemo() {
  const isNarrow = useMediaQuery('(max-width: 640px)')
  return (
    <div className="text-sm text-ink-soft">
      Viewport currently matches{' '}
      <code className="font-mono text-ink">(max-width: 640px)</code>:{' '}
      <span className={pill}>{String(isNarrow)}</span>
      <p className="mt-2 text-ink-faint">Resize the window to see it update.</p>
    </div>
  )
}

export function CopyToClipboardDemo() {
  const [copied, copy] = useCopyToClipboard()
  return (
    <button
      onClick={() => copy('npm install hookstash')}
      className="rounded border border-border bg-surface px-3 py-2 text-sm font-mono hover:border-border-strong transition-colors"
    >
      {copied ? 'Copied ✓' : 'npm install hookstash'}
    </button>
  )
}

export function IntervalDemo() {
  const [count, setCount] = useState(0)
  const [running, toggleRunning] = useToggle(true)
  useInterval(() => setCount((c) => c + 1), running ? 1000 : null)
  return (
    <div className="flex items-center gap-3">
      <span className={pill}>{count}s</span>
      <button
        onClick={() => toggleRunning()}
        className="rounded border border-border bg-surface px-3 py-1.5 text-sm hover:border-border-strong transition-colors"
      >
        {running ? 'Pause' : 'Resume'}
      </button>
    </div>
  )
}

export function OnScreenDemo() {
  const [ref, visible] = useOnScreen<HTMLDivElement>({ threshold: 0.6 })
  return (
    <div className="h-40 overflow-y-auto rounded border border-border p-3 scrollbar-thin">
      <p className="mb-24 text-sm text-ink-faint">Scroll down inside this box.</p>
      <div
        ref={ref}
        className={`rounded border px-3 py-4 text-center text-sm transition-colors ${
          visible
            ? 'border-accent bg-accent-soft text-accent'
            : 'border-border text-ink-faint'
        }`}
      >
        {visible ? 'Now on screen ✓' : 'Scroll to reveal me'}
      </div>
      <p className="mt-24 text-sm text-ink-faint">Bottom padding.</p>
    </div>
  )
}
