import { useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useToggle } from '../hooks/useToggle'
import { useClickOutside } from '../hooks/useClickOutside'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import { useInterval } from '../hooks/useInterval'
import { useOnScreen } from '../hooks/useOnScreen'
import { useWindowSize } from '../hooks/useWindowSize'
import { useHover } from '../hooks/useHover'
import { useKeyPress } from '../hooks/useKeyPress'
import { usePrevious } from '../hooks/usePrevious'
import { useEventListener } from '../hooks/useEventListener'
import { useThrottle } from '../hooks/useThrottle'
import { useFetch } from '../hooks/useFetch'

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
        <span className={pill}>{debounced || '-'}</span>
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
        Refresh the page - this value persists in{' '}
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

export function WindowSizeDemo() {
  const { width, height } = useWindowSize()
  return (
    <div className="flex items-center gap-2 text-sm text-ink-soft">
      <span>Viewport:</span>
      <span className={pill}>
        {width} × {height}
      </span>
    </div>
  )
}

export function HoverDemo() {
  const [ref, hovered] = useHover<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`flex h-20 items-center justify-center rounded border text-sm transition-colors ${
        hovered
          ? 'border-accent bg-accent-soft text-accent'
          : 'border-border text-ink-faint'
      }`}
    >
      {hovered ? 'Hovering ✓' : 'Hover over me'}
    </div>
  )
}

export function KeyPressDemo() {
  const shiftPressed = useKeyPress('Shift')
  return (
    <div className="text-sm text-ink-soft">
      Hold <kbd className="rounded border border-border bg-canvas px-1.5 py-0.5 font-mono text-xs">Shift</kbd>:{' '}
      <span className={pill}>{String(shiftPressed)}</span>
    </div>
  )
}

export function PreviousDemo() {
  const [count, setCount] = useState(0)
  const previous = usePrevious(count)
  return (
    <div className="space-y-3">
      <button
        onClick={() => setCount((c) => c + 1)}
        className="rounded border border-border bg-surface px-3 py-1.5 text-sm hover:border-border-strong transition-colors"
      >
        Increment
      </button>
      <div className="text-sm text-ink-soft">
        Now: <span className={pill}>{count}</span> Previous:{' '}
        <span className={pill}>{previous ?? '-'}</span>
      </div>
    </div>
  )
}

export function EventListenerDemo() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEventListener('mousemove', (e) => {
    const evt = e as MouseEvent
    setPos({ x: Math.round(evt.clientX), y: Math.round(evt.clientY) })
  })
  return (
    <div className="text-sm text-ink-soft">
      Move your mouse anywhere on the page:
      <div className="mt-2">
        <span className={pill}>
          x: {pos.x}, y: {pos.y}
        </span>
      </div>
    </div>
  )
}

export function ThrottleDemo() {
  const [scrollCount, setScrollCount] = useState(0)
  const throttled = useThrottle(scrollCount, 800)
  return (
    <div className="space-y-3">
      <button
        onClick={() => setScrollCount((c) => c + 1)}
        className="rounded border border-border bg-surface px-3 py-1.5 text-sm hover:border-border-strong transition-colors"
      >
        Click rapidly
      </button>
      <div className="text-sm text-ink-soft">
        Raw clicks: <span className={pill}>{scrollCount}</span> Throttled:{' '}
        <span className={pill}>{throttled}</span>
      </div>
    </div>
  )
}

export function FetchDemo() {
  const [url, setUrl] = useState<string | null>(null)
  const { data, error, loading } = useFetch<{ name: string }>(url)
  return (
    <div className="space-y-3">
      <button
        onClick={() =>
          setUrl('https://restcountries.com/v3.1/name/japan?fields=name')
        }
        className="rounded border border-border bg-surface px-3 py-1.5 text-sm hover:border-border-strong transition-colors"
      >
        Fetch data
      </button>
      <div className="text-sm text-ink-soft">
        {loading && 'Loading…'}
        {error && <span className="text-red-500">{error}</span>}
        {!loading && !error && data && (
          <span className={pill}>{JSON.stringify(data).slice(0, 40)}…</span>
        )}
        {!loading && !error && !data && 'Not fetched yet'}
      </div>
    </div>
  )
}
